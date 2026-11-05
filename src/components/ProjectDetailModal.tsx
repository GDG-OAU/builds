import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import { useApp } from '../context/AppContext';
import { GithubIcon } from './GithubIcon';
import { X, ExternalLink, ThumbsUp, Check, Share2, User, Tag, Lock } from 'lucide-react';
import { getVotesCountForProject } from '../services/appState';

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

  const handleVote = () => {
    const res = castVote(project.id);
    if (!res.success) alert(res.message);
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
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl"
        >
          {/* Header image */}
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
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 transition-all shadow-md backdrop-blur-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#188038] uppercase tracking-wider bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  {project.community}
                </span>
                {project.demoUrl && (
                  <span className="text-xs font-bold text-[#4285F4] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    Live Demo Available
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                {project.title}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-medium">
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

            {/* Voting & Action row */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-gray-100">
              <button
                onClick={handleVote}
                disabled={isOwn || hasVoted || (votingClosed && !isAdmin)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
                  hasVoted
                    ? 'bg-green-50 text-[#188038] border border-green-300'
                    : isOwn || votingClosed
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-[#188038] hover:bg-[#137333] text-white active:scale-95'
                }`}
              >
                {hasVoted ? (
                  <>
                    <Check className="w-4 h-4" />
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
                <div className="ml-auto font-mono text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  {totalVotes} total votes
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                About the Project
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Project Links
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-2xs"
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
                    className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-2xs"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Tools list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Google Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.googleTools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-50 text-gray-800 border border-gray-200 px-3 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3 text-[#188038]" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
