import React from 'react';
import { Film, Sparkles, Download, Layers } from 'lucide-react';

interface HeaderProps {
  onQuickSelectUser: (username: string) => void;
  selectedCount: number;
  onOpenBatchDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuickSelectUser, selectedCount, onOpenBatchDrawer }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title wordmark */}
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md shadow-rose-500/20 text-white">
            <Film className="h-5 w-5" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-white">InstaHarvest</span>
            <span className="text-xs font-semibold text-rose-400">Media</span>
          </div>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onQuickSelectUser('natgeo')}
            className="hover:text-white transition-colors cursor-pointer text-sm"
          >
            Reels Downloader
          </button>
          <button
            onClick={() => onQuickSelectUser('nasa')}
            className="hover:text-white transition-colors cursor-pointer text-sm"
          >
            Photo & Carousel
          </button>
          <button
            onClick={() => onQuickSelectUser('archdigest')}
            className="hover:text-white transition-colors cursor-pointer text-sm"
          >
            IGTV & Video
          </button>
          <a
            href="#faq"
            className="hover:text-white transition-colors text-sm"
          >
            Guide & FAQ
          </a>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-3">
          {selectedCount > 0 && onOpenBatchDrawer && (
            <button
              onClick={onOpenBatchDrawer}
              className="flex items-center gap-2 rounded-lg bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 transition-colors whitespace-nowrap"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Batch Queue ({selectedCount})</span>
            </button>
          )}

          <button
            onClick={() => onQuickSelectUser('natgeo')}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Load @natgeo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
