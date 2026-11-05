import React from 'react';
import { GdgColorsBar } from './GdgColorsBar';
import { GithubIcon } from './GithubIcon';
import { Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="flex font-mono font-bold text-base">
              <span className="text-[#4285F4]">&lt;</span>
              <span className="text-[#EA4335]">G</span>
              <span className="text-[#FBBC04]">D</span>
              <span className="text-[#188038]">G</span>
              <span className="text-[#4285F4]">&gt;</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Google Developer Groups on Campus</p>
              <p className="text-xs text-gray-500">Obafemi Awolowo University, Ile-Ife</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 flex items-center">
            Built with <Heart className="w-3.5 h-3.5 text-[#EA4335] mx-1 fill-current" /> by the GDG OAU Developer Community
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/GDG-OAU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.bwaioau.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#188038] transition-colors"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <GdgColorsBar />
    </footer>
  );
};
