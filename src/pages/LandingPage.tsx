import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project, CommunityName } from '../types';
import { ArrowRight, Sparkles, Trophy, Code2, Layers } from 'lucide-react';

interface FloatingPill {
  name: CommunityName;
  label: string;
  bg: string;
  text: string;
  rotate: string;
  shadow?: string;
}

const FLOATING_PILLS: FloatingPill[] = [
  {
    name: 'Data Science / Machine Learning',
    label: 'Data Science & ML',
    bg: 'bg-[#38BDF8]',
    text: 'text-white',
    rotate: '-rotate-3',
  },
  {
    name: 'Mobile App Development',
    label: 'Mobile & Web Dev',
    bg: 'bg-[#22C55E]',
    text: 'text-white',
    rotate: 'rotate-2',
  },
  {
    name: 'Cybersecurity',
    label: 'Cybersecurity',
    bg: 'bg-white',
    text: 'text-gray-900',
    rotate: '-rotate-2',
    shadow: 'shadow-md border border-gray-100',
  },
  {
    name: 'Game Development',
    label: 'Game Development',
    bg: 'bg-[#FACC15]',
    text: 'text-gray-900',
    rotate: 'rotate-4',
  },
  {
    name: 'Web Development',
    label: 'Cloud & Web',
    bg: 'bg-white',
    text: 'text-gray-900',
    rotate: 'rotate-1',
    shadow: 'shadow-md border border-gray-100',
  },
  {
    name: 'Design',
    label: 'Design & UX',
    bg: 'bg-[#EC4899]',
    text: 'text-white',
    rotate: '-rotate-4',
  },
  {
    name: 'Research',
    label: 'Research & AI',
    bg: 'bg-[#818CF8]',
    text: 'text-white',
    rotate: 'rotate-3',
  },
  {
    name: 'Product Management',
    label: 'Product Management',
    bg: 'bg-[#34D399]',
    text: 'text-gray-900',
    rotate: '-rotate-2',
  },
  {
    name: 'Quantum Computing',
    label: 'Quantum Computing',
    bg: 'bg-[#F472B6]',
    text: 'text-white',
    rotate: 'rotate-2',
  },
];

export const LandingPage: React.FC = () => {
  const { projects, communities, votes } = useApp();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const navigate = useNavigate();

  const totalBuilders = new Set(projects.map((p) => p.submitterEmail.toLowerCase())).size;
  const recentProjects = [...projects].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);

  return (
    <div className="bg-white">

      {/* ── HERO SECTION WITH INSPIRATION GRAPH GRID & CORNER BLOBS ── */}
      <section className="relative inspo-grid overflow-hidden border-b border-gray-100 pt-16 pb-20 sm:pt-24 sm:pb-28">
        
        {/* Soft pastel organic corner blobs exactly like inspo */}
        <div className="absolute top-0 left-0 w-48 sm:w-80 h-32 sm:h-52 bg-[#FEE2E2] opacity-80 rounded-br-[120px] pointer-events-none blur-2xs" />
        <div className="absolute bottom-0 left-0 w-40 sm:w-72 h-28 sm:h-48 bg-[#DCFCE7] opacity-80 rounded-tr-[120px] pointer-events-none blur-2xs" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-80 h-36 sm:h-60 bg-[#FCE7F3] opacity-80 rounded-tl-[140px] pointer-events-none blur-2xs" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Subtitle / Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-gray-500 uppercase">
              GDG OAU × Builder Jam 2026
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.08] text-balance mb-4"
          >
            Builder Jam Gallery
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-base sm:text-xl font-medium text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            One day. Nine communities. Real AI. Real builds.
          </motion.p>

          {/* Location & Context */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xs sm:text-sm text-gray-400 mt-1 mb-8 font-medium"
          >
            Main Showcase · Obafemi Awolowo University
          </motion.p>

          {/* Pill CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14"
          >
            <Link
              to="/gallery"
              className="bg-black text-white hover:bg-gray-800 px-7 py-3 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Projects
            </Link>
            <Link
              to="/submit"
              className="bg-black text-white hover:bg-gray-800 px-7 py-3 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Submit Project
            </Link>
            <Link
              to="/leaderboard"
              className="bg-white text-gray-800 border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-full text-sm font-semibold shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5"
            >
              Leaderboards
            </Link>
          </motion.div>

          {/* ── FLOATING COLORFUL COMMUNITY BADGES (SIGNATURE INSPIRATION) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2 pb-6"
          >
            {FLOATING_PILLS.map((pill, idx) => (
              <motion.button
                key={pill.name}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  y: [0, idx % 2 === 0 ? -4 : 4, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 3 + (idx % 3),
                    ease: 'easeInOut',
                  },
                }}
                onClick={() => navigate(`/gallery?community=${encodeURIComponent(pill.name)}`)}
                className={`cursor-pointer px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all transform ${pill.rotate} ${pill.bg} ${pill.text} ${pill.shadow || 'shadow-sm'} hover:shadow-lg`}
              >
                {pill.label}
              </motion.button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── KEY METRICS STRIP ── */}
      <section className="border-b border-gray-100 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="stat-number text-3xl sm:text-4xl font-extrabold text-[#4285F4]">
                {projects.length}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Projects Built
              </p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-3xl sm:text-4xl font-extrabold text-[#188038]">
                {totalBuilders}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Active Builders
              </p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-3xl sm:text-4xl font-extrabold text-[#FBBC04]">
                {communities.length}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tracks Competing
              </p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-3xl sm:text-4xl font-extrabold text-[#EA4335]">
                {votes.length}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Community Votes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENT PROJECTS SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-[#188038] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Builder Jam Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Featured Submissions
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Explore the latest student projects built using Google AI Studio, Gemini, Firebase, Android, and Cloud.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#188038] hover:text-[#137333] transition-colors group"
          >
            <span>View all {projects.length} projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpenDetails={(project) => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* ── HOW SCORING & THE JAM WORKS ── */}
      <section className="bg-gray-50/70 border-t border-b border-gray-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              How Builder Jam Works
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Build your idea, submit with a GitHub repository and live demo, and climb the individual and track leaderboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4285F4] flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">1. Build with Google Tools</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Utilize Gemini, AI Studio, Antigravity, Firebase, or Colab. Using 2+ Google tools boosts your completeness score!
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 text-[#FBBC04] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">2. Represent Your Track</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every project submitted contributes points toward your community track’s overall standing in the Builder Jam cup.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-[#188038] flex items-center justify-center mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">3. Vote & Win</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Attendees vote on their favorite submissions (up to 10 votes/day). Standings update live until voting closes!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="bg-black text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#188038]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to submit your build?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Show what you created at the Builder Jam. Add your GitHub link, live demo, and tell the community what you built.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                to="/submit"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-7 py-3 rounded-full text-sm shadow-sm transition-all"
              >
                Submit Project Now
              </Link>
              <Link
                to="/leaderboard"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all border border-white/20"
              >
                View Standings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
};
