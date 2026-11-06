import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project, CommunityName, GoogleTool } from '../types';
import { Search, X, Plus, Terminal, ArrowUpDown } from 'lucide-react';
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
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Developer Directory Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GDG OAU · BUILDER JAM 2026</span>
              <span className="text-slate-300">/</span>
              <span>SHOWCASE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Projects Directory
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Software, AI applications, and systems shipped by OAU builders across 11 technical tracks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
              <span className="font-bold text-slate-900">{projects.length}</span> builds
              <span className="text-slate-300">·</span>
              <span className="font-bold text-slate-900">{ALL_COMMUNITIES.length}</span> tracks
            </div>

            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-950 hover:bg-slate-800 text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Submit Build</span>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar: Search, Tools, Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, description, or builder name..."
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all shadow-2xs font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
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
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-900 transition-all shadow-2xs cursor-pointer"
            >
              <option value="ALL">All Google Tools ({ALL_TOOLS.length})</option>
              {ALL_TOOLS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-900 transition-all shadow-2xs cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="votes">Sort: Most Upvoted</option>
              </select>
            </div>

            {(query || community !== 'ALL' || tool !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Track Filter Segmented Control Bar */}
        <div className="bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/90 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* All Tracks */}
            <button
              onClick={() => handleSelectCommunity('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                community === 'ALL'
                  ? 'bg-slate-950 text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs'
              }`}
            >
              <span>All Tracks</span>
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  community === 'ALL'
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {projects.length}
              </span>
            </button>

            {/* Individual Tracks */}
            {ALL_COMMUNITIES.map((c) => {
              const count = projects.filter((p) => p.community === c).length;
              const active = community === c;
              const theme = COMMUNITY_THEMES[c] || {
                color: '#188038',
              };

              return (
                <button
                  key={c}
                  onClick={() => handleSelectCommunity(c)}
                  style={
                    active
                      ? { backgroundColor: '#0F172A', color: '#FFFFFF' }
                      : undefined
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span>{c}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      active
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Results Header */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-5">
          <span>
            {filtered.length === 1 ? '1 PROJECT' : `${filtered.length} PROJECTS`}{' '}
            {community !== 'ALL' && `IN ${community.toUpperCase()}`}
          </span>
          <span>ORDERED BY {sort === 'votes' ? 'VOTES' : 'RECENCY'}</span>
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpenDetails={(project) => setModal(project)}
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* Empty State: Pre-Launch / Zero Submissions */
          <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-16 text-center max-w-xl mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-600">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              No builds submitted yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              Submissions are officially open for all 11 GDG OAU communities. Be the very first builder on campus to showcase your project.
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Submit First Project</span>
            </Link>
          </div>
        ) : (
          /* Empty State: Filter Returned No Match */
          <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-14 text-center max-w-xl mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-600">
              <ArrowUpDown className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              No builds match current filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
              No projects found for the selected track or tool criteria. Try broadening your query.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
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
