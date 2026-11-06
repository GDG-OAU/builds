import type { Project, VoteRecord, CommunityMeta, UserProfile, IndividualScore, CommunityScore } from '../types';
import { INITIAL_COMMUNITIES } from '../data/seedData';
import { LEADERBOARD_CONFIG } from '../config/leaderboard.config';

const STORAGE_KEYS = {
  PROJECTS: 'gdg_builderjam_live_projects_v1',
  VOTES: 'gdg_builderjam_live_votes_v1',
  COMMUNITIES: 'gdg_builderjam_live_communities_v1',
  VOTING_CLOSED: 'gdg_builderjam_voting_closed'
};

// Aggressively clean up legacy seed mock data from all browsers
const LEGACY_STORAGE_KEYS = [
  'gdg_builderjam_projects',
  'gdg_builderjam_votes',
  'gdg_builderjam_communities',
  'projects',
  'votes',
  'communities'
];

try {
  if (typeof window !== 'undefined' && window.localStorage) {
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  }
} catch {
  // ignore
}

const isMockProject = (p: Partial<Project>): boolean => {
  if (!p || !p.id) return true;
  if (p.id.startsWith('seed-')) return true;
  if (p.submitterEmail && p.submitterEmail.includes('student.oauife.edu.ng')) return true;
  if (p.title && ['CampusPulse OAU', 'OAU AgriVision', 'StudyBuddy OAU', 'ScholarSync', 'MedCheck Africa', 'TransitRide Ife'].includes(p.title)) return true;
  if (p.builderName && ['Tobi Adebayo', 'Chioma Nwosu', 'Emeka Okafor', 'Folake Alabi', 'Damilola Bakare'].includes(p.builderName)) return true;
  if (p.githubUrl && (
    p.githubUrl.includes('campuspulse-oau') ||
    p.githubUrl.includes('agrivision-ml') ||
    p.githubUrl.includes('studybuddy-android') ||
    p.githubUrl.includes('scholarsync-agent') ||
    p.githubUrl.includes('medcheck-africa') ||
    p.githubUrl.includes('transitride-ife')
  )) return true;
  return false;
};

export const getStoredProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!data) {
      return [];
    }
    const list: Project[] = JSON.parse(data);
    const realProjects = list.filter((p) => !isMockProject(p));
    if (realProjects.length !== list.length) {
      saveProjects(realProjects);
    }
    return realProjects;
  } catch {
    return [];
  }
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects.filter((p) => !isMockProject(p))));
  } catch {
    // fallback
  }
};

export const getStoredVotes = (): VoteRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VOTES);
    if (!data) {
      return [];
    }
    const list: VoteRecord[] = JSON.parse(data);
    const realVotes = list.filter((v) => {
      if (!v || !v.projectId) return false;
      if (v.projectId.startsWith('seed-proj-') || v.projectId.startsWith('seed-')) return false;
      if (v.voterUid && (v.voterUid.startsWith('anon-voter-') || v.voterUid.startsWith('seed-user-'))) return false;
      if (v.voterEmail && v.voterEmail.includes('@oau.edu')) return false;
      return true;
    });
    if (realVotes.length !== list.length) {
      saveVotes(realVotes);
    }
    return realVotes;
  } catch {
    return [];
  }
};

export const saveVotes = (votes: VoteRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
  } catch {
    // fallback
  }
};

export const getStoredCommunities = (): CommunityMeta[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMMUNITIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(INITIAL_COMMUNITIES));
      return INITIAL_COMMUNITIES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_COMMUNITIES;
  }
};

export const saveCommunities = (communities: CommunityMeta[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(communities));
  } catch {
    // fallback
  }
};

export const isVotingClosed = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.VOTING_CLOSED) === 'true';
};

export const setVotingClosedState = (closed: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.VOTING_CLOSED, closed ? 'true' : 'false');
};

export const isUserAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  return LEADERBOARD_CONFIG.adminEmails.some(
    admin => admin.toLowerCase() === email.toLowerCase()
  );
};

export const getVotesCountForProject = (projectId: string, votes: VoteRecord[]): number => {
  return votes.filter(v => v.projectId === projectId).length;
};

