import type { CommunityName, GoogleTool } from '../types';

export interface CommunityTheme {
  dotClass: string;
  badgeClass: string;
  cardHoverClass: string;
  chipClass: string;
  chipActiveClass: string;
  gradientClass: string;
  buttonClass: string;
}

export const COMMUNITY_THEMES: Record<CommunityName, CommunityTheme> = {
  'Web Development': {
    dotClass: 'bg-track-web',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-200 font-bold',
    cardHoverClass: 'hover:border-track-web hover:shadow-blue-100',
    chipClass: 'bg-blue-100 text-blue-800 hover:bg-blue-200 font-bold',
    chipActiveClass: 'bg-track-web text-white shadow-md shadow-blue-300 font-bold',
    gradientClass: 'from-blue-500 to-indigo-600',
    buttonClass: 'bg-track-web hover:bg-blue-600 text-white shadow-md shadow-blue-200',
  },
  'Data Science / Machine Learning': {
    dotClass: 'bg-track-ml',
    badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-200 font-bold',
    cardHoverClass: 'hover:border-track-ml hover:shadow-emerald-100',
    chipClass: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-bold',
    chipActiveClass: 'bg-track-ml text-white shadow-md shadow-emerald-300 font-bold',
    gradientClass: 'from-emerald-500 to-teal-600',
    buttonClass: 'bg-track-ml hover:bg-emerald-700 text-white shadow-md shadow-emerald-200',
  },
  'Mobile App Development': {
    dotClass: 'bg-track-mobile',
    badgeClass: 'bg-amber-100 text-amber-950 border-amber-200 font-bold',
    cardHoverClass: 'hover:border-track-mobile hover:shadow-amber-100',
    chipClass: 'bg-amber-100 text-amber-900 hover:bg-amber-200 font-bold',
    chipActiveClass: 'bg-track-mobile text-white shadow-md shadow-amber-300 font-bold',
    gradientClass: 'from-amber-400 to-orange-500',
    buttonClass: 'bg-track-mobile hover:bg-amber-600 text-white shadow-md shadow-amber-200',
  },
  'Cybersecurity': {
    dotClass: 'bg-track-cyber',
    badgeClass: 'bg-rose-100 text-rose-950 border-rose-200 font-bold',
    cardHoverClass: 'hover:border-track-cyber hover:shadow-red-100',
    chipClass: 'bg-rose-100 text-rose-900 hover:bg-rose-200 font-bold',
    chipActiveClass: 'bg-track-cyber text-white shadow-md shadow-red-300 font-bold',
    gradientClass: 'from-red-500 to-rose-600',
    buttonClass: 'bg-track-cyber hover:bg-red-700 text-white shadow-md shadow-red-200',
  },
  'Design': {
    dotClass: 'bg-track-design',
    badgeClass: 'bg-pink-100 text-pink-950 border-pink-200 font-bold',
    cardHoverClass: 'hover:border-track-design hover:shadow-pink-100',
    chipClass: 'bg-pink-100 text-pink-900 hover:bg-pink-200 font-bold',
    chipActiveClass: 'bg-track-design text-white shadow-md shadow-pink-300 font-bold',
    gradientClass: 'from-pink-500 to-rose-500',
    buttonClass: 'bg-track-design hover:bg-pink-600 text-white shadow-md shadow-pink-200',
  },
  'Game Development': {
    dotClass: 'bg-track-game',
    badgeClass: 'bg-purple-100 text-purple-950 border-purple-200 font-bold',
    cardHoverClass: 'hover:border-track-game hover:shadow-purple-100',
    chipClass: 'bg-purple-100 text-purple-900 hover:bg-purple-200 font-bold',
    chipActiveClass: 'bg-track-game text-white shadow-md shadow-purple-300 font-bold',
    gradientClass: 'from-purple-500 to-violet-600',
    buttonClass: 'bg-track-game hover:bg-purple-700 text-white shadow-md shadow-purple-200',
  },
  'Product Management': {
    dotClass: 'bg-track-pm',
    badgeClass: 'bg-teal-100 text-teal-950 border-teal-200 font-bold',
    cardHoverClass: 'hover:border-track-pm hover:shadow-teal-100',
    chipClass: 'bg-teal-100 text-teal-900 hover:bg-teal-200 font-bold',
    chipActiveClass: 'bg-track-pm text-white shadow-md shadow-teal-300 font-bold',
    gradientClass: 'from-teal-500 to-emerald-600',
    buttonClass: 'bg-track-pm hover:bg-teal-700 text-white shadow-md shadow-teal-200',
  },
  'Research': {
    dotClass: 'bg-track-research',
    badgeClass: 'bg-cyan-100 text-cyan-950 border-cyan-200 font-bold',
    cardHoverClass: 'hover:border-track-research hover:shadow-cyan-100',
    chipClass: 'bg-cyan-100 text-cyan-900 hover:bg-cyan-200 font-bold',
    chipActiveClass: 'bg-track-research text-white shadow-md shadow-cyan-300 font-bold',
    gradientClass: 'from-cyan-500 to-blue-600',
    buttonClass: 'bg-track-research hover:bg-cyan-700 text-white shadow-md shadow-cyan-200',
  },
  'Quantum Computing': {
    dotClass: 'bg-track-quantum',
    badgeClass: 'bg-indigo-100 text-indigo-950 border-indigo-200 font-bold',
    cardHoverClass: 'hover:border-track-quantum hover:shadow-indigo-100',
    chipClass: 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200 font-bold',
    chipActiveClass: 'bg-track-quantum text-white shadow-md shadow-indigo-300 font-bold',
    gradientClass: 'from-indigo-500 to-purple-600',
    buttonClass: 'bg-track-quantum hover:bg-indigo-700 text-white shadow-md shadow-indigo-200',
  },
};

