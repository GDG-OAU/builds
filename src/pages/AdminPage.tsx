import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportSubmissionsToCSV } from '../services/appState';
import type { CommunityName } from '../types';
import { GithubIcon } from '../components/GithubIcon';
import { Shield, Download, Trash2, Lock, Unlock, Calendar, Users, CheckCircle2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    user,
    isAdmin,
    projects,
    communities,
    votingClosed,
    toggleVotingClosed,
    removeProject,
    updateCommunity,
  } = useApp();

  const [communityInputs, setCommunityInputs] = useState<
    Record<string, { date: string; attendees: number }>
  >(() => {
    const map: Record<string, { date: string; attendees: number }> = {};
    communities.forEach((c) => {
      map[c.name] = { date: c.eventDate || '', attendees: c.attendeesCount || 0 };
    });
    return map;
  });

  const [savedCommunity, setSavedCommunity] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto text-[#EA4335]">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Admin Access Only</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              This console is restricted to authorized organizers.
              {user && (
                <span className="block font-mono text-xs text-gray-400 mt-2 font-semibold">
                  Signed in as: {user.email}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleCommunitySave = (name: CommunityName) => {
    const input = communityInputs[name];
    if (input) {
      updateCommunity(name, input.date || undefined, Number(input.attendees) || undefined);
      setSavedCommunity(name);
      setTimeout(() => setSavedCommunity(null), 2500);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#EA4335] text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Organizer Console</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Authorized admin: <span className="font-semibold text-gray-800">{user?.email}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => exportSubmissionsToCSV(projects)}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-[#188038]" />
              <span>Export Submissions (CSV)</span>
            </button>

            <button
              onClick={() => toggleVotingClosed(!votingClosed)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-2xs transition-all ${
                votingClosed
                  ? 'bg-[#188038] hover:bg-[#137333] text-white'
                  : 'bg-[#EA4335] hover:bg-[#D93025] text-white'
              }`}
            >
              {votingClosed ? (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Re-open Public Voting</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Close Voting (Reveal Standings)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Submissions Management Section */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Manage Submissions ({projects.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Review submissions or delete invalid/duplicate projects directly from the gallery and leaderboard.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-500">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Builder</th>
                  <th className="px-4 py-3">Community Track</th>
                  <th className="px-4 py-3">Tools</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900">{p.title}</p>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 mt-0.5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span className="truncate max-w-xs">{p.githubUrl}</span>
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-gray-900 font-semibold">{p.builderName}</p>
                      <p className="text-xs text-gray-400">{p.submitterEmail}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 font-semibold text-gray-700">
                        {p.community}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.googleTools.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] bg-green-50 text-[#188038] px-2 py-0.5 rounded font-medium"
                          >
                            {t}
                          </span>
                        ))}
                        {p.googleTools.length > 2 && (
                          <span className="text-[11px] text-gray-400 self-center">
                            +{p.googleTools.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                            removeProject(p.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remove submission"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Community Track Config Section */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Community Track Event Dates & Attendees
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter event dates and attendance numbers to activate community track scores. Tracks without event dates show "Coming Soon".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {communities.map((comm) => {
              const current = communityInputs[comm.name] || { date: '', attendees: 0 };
              return (
                <div
                  key={comm.name}
                  className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 space-y-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-sm">{comm.name}</h3>
                    {savedCommunity === comm.name && (
                      <span className="text-xs text-[#188038] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Event Date
                      </label>
                      <input
                        type="date"
                        value={current.date}
                        onChange={(e) =>
                          setCommunityInputs({
                            ...communityInputs,
                            [comm.name]: { ...current, date: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl outline-hidden focus:border-[#188038] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Attendee Count
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={current.attendees}
                        onChange={(e) =>
                          setCommunityInputs({
                            ...communityInputs,
                            [comm.name]: { ...current, attendees: parseInt(e.target.value) || 0 },
                          })
                        }
                        placeholder="e.g. 100"
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl outline-hidden focus:border-[#188038] transition-colors"
                      />
                    </div>

                    <button
                      onClick={() => handleCommunitySave(comm.name)}
                      className="w-full py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                      Save Track Config
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
