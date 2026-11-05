import React from 'react';
import { GithubIcon } from './GithubIcon';
import { Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md bg-white">
              <span className="font-mono text-xs text-gray-400">{`{`}</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" />
              </div>
              <span className="font-mono text-xs text-gray-400">{`}`}</span>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 leading-none">
                GDG on Campus OAU
              </p>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide mt-1">
                Builder Jam '26 · Obafemi Awolowo University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/GDG-OAU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              title="GDG OAU GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.bwaioau.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#188038] transition-colors"
              title="Build with AI OAU"
            >
              <Globe className="w-4 h-4" />
            </a>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by GDG OAU
            </span>
          </div>
        </div>
      </div>
      <div className="h-[3px] gdg-bar w-full" />
    </footer>
  );
};
