import React from 'react';
import { motion } from 'framer-motion';
import type { Project, CommunityName } from '../types';
import { useApp } from '../context/AppContext';
import { ThumbsUp, Check, Lock } from 'lucide-react';
import { getVotesCountForProject } from '../services/appState';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

const COMMUNITY_STYLES: Record<CommunityName, { bg: string; text: string; dot: string }> = {
  'Web Development': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-[#4285F4]' },
  'Data Science / Machine Learning': { bg: 'bg-green-50', text: 'text-[#188038]', dot: 'bg-[#188038]' },
  'Mobile App Development': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-[#FBBC04]' },
  'Cybersecurity': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-[#EA4335]' },
  'Design': { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-[#EC4899]' },
  'Game Development': { bg: 'bg-yellow-50', text: 'text-yellow-800', dot: 'bg-[#FACC15]' },
  'Product Management': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-[#10B981]' },
  'Research': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-[#818CF8]' },
  'Quantum Computing': { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-[#06B6D4]' },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const { user, isAdmin, votes, votingClosed, castVote } = useApp();

  const totalVotes = getVotesCountForProject(project.id, votes);
  const hasVoted = Boolean(
    user && votes.some((v) => v.projectId === project.id &&
      (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase()))
  );
  const isOwn = Boolean(
    user && (project.submitterUid === user.uid ||
      project.submitterEmail.toLowerCase() === user.email.toLowerCase())
  );

  const style = COMMUNITY_STYLES[project.community] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = castVote(project.id);
    if (!res.success) alert(res.message);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpenDetails(project)}
      className="group bg-white border border-gray-200/90 rounded-2xl cursor-pointer flex flex-col h-full overflow-hidden shadow-2xs hover:shadow-lg hover:border-gray-300 transition-all"
    >
      {/* Screenshot Banner */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={project.screenshotUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {project.demoUrl && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold bg-white/95 text-[#188038] px-2.5 py-1 rounded-full shadow-xs border border-green-200 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#188038] animate-pulse" />
              LIVE DEMO
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Track badge */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {project.community}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#188038] transition-colors line-clamp-1 mb-1.5">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Google tools used */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.googleTools.slice(0, 3).map((tool) => (
            <span
              key={tool}
              className="text-[11px] font-medium bg-gray-50 border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md"
            >
              {tool}
            </span>
          ))}
          {project.googleTools.length > 3 && (
            <span className="text-[11px] font-medium text-gray-400 self-center">
              +{project.googleTools.length - 3} more
            </span>
          )}
        </div>

        {/* Card Footer: Builder & Vote */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[#188038] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
              {project.builderName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-gray-700 truncate">
              {project.builderName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(isAdmin || votingClosed) && (
              <span className="font-mono text-xs font-bold text-gray-500">
                {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
              </span>
            )}

            <button
              onClick={handleVote}
              disabled={isOwn || hasVoted || (votingClosed && !isAdmin)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
                hasVoted
                  ? 'bg-green-50 text-[#188038] border border-green-300'
                  : isOwn || votingClosed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-white border border-[#188038] text-[#188038] hover:bg-[#188038] hover:text-white active:scale-95'
              }`}
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
