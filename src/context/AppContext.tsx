import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import confetti from 'canvas-confetti';
import type { ToastData } from '../components/Toast';
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
  toast: ToastData | null;
  showToast: (
    message: string,
    type?: 'info' | 'success' | 'warning' | 'error',
    action?: { label: string; onClick: () => void }
  ) => void;
  dismissToast: () => void;
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
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      // Clean up legacy dicebear bottts (pumpkin/robot) avatar if present in localStorage
      if (parsed.photoURL && parsed.photoURL.includes('bottts')) {
        parsed.photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(parsed.displayName || 'Builder')}&background=188038&color=fff&bold=true`;
        localStorage.setItem('gdg_builderjam_current_user', JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return null;
    }
  });
  const [projects, setProjects] = useState<Project[]>(getStoredProjects);
  const [votes, setVotes] = useState<VoteRecord[]>(getStoredVotes);
  const [communities, setCommunities] = useState<CommunityMeta[]>(getStoredCommunities);
  const [votingClosed, setVotingClosed] = useState<boolean>(fetchVotingClosedState);
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    action?: { label: string; onClick: () => void }
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToast({ id, message, type, action });
  };

  const dismissToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

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
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=188038&color=fff&bold=true`
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
      const msg = 'Voting has been closed by the organizers.';
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    const check = canUserVoteOnProject(projectId, user, projects, votes);
    if (!check.allowed) {
      const msg = check.reason || 'Voting not permitted.';
      if (!user) {
        showToast(msg, 'warning', {
          label: 'Sign in with Google',
          onClick: () => {
            signInWithGoogle();
          }
        });
      } else {
        showToast(msg, 'warning');
      }
      return { success: false, message: msg };
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

    const successMsg = 'Vote registered successfully! Thank you for supporting your peer!';
    showToast(successMsg, 'success');
    return { success: true, message: successMsg };
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
        toast,
        showToast,
        dismissToast,
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
