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
        scrolled ? 'nav-frosted shadow-xs' : 'bg-white/90 backdrop-blur-xs'
      }`}
    >
      <div className="h-[3px] gdg-bar w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo badge with inspo bracket style */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gdg-green-light border border-green-200 shadow-2xs group-hover:scale-105 transition-all">
              <span className="font-mono text-xs font-bold text-gray-500">{`{`}</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gdg-blue" />
                <span className="w-2 h-2 rounded-full bg-gdg-red" />
                <span className="w-2 h-2 rounded-full bg-gdg-yellow" />
                <span className="w-2 h-2 rounded-full bg-gdg-green" />
              </div>
              <span className="text-xs font-extrabold tracking-tight text-gray-900 ml-1">
                Builder Jam
              </span>
              <span className="font-mono text-xs font-bold text-gray-500">{`}`}</span>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-gray-500 tracking-wider uppercase">
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
                  className={`text-sm font-bold transition-colors ${
                    active ? 'text-gdg-green font-extrabold' : 'text-gray-700 hover:text-gdg-green'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-bold transition-colors flex items-center gap-1 ${
                  location.pathname === '/admin' ? 'text-gdg-red font-extrabold' : 'text-gray-600 hover:text-gdg-red'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-gdg-red" />
                Admin
              </Link>
            )}
          </nav>

          {/* Right Action Buttons - VIBRANT GDG COLORS */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/submit"
              className="flex items-center gap-1.5 bg-gdg-green hover:bg-gdg-green-hover text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md shadow-green-200 transition-all hover:scale-105 active:scale-95"
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
                  <div className="w-8 h-8 rounded-full bg-gdg-green text-white font-bold text-xs flex items-center justify-center">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={signOutUser}
                  className="p-1.5 text-gray-400 hover:text-gdg-red rounded-full hover:bg-gdg-red-light transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 text-xs font-extrabold text-white bg-gdg-blue hover:bg-gdg-blue-hover rounded-full px-5 py-2.5 shadow-md shadow-blue-200 transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#ffffff" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#ffffff" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#ffffff" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"/>
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
                  className={`block px-3 py-2 rounded-lg text-sm font-bold ${
                    location.pathname === item.path
                      ? 'bg-gdg-green-light text-gdg-green'
                      : 'text-gray-700 hover:text-gdg-green hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/submit"
                className="block text-center bg-gdg-green text-white text-sm font-bold px-4 py-2.5 rounded-full mt-2 shadow-md shadow-green-200"
              >
                Submit Project
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gdg-red"
                >
                  <Shield className="w-4 h-4" /> Admin Console
                </Link>
              )}

              <div className="pt-3 border-t border-gray-100 mt-2">
                {user ? (
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="text-sm font-bold text-gray-900">{user.displayName}</span>
                    <button
                      onClick={signOutUser}
                      className="text-xs text-gdg-red font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="w-full text-center bg-gdg-blue text-white text-sm font-bold py-2.5 rounded-full shadow-md shadow-blue-200"
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
