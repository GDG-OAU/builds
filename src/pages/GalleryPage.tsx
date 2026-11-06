import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project, CommunityName, GoogleTool } from '../types';
import { Search, X, Plus, Filter, Sparkles } from 'lucide-react';
import { COMMUNITY_THEMES } from '../utils/theme';

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

export const GalleryPage: React.FC = () => {
  const { projects } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [community, setCommunity] = useState<string>(searchParams.get('community') || 'ALL');
  const [tool, setTool] = useState<string>('ALL');
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
        const q = query.toLowerCase();
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.builderName.toLowerCase().includes(q);
        const matchesCommunity = community === 'ALL' || p.community === community;
        const matchesTool = tool === 'ALL' || p.googleTools.includes(tool as GoogleTool);
        return matchesQuery && matchesCommunity && matchesTool;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [projects, query, community, tool]);

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
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gdg-green-light border border-green-200 text-gdg-green text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GDG on Campus OAU</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Project Gallery
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1 font-medium">
              Explore {projects.length} submissions from builders across Obafemi Awolowo University.
            </p>
          </div>

          <Link
            to="/submit"
            className="inline-flex items-center gap-2 bg-gdg-green hover:bg-gdg-green-hover text-white text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full shadow-md shadow-green-200 transition-all self-start sm:self-auto hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Submit Your Project
          </Link>
        </div>

        {/* Search & Tool Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gdg-green absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project name, description, or builder..."
              className="w-full pl-10 pr-10 py-3 bg-emerald-50/30 border border-emerald-200 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gdg-green focus:ring-2 focus:ring-gdg-green/20 transition-all shadow-2xs"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="px-4 py-3 bg-blue-50/40 border border-blue-200 rounded-2xl text-sm font-bold text-gray-800 focus:outline-none focus:bg-white focus:border-gdg-blue transition-all shadow-2xs"
            >
              <option value="ALL">All Google Tools ({ALL_TOOLS.length})</option>
              {ALL_TOOLS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {(query || community !== 'ALL' || tool !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-extrabold text-white bg-gdg-red hover:bg-gdg-red-hover px-4 py-3 rounded-2xl transition-all shadow-sm whitespace-nowrap"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Community Filter Chips (WRAPPED CLEANLY - ZERO HORIZONTAL SCROLLBAR) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => handleSelectCommunity('ALL')}
            style={community === 'ALL' ? { backgroundColor: '#111827' } : { backgroundColor: '#F3F4F6' }}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              community === 'ALL'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tracks ({projects.length})
          </button>

          {ALL_COMMUNITIES.map((c) => {
            const count = projects.filter((p) => p.community === c).length;
            const active = community === c;
            const theme = COMMUNITY_THEMES[c] || {
              chipClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold',
              chipActiveClass: 'bg-gray-900 text-white font-bold',
            };
            return (
              <button
                key={c}
                onClick={() => handleSelectCommunity(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  active
                    ? `${theme.chipActiveClass} shadow-sm scale-102`
                    : theme.chipClass
                }`}
              >
                {c} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-6">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full">
            Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </span>
          <span className="text-gray-400">Sorted by newest</span>
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
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-emerald-50/40 to-teal-50/30 rounded-3xl border border-dashed border-emerald-300 p-8">
            <Filter className="w-12 h-12 text-gdg-green mx-auto mb-3 opacity-70" />
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">No builds found</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-5 font-medium">
              Try adjusting your search query, or clear your community and Google tool filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-gdg-green text-white text-xs font-bold rounded-full hover:bg-gdg-green-hover transition-colors shadow-md shadow-green-200"
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
