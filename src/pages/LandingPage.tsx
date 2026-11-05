import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project } from '../types';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  Trophy,
  Code2,
  Flame,
  Globe,
  Cpu,
  Smartphone,
  ShieldCheck,
  Palette,
  Gamepad2,
  Briefcase,
  GraduationCap,
  Atom
} from 'lucide-react';

const COMMUNITY_ICONS: Record<string, React.ReactNode> = {
  'Web Development': <Globe className="w-5 h-5 text-[#4285F4]" />,
  'Data Science / Machine Learning': <Cpu className="w-5 h-5 text-[#188038]" />,
  'Mobile App Development': <Smartphone className="w-5 h-5 text-[#FBBC04]" />,
  'Cybersecurity': <ShieldCheck className="w-5 h-5 text-[#EA4335]" />,
  'Design': <Palette className="w-5 h-5 text-purple-600" />,
  'Game Development': <Gamepad2 className="w-5 h-5 text-indigo-600" />,
  'Product Management': <Briefcase className="w-5 h-5 text-emerald-600" />,
  'Research': <GraduationCap className="w-5 h-5 text-rose-600" />,
  'Quantum Computing': <Atom className="w-5 h-5 text-cyan-600" />
};

export const LandingPage: React.FC = () => {
  const { projects, communities, votes } = useApp();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const totalBuilders = new Set(projects.map(p => p.submitterEmail.toLowerCase())).size;
  const recentProjects = [...projects].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-radial from-green-50/70 via-white to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-green-100/80 border border-green-200 text-[#188038] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#188038]" />
              <span>GDG on Campus OAU • Builder Jam '26</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]"
            >
              Where Great Campus <br className="hidden sm:inline" />
              <span className="text-[#188038]">Ideas Become Reality</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Welcome to the official showcase of the GDG OAU Builder Jam. Explore cutting-edge solutions built by our student developers, vote for your favorites, and track the live leaderboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <Link
                to="/submit"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#188038] hover:bg-[#137333] text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-sm sm:text-base group"
              >
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Submit Your Project</span>
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3.5 rounded-xl font-semibold shadow-2xs transition-all text-sm sm:text-base"
              >
                <span>Browse Gallery</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </Link>
              <Link
                to="/leaderboard"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-yellow-50 hover:bg-yellow-100 text-[#B06000] border border-yellow-200 px-5 py-3.5 rounded-xl font-semibold transition-all text-sm sm:text-base"
              >
                <Trophy className="w-4 h-4 text-[#FBBC04]" />
                <span>Leaderboard</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10"
            >
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#188038]">{projects.length}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Projects Built</p>
              </div>
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#4285F4]">{totalBuilders}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Active Builders</p>
              </div>
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#FBBC04]">{communities.length}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Tracks</p>
              </div>
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#EA4335]">{votes.length}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Community Votes</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#188038] mb-1">
              <Code2 className="w-4 h-4" />
              <span>Participating Communities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              9 Tracks, Infinite Possibilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Builders from all GDG on Campus OAU focus areas are collaborating and building with Google technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((comm) => {
            const count = projects.filter(p => p.community === comm.name).length;
            const icon = COMMUNITY_ICONS[comm.name] || <Globe className="w-5 h-5 text-gray-600" />;
            return (
              <Link
                key={comm.name}
                to={`/gallery?community=${encodeURIComponent(comm.name)}`}
                className="group bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-2xs hover:shadow-md transition-all flex items-start space-x-4"
              >
                <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-green-50 transition-colors">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#188038] transition-colors truncate">
                      {comm.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 group-hover:bg-green-100 group-hover:text-[#188038] px-2 py-0.5 rounded-full transition-colors shrink-0 ml-2">
                      {count} {count === 1 ? 'build' : 'builds'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {comm.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-100/70 border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              How Builder Jam Works
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Three simple steps to showcase your solution and climb the individual and community rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#4285F4] font-black text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Build with Google Tools</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use Gemini, Antigravity, Firebase, Android, Google AI Studio, or other Google technologies to solve a real student or community problem.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-[#188038] font-black text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Submit Your Project</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Provide your GitHub repository link, a project screenshot, selected Google tools, and an optional live demo to boost completeness points.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-[#FBBC04] font-black text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Vote & Top the Board</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Share your direct project link with campus peers. Vote daily for top solutions and help your track community win the Jam!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#188038] mb-1">
              <Flame className="w-4 h-4 text-[#EA4335]" />
              <span>Fresh Submissions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Recently Added Projects
            </h2>
          </div>
          <Link
            to="/gallery"
            className="flex items-center space-x-1 text-sm font-semibold text-[#188038] hover:underline"
          >
            <span>View All ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
