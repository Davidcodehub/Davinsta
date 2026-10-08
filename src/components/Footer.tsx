import React from 'react';
import { Film } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 text-xs text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-tr from-amber-500 to-rose-600 text-white">
            <Film className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-slate-300">InstaHarvest</span>
          <span aria-hidden="true">·</span>
          <span>Reels, Video & Photo Downloader</span>
        </div>

        <p className="text-center text-[11px] text-slate-400 max-w-md">
          Not affiliated with or endorsed by Instagram or Meta. Content rights belong to their respective creators. Designed for personal backup and educational use.
        </p>

        <div className="flex items-center gap-5 text-slate-400">
          <span>High Definition 1080p</span>
          <span aria-hidden="true">·</span>
          <span>Zero Watermark</span>
          <span aria-hidden="true">·</span>
          <span>Fast ZIP Batching</span>
        </div>
      </div>
    </footer>
  );
};
