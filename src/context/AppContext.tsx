import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import confetti from 'canvas-confetti';
import type { Project, VoteRecord, CommunityMeta, UserProfile, CommunityName } from '../types';
import {
  getStoredProjects,
  saveProjects,
  getStoredVotes,
  saveVotes,
  getStoredCommunities,
  saveCommunities,
  isVotingClosed as fetchVotingClosedState,
  setVotingClosedState,
  canUserVoteOnProject,
  isUserAdmin
} from '../services/appState';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase';
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  projects: Project[];
  votes: VoteRecord[];
  communities: CommunityMeta[];
  votingClosed: boolean;
  signInWithGoogle: () => Promise<void>;
  mockSignIn: (email?: string, name?: string) => void;
  signOutUser: () => Promise<void>;
  submitProject: (newProject: Omit<Project, 'id' | 'createdAt' | 'votesCount' | 'submitterUid' | 'submitterEmail'>) => { success: boolean; error?: string; project?: Project };
  castVote: (projectId: string) => { success: boolean; message: string };
  removeProject: (projectId: string) => void;
  toggleVotingClosed: (closed: boolean) => void;
  updateCommunity: (name: CommunityName, date?: string, attendees?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gdg_builderjam_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [projects, setProjects] = useState<Project[]>(getStoredProjects);
  const [votes, setVotes] = useState<VoteRecord[]>(getStoredVotes);
  const [communities, setCommunities] = useState<CommunityMeta[]>(getStoredCommunities);
  const [votingClosed, setVotingClosed] = useState<boolean>(fetchVotingClosedState);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const profile: UserProfile = {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Builder',
            photoURL: fbUser.photoURL || undefined
          };
          setUser(profile);
          localStorage.setItem('gdg_builderjam_current_user', JSON.stringify(profile));
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const isAdmin = isUserAdmin(user?.email);

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const profile: UserProfile = {
          uid: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || 'Builder',
          photoURL: result.user.photoURL || undefined
        };
        setUser(profile);
        localStorage.setItem('gdg_builderjam_current_user', JSON.stringify(profile));
      } catch (err: any) {
        console.error('Firebase Auth popup error:', err);
        throw err;
      }
    } else {
      mockSignIn();
    }
  };

  const mockSignIn = (email = 'rebeccaayodele08@gmail.com', name = 'Rebecca Ayodele') => {
    const profile: UserProfile = {
      uid: `user-${Date.now()}`,
      email,
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`
    };
    setUser(profile);
    localStorage.setItem('gdg_builderjam_current_user', JSON.stringify(profile));
  };

  const signOutUser = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem('gdg_builderjam_current_user');
  };

  const submitProject = (
    data: Omit<Project, 'id' | 'createdAt' | 'votesCount' | 'submitterUid' | 'submitterEmail'>
  ) => {
    if (!user) {
      return { success: false, error: 'You must be signed in to submit a project.' };
    }

    const cleanUrl = data.githubUrl.trim().toLowerCase().replace(/\/$/, '');
    if (!cleanUrl.includes('github.com/')) {
      return { success: false, error: 'Invalid GitHub URL. Must be a valid github.com repository URL.' };
    }

    const isDuplicate = projects.some(p => p.githubUrl.trim().toLowerCase().replace(/\/$/, '') === cleanUrl);
    if (isDuplicate) {
      return { success: false, error: 'A project with this exact GitHub repository has already been submitted!' };
    }

    const newProject: Project = {
      ...data,
      id: `proj-${Date.now()}`,
      submitterUid: user.uid,
      submitterEmail: user.email,
      createdAt: Date.now(),
      votesCount: 0
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    saveProjects(updated);
    return { success: true, project: newProject };
  };

  const castVote = (projectId: string) => {
    if (votingClosed && !isAdmin) {
      return { success: false, message: 'Voting has been closed by the organizers.' };
    }

    const check = canUserVoteOnProject(projectId, user, projects, votes);
    if (!check.allowed) {
      return { success: false, message: check.reason || 'Voting not permitted.' };
    }

    const newVote: VoteRecord = {
      id: `vote-${Date.now()}`,
      projectId,
      voterUid: user!.uid,
      voterEmail: user!.email,
      votedAt: Date.now()
    };

    const updatedVotes = [...votes, newVote];
    setVotes(updatedVotes);
    saveVotes(updatedVotes);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4285F4', '#EA4335', '#FBBC04', '#188038']
      });
    } catch {
      // fallback
    }

    return { success: true, message: 'Vote registered successfully! Thank you for supporting your peer!' };
  };

  const removeProject = (projectId: string) => {
    const updated = projects.filter(p => p.id !== projectId);
    setProjects(updated);
    saveProjects(updated);
    const updatedVotes = votes.filter(v => v.projectId !== projectId);
    setVotes(updatedVotes);
    saveVotes(updatedVotes);
  };

  const toggleVotingClosed = (closed: boolean) => {
    setVotingClosed(closed);
    setVotingClosedState(closed);
  };

  const updateCommunity = (name: CommunityName, date?: string, attendees?: number) => {
    const updated = communities.map(c => {
      if (c.name === name) {
        return {
          ...c,
          eventDate: date !== undefined ? date : c.eventDate,
          attendeesCount: attendees !== undefined ? attendees : c.attendeesCount
        };
      }
      return c;
    });
    setCommunities(updated);
    saveCommunities(updated);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
        projects,
        votes,
        communities,
        votingClosed,
        signInWithGoogle,
        mockSignIn,
        signOutUser,
        submitProject,
        castVote,
        removeProject,
        toggleVotingClosed,
        updateCommunity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
