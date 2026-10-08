import React from 'react';
import { Download, X, Layers, Loader2, CheckCircle2 } from 'lucide-react';

interface BatchDownloadBarProps {
  selectedCount: number;
  totalAvailable: number;
  onDownloadZip: () => void;
  onClearSelection: () => void;
  isDownloading: boolean;
  downloadProgress: number;
  downloadStatusText: string;
}

export const BatchDownloadBar: React.FC<BatchDownloadBarProps> = ({
  selectedCount,
  totalAvailable,
  onDownloadZip,
  onClearSelection,
  isDownloading,
  downloadProgress,
  downloadStatusText
}) => {
  if (selectedCount === 0 && !isDownloading) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-rose-500/30 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Info or Progress */}
        <div className="flex-1">
          {isDownloading ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-400" />
                  <span>{downloadStatusText || 'Packaging ZIP archive...'}</span>
                </span>
                <span className="font-mono text-white tabular-nums">{downloadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
                </p>
                <p className="text-xs text-slate-400">
                  Ready to download in original high-definition format
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {!isDownloading && (
            <button
              type="button"
              onClick={onClearSelection}
              className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            type="button"
            onClick={onDownloadZip}
            disabled={isDownloading || selectedCount === 0}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Download Batch ZIP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
