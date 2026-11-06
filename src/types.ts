export type CommunityName =
  | 'Web Development'
  | 'Game Development'
  | 'Research'
  | 'Product Management'
  | 'Mobile App Development'
  | 'Data Science / Machine Learning'
  | 'Design'
  | 'Quantum Computing'
  | 'Cybersecurity'
  | 'Quantitative Finance'
  | 'Cloud Computing';

export type GoogleTool =
  | 'Google AI Studio'
  | 'Gemini'
  | 'Antigravity'
  | 'Colab'
  | 'Looker Studio'
  | 'Firebase'
  | 'BigQuery'
  | 'Cloud Run'
  | 'Google Docs'
  | 'Forms'
  | 'Sheets'
  | 'Android'
  | 'Other';

export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  screenshotUrl: string;
  googleTools: GoogleTool[];
  community: CommunityName;
  demoUrl?: string;
  builderName: string;
  submitterEmail: string;
  submitterUid: string;
  createdAt: number;
  votesCount?: number;
}

export interface VoteRecord {
  id: string;
  projectId: string;
  voterUid: string;
  voterEmail: string;
  votedAt: number;
}

export interface CommunityMeta {
  name: CommunityName;
  eventDate?: string;
  attendeesCount?: number;
  description: string;
  color: string;
  icon: string;
  joinUrl?: string;
}

export interface IndividualScore {
  builderName: string;
  builderEmail: string;
  projectsCount: number;
  completenessScore: number;
  projectCountScore: number;
  votesScore: number;
  totalVotes: number;
  compositeScore: number;
  projects: Project[];
}

export interface CommunityScore {
  name: CommunityName;
  submissionsCount: number;
  buildersCount: number;
  multiSubmittersCount: number;
  submissionRate: number;
  repeatBuilderRate: number;
  compositeScore: number;
  isLiveOrCompleted: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

