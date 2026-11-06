import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import { useApp } from '../context/AppContext';
import { GithubIcon } from './GithubIcon';
import { X, ExternalLink, ThumbsUp, Check, Share2, User, Lock } from 'lucide-react';
import { getVotesCountForProject } from '../services/appState';
import { COMMUNITY_THEMES, TOOL_THEMES } from '../utils/theme';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { user, isAdmin, votes, votingClosed, castVote } = useApp();
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const totalVotes = getVotesCountForProject(project.id, votes);
  const hasVoted = Boolean(
    user && votes.some(v => v.projectId === project.id &&
      (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase()))
  );
  const isOwn = Boolean(
    user && (project.submitterUid === user.uid ||
      project.submitterEmail.toLowerCase() === user.email.toLowerCase())
  );

  const theme = COMMUNITY_THEMES[project.community] || {
    dotClass: 'bg-gdg-green',
    badgeClass: 'bg-gdg-green-light text-gdg-green-dark border-green-200',
    cardHoverClass: 'hover:border-gdg-green',
    chipClass: '',
    chipActiveClass: '',
    gradientClass: 'from-gdg-green to-teal-600',
  };

  const handleVote = () => {
    castVote(project.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/gallery?project=${project.id}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto border border-gray-200 shadow-2xl"
        >
          {/* Header image with close button */}
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <img
              src={project.screenshotUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 transition-all shadow-md backdrop-blur-xs hover:scale-105"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${theme.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${theme.dotClass}`} />
                  {project.community}
                </span>

                {project.demoUrl && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gdg-green bg-gdg-green-light border border-green-200 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-gdg-green animate-pulse" />
                    Live Demo
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                {project.title}
              </h2>

              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {project.builderName}
                </span>
                <span>
                  {new Date(project.createdAt).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Voting & Actions */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-gray-100">
              <button
                onClick={handleVote}
                disabled={isOwn || hasVoted || (votingClosed && !isAdmin)}
                style={!hasVoted && !isOwn && !votingClosed ? { backgroundColor: '#188038', color: '#FFFFFF' } : undefined}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md ${
                  hasVoted
                    ? 'bg-gdg-green-light text-gdg-green border border-green-300 shadow-emerald-100'
                    : isOwn || votingClosed
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-gdg-green hover:bg-emerald-700 text-white active:scale-95 shadow-green-200 hover:shadow-lg'
                }`}
              >
                {hasVoted ? (
                  <>
                    <Check className="w-4 h-4 text-gdg-green" />
                    <span>You Voted for This Project</span>
                  </>
                ) : votingClosed ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Voting is Closed</span>
                  </>
                ) : (
                  <>
                    <ThumbsUp className="w-4 h-4" />
                    <span>Vote for this project</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-full text-xs font-semibold transition-all shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              {(isAdmin || votingClosed) && (
                <div className="ml-auto font-mono text-xs font-bold text-gray-600 bg-gray-100 px-3.5 py-1.5 rounded-full">
                  {totalVotes} total votes
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                About the Project
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {project.description}
              </p>
            </div>

            {/* Project Links */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Project Links
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-full transition-all shadow-md shadow-purple-200 hover:scale-105"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: '#4285F4', color: '#FFFFFF' }}
                    className="inline-flex items-center gap-2 bg-gdg-blue hover:bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md shadow-blue-200 hover:scale-102"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Google Tools Badges using authentic semantic tool colors */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Google Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.googleTools.map((tool) => {
                  const toolTheme = TOOL_THEMES[tool] || {
                    label: tool,
                    pillClass: 'bg-gray-100 text-gray-700 border-gray-200',
                    dotClass: 'bg-gray-400',
                  };
                  return (
                    <span
                      key={tool}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${toolTheme.pillClass}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${toolTheme.dotClass}`} />
                      {tool}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
