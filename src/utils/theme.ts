import type { CommunityName, GoogleTool } from '../types';

export interface CommunityTheme {
  dotClass: string;
  badgeClass: string;
  cardHoverClass: string;
  chipClass: string;
  chipActiveClass: string;
  gradientClass: string;
}

export const COMMUNITY_THEMES: Record<CommunityName, CommunityTheme> = {
  'Web Development': {
    dotClass: 'bg-track-web',
    badgeClass: 'bg-track-web-light text-blue-700 border-track-web-border',
    cardHoverClass: 'hover:border-track-web hover:shadow-blue-100',
    chipClass: 'bg-track-web-light text-blue-700 border-track-web-border hover:bg-blue-100',
    chipActiveClass: 'bg-track-web text-white border-track-web shadow-md shadow-blue-200',
    gradientClass: 'from-blue-500 to-indigo-600',
  },
  'Data Science / Machine Learning': {
    dotClass: 'bg-track-ml',
    badgeClass: 'bg-track-ml-light text-emerald-800 border-track-ml-border',
    cardHoverClass: 'hover:border-track-ml hover:shadow-emerald-100',
    chipClass: 'bg-track-ml-light text-emerald-800 border-track-ml-border hover:bg-emerald-100',
    chipActiveClass: 'bg-track-ml text-white border-track-ml shadow-md shadow-emerald-200',
    gradientClass: 'from-emerald-500 to-teal-600',
  },
  'Mobile App Development': {
    dotClass: 'bg-track-mobile',
    badgeClass: 'bg-track-mobile-light text-amber-900 border-track-mobile-border',
    cardHoverClass: 'hover:border-track-mobile hover:shadow-amber-100',
    chipClass: 'bg-track-mobile-light text-amber-900 border-track-mobile-border hover:bg-amber-100',
    chipActiveClass: 'bg-track-mobile text-white border-track-mobile shadow-md shadow-amber-200',
    gradientClass: 'from-amber-400 to-orange-500',
  },
  'Cybersecurity': {
    dotClass: 'bg-track-cyber',
    badgeClass: 'bg-track-cyber-light text-red-700 border-track-cyber-border',
    cardHoverClass: 'hover:border-track-cyber hover:shadow-red-100',
    chipClass: 'bg-track-cyber-light text-red-700 border-track-cyber-border hover:bg-red-100',
    chipActiveClass: 'bg-track-cyber text-white border-track-cyber shadow-md shadow-red-200',
    gradientClass: 'from-red-500 to-rose-600',
  },
  'Design': {
    dotClass: 'bg-track-design',
    badgeClass: 'bg-track-design-light text-pink-700 border-track-design-border',
    cardHoverClass: 'hover:border-track-design hover:shadow-pink-100',
    chipClass: 'bg-track-design-light text-pink-700 border-track-design-border hover:bg-pink-100',
    chipActiveClass: 'bg-track-design text-white border-track-design shadow-md shadow-pink-200',
    gradientClass: 'from-pink-500 to-rose-500',
  },
  'Game Development': {
    dotClass: 'bg-track-game',
    badgeClass: 'bg-track-game-light text-purple-700 border-track-game-border',
    cardHoverClass: 'hover:border-track-game hover:shadow-purple-100',
    chipClass: 'bg-track-game-light text-purple-700 border-track-game-border hover:bg-purple-100',
    chipActiveClass: 'bg-track-game text-white border-track-game shadow-md shadow-purple-200',
    gradientClass: 'from-purple-500 to-violet-600',
  },
  'Product Management': {
    dotClass: 'bg-track-pm',
    badgeClass: 'bg-track-pm-light text-teal-800 border-track-pm-border',
    cardHoverClass: 'hover:border-track-pm hover:shadow-teal-100',
    chipClass: 'bg-track-pm-light text-teal-800 border-track-pm-border hover:bg-teal-100',
    chipActiveClass: 'bg-track-pm text-white border-track-pm shadow-md shadow-teal-200',
    gradientClass: 'from-teal-500 to-emerald-600',
  },
  'Research': {
    dotClass: 'bg-track-research',
    badgeClass: 'bg-track-research-light text-cyan-800 border-track-research-border',
    cardHoverClass: 'hover:border-track-research hover:shadow-cyan-100',
    chipClass: 'bg-track-research-light text-cyan-800 border-track-research-border hover:bg-cyan-100',
    chipActiveClass: 'bg-track-research text-white border-track-research shadow-md shadow-cyan-200',
    gradientClass: 'from-cyan-500 to-blue-600',
  },
  'Quantum Computing': {
    dotClass: 'bg-track-quantum',
    badgeClass: 'bg-track-quantum-light text-indigo-700 border-track-quantum-border',
    cardHoverClass: 'hover:border-track-quantum hover:shadow-indigo-100',
    chipClass: 'bg-track-quantum-light text-indigo-700 border-track-quantum-border hover:bg-indigo-100',
    chipActiveClass: 'bg-track-quantum text-white border-track-quantum shadow-md shadow-indigo-200',
    gradientClass: 'from-indigo-500 to-purple-600',
  },
};

export interface ToolTheme {
  label: string;
  pillClass: string;
  dotClass: string;
}

export const TOOL_THEMES: Record<GoogleTool, ToolTheme> = {
  'Gemini': {
    label: 'Gemini',
    pillClass: 'bg-tool-gemini-light text-purple-700 border-purple-200',
    dotClass: 'bg-tool-gemini',
  },
  'Google AI Studio': {
    label: 'Google AI Studio',
    pillClass: 'bg-tool-aistudio-light text-blue-700 border-blue-200',
    dotClass: 'bg-tool-aistudio',
  },
  'Firebase': {
    label: 'Firebase',
    pillClass: 'bg-tool-firebase-light text-amber-900 border-amber-200',
    dotClass: 'bg-tool-firebase',
  },
  'Antigravity': {
    label: 'Antigravity',
    pillClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotClass: 'bg-emerald-500',
  },
  'Colab': {
    label: 'Colab',
    pillClass: 'bg-tool-colab-light text-orange-800 border-orange-200',
    dotClass: 'bg-tool-colab',
  },
  'BigQuery': {
    label: 'BigQuery',
    pillClass: 'bg-tool-bigquery-light text-sky-800 border-sky-200',
    dotClass: 'bg-tool-bigquery',
  },
  'Cloud Run': {
    label: 'Cloud Run',
    pillClass: 'bg-tool-cloudrun-light text-blue-800 border-blue-200',
    dotClass: 'bg-tool-cloudrun',
  },
  'Android': {
    label: 'Android',
    pillClass: 'bg-tool-android-light text-green-800 border-green-200',
    dotClass: 'bg-tool-android',
  },
  'Sheets': {
    label: 'Sheets',
    pillClass: 'bg-tool-sheets-light text-emerald-800 border-emerald-200',
    dotClass: 'bg-tool-sheets',
  },
  'Google Docs': {
    label: 'Google Docs',
    pillClass: 'bg-tool-docs-light text-blue-800 border-blue-200',
    dotClass: 'bg-tool-docs',
  },
  'Forms': {
    label: 'Forms',
    pillClass: 'bg-tool-forms-light text-purple-800 border-purple-200',
    dotClass: 'bg-tool-forms',
  },
  'Looker Studio': {
    label: 'Looker Studio',
    pillClass: 'bg-tool-looker-light text-indigo-800 border-indigo-200',
    dotClass: 'bg-tool-looker',
  },
  'Other': {
    label: 'Other',
    pillClass: 'bg-gray-100 text-gray-700 border-gray-200',
    dotClass: 'bg-gray-400',
  },
};
