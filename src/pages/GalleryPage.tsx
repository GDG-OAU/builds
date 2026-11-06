import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project, CommunityName, GoogleTool } from '../types';
import { Search, X, Plus, Rocket } from 'lucide-react';
import { COMMUNITY_THEMES } from '../utils/theme';
import { getVotesCountForProject } from '../services/appState';

const ALL_COMMUNITIES: CommunityName[] = [
  'Web Development',
  'Game Development',
  'Research',
  'Product Management',
  'Mobile App Development',
  'Data Science / Machine Learning',
  'Design',
  'Quantum Computing',
  'Cybersecurity',
  'Quantitative Finance',
  'Cloud Computing',
];

const ALL_TOOLS: GoogleTool[] = [
  'Google AI Studio',
  'Gemini',
  'Antigravity',
  'Colab',
  'Looker Studio',
  'Firebase',
  'BigQuery',
  'Cloud Run',
  'Google Docs',
  'Forms',
  'Sheets',
  'Android',
  'Other',
];

type SortMode = 'newest' | 'votes';

export const GalleryPage: React.FC = () => {
  const { projects, votes } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [community, setCommunity] = useState<string>(searchParams.get('community') || 'ALL');
  const [tool, setTool] = useState<string>('ALL');
  const [sort, setSort] = useState<SortMode>('newest');
  const [modal, setModal] = useState<Project | null>(null);

  useEffect(() => {
    const c = searchParams.get('community');
    if (c) setCommunity(c);
    const pId = searchParams.get('project');
    if (pId) {
      const found = projects.find((p) => p.id === pId);
      if (found) setModal(found);
    }
  }, [searchParams, projects]);

  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        const q = query.toLowerCase().trim();
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.builderName.toLowerCase().includes(q);
        const matchesCommunity = community === 'ALL' || p.community === community;
        const matchesTool = tool === 'ALL' || p.googleTools.includes(tool as GoogleTool);
        return matchesQuery && matchesCommunity && matchesTool;
      })
      .sort((a, b) => {
        if (sort === 'votes') {
          const vA = getVotesCountForProject(a.id, votes);
          const vB = getVotesCountForProject(b.id, votes);
          if (vB !== vA) return vB - vA;
        }
        return b.createdAt - a.createdAt;
      });
  }, [projects, votes, query, community, tool, sort]);

  const handleSelectCommunity = (commName: string) => {
    setCommunity(commName);
    if (commName === 'ALL') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('community');
      setSearchParams(newParams);
    } else {
      setSearchParams({ community: commName });
    }
  };

  const handleResetFilters = () => {
    setQuery('');
    setCommunity('ALL');
    setTool('ALL');
    setSearchParams({});
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Vibrant GDG Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Project Showcase
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl font-medium">
              Explore and vote for real-world software, AI prototypes, and applications built by developers across Obafemi Awolowo University.
            </p>
          </div>

          <Link
            to="/submit"
            style={{ backgroundColor: '#188038', color: '#FFFFFF' }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold bg-gdg-green hover:bg-emerald-700 text-white transition-all shadow-md shadow-green-200 hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Build</span>
          </Link>
        </div>

        {/* Filter Toolbar: Search, Tools, Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gdg-blue absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project title, description, or builder..."
              className="w-full pl-10 pr-9 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gdg-blue focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tool Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:border-gdg-blue focus:ring-2 focus:ring-blue-100 transition-all shadow-xs cursor-pointer"
            >
              <option value="ALL">All Google Tools ({ALL_TOOLS.length})</option>
              {ALL_TOOLS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:border-gdg-blue focus:ring-2 focus:ring-blue-100 transition-all shadow-xs cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="votes">Sort: Most Upvoted</option>
            </select>

            {(query || community !== 'ALL' || tool !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                style={{ backgroundColor: '#EA4335', color: '#FFFFFF' }}
                className="text-xs font-bold text-white bg-gdg-red hover:bg-red-700 px-4 py-3 rounded-2xl transition-all shadow-xs whitespace-nowrap cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Vibrant Community Track Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {/* All Tracks */}
          <button
            onClick={() => handleSelectCommunity('ALL')}
            style={
              community === 'ALL'
                ? { backgroundColor: '#4285F4', color: '#FFFFFF' }
                : { backgroundColor: '#F3F4F6', color: '#374151' }
            }
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${community === 'ALL'
                ? 'shadow-sm scale-102 font-extrabold'
                : 'hover:bg-gray-200'
              }`}
          >
            <span>All Tracks</span>
            <span
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${community === 'ALL'
                  ? 'bg-white/25 text-white font-bold'
                  : 'bg-gray-200 text-gray-700'
                }`}
            >
              {projects.length}
            </span>
          </button>

          {/* 11 Communities - Each with its authentic signature vibrant brand color! */}
          {ALL_COMMUNITIES.map((c) => {
            const count = projects.filter((p) => p.community === c).length;
            const active = community === c;
            const theme = COMMUNITY_THEMES[c] || {
              color: '#4285F4',
              bgLight: '#E8F0FE',
              textDark: '#1E40AF',
            };

            return (
              <button
                key={c}
                onClick={() => handleSelectCommunity(c)}
                style={
                  active
                    ? {
                      backgroundColor: theme.color,
                      color: '#FFFFFF',
                    }
                    : {
                      backgroundColor: theme.bgLight,
                      color: theme.textDark,
                    }
                }
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${active
                    ? 'shadow-sm scale-102 font-extrabold'
                    : 'hover:opacity-90'
                  }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: active ? '#FFFFFF' : theme.color,
                  }}
                />
                <span>{c}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${active
                      ? 'bg-white/30 text-white font-bold'
                      : 'bg-white/80 text-gray-800'
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-6 px-1">
          <span className="bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full font-bold">
            Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}{' '}
            {community !== 'ALL' && `in ${community}`}
          </span>
          <span className="font-mono text-gray-400">
            {sort === 'votes' ? 'Ranked by highest community votes' : 'Sorted by newest submission'}
          </span>
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpenDetails={(project) => setModal(project)}
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* Empty State: Fresh Event Launch */
          <div className="bg-white border border-gray-200 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-gdg-green">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">
              Submissions Are Live!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed font-medium">
              Submissions are officially open across all 11 GDG OAU communities. Be the very first builder on campus to showcase your project!
            </p>
            <Link
              to="/submit"
              style={{ backgroundColor: '#188038', color: '#FFFFFF' }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gdg-green hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md shadow-green-200 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Submit First Project</span>
            </Link>
          </div>
        ) : (
          /* Empty State: Filter Returned No Match */
          <div className="bg-white border border-gray-200 rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-1.5">
              No builds found
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-5 leading-relaxed font-medium">
              No projects match your current search or community filters. Try clearing your filters or searching for something else.
            </p>
            <button
              onClick={handleResetFilters}
              style={{ backgroundColor: '#4285F4', color: '#FFFFFF' }}
              className="px-6 py-2.5 bg-gdg-blue hover:bg-blue-600 text-white text-xs font-bold rounded-full transition-all shadow-md shadow-blue-200 hover:scale-105 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {modal && (
        <ProjectDetailModal
          project={modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};
