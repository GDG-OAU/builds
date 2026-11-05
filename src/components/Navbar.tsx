import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GdgColorsBar } from './GdgColorsBar';
import { Menu, X, PlusCircle, Trophy, Grid, Home, Shield, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, signOutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Gallery', path: '/gallery', icon: Grid },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <GdgColorsBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center font-mono font-bold text-lg tracking-tight">
              <span className="text-[#4285F4]">&lt;</span>
              <span className="text-[#EA4335]">G</span>
              <span className="text-[#FBBC04]">D</span>
              <span className="text-[#188038]">G</span>
              <span className="text-[#4285F4]">&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-[#188038] transition-colors">
                GDG on Campus OAU
              </span>
              <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">
                Builder Jam '26 Gallery
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-green-50 text-[#188038] font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#188038]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/admin')
                    ? 'bg-red-50 text-[#EA4335] font-semibold'
                    : 'text-gray-600 hover:text-[#EA4335] hover:bg-red-50/50'
                }`}
              >
                <Shield className="w-4 h-4 text-[#EA4335]" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/submit"
              className="flex items-center space-x-2 bg-[#188038] hover:bg-[#137333] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Project</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-100 text-[#188038] font-bold text-xs flex items-center justify-center">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
                    {user.displayName.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={signOutUser}
                  title="Sign out"
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
                <span>Sign in</span>
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/submit"
              className="bg-[#188038] text-white p-2 rounded-lg text-sm"
              aria-label="Submit Project"
            >
              <PlusCircle className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active ? 'bg-green-50 text-[#188038] font-semibold' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[#EA4335] bg-red-50"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-gray-100">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-100 text-[#188038] font-bold text-xs flex items-center justify-center">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-medium px-2 py-1 bg-red-50 rounded"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  signInWithGoogle();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-gray-50"
              >
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
