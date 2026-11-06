import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project, CommunityName } from '../types';
import { ArrowRight, Sparkles, Rocket, ArrowUpRight } from 'lucide-react';
import { COMMUNITY_THEMES, TOOL_THEMES } from '../utils/theme';

interface FloatingPill {
  name: CommunityName;
  label: string;
  bgClass: string;
  textClass: string;
  rotateClass: string;
  shadowClass?: string;
  colorHex: string;
}

const FLOATING_PILLS: FloatingPill[] = [
  {
    name: 'Data Science / Machine Learning',
    label: 'Data Science & ML',
    bgClass: 'bg-[#38BDF8]',
    textClass: 'text-gray-950 font-bold',
    rotateClass: '-rotate-3',
    shadowClass: 'shadow-md shadow-sky-100',
    colorHex: '#38BDF8',
  },
  {
    name: 'Mobile App Development',
    label: 'Mobile & Web Dev',
    bgClass: 'bg-[#4ADE80]',
    textClass: 'text-gray-950 font-bold',
    rotateClass: 'rotate-2',
    shadowClass: 'shadow-md shadow-emerald-100',
    colorHex: '#4ADE80',
  },
  {
    name: 'Cybersecurity',
    label: 'Cybersecurity',
    bgClass: 'bg-white',
    textClass: 'text-gray-800 font-bold',
    rotateClass: '-rotate-2',
    shadowClass: 'shadow-md shadow-gray-200/60 border border-gray-100',
    colorHex: '#FFFFFF',
  },
  {
    name: 'Game Development',
    label: 'Game Development',
    bgClass: 'bg-[#FDE047]',
    textClass: 'text-gray-950 font-bold',
    rotateClass: 'rotate-4',
    shadowClass: 'shadow-md shadow-yellow-100',
    colorHex: '#FDE047',
  },
  {
    name: 'Web Development',
    label: 'Cloud & Web',
    bgClass: 'bg-white',
    textClass: 'text-gray-800 font-bold',
    rotateClass: 'rotate-1',
    shadowClass: 'shadow-md shadow-gray-200/60 border border-gray-100',
    colorHex: '#FFFFFF',
  },
  {
    name: 'Design',
    label: 'Design & UX',
    bgClass: 'bg-[#F472B6]',
    textClass: 'text-gray-950 font-bold',
    rotateClass: '-rotate-4',
    shadowClass: 'shadow-md shadow-pink-100',
    colorHex: '#F472B6',
  },
  {
    name: 'Research',
    label: 'Research & AI',
    bgClass: 'bg-[#C084FC]',
    textClass: 'text-gray-950 font-bold',
    rotateClass: 'rotate-3',
    shadowClass: 'shadow-md shadow-purple-100',
    colorHex: '#C084FC',
  },
  {
    name: 'Product Management',
    label: 'Product Management',
    bgClass: 'bg-white',
    textClass: 'text-gray-800 font-bold',
    rotateClass: '-rotate-2',
    shadowClass: 'shadow-md shadow-gray-200/60 border border-gray-100',
    colorHex: '#FFFFFF',
  },
  {
    name: 'Quantum Computing',
    label: 'Quantum Computing',
    bgClass: 'bg-[#818CF8]',
    textClass: 'text-white font-bold',
    rotateClass: 'rotate-2',
    shadowClass: 'shadow-md shadow-indigo-100',
    colorHex: '#818CF8',
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

      {/* ── HERO SECTION WITH GRAPH PAPER GRID & COLORFUL PASTEL CORNER BLOBS ── */}
      <section className="relative inspo-grid overflow-hidden border-b border-gray-100 pt-16 pb-20 sm:pt-24 sm:pb-28">
        
        {/* Soft pastel corner blobs */}
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-40 sm:h-64 bg-gradient-to-br from-gdg-red-light to-track-design-light rounded-br-[160px] pointer-events-none blur-xs opacity-75" />
        <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-36 sm:h-56 bg-gradient-to-tr from-gdg-green-light to-track-pm-light rounded-tr-[160px] pointer-events-none blur-xs opacity-75" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-40 sm:h-64 bg-gradient-to-tl from-gdg-yellow-light to-track-design-light rounded-tl-[180px] pointer-events-none blur-xs opacity-70" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Subtitle / Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-gdg-green bg-gdg-green-light px-3.5 py-1 rounded-full uppercase border border-green-200">
              GDG on Campus OAU × Builder Jam 2026
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
            className="text-base sm:text-xl font-bold text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            One day. Nine communities. Real AI. Real builds.
          </motion.p>

          {/* Location & Context */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xs sm:text-sm text-gray-400 mt-1 mb-8 font-bold"
          >
            Main Showcase · Obafemi Awolowo University
          </motion.p>

          {/* Pill CTA Buttons - SLEEK & BALANCED */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14"
          >
            <Link
              to="/gallery"
              className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md shadow-gray-900/10 hover:-translate-y-0.5 active:translate-y-0 transition-all hover:scale-105"
            >
              Explore Projects
            </Link>
            <Link
              to="/submit"
              className="bg-gdg-green hover:bg-gdg-green-hover text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md shadow-green-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all hover:scale-105"
            >
              Submit Project
            </Link>
            <Link
              to="/leaderboard"
              className="bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:scale-105 border border-amber-200/60"
            >
              Leaderboards
            </Link>
          </motion.div>

          {/* ── FLOATING COMMUNITY BADGES (BALANCED PASTELS & CRISP WHITE STICKERS) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2 pb-6"
          >
            {FLOATING_PILLS.map((pill, idx) => (
              <motion.button
                key={pill.name}
                style={{ backgroundColor: pill.colorHex }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
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
                className={`cursor-pointer px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all transform ${pill.rotateClass} ${pill.bgClass} ${pill.textClass} ${pill.shadowClass} hover:shadow-lg`}
              >
                {pill.label}
              </motion.button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── CLEAN, ELEVATED METRICS CARDS WITH GDG BRAND ACCENTS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Projects Built
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-gdg-blue" />
            </div>
            <p className="stat-number text-4xl sm:text-5xl font-black text-gdg-blue tracking-tight">
              {projects.length}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Submitted across campus</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Active Builders
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-gdg-green" />
            </div>
            <p className="stat-number text-4xl sm:text-5xl font-black text-gdg-green tracking-tight">
              {totalBuilders}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Students & innovators</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Community Tracks
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-gdg-yellow" />
            </div>
            <p className="stat-number text-4xl sm:text-5xl font-black text-amber-500 tracking-tight">
              {communities.length}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Competing for track cup</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Community Votes
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-gdg-red" />
            </div>
            <p className="stat-number text-4xl sm:text-5xl font-black text-gdg-red tracking-tight">
              {votes.length}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Cast by attendees</p>
          </div>
        </div>
      </section>

      {/* ── GOOGLE TOOLS SPOTLIGHT STRIP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gdg-green bg-gdg-green-light px-4 py-1.5 rounded-full border border-green-200">
            Powered by Google Technologies
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
            Build with Industry-Standard Google Tools
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {Object.entries(TOOL_THEMES).map(([name, theme]) => (
            <div
              key={name}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${theme.pillClass} shadow-xs hover:scale-105 transition-transform cursor-default`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dotClass}`} />
              <span className="text-xs font-extrabold">{theme.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── RECENT PROJECTS SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gdg-green-light border border-green-200 text-gdg-green text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Builder Jam Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Featured Submissions
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl font-medium">
              Real projects built by OAU students using Gemini, Firebase, Android, BigQuery, and Colab.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-gdg-green hover:bg-gdg-green-hover text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-green-200 transition-all group hover:scale-105"
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

      {/* ── TRACKS EXPLORER GRID ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gdg-blue bg-gdg-blue-light px-3.5 py-1.5 rounded-full border border-blue-200">
              9 Specialized Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
              Explore by Community Track
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Find inspiration, inspect GitHub repositories, and vote for the track that built the best solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {communities.map((comm) => {
              const theme = COMMUNITY_THEMES[comm.name] || COMMUNITY_THEMES['Web Development'];
              const count = projects.filter((p) => p.community === comm.name).length;
              return (
                <div
                  key={comm.name}
                  onClick={() => navigate(`/gallery?community=${encodeURIComponent(comm.name)}`)}
                  className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-200 ${theme.cardHoverClass}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border ${theme.badgeClass}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${theme.dotClass}`} />
                      {comm.name}
                    </span>
                    <span className="text-xs font-extrabold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      {count} builds
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 font-medium">
                    {comm.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold text-gray-900 pt-3 border-t border-gray-100">
                    <span className="text-gray-500 font-bold">Explore track projects</span>
                    <ArrowUpRight className="w-4 h-4 text-gdg-green transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gdg-green/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gdg-blue/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-white/20">
              <Rocket className="w-3.5 h-3.5" />
              <span>Builder Jam Cup</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to submit your build?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
              Show what you created at the Builder Jam. Add your GitHub link, live demo, and tell the community what you built.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link
                to="/submit"
                className="bg-gdg-green hover:bg-gdg-green-hover text-white font-extrabold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-green-900/50 transition-all hover:scale-105"
              >
                Submit Project Now
              </Link>
              <Link
                to="/leaderboard"
                className="bg-gdg-yellow hover:bg-gdg-yellow-hover text-gray-900 font-extrabold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-yellow-900/50 transition-all hover:scale-105"
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
