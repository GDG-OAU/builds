import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import type { Project, CommunityName, GoogleTool } from '../types';
import { Search, Filter, Sparkles, X, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_COMMUNITIES: CommunityName[] = [
  'Web Development',
  'Game Development',
  'Research',
  'Product Management',
  'Mobile App Development',
  'Data Science / Machine Learning',
  'Design',
  'Quantum Computing',
  'Cybersecurity'
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
  'Other'
];

export const GalleryPage: React.FC = () => {
  const { projects } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<string>(searchParams.get('community') || 'ALL');
  const [selectedTool, setSelectedTool] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const communityParam = searchParams.get('community');
    if (communityParam) {
      setSelectedCommunity(communityParam);
    }
    const projectParam = searchParams.get('project');
    if (projectParam) {
      const match = projects.find(p => p.id === projectParam);
      if (match) {
        setActiveModalProject(match);
      }
    }
  }, [searchParams, projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.builderName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCommunity =
          selectedCommunity === 'ALL' || project.community === selectedCommunity;

        const matchesTool =
          selectedTool === 'ALL' || project.googleTools.includes(selectedTool as GoogleTool);

        return matchesSearch && matchesCommunity && matchesTool;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [projects, searchQuery, selectedCommunity, selectedTool]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCommunity('ALL');
    setSelectedTool('ALL');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || selectedCommunity !== 'ALL' || selectedTool !== 'ALL';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#188038] mb-1.5">
            <Sparkles className="w-4 h-4 text-[#188038]" />
            <span>Builder Jam Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Project Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Discover {projects.length} inspiring solutions built by GDG on Campus OAU developers.
          </p>
        </div>

        <Link
          to="/submit"
          className="inline-flex items-center space-x-2 bg-[#188038] hover:bg-[#137333] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Project</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, builder name, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 outline-hidden text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <div className="w-full sm:w-56">
              <select
                value={selectedCommunity}
                onChange={(e) => {
                  setSelectedCommunity(e.target.value);
                  if (e.target.value === 'ALL') {
                    searchParams.delete('community');
                    setSearchParams(searchParams);
                  } else {
                    setSearchParams({ ...Object.fromEntries(searchParams.entries()), community: e.target.value });
                  }
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 outline-hidden"
              >
                <option value="ALL">All Communities</option>
                {ALL_COMMUNITIES.map((comm) => (
                  <option key={comm} value={comm}>{comm}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-52">
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 outline-hidden"
              >
                <option value="ALL">All Google Tools</option>
                {ALL_TOOLS.map((tool) => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            <button
              onClick={resetFilters}
              className="text-[#188038] font-semibold hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No projects found</h3>
          <p className="text-sm text-gray-500">
            No projects matched your search criteria. Try clearing filters or submit a new project in this category!
          </p>
          <button
            onClick={resetFilters}
            className="text-sm font-semibold text-[#188038] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      )}

      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => {
          setActiveModalProject(null);
          if (searchParams.get('project')) {
            searchParams.delete('project');
            setSearchParams(searchParams);
          }
        }}
      />
    </div>
  );
};
