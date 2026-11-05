import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, LogOut, Shield, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, signOutUser } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navLinks = [
    { label: 'Main Event', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'nav-frosted shadow-xs' : 'bg-white/80 backdrop-blur-xs'
      }`}
    >
      <div className="h-[3px] gdg-bar w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo badge with inspo bracket style */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white shadow-2xs group-hover:border-gray-300 transition-all">
              <span className="font-mono text-xs font-bold text-gray-400">{`{`}</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
                <span className="w-2 h-2 rounded-full bg-[#188038]" />
              </div>
              <span className="text-xs font-bold tracking-tight text-gray-900 ml-1">
                Builder Jam
              </span>
              <span className="font-mono text-xs font-bold text-gray-400">{`}`}</span>
            </div>
            <span className="hidden sm:inline-block text-xs font-medium text-gray-400 tracking-wider uppercase">
              OAU
            </span>
          </Link>

          {/* Centered navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-black ${
                    active ? 'text-black font-semibold' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === '/admin' ? 'text-red-600 font-semibold' : 'text-gray-500 hover:text-red-600'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/submit"
              className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              Submit Project
            </Link>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#188038] text-white font-bold text-xs flex items-center justify-center">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={signOutUser}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"/>
                </svg>
                Sign In
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden p-2 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-gray-100 text-black font-semibold'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/submit"
                className="block text-center bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-full mt-2"
              >
                Submit Project
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600"
                >
                  <Shield className="w-4 h-4" /> Admin Console
                </Link>
              )}

              <div className="pt-3 border-t border-gray-100 mt-2">
                {user ? (
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="text-sm font-medium text-gray-900">{user.displayName}</span>
                    <button
                      onClick={signOutUser}
                      className="text-xs text-red-600 font-semibold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="w-full text-center border border-gray-200 text-gray-800 text-sm font-semibold py-2 rounded-full"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
