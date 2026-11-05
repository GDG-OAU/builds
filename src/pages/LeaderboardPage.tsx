import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateIndividualScores, calculateCommunityScores } from '../services/appState';
import { LEADERBOARD_CONFIG } from '../config/leaderboard.config';
import { Trophy, Award, Users, Info, CheckCircle2 } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { projects, votes, communities, votingClosed, isAdmin } = useApp();
  const [tab, setTab] = useState<'individual' | 'community'>('individual');

  const individual = calculateIndividualScores(projects, votes);
  const community = calculateCommunityScores(communities, projects);

  const MEDALS = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-[#FBBC04] text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Builder Jam Cup</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Live Standings
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Real-time rankings based on completeness, submissions, and community votes.
            </p>
          </div>

          {/* Tab Selector Pills */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full self-start sm:self-auto">
            <button
              onClick={() => setTab('individual')}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                tab === 'individual'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Top Builders</span>
            </button>
            <button
              onClick={() => setTab('community')}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                tab === 'community'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Track Cup</span>
            </button>
          </div>
        </div>

        {/* Formula Explainer Banner */}
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3 text-xs sm:text-sm text-blue-900 leading-relaxed">
          <Info className="w-5 h-5 text-[#4285F4] shrink-0 mt-0.5" />
          <div className="flex-1">
            {tab === 'individual' ? (
              <p>
                <strong>Individual Formula:</strong>{' '}
                {LEADERBOARD_CONFIG.individual.completenessWeight * 100}% completeness (demo link &gt; 2+ Google tools &gt; description) +{' '}
                {LEADERBOARD_CONFIG.individual.projectCountWeight * 100}% number of builds (capped at {LEADERBOARD_CONFIG.individual.projectCap}) +{' '}
                {LEADERBOARD_CONFIG.individual.communityVotesWeight * 100}% community votes (capped at {LEADERBOARD_CONFIG.individual.voteCap}).
              </p>
            ) : (
              <p>
                <strong>Community Track Formula:</strong>{' '}
                {LEADERBOARD_CONFIG.community.submissionRateWeight * 100}% submission rate (submissions ÷ attendees within {LEADERBOARD_CONFIG.community.windowDays} days post-event) +{' '}
                {LEADERBOARD_CONFIG.community.repeatBuildersWeight * 100}% share of multi-project builders. Tracks with upcoming events show "Coming Soon".
              </p>
            )}
            {!votingClosed && !isAdmin && tab === 'individual' && (
              <span className="block font-semibold text-amber-700 mt-1">
                🔒 Public vote counts remain hidden to ensure fairness until organizers close voting.
              </span>
            )}
          </div>
        </div>

        {/* ── TOP 3 BUILDERS PODIUM (When viewing individual tab) ── */}
        {tab === 'individual' && individual.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {individual.slice(0, 3).map((item, idx) => {
              const borderColors = [
                'border-[#FBBC04] bg-yellow-50/30',
                'border-gray-300 bg-gray-50/40',
                'border-amber-600/40 bg-amber-50/20',
              ];
              return (
                <div
                  key={item.builderEmail}
                  className={`border-2 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden shadow-2xs ${borderColors[idx]}`}
                >
                  <div className="text-3xl mb-1">{MEDALS[idx]}</div>
                  <h3 className="font-extrabold text-lg text-gray-900 line-clamp-1">
                    {item.builderName}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {item.projects[0]?.community || 'Independent'}
                  </p>
                  <div className="pt-2 border-t border-gray-200/60 flex justify-around text-xs">
                    <div>
                      <span className="block font-extrabold text-gray-900">{item.projectsCount}</span>
                      <span className="text-gray-400">Builds</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-gray-900">{item.completenessScore.toFixed(0)}%</span>
                      <span className="text-gray-400">Completeness</span>
                    </div>
                    <div>
                      <span className="block font-extrabold text-[#188038] text-base">{item.compositeScore.toFixed(1)}</span>
                      <span className="text-gray-400">Total Pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MAIN DATA TABLES ── */}
        {tab === 'individual' ? (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-5 py-4 w-14 text-center">Rank</th>
                    <th className="px-5 py-4">Builder</th>
                    <th className="px-5 py-4 text-center">Builds</th>
                    <th className="px-5 py-4 text-center">Completeness</th>
                    {(votingClosed || isAdmin) && (
                      <th className="px-5 py-4 text-center">Votes</th>
                    )}
                    <th className="px-5 py-4 text-right">Composite Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {individual.map((item, idx) => (
                    <tr
                      key={item.builderEmail}
                      className={`hover:bg-gray-50/70 transition-colors ${
                        idx === 0 ? 'bg-yellow-50/20' : ''
                      }`}
                    >
                      <td className="px-5 py-4 text-center font-bold">
                        {idx < 3 ? (
                          <span className="text-lg">{MEDALS[idx]}</span>
                        ) : (
                          <span className="text-gray-400 text-xs font-mono">#{idx + 1}</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#188038] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {item.builderName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{item.builderName}</p>
                            <p className="text-xs text-gray-400">{item.projects[0]?.community}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                          {item.projectsCount} {item.projectsCount === 1 ? 'build' : 'builds'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="font-mono text-xs font-bold text-[#188038]">
                          {item.completenessScore.toFixed(0)}%
                        </span>
                      </td>
                      {(votingClosed || isAdmin) && (
                        <td className="px-5 py-4 text-center font-mono text-xs font-bold text-gray-700">
                          {item.totalVotes}
                        </td>
                      )}
                      <td className="px-5 py-4 text-right">
                        <span className="font-mono text-base font-extrabold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                          {item.compositeScore.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-5 py-4 w-14 text-center">Rank</th>
                    <th className="px-5 py-4">Community Track</th>
                    <th className="px-5 py-4 text-center">Event Status</th>
                    <th className="px-5 py-4 text-center">Total Builds</th>
                    <th className="px-5 py-4 text-center">Repeat Builders</th>
                    <th className="px-5 py-4 text-right">Track Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {community.map((comm, idx) => {
                    const isComingSoon = !comm.isLiveOrCompleted;
                    return (
                      <tr
                        key={comm.name}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="px-5 py-4 text-center font-bold">
                          {isComingSoon ? (
                            <span className="text-gray-300 text-xs">-</span>
                          ) : idx === 0 ? (
                            <span className="text-lg">🏆</span>
                          ) : (
                            <span className="text-gray-400 text-xs font-mono">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-900">{comm.name}</p>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {isComingSoon ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                              Coming Soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-[#188038] text-xs font-bold border border-green-200">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-center font-mono font-bold text-gray-800">
                          {comm.submissionsCount}
                        </td>
                        <td className="px-5 py-4 text-center font-mono text-xs font-semibold text-gray-600">
                          {(comm.repeatBuilderRate * 100).toFixed(0)}%
                        </td>
                        <td className="px-5 py-4 text-right">
                          {isComingSoon ? (
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              Pending
                            </span>
                          ) : (
                            <span className="font-mono text-base font-extrabold text-[#188038] bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                              {comm.compositeScore.toFixed(1)}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
