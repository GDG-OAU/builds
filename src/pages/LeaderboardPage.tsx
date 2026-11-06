import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateIndividualScores, calculateCommunityScores } from '../services/appState';
import { LEADERBOARD_CONFIG } from '../config/leaderboard.config';
import { Trophy, Award, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { COMMUNITY_THEMES } from '../utils/theme';

export const LeaderboardPage: React.FC = () => {
  const { projects, votes, communities, votingClosed, isAdmin } = useApp();
  const [tab, setTab] = useState<'individual' | 'community'>('individual');

  const individual = calculateIndividualScores(projects, votes);
  const community = calculateCommunityScores(communities, projects);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gdg-yellow-light border border-yellow-200 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>GDG OAU Builder Jam Cup</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Live Standings
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1 font-medium">
              Real-time rankings based on completeness, submissions, and community votes.
            </p>
          </div>

          {/* Tab Selector Pills - CLEAN & MODERN */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-full self-start sm:self-auto shadow-inner">
            <button
              onClick={() => setTab('individual')}
              style={tab === 'individual' ? { backgroundColor: '#111827' } : undefined}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                tab === 'individual'
                  ? 'bg-gray-900 text-white shadow-sm scale-102'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Builders Cup</span>
            </button>
            <button
              onClick={() => setTab('community')}
              style={tab === 'community' ? { backgroundColor: '#4285F4' } : undefined}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                tab === 'community'
                  ? 'bg-gdg-blue text-white shadow-sm shadow-blue-200 scale-102'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Community Tracks</span>
            </button>
          </div>
        </div>

        {/* Formula Explainer Banner - MINIMALIST & CLEAN */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-3.5 text-xs text-gray-600 leading-relaxed">
          <Sparkles className="w-4 h-4 text-gdg-blue shrink-0 mt-0.5" />
          <div className="flex-1">
            {tab === 'individual' ? (
              <p>
                <strong className="text-gray-900">Scoring Formula:</strong>{' '}
                <span className="font-bold text-gray-800">{LEADERBOARD_CONFIG.individual.completenessWeight * 100}% completeness</span> (demo link &gt; 2+ Google tools &gt; description) +{' '}
                <span className="font-bold text-gray-800">{LEADERBOARD_CONFIG.individual.projectCountWeight * 100}% builds</span> (capped at {LEADERBOARD_CONFIG.individual.projectCap}) +{' '}
                <span className="font-bold text-gray-800">{LEADERBOARD_CONFIG.individual.communityVotesWeight * 100}% community votes</span> (capped at {LEADERBOARD_CONFIG.individual.voteCap}).
              </p>
            ) : (
              <p>
                <strong className="text-gray-900">Track Cup Formula:</strong>{' '}
                <span className="font-bold text-gray-800">{LEADERBOARD_CONFIG.community.submissionRateWeight * 100}% submission rate</span> (submissions ÷ attendees within {LEADERBOARD_CONFIG.community.windowDays} days post-event) +{' '}
                <span className="font-bold text-gray-800">{LEADERBOARD_CONFIG.community.repeatBuildersWeight * 100}% repeat builders</span>.
              </p>
            )}
            {!votingClosed && !isAdmin && tab === 'individual' && (
              <span className="block text-gray-500 font-medium mt-1">
                🔒 Public vote counts are hidden during live voting to avoid bandwagon effects. Final standings unlock when voting closes.
              </span>
            )}
          </div>
        </div>

        {/* ── TOP 3 BUILDERS PODIUM CARDS (CLEAN ELEVATED WHITE CARDS, NO AI OUTLINES) ── */}
        {tab === 'individual' && individual.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {individual.slice(0, 3).map((item, idx) => {
              const theme = COMMUNITY_THEMES[item.projects[0]?.community as keyof typeof COMMUNITY_THEMES] || COMMUNITY_THEMES['Web Development'];
              const medalBadges = [
                'bg-amber-400 text-amber-950',
                'bg-slate-300 text-slate-800',
                'bg-amber-600 text-white',
              ];

              return (
                <div
                  key={item.builderEmail}
                  className="bg-white border border-gray-100 rounded-3xl p-6 text-center relative shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${medalBadges[idx]}`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-gray-400">Rank #{idx + 1}</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-1">
                    {item.builderName}
                  </h3>

                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-0.5 rounded-full my-2 border ${theme.badgeClass}`}>
                    <span className={`w-2 h-2 rounded-full ${theme.dotClass}`} />
                    <span>{item.projects[0]?.community || 'Independent'}</span>
                  </div>

                  {/* Score breakdown metrics */}
                  <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs mt-3">
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <span className="block font-bold text-gray-900 text-sm">{item.projectsCount}</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Builds</span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <span className="block font-bold text-gray-900 text-sm">{item.completenessScore.toFixed(0)}%</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Complete</span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <span className="block font-bold text-gdg-blue text-sm">{item.compositeScore.toFixed(1)}</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MAIN DATA TABLES (CLEAN MODERN EDITORIAL LOOK) ── */}
        {tab === 'individual' ? (
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/70 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4 w-16 text-center">Rank</th>
                    <th className="px-6 py-4">Builder</th>
                    <th className="px-6 py-4 text-center">Builds</th>
                    <th className="px-6 py-4 text-center">Completeness</th>
                    {(votingClosed || isAdmin) && (
                      <th className="px-6 py-4 text-center">Votes</th>
                    )}
                    <th className="px-6 py-4 text-right">Composite Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {individual.map((item, idx) => {
                    const theme = COMMUNITY_THEMES[item.projects[0]?.community as keyof typeof COMMUNITY_THEMES] || COMMUNITY_THEMES['Web Development'];
                    return (
                      <tr
                        key={item.builderEmail}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-bold">
                          {idx === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-amber-950 text-xs font-black">1</span>
                          ) : idx === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-black">2</span>
                          ) : idx === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black">3</span>
                          ) : (
                            <span className="text-gray-400 text-xs font-mono font-bold">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{item.builderName}</p>
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold mt-0.5 text-gray-500`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass}`} />
                            {item.projects[0]?.community || 'Independent'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-gray-800">
                          {item.projectsCount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${Math.min(100, item.completenessScore)}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs font-bold text-gray-700">
                              {item.completenessScore.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        {(votingClosed || isAdmin) && (
                          <td className="px-6 py-4 text-center font-mono text-xs font-bold text-gray-700">
                            {item.totalVotes}
                          </td>
                        )}
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-base font-bold text-gray-900">
                            {item.compositeScore.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/70 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4 w-16 text-center">Rank</th>
                    <th className="px-6 py-4">Community Track</th>
                    <th className="px-6 py-4 text-center">Event Status</th>
                    <th className="px-6 py-4 text-center">Total Builds</th>
                    <th className="px-6 py-4 text-center">Repeat Builders</th>
                    <th className="px-6 py-4 text-right">Track Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {community.map((comm, idx) => {
                    const isComingSoon = !comm.isLiveOrCompleted;
                    const theme = COMMUNITY_THEMES[comm.name] || COMMUNITY_THEMES['Web Development'];
                    return (
                      <tr
                        key={comm.name}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-bold">
                          {isComingSoon ? (
                            <span className="text-gray-300 text-xs font-bold">-</span>
                          ) : idx === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-amber-950 text-xs font-black">1</span>
                          ) : (
                            <span className="text-gray-400 text-xs font-mono font-bold">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${theme.dotClass}`} />
                            <p className="font-bold text-gray-900">{comm.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {isComingSoon ? (
                            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                              Coming Soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Event Held
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-gray-800">
                          {comm.submissionsCount}
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-xs font-bold text-gray-600">
                          {(comm.repeatBuilderRate * 100).toFixed(0)}%
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isComingSoon ? (
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              Pending
                            </span>
                          ) : (
                            <span className="font-mono text-base font-bold text-gray-900">
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
