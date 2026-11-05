import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportSubmissionsToCSV } from '../services/appState';
import type { CommunityName } from '../types';
import { GithubIcon } from '../components/GithubIcon';
import {
  Shield,
  Download,
  Trash2,
  Lock,
  Unlock,
  Calendar,
  Users,
  CheckCircle2
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    user,
    isAdmin,
    projects,
    communities,
    votingClosed,
    toggleVotingClosed,
    removeProject,
    updateCommunity
  } = useApp();

  const [communityInputs, setCommunityInputs] = useState<
    Record<string, { date: string; attendees: number }>
  >(() => {
    const map: Record<string, { date: string; attendees: number }> = {};
    communities.forEach(c => {
      map[c.name] = {
        date: c.eventDate || '',
        attendees: c.attendeesCount || 0
      };
    });
    return map;
  });

  const [savedCommunity, setSavedCommunity] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#EA4335] flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Admin Access Only</h2>
          <p className="text-sm text-gray-600">
            This panel is restricted to authorized organizers ({user ? user.email : 'not signed in'}).
          </p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#EA4335] mb-1">
            <Shield className="w-4 h-4 text-[#EA4335]" />
            <span>GDG OAU Organizer Console</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Signed in as <span className="font-semibold text-gray-800">{user?.email}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportSubmissionsToCSV(projects)}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-2xs transition-all"
          >
            <Download className="w-4 h-4 text-[#188038]" />
            <span>Export Submissions (CSV)</span>
          </button>

          <button
            onClick={() => toggleVotingClosed(!votingClosed)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              votingClosed
                ? 'bg-[#188038] hover:bg-[#137333] text-white'
                : 'bg-[#EA4335] hover:bg-[#D93025] text-white'
            }`}
          >
            {votingClosed ? (
              <>
                <Unlock className="w-4 h-4" />
                <span>Re-Open Public Voting</span>
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

      <section className="bg-white rounded-3xl border border-gray-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manage Submissions ({projects.length})</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Remove flagged or invalid projects directly from the gallery and leaderboard.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-y border-gray-200 text-xs uppercase font-bold text-gray-500">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Builder</th>
                <th className="px-4 py-3">Community</th>
                <th className="px-4 py-3">Tools</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
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
                    <p className="text-gray-900">{p.builderName}</p>
                    <p className="text-xs text-gray-400">{p.submitterEmail}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 font-semibold text-gray-700">
                      {p.community}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.googleTools.slice(0, 2).map(t => (
                        <span key={t} className="text-[11px] bg-green-50 text-[#188038] px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                      {p.googleTools.length > 2 && (
                        <span className="text-[11px] text-gray-400">+{p.googleTools.length - 2}</span>
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

      <section className="bg-white rounded-3xl border border-gray-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Community Event Dates & Attendees</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure event dates and attendance numbers to activate community score tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((comm) => {
            const current = communityInputs[comm.name] || { date: '', attendees: 0 };
            return (
              <div
                key={comm.name}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4"
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
                    <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Event Date
                    </label>
                    <input
                      type="date"
                      value={current.date}
                      onChange={(e) =>
                        setCommunityInputs({
                          ...communityInputs,
                          [comm.name]: { ...current, date: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg outline-hidden focus:border-[#188038]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Attendee Count
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={current.attendees}
                      onChange={(e) =>
                        setCommunityInputs({
                          ...communityInputs,
                          [comm.name]: { ...current, attendees: parseInt(e.target.value) || 0 }
                        })
                      }
                      placeholder="e.g. 100"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg outline-hidden focus:border-[#188038]"
                    />
                  </div>

                  <button
                    onClick={() => handleCommunitySave(comm.name)}
                    className="w-full py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