export interface ToolTheme {
  label: string;
  pillClass: string;
  activeClass: string;
  dotClass: string;
}

export const TOOL_THEMES: Record<GoogleTool, ToolTheme> = {
  'Gemini': {
    label: 'Gemini',
    pillClass: 'bg-purple-100 text-purple-900 hover:bg-purple-200 font-bold',
    activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-200 font-bold',
    dotClass: 'bg-tool-gemini',
  },
  'Google AI Studio': {
    label: 'Google AI Studio',
    pillClass: 'bg-blue-100 text-blue-900 hover:bg-blue-200 font-bold',
    activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-200 font-bold',
    dotClass: 'bg-tool-aistudio',
  },
  'Firebase': {
    label: 'Firebase',
    pillClass: 'bg-amber-100 text-amber-950 hover:bg-amber-200 font-bold',
    activeClass: 'bg-amber-500 text-white shadow-md shadow-amber-200 font-bold',
    dotClass: 'bg-tool-firebase',
  },
  'Antigravity': {
    label: 'Antigravity',
    pillClass: 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200 font-bold',
    activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-200 font-bold',
    dotClass: 'bg-emerald-500',
  },
  'Colab': {
    label: 'Colab',
    pillClass: 'bg-orange-100 text-orange-950 hover:bg-orange-200 font-bold',
    activeClass: 'bg-orange-600 text-white shadow-md shadow-orange-200 font-bold',
    dotClass: 'bg-tool-colab',
  },
  'BigQuery': {
    label: 'BigQuery',
    pillClass: 'bg-sky-100 text-sky-950 hover:bg-sky-200 font-bold',
    activeClass: 'bg-sky-600 text-white shadow-md shadow-sky-200 font-bold',
    dotClass: 'bg-tool-bigquery',
  },
  'Cloud Run': {
    label: 'Cloud Run',
    pillClass: 'bg-blue-100 text-blue-900 hover:bg-blue-200 font-bold',
    activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-200 font-bold',
    dotClass: 'bg-tool-cloudrun',
  },
  'Android': {
    label: 'Android',
    pillClass: 'bg-green-100 text-green-950 hover:bg-green-200 font-bold',
    activeClass: 'bg-green-600 text-white shadow-md shadow-green-200 font-bold',
    dotClass: 'bg-tool-android',
  },
  'Sheets': {
    label: 'Sheets',
    pillClass: 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200 font-bold',
    activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-200 font-bold',
    dotClass: 'bg-tool-sheets',
  },
  'Google Docs': {
    label: 'Google Docs',
    pillClass: 'bg-blue-100 text-blue-900 hover:bg-blue-200 font-bold',
    activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-200 font-bold',
    dotClass: 'bg-tool-docs',
  },
  'Forms': {
    label: 'Forms',
    pillClass: 'bg-purple-100 text-purple-950 hover:bg-purple-200 font-bold',
    activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-200 font-bold',
    dotClass: 'bg-tool-forms',
  },
  'Looker Studio': {
    label: 'Looker Studio',
    pillClass: 'bg-indigo-100 text-indigo-950 hover:bg-indigo-200 font-bold',
    activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-bold',
    dotClass: 'bg-tool-looker',
  },
  'Other': {
    label: 'Other',
    pillClass: 'bg-gray-200 text-gray-800 hover:bg-gray-300 font-bold',
    activeClass: 'bg-gray-700 text-white shadow-md font-bold',
    dotClass: 'bg-gray-400',
  },
};
