import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import { useApp } from '../context/AppContext';
import { ThumbsUp, Check, Lock, ExternalLink } from 'lucide-react';
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
    color: '#4285F4',
    bgLight: '#E8F0FE',
    textDark: '#1E40AF',
    border: '#93C5FD',
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    castVote(project.id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={() => onOpenDetails(project)}
      className="group bg-white rounded-2xl cursor-pointer flex flex-col h-full overflow-hidden border border-gray-200/90 hover:border-gray-300 hover:shadow-xl transition-all duration-200 shadow-xs"
    >
      {/* Vibrant Community Accent Top Stripe */}
      <div className="h-1 w-full" style={{ backgroundColor: theme.color }} />

      {/* Thumbnail Frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border-b border-gray-100">
        <img
          src={project.screenshotUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Live Demo Pill Badge */}
        {project.demoUrl && (
          <div className="absolute top-2.5 right-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/95 text-emerald-800 px-2.5 py-1 rounded-full backdrop-blur-xs border border-emerald-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE DEMO
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Community Track Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            style={{
              backgroundColor: theme.bgLight,
              color: theme.textDark,
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: theme.color }}
            />
            {project.community}
          </span>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-md hover:bg-gray-100"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base sm:text-lg text-gray-900 group-hover:text-gdg-blue transition-colors line-clamp-1 mb-1.5">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Authentic Google Tool Badges with Brand Colors */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.googleTools.slice(0, 3).map((tool) => {
            const toolTheme = TOOL_THEMES[tool];
            return (
              <span
                key={tool}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  toolTheme ? toolTheme.pillClass : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {toolTheme && <span className={`w-1.5 h-1.5 rounded-full ${toolTheme.dotClass}`} />}
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

        {/* Footer: Builder + Vote Action */}
        <div className="flex items-center justify-between pt-3.5 border-t border-gray-100 mt-auto">
          {/* Builder */}
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-7 h-7 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs"
              style={{ backgroundColor: theme.color }}
            >
              {project.builderName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-gray-800 truncate">
              {project.builderName}
            </span>
          </div>

          {/* Upvote Pill Button */}
          <button
            onClick={handleVote}
            disabled={isOwn || hasVoted || (votingClosed && !isAdmin)}
            title={
              hasVoted
                ? 'You already voted for this project'
                : isOwn
                ? 'You cannot vote for your own project'
                : votingClosed
                ? 'Voting is closed'
                : 'Support this build'
            }
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
              hasVoted
                ? 'bg-emerald-600 text-white'
                : isOwn || (votingClosed && !isAdmin)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 active:scale-95'
            }`}
          >
            {hasVoted ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{totalVotes}</span>
              </>
            ) : votingClosed && !isAdmin ? (
              <>
                <Lock className="w-3 h-3 opacity-60" />
                <span>{totalVotes}</span>
              </>
            ) : (
              <>
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold">{totalVotes}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
};
