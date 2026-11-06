import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import { useApp } from '../context/AppContext';
import { ThumbsUp, Check, Lock, ArrowUpRight } from 'lucide-react';
import { getVotesCountForProject } from '../services/appState';
import { COMMUNITY_THEMES, TOOL_THEMES } from '../utils/theme';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const { user, isAdmin, votes, votingClosed, castVote } = useApp();

  const totalVotes = getVotesCountForProject(project.id, votes);
  const hasVoted = Boolean(
    user &&
      votes.some(
        (v) =>
          v.projectId === project.id &&
          (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase())
      )
  );
  const isOwn = Boolean(
    user &&
      (project.submitterUid === user.uid ||
        project.submitterEmail.toLowerCase() === user.email.toLowerCase())
  );

  const theme = COMMUNITY_THEMES[project.community] || {
    dotClass: 'bg-gdg-green',
    badgeClass: 'bg-gdg-green-light text-gdg-green-dark border-green-200',
    cardHoverClass: 'hover:border-gdg-green hover:shadow-green-100',
    chipClass: 'bg-gdg-green-light text-gdg-green-dark border-green-200',
    chipActiveClass: 'bg-gdg-green text-white border-gdg-green',
    gradientClass: 'from-gdg-green to-teal-600',
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = castVote(project.id);
    if (!res.success) alert(res.message);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpenDetails(project)}
      className={`group bg-white rounded-3xl cursor-pointer flex flex-col h-full overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 ${theme.cardHoverClass}`}
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

        {/* Live Demo Pill Badge */}
        {project.demoUrl && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/95 text-gdg-green px-3 py-1 rounded-full shadow-md border border-green-200 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-gdg-green animate-pulse" />
              LIVE DEMO
            </span>
          </div>
        )}

        {/* Quick view indicator on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-gdg-green text-white px-3 py-1 rounded-full shadow-md">
            View Details <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        
        {/* Track Badge using semantic Tailwind theme */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${theme.badgeClass}`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${theme.dotClass}`} />
            {project.community}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-gdg-green transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>

        {/* One-Line Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Authentic Google Tool Badges using semantic tool classes */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.googleTools.slice(0, 3).map((tool) => {
            const toolTheme = TOOL_THEMES[tool] || {
              label: tool,
              pillClass: 'bg-gray-100 text-gray-700 border-gray-200',
              dotClass: 'bg-gray-400',
            };
            return (
              <span
                key={tool}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${toolTheme.pillClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${toolTheme.dotClass}`} />
                {tool}
              </span>
            );
          })}
          {project.googleTools.length > 3 && (
            <span className="text-[11px] font-bold text-gray-400 self-center px-1">
              +{project.googleTools.length - 3} more
            </span>
          )}
        </div>

        {/* Footer: Builder Info & Vote Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-7 h-7 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs bg-gradient-to-tr ${theme.gradientClass}`}
            >
              {project.builderName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-gray-800 truncate">
              {project.builderName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(isAdmin || votingClosed) && (
              <span className="font-mono text-xs font-extrabold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
              </span>
            )}

            <button
              onClick={handleVote}
              disabled={isOwn || hasVoted || (votingClosed && !isAdmin)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                hasVoted
                  ? 'bg-gdg-green-light text-gdg-green border border-green-300'
                  : isOwn || votingClosed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-gdg-green hover:bg-gdg-green-hover text-white active:scale-95 shadow-green-200 hover:shadow-md'
              }`}
            >
              {hasVoted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-gdg-green" />
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
