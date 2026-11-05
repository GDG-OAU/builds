import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateIndividualScores, calculateCommunityScores } from '../services/appState';
import { LEADERBOARD_CONFIG } from '../config/leaderboard.config';
import { Trophy, Award, Users, Clock, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const LeaderboardPage: React.FC = () => {
  const { projects, votes, communities, votingClosed, isAdmin } = useApp();
  const [activeTab, setActiveTab] = useState<'individual' | 'community'>('individual');

  const individualScores = calculateIndividualScores(projects, votes);
  const communityScores = calculateCommunityScores(communities, projects);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-yellow-100 text-[#B06000] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
          <Trophy className="w-4 h-4 text-[#FBBC04]" />
          <span>Builder Jam Standings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Live Leaderboards
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Rankings computed dynamically based on project completeness, community engagement, and builder impact.
        </p>

        <div className="inline-flex p-1.5 bg-gray-200/70 rounded-2xl border border-gray-300/50 mt-4">
          <button
            onClick={() => setActiveTab('individual')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'individual'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Award className="w-4 h-4 text-[#188038]" />
            <span>Individual Builders</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'community'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#4285F4]" />
            <span>Community Tracks</span>
          </button>
        </div>
      </div>

      {activeTab === 'individual' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#188038] shrink-0" />
              <span>
                <strong>Scoring Formula:</strong> {LEADERBOARD_CONFIG.individual.completenessWeight * 100}% Completeness (Demo link, $\ge$2 Google tools, description) + {LEADERBOARD_CONFIG.individual.projectCountWeight * 100}% Projects (capped at {LEADERBOARD_CONFIG.individual.projectCap}) + {LEADERBOARD_CONFIG.individual.communityVotesWeight * 100}% Community Votes (capped at {LEADERBOARD_CONFIG.individual.voteCap}).
              </span>
            </div>
            {!votingClosed && !isAdmin && (
              <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-md border border-amber-200 self-start sm:self-auto shrink-0">
                Vote counts revealed when voting closes
              </span>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Rank</th>
                    <th scope="col" className="px-6 py-4">Builder</th>
                    <th scope="col" className="px-6 py-4 text-center">Projects</th>
                    <th scope="col" className="px-6 py-4 text-center">Completeness</th>
                    {(votingClosed || isAdmin) && (
                      <th scope="col" className="px-6 py-4 text-center">Votes</th>
                    )}
                    <th scope="col" className="px-6 py-4 text-right">Composite Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {individualScores.map((item, index) => {
                    const isFirst = index === 0;
                    const isSecond = index === 1;
                    const isThird = index === 2;

                    return (
                      <motion.tr
                        key={item.builderEmail}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`hover:bg-gray-50/80 transition-colors ${
                          isFirst ? 'bg-yellow-50/40' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {isFirst ? (
                              <span className="w-7 h-7 rounded-full bg-[#FBBC04] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                                1
                              </span>
                            ) : isSecond ? (
                              <span className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-black text-xs shadow-2xs">
                                2
                              </span>
                            ) : isThird ? (
                              <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                                3
                              </span>
                            ) : (
                              <span className="w-7 h-7 text-gray-400 font-bold text-xs flex items-center justify-center">
                                {index + 1}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#188038]/10 text-[#188038] font-bold text-xs flex items-center justify-center">
                              {item.builderName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{item.builderName}</p>
                              <p className="text-xs text-gray-400">{item.projects[0]?.community || 'Builder'}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                            {item.projectsCount} {item.projectsCount === 1 ? 'project' : 'projects'}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-xs font-semibold text-[#188038]">
                            {item.completenessScore.toFixed(1)} / {(LEADERBOARD_CONFIG.individual.completenessWeight * 100).toFixed(0)}
                          </span>
                        </td>

                        {(votingClosed || isAdmin) && (
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                              {item.totalVotes}
                            </span>
                          </td>
                        )}

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-base font-extrabold text-[#188038]">
                            {item.compositeScore.toFixed(1)}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs text-xs sm:text-sm text-gray-600 flex items-center space-x-2">
            <Info className="w-4 h-4 text-[#4285F4] shrink-0" />
            <span>
              <strong>Community Metric:</strong> {LEADERBOARD_CONFIG.community.submissionRateWeight * 100}% Submission rate (submissions / attendees during event window) + {LEADERBOARD_CONFIG.community.repeatBuildersWeight * 100}% Share of builders with multiple submissions.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityScores.map((comm, index) => {
              return (
                <div
                  key={comm.name}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#188038]" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                        Rank #{index + 1}
                      </span>

                      {comm.isLiveOrCompleted ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#188038] bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active / Scored</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>Coming Soon</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4">{comm.name}</h3>

                    <div className="space-y-2.5 text-xs text-gray-600 bg-gray-50 rounded-xl p-3.5 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Submissions:</span>
                        <span className="font-bold text-gray-800">{comm.submissionsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Active Builders:</span>
                        <span className="font-bold text-gray-800">{comm.buildersCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Multi-project Builders:</span>
                        <span className="font-bold text-gray-800">{comm.multiSubmittersCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase font-bold text-gray-400">Community Score</p>
                      <p className="text-xl font-black text-[#188038]">
                        {comm.isLiveOrCompleted ? comm.compositeScore.toFixed(1) : '—'}
                      </p>
                    </div>

                    {!comm.isLiveOrCompleted && (
                      <span className="text-xs text-gray-400 italic">
                        Event date pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
