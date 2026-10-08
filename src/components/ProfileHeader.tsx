import React from 'react';
import { CheckCircle2, ExternalLink, Download, CheckSquare, Square, FileSpreadsheet, Lock } from 'lucide-react';
import { InstagramProfile } from '../types';

interface ProfileHeaderProps {
  profile: InstagramProfile;
  totalItems: number;
  selectedCount: number;
  onToggleSelectAll: () => void;
  onDownloadAllZip: () => void;
  onExportCsv: () => void;
  isDownloadingZip: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  totalItems,
  selectedCount,
  onToggleSelectAll,
  onDownloadAllZip,
  onExportCsv,
  isDownloadingZip
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toLocaleString();
  };

  const isAllSelected = totalItems > 0 && selectedCount === totalItems;

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left: Avatar + Details */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar with gradient border */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-xl">
              <img
                src={profile.profilePicUrl}
                alt={profile.fullName}
                referrerPolicy="no-referrer"
                className="h-full w-full rounded-full object-cover bg-slate-800"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80';
                }}
              />
            </div>
            {profile.isVerified && (
              <div className="absolute bottom-1 right-1 rounded-full bg-blue-500 p-1 text-white shadow-md">
                <CheckCircle2 className="h-4 w-4 fill-blue-500 text-white" />
              </div>
            )}
          </div>

          {/* User Meta */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-2xl font-bold tracking-tight text-white">{profile.fullName}</h2>
              <span className="text-sm font-semibold text-rose-400">@{profile.username}</span>
              {profile.isPrivate && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                  <Lock className="h-3 w-3" /> Private Account
                </span>
              )}
            </div>

            {profile.category && (
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {profile.category}
              </p>
            )}

            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              {profile.biography}
            </p>

            {profile.externalUrl && (
              <a
                href={profile.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline"
              >
                <span>{profile.externalUrl.replace(/^https?:\/\//, '')}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {/* Metrics Bar with clean unboxed text and tabular numbers */}
            <div className="flex items-center gap-6 pt-2 text-sm text-slate-300">
              <div>
                <span className="font-bold text-white tabular-nums">{formatNumber(profile.postsCount)}</span>
                <span className="ml-1 text-slate-400">posts</span>
              </div>
              <div>
                <span className="font-bold text-white tabular-nums">{formatNumber(profile.followersCount)}</span>
                <span className="ml-1 text-slate-400">followers</span>
              </div>
              <div>
                <span className="font-bold text-white tabular-nums">{formatNumber(profile.followingCount)}</span>
                <span className="ml-1 text-slate-400">following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Batch Action Toolbar */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 self-start w-full sm:w-auto">
          <button
            type="button"
            onClick={onDownloadAllZip}
            disabled={isDownloadingZip || totalItems === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-600/20 hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            <span>Download All as ZIP ({totalItems})</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleSelectAll}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              {isAllSelected ? (
                <>
                  <CheckSquare className="h-3.5 w-3.5 text-rose-400" />
                  <span>Deselect All</span>
                </>
              ) : (
                <>
                  <Square className="h-3.5 w-3.5" />
                  <span>Select All ({totalItems})</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onExportCsv}
              title="Export all media links and captions to CSV"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
