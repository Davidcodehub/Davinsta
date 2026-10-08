import React from 'react';
import { Film, Image as ImageIcon, Layers, Video, LayoutGrid, Search, ArrowUpDown } from 'lucide-react';
import { FilterCategory, SortOption } from '../types';

interface MediaFilterBarProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  categoryCounts: Record<FilterCategory, number>;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
}

export const MediaFilterBar: React.FC<MediaFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  searchQuery,
  onSearchQueryChange,
  sortBy,
  onSortByChange
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 pt-3 md:flex-row md:items-center md:justify-between">
      {/* Category Segmented Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span>All Media</span>
          <span className="ml-1 text-[11px] opacity-75 tabular-nums">({categoryCounts.all})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('reels')}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'reels'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Film className="h-3.5 w-3.5 text-amber-300" />
          <span>Reels</span>
          <span className="ml-1 text-[11px] opacity-75 tabular-nums">({categoryCounts.reels})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('photos')}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'photos'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="h-3.5 w-3.5 text-sky-400" />
          <span>Photos</span>
          <span className="ml-1 text-[11px] opacity-75 tabular-nums">({categoryCounts.photos})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('carousels')}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'carousels'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5 text-emerald-400" />
          <span>Carousels</span>
          <span className="ml-1 text-[11px] opacity-75 tabular-nums">({categoryCounts.carousels})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('videos')}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'videos'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Video className="h-3.5 w-3.5 text-purple-400" />
          <span>IGTV & Video</span>
          <span className="ml-1 text-[11px] opacity-75 tabular-nums">({categoryCounts.videos})</span>
        </button>
      </div>

      {/* Right: Search within media & Sort */}
      <div className="flex items-center gap-3">
        {/* Caption keyword search */}
        <div className="relative flex-1 md:w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Filter by caption..."
            className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:border-rose-500 focus:outline-none"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <ArrowUpDown className="h-3.5 w-3.5 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortOption)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 focus:border-rose-500 focus:outline-none cursor-pointer"
          >
            <option value="latest">Latest</option>
            <option value="most_viewed">Most Viewed</option>
            <option value="most_liked">Most Liked</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};
