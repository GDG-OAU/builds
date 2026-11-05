import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import { useApp } from '../context/AppContext';
import { ThumbsUp, Check, Lock } from 'lucide-react';
import { getVotesCountForProject } from '../services/appState';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

const COMMUNITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Web Development': { bg: 'bg-blue-50', text: 'text-[#1A73E8]', border: 'border-blue-200' },
  'Data Science / Machine Learning': { bg: 'bg-green-50', text: 'text-[#188038]', border: 'border-green-200' },
  'Mobile App Development': { bg: 'bg-amber-50', text: 'text-[#B06000]', border: 'border-amber-200' },
  'Cybersecurity': { bg: 'bg-red-50', text: 'text-[#D93025]', border: 'border-red-200' },
  'Design': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Game Development': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Product Management': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Research': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  'Quantum Computing': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const { user, isAdmin, votes, votingClosed, castVote } = useApp();

  const totalVotes = getVotesCountForProject(project.id, votes);
  const hasVoted = Boolean(
    user && votes.some(v => v.projectId === project.id && (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase()))
  );
  const isOwnProject = Boolean(
    user && (project.submitterUid === user.uid || project.submitterEmail.toLowerCase() === user.email.toLowerCase())
  );

  const commStyle = COMMUNITY_COLORS[project.community] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200'
  };

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = castVote(project.id);
    if (!result.success && result.message) {
      alert(result.message);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onOpenDetails(project)}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col h-full group"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={project.screenshotUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute top-2.5 left-2.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${commStyle.bg} ${commStyle.text} ${commStyle.border} shadow-2xs backdrop-blur-xs`}>
            {project.community}
          </span>
        </div>
        
        {project.demoUrl && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-white/90 backdrop-blur-xs text-[#188038] text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-2xs border border-green-200 flex items-center gap-1">
              Live Demo
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#188038] transition-colors line-clamp-1">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.googleTools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium px-2 py-0.5 rounded transition-colors"
              >
                {tool}
              </span>
            ))}
            {project.googleTools.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-[11px] font-medium px-1.5 py-0.5 rounded">
                +{project.googleTools.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[#188038]/10 text-[#188038] font-bold text-xs flex items-center justify-center shrink-0">
              {project.builderName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-600 font-medium truncate">
              {project.builderName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {(isAdmin || votingClosed) && (
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
              </span>
            )}

            <button
              onClick={handleVoteClick}
              disabled={isOwnProject || hasVoted || (votingClosed && !isAdmin)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                hasVoted
                  ? 'bg-green-100 text-[#188038] cursor-default'
                  : isOwnProject
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : votingClosed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-[#188038] text-[#188038] hover:bg-[#188038] hover:text-white shadow-2xs active:scale-95'
              }`}
              title={
                isOwnProject
                  ? 'Cannot vote on your own project'
                  : hasVoted
                  ? 'Already voted'
                  : votingClosed
                  ? 'Voting is closed'
                  : 'Vote for this project'
              }
            >
              {hasVoted ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Voted</span>
                </>
              ) : votingClosed ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Closed</span>
                </>
              ) : (
                <>
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Vote</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
