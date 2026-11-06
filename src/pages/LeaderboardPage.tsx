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

  const MEDALS = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gdg-yellow-light border border-yellow-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
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

          {/* Tab Selector Pills */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full self-start sm:self-auto shadow-inner">
            <button
              onClick={() => setTab('individual')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                tab === 'individual'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Builders Cup</span>
            </button>
            <button
              onClick={() => setTab('community')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                tab === 'community'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Community Tracks</span>
            </button>
          </div>
        </div>

        {/* Formula Explainer Banner */}
        <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border border-blue-200/80 rounded-3xl p-5 mb-10 flex items-start gap-3.5 text-xs sm:text-sm text-blue-900 leading-relaxed shadow-xs">
          <Sparkles className="w-5 h-5 text-gdg-blue shrink-0 mt-0.5" />
          <div className="flex-1">
            {tab === 'individual' ? (
              <p>
                <strong>Individual Formula:</strong>{' '}
                <span className="font-semibold text-blue-700">{LEADERBOARD_CONFIG.individual.completenessWeight * 100}% completeness</span> (demo link &gt; 2+ Google tools &gt; description) +{' '}
                <span className="font-semibold text-emerald-700">{LEADERBOARD_CONFIG.individual.projectCountWeight * 100}% builds</span> (capped at {LEADERBOARD_CONFIG.individual.projectCap}) +{' '}
                <span className="font-semibold text-purple-700">{LEADERBOARD_CONFIG.individual.communityVotesWeight * 100}% community votes</span> (capped at {LEADERBOARD_CONFIG.individual.voteCap}).
              </p>
            ) : (
              <p>
                <strong>Community Track Formula:</strong>{' '}
                <span className="font-semibold text-emerald-700">{LEADERBOARD_CONFIG.community.submissionRateWeight * 100}% submission rate</span> (submissions ÷ attendees within {LEADERBOARD_CONFIG.community.windowDays} days post-event) +{' '}
                <span className="font-semibold text-purple-700">{LEADERBOARD_CONFIG.community.repeatBuildersWeight * 100}% repeat builders</span>. Tracks with upcoming events show "Coming Soon".
              </p>
            )}
            {!votingClosed && !isAdmin && tab === 'individual' && (
              <span className="block font-bold text-amber-800 mt-1.5">
                🔒 Public vote counts are hidden during voting to avoid bandwagon effects. Final standings unlock when organizers close voting.
              </span>
            )}
          </div>
        </div>

        {/* ── TOP 3 BUILDERS PODIUM CARDS ── */}
        {tab === 'individual' && individual.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {individual.slice(0, 3).map((item, idx) => {
              const podiumStyles = [
                {
                  card: 'bg-gradient-to-b from-gdg-yellow-light to-amber-50/40 border-amber-300 shadow-xl shadow-amber-100',
                  badge: 'bg-amber-400 text-gray-900',
                  accent: 'text-amber-700',
                },
                {
                  card: 'bg-gradient-to-b from-gdg-blue-light to-indigo-50/30 border-blue-200 shadow-lg shadow-blue-100/50',
                  badge: 'bg-blue-500 text-white',
                  accent: 'text-blue-700',
                },
                {
                  card: 'bg-gradient-to-b from-orange-50/60 to-rose-50/30 border-orange-200 shadow-lg shadow-orange-100/50',
                  badge: 'bg-orange-500 text-white',
                  accent: 'text-orange-700',
                },
              ];
              const style = podiumStyles[idx];
              const theme = COMMUNITY_THEMES[item.projects[0]?.community as keyof typeof COMMUNITY_THEMES] || COMMUNITY_THEMES['Web Development'];

              return (
                <div
                  key={item.builderEmail}
                  className={`border-2 rounded-3xl p-7 text-center relative overflow-hidden transition-all hover:-translate-y-1 ${style.card}`}
                >
                  <div className="text-4xl mb-2">{MEDALS[idx]}</div>
                  <h3 className="font-extrabold text-xl text-gray-900 line-clamp-1">
                    {item.builderName}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border bg-white/80 my-2">
                    <span className={`w-2 h-2 rounded-full ${theme.dotClass}`} />
                    <span className="text-gray-700">{item.projects[0]?.community || 'Independent'}</span>
                  </div>

                  {/* Score breakdown metrics */}
                  <div className="pt-4 border-t border-gray-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white/70 rounded-2xl p-2.5">
                      <span className="block font-black text-gray-900 text-base">{item.projectsCount}</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Builds</span>
                    </div>
                    <div className="bg-white/70 rounded-2xl p-2.5">
                      <span className="block font-black text-emerald-700 text-base">{item.completenessScore.toFixed(0)}%</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Complete</span>
                    </div>
                    <div className="bg-white/70 rounded-2xl p-2.5">
                      <span className="block font-black text-blue-700 text-base">{item.compositeScore.toFixed(1)}</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MAIN DATA TABLES WITH COLOR ACCENTS ── */}
        {tab === 'individual' ? (
          <div className="bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-extrabold text-gray-500">
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
                        className={`hover:bg-gray-50/80 transition-colors ${
                          idx === 0 ? 'bg-amber-50/20' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-center font-bold">
                          {idx < 3 ? (
                            <span className="text-xl">{MEDALS[idx]}</span>
                          ) : (
                            <span className="text-gray-400 text-xs font-mono font-bold">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs bg-gradient-to-tr ${theme.gradientClass}`}
                            >
                              {item.builderName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-extrabold text-gray-900">{item.builderName}</p>
                              <p className="text-xs text-gray-400 font-medium">{item.projects[0]?.community}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                            {item.projectsCount} {item.projectsCount === 1 ? 'build' : 'builds'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${Math.min(100, item.completenessScore)}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs font-bold text-emerald-700">
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
                          <span className="font-mono text-base font-extrabold text-gray-900 bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-200">
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
          <div className="bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-extrabold text-gray-500">
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
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-bold">
                          {isComingSoon ? (
                            <span className="text-gray-300 text-xs">-</span>
                          ) : idx === 0 ? (
                            <span className="text-xl">🏆</span>
                          ) : (
                            <span className="text-gray-400 text-xs font-mono font-bold">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${theme.dotClass}`} />
                            <p className="font-extrabold text-gray-900">{comm.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {isComingSoon ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                              Coming Soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Event Held
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-gray-800">
                          {comm.submissionsCount}
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-xs font-semibold text-gray-600">
                          {(comm.repeatBuilderRate * 100).toFixed(0)}%
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isComingSoon ? (
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              Pending
                            </span>
                          ) : (
                            <span className="font-mono text-base font-extrabold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
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
