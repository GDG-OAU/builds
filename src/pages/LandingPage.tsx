import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import type { CommunityName } from '../types';
import { Rocket, ArrowUpRight, ExternalLink, Users } from 'lucide-react';
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
    name: 'Web Development',
    label: 'Web Development',
    bgClass: 'bg-[#4285F4]',
    textClass: 'text-white font-extrabold',
    rotateClass: '-rotate-2',
    shadowClass: 'shadow-md shadow-blue-200',
    colorHex: '#4285F4',
  },
  {
    name: 'Data Science / Machine Learning',
    label: 'Data Science & ML',
    bgClass: 'bg-[#38BDF8]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: '-rotate-3',
    shadowClass: 'shadow-md shadow-sky-100',
    colorHex: '#38BDF8',
  },
  {
    name: 'Mobile App Development',
    label: 'Mobile App Dev',
    bgClass: 'bg-[#4ADE80]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: 'rotate-2',
    shadowClass: 'shadow-md shadow-emerald-100',
    colorHex: '#4ADE80',
  },
  {
    name: 'Cybersecurity',
    label: 'Cybersecurity',
    bgClass: 'bg-[#F87171]',
    textClass: 'text-white font-extrabold',
    rotateClass: '-rotate-2',
    shadowClass: 'shadow-md shadow-red-200',
    colorHex: '#F87171',
  },
  {
    name: 'Quantitative Finance',
    label: 'Quantitative Finance',
    bgClass: 'bg-[#F472B6]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: 'rotate-3',
    shadowClass: 'shadow-md shadow-pink-100',
    colorHex: '#F472B6',
  },
  {
    name: 'Game Development',
    label: 'Game Development',
    bgClass: 'bg-[#FDE047]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: 'rotate-4',
    shadowClass: 'shadow-md shadow-yellow-100',
    colorHex: '#FDE047',
  },
  {
    name: 'Cloud Computing',
    label: 'Cloud Computing',
    bgClass: 'bg-[#60A5FA]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: 'rotate-1',
    shadowClass: 'shadow-md shadow-blue-100',
    colorHex: '#60A5FA',
  },
  {
    name: 'Design',
    label: 'Design',
    bgClass: 'bg-[#FB7185]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: '-rotate-4',
    shadowClass: 'shadow-md shadow-rose-100',
    colorHex: '#FB7185',
  },
  {
    name: 'Research',
    label: 'Research',
    bgClass: 'bg-[#C084FC]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: 'rotate-3',
    shadowClass: 'shadow-md shadow-purple-100',
    colorHex: '#C084FC',
  },
  {
    name: 'Product Management',
    label: 'Product Management',
    bgClass: 'bg-[#2DD4BF]',
    textClass: 'text-gray-950 font-extrabold',
    rotateClass: '-rotate-2',
    shadowClass: 'shadow-md shadow-teal-100',
    colorHex: '#2DD4BF',
  },
  {
    name: 'Quantum Computing',
    label: 'Quantum Computing',
    bgClass: 'bg-[#818CF8]',
    textClass: 'text-white font-extrabold',
    rotateClass: 'rotate-2',
    shadowClass: 'shadow-md shadow-indigo-100',
    colorHex: '#818CF8',
  },
];

export const LandingPage: React.FC = () => {
  const { projects, communities } = useApp();
  const navigate = useNavigate();

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
            Eleven communities. Real AI. Real builds.
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

          {/* Pill CTA Buttons - SLEEK & POLISHED MATCHING INSPO */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14"
          >
            <Link
              to="/gallery"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 transition-all hover:scale-105"
            >
              Explore Projects
            </Link>
            <Link
              to="/submit"
              style={{ backgroundColor: '#188038' }}
              className="bg-gdg-green hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md shadow-green-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all hover:scale-105"
            >
              Submit Project
            </Link>
            <Link
              to="/leaderboard"
              style={{ backgroundColor: '#FEF3C7', color: '#78350F' }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-950 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-xs"
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

      {/* ── TRACKS EXPLORER GRID (11 OFFICIAL GDG OAU TRACKS) ── */}
      <section className="bg-gradient-to-b from-gray-50/60 to-white border-t border-gray-100 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gdg-blue bg-gdg-blue-light px-3.5 py-1.5 rounded-full border border-blue-200">
              <Users className="w-3.5 h-3.5" />
              <span>11 Specialized Tracks</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mt-3">
              Explore by Community Track
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
              Discover what each community is building, inspect repositories, and join the GDG OAU network.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((comm) => {
              const theme = COMMUNITY_THEMES[comm.name] || COMMUNITY_THEMES['Web Development'];
              const count = projects.filter((p) => p.community === comm.name).length;
              return (
                <div
                  key={comm.name}
                  className="rounded-3xl p-6 border border-gray-200/90 bg-white hover:border-gray-300 transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${theme.badgeClass}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${theme.dotClass}`} />
                        {comm.name}
                      </span>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        {count} {count === 1 ? 'build' : 'builds'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mb-6">
                      {comm.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs font-bold">
                    {comm.joinUrl ? (
                      <a
                        href={comm.joinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
                      >
                        <span>Join community</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={() => navigate(`/gallery?community=${encodeURIComponent(comm.name)}`)}
                      className="inline-flex items-center gap-1 text-gdg-blue hover:text-blue-700 transition-colors font-bold"
                    >
                      <span>Explore builds</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gdg-green/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gdg-blue/20 rounded-full blur-3xl pointer-events-none" />

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
                style={{ backgroundColor: '#188038', color: '#FFFFFF' }}
                className="bg-gdg-green hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-green-900/50 transition-all hover:scale-105"
              >
                Submit Project Now
              </Link>
              <Link
                to="/leaderboard"
                style={{ backgroundColor: '#FBBC04', color: '#111827' }}
                className="bg-gdg-yellow hover:bg-yellow-400 text-gray-900 font-extrabold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-yellow-900/50 transition-all hover:scale-105"
              >
                View Standings
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
