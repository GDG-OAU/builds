import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import { useApp } from '../context/AppContext';
import { GithubIcon } from './GithubIcon';
import { X, ExternalLink, ThumbsUp, Check, Share2, Calendar, User, Tag, Lock } from 'lucide-react';
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
    user && votes.some(v => v.projectId === project.id && (v.voterUid === user.uid || v.voterEmail.toLowerCase() === user.email.toLowerCase()))
  );
  const isOwnProject = Boolean(
    user && (project.submitterUid === user.uid || project.submitterEmail.toLowerCase() === user.email.toLowerCase())
  );

  const handleVote = () => {
    const res = castVote(project.id);
    if (!res.success && res.message) {
      alert(res.message);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/gallery?project=${project.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 relative flex flex-col max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 p-2 rounded-full shadow-md backdrop-blur-md transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto">
            <div className="relative aspect-video w-full bg-gray-900">
              <img
                src={project.screenshotUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/95 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {project.community}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {project.title}
                  </h2>
                  <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 font-medium text-gray-800">
                      <User className="w-4 h-4 text-[#188038]" />
                      {project.builderName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-all shadow-2xs"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copied ? 'Copied Link!' : 'Share'}</span>
                  </button>

                  <button
                    onClick={handleVote}
                    disabled={isOwnProject || hasVoted || (votingClosed && !isAdmin)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      hasVoted
                        ? 'bg-green-100 text-[#188038] cursor-default'
                        : isOwnProject
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : votingClosed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#188038] hover:bg-[#137333] text-white shadow-sm active:scale-95'
                    }`}
                  >
                    {hasVoted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Voted</span>
                      </>
                    ) : votingClosed ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Voting Closed</span>
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-4 h-4" />
                        <span>Vote For Project</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Google Tools Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.googleTools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-green-50 text-[#188038] border border-green-200 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {(isAdmin || votingClosed) && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Community Votes</p>
                    <p className="text-xl font-bold text-gray-900">{totalVotes} verified votes</p>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {votingClosed ? 'Final Result (Voting Closed)' : 'Admin live view'}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-100">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-white border-2 border-[#188038] hover:bg-green-50 text-[#188038] px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                  </a>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-3 text-xs text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No live demo link provided
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