export const canUserVoteOnProject = (
  projectId: string,
  user: UserProfile | null,
  projects: Project[],
  votes: VoteRecord[]
): { allowed: boolean; reason?: string } => {
  if (!user) {
    return { allowed: false, reason: 'Please sign in with Google to vote.' };
  }

  const project = projects.find(p => p.id === projectId);
  if (!project) {
    return { allowed: false, reason: 'Project not found.' };
  }

  if (
    project.submitterUid === user.uid ||
    project.submitterEmail.toLowerCase() === user.email.toLowerCase()
  ) {
    return { allowed: false, reason: 'You cannot vote for your own project.' };
  }

  const alreadyVoted = votes.some(
    v => v.projectId === projectId && (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase())
  );
  if (alreadyVoted) {
    return { allowed: false, reason: 'You have already voted for this project.' };
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const userTodayVotes = votes.filter(
    v => (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase()) && v.votedAt >= startOfDay.getTime()
  );

  if (userTodayVotes.length >= LEADERBOARD_CONFIG.voting.maxDailyVotesPerUser) {
    return {
      allowed: false,
      reason: `Daily limit reached (${LEADERBOARD_CONFIG.voting.maxDailyVotesPerUser} votes per day). Come back tomorrow!`
    };
  }

  return { allowed: true };
};

export const calculateIndividualScores = (
  projects: Project[],
  votes: VoteRecord[]
): IndividualScore[] => {
  const { individual } = LEADERBOARD_CONFIG;
  const buildersMap = new Map<string, { name: string; email: string; projects: Project[] }>();

  projects.forEach(p => {
    const key = p.submitterEmail.toLowerCase();
    const existing = buildersMap.get(key);
    if (existing) {
      existing.projects.push(p);
    } else {
      buildersMap.set(key, {
        name: p.builderName,
        email: p.submitterEmail,
        projects: [p]
      });
    }
  });

  const scores: IndividualScore[] = [];

  buildersMap.forEach(({ name, email, projects: userProjects }) => {
    let totalCompleteness = 0;
    let totalVotes = 0;

    userProjects.forEach(p => {
      let comp = 0;
      if (p.demoUrl && p.demoUrl.trim().length > 0) {
        comp += individual.completenessBreakdown.demoLink;
      }
      if (p.googleTools && p.googleTools.length >= 2) {
        comp += individual.completenessBreakdown.googleToolsMinTwo;
      }
      if (p.description && p.description.trim().length > 10) {
        comp += individual.completenessBreakdown.descriptionPresent;
      }
      totalCompleteness += comp;

      const pVotes = getVotesCountForProject(p.id, votes);
      totalVotes += pVotes;
    });

    const avgCompleteness = userProjects.length > 0 ? (totalCompleteness / userProjects.length) : 0;
    const completenessScore = Math.round(avgCompleteness * 100);

    const countedProjects = Math.min(userProjects.length, individual.projectCap);
    const projectCountScore = (countedProjects / individual.projectCap) * 100;

    const cappedVotes = Math.min(totalVotes, individual.voteCap);
    const votesScore = (cappedVotes / individual.voteCap) * 100;

    const compositeScore = Math.round(
      ((completenessScore * individual.completenessWeight) +
       (projectCountScore * individual.projectCountWeight) +
       (votesScore * individual.communityVotesWeight)) * 10
    ) / 10;

    scores.push({
      builderName: name,
      builderEmail: email,
      projectsCount: userProjects.length,
      completenessScore: Math.round(completenessScore * 10) / 10,
      projectCountScore: Math.round(projectCountScore * 10) / 10,
      votesScore: Math.round(votesScore * 10) / 10,
      totalVotes,
      compositeScore,
      projects: userProjects
    });
  });

  return scores.sort((a, b) => b.compositeScore - a.compositeScore);
};

export const calculateCommunityScores = (
  communities: CommunityMeta[],
  projects: Project[]
): CommunityScore[] => {
  const { community: commConfig } = LEADERBOARD_CONFIG;

  return communities.map(comm => {
    const commProjects = projects.filter(p => p.community === comm.name);
    const submissionsCount = commProjects.length;

    const builderSubmissions = new Map<string, number>();
    commProjects.forEach(p => {
      const email = p.submitterEmail.toLowerCase();
      builderSubmissions.set(email, (builderSubmissions.get(email) || 0) + 1);
    });

    const buildersCount = builderSubmissions.size;
    let multiSubmittersCount = 0;
    builderSubmissions.forEach(count => {
      if (count > 1) multiSubmittersCount++;
    });

    const isLiveOrCompleted = Boolean(comm.eventDate && comm.attendeesCount && comm.attendeesCount > 0);
    const attendees = comm.attendeesCount || commConfig.defaultEstimatedAttendees;

    const rawSubmissionRate = attendees > 0 ? (submissionsCount / attendees) : 0;
    const submissionRate = Math.min(rawSubmissionRate, 1.0);

    const repeatBuilderRate = buildersCount > 0 ? (multiSubmittersCount / buildersCount) : 0;

    let compositeScore = 0;
    if (isLiveOrCompleted) {
      compositeScore = Math.round(
        ((submissionRate * commConfig.submissionRateWeight) +
         (repeatBuilderRate * commConfig.repeatBuildersWeight)) * 1000
      ) / 10;
    }

    return {
      name: comm.name,
      submissionsCount,
      buildersCount,
      multiSubmittersCount,
      submissionRate: Math.round(submissionRate * 100),
      repeatBuilderRate: Math.round(repeatBuilderRate * 100),
      compositeScore,
      isLiveOrCompleted
    };
  }).sort((a, b) => {
    if (a.isLiveOrCompleted && !b.isLiveOrCompleted) return -1;
    if (!a.isLiveOrCompleted && b.isLiveOrCompleted) return 1;
    return b.compositeScore - a.compositeScore;
  });
};

export const exportSubmissionsToCSV = (projects: Project[]): void => {
  const headers = ['Title', 'Builder', 'Email', 'Community', 'Google Tools', 'GitHub Link', 'Demo Link', 'Date Submitted'];
  const rows = projects.map(p => [
    `"${(p.title || '').replace(/"/g, '""')}"`,
    `"${(p.builderName || '').replace(/"/g, '""')}"`,
    `"${(p.submitterEmail || '').replace(/"/g, '""')}"`,
    `"${(p.community || '').replace(/"/g, '""')}"`,
    `"${(p.googleTools || []).join(', ')}"`,
    `"${p.githubUrl}"`,
    `"${p.demoUrl || ''}"`,
    `"${new Date(p.createdAt).toLocaleDateString()}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `GDG_OAU_BuilderJam_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
