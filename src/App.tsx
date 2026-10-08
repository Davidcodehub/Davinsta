import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { ProfileHeader } from './components/ProfileHeader';
import { MediaFilterBar } from './components/MediaFilterBar';
import { MediaCard } from './components/MediaCard';
import { MediaModal } from './components/MediaModal';
import { BatchDownloadBar } from './components/BatchDownloadBar';
import { SinglePostView } from './components/SinglePostView';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import {
  InstagramProfile,
  InstagramMediaItem,
  FilterCategory,
  SortOption
} from './types';
import {
  fetchInstagramProfile,
  fetchInstagramPostByUrl,
  downloadBatchAsZip
} from './services/api';
import { AlertCircle, Film, Sparkles, Inbox } from 'lucide-react';

export default function App() {
  const [currentUsername, setCurrentUsername] = useState('natgeo');
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [singlePost, setSinglePost] = useState<InstagramMediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters & Sorting
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  // Batch Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatusText, setDownloadStatusText] = useState('');

  // Modal / Lightbox
  const [modalItem, setModalItem] = useState<InstagramMediaItem | null>(null);

  // Fetch initial profile on mount
  useEffect(() => {
    loadProfile('natgeo');
  }, []);

  const loadProfile = async (username: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSinglePost(null);
    setSelectedIds(new Set());

    try {
      const res = await fetchInstagramProfile(username);
      setProfile(res.profile);
      setCurrentUsername(res.profile.username);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to retrieve Instagram profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSinglePost = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetchInstagramPostByUrl(url);
      setSinglePost(res.post);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to extract post from URL.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    if (!profile) return [];
    let list = [...profile.items];

    // Filter by Category
    if (activeCategory === 'reels') {
      list = list.filter((item) => item.type === 'reel' || item.isReel);
    } else if (activeCategory === 'photos') {
      list = list.filter((item) => item.type === 'photo');
    } else if (activeCategory === 'carousels') {
      list = list.filter((item) => item.type === 'carousel');
    } else if (activeCategory === 'videos') {
      list = list.filter((item) => item.type === 'video' || item.type === 'igtv');
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((item) => item.caption.toLowerCase().includes(q) || item.shortcode.toLowerCase().includes(q));
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'latest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'most_liked') return b.likeCount - a.likeCount;
      if (sortBy === 'most_viewed') return (b.viewCount || b.likeCount) - (a.viewCount || a.likeCount);
      return 0;
    });

    return list;
  }, [profile, activeCategory, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    if (!profile) {
      return { all: 0, reels: 0, photos: 0, carousels: 0, videos: 0 };
    }
    return {
      all: profile.items.length,
      reels: profile.items.filter((i) => i.type === 'reel' || i.isReel).length,
      photos: profile.items.filter((i) => i.type === 'photo').length,
      carousels: profile.items.filter((i) => i.type === 'carousel').length,
      videos: profile.items.filter((i) => i.type === 'video' || i.type === 'igtv').length
    };
  }, [profile]);

  // Toggle selection for an item
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Select all or deselect all
  const handleToggleSelectAll = () => {
    if (!profile) return;
    if (selectedIds.size === filteredItems.length && filteredItems.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((i) => i.id)));
    }
  };

  // Batch download selected items as ZIP
  const handleBatchDownloadZip = async () => {
    if (!profile) return;
    const itemsToDownload = profile.items.filter((item) => selectedIds.has(item.id));
    if (itemsToDownload.length === 0) return;

    setIsDownloadingZip(true);
    setDownloadProgress(0);
    setDownloadStatusText(`Preparing ${itemsToDownload.length} files...`);

    try {
      await downloadBatchAsZip(
        itemsToDownload,
        `${profile.username}_instagram_batch_${Date.now()}.zip`,
        (progress, status) => {
          setDownloadProgress(progress);
          setDownloadStatusText(status);
        }
      );
      setTimeout(() => {
        setIsDownloadingZip(false);
        setDownloadProgress(0);
      }, 1200);
    } catch (err) {
      console.error(err);
      setDownloadStatusText('Failed to download batch.');
      setTimeout(() => setIsDownloadingZip(false), 2000);
    }
  };

  // Download all available items as ZIP
  const handleDownloadAllZip = async () => {
    if (!profile || profile.items.length === 0) return;
    setIsDownloadingZip(true);
    setDownloadProgress(0);
    setDownloadStatusText(`Preparing all ${profile.items.length} media items...`);

    try {
      await downloadBatchAsZip(
        profile.items,
        `${profile.username}_all_media_${Date.now()}.zip`,
        (progress, status) => {
          setDownloadProgress(progress);
          setDownloadStatusText(status);
        }
      );
      setTimeout(() => {
        setIsDownloadingZip(false);
        setDownloadProgress(0);
      }, 1200);
    } catch (err) {
      console.error(err);
      setDownloadStatusText('Download error.');
      setTimeout(() => setIsDownloadingZip(false), 2000);
    }
  };

  // Export CSV of links and captions
  const handleExportCsv = () => {
    if (!profile) return;
    const headers = ['Type', 'Shortcode', 'Likes', 'Comments', 'Media URL', 'Caption'];
    const rows = profile.items.map((item) => [
      item.type,
      item.shortcode,
      item.likeCount,
      item.commentCount,
      item.videoUrl || item.displayUrl,
      `"${item.caption.replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${profile.username}_instagram_media.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Modal navigation index
  const modalIndex = useMemo(() => {
    if (!modalItem) return -1;
    return filteredItems.findIndex((i) => i.id === modalItem.id);
  }, [modalItem, filteredItems]);

  const handleNextModal = () => {
    if (modalIndex !== -1 && modalIndex < filteredItems.length - 1) {
      setModalItem(filteredItems[modalIndex + 1]);
    } else if (filteredItems.length > 0) {
      setModalItem(filteredItems[0]);
    }
  };

  const handlePrevModal = () => {
    if (modalIndex > 0) {
      setModalItem(filteredItems[modalIndex - 1]);
    } else if (filteredItems.length > 0) {
      setModalItem(filteredItems[filteredItems.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Bar Header */}
      <Header
        onQuickSelectUser={(user) => {
          loadProfile(user);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCount={selectedIds.size}
        onOpenBatchDrawer={handleBatchDownloadZip}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Search Hero with dual modes and creator shortcuts */}
        <SearchHero
          onSearchUser={(username) => loadProfile(username)}
          onSearchUrl={(url) => loadSinglePost(url)}
          isLoading={isLoading}
          activeUsername={currentUsername}
        />

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          {/* Error Banner */}
          {errorMessage && (
            <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Single Direct Post View (if searched via URL) */}
          {singlePost ? (
            <SinglePostView
              post={singlePost}
              onBackToProfile={() => setSinglePost(null)}
              onOpenModal={(item) => setModalItem(item)}
            />
          ) : profile ? (
            <div className="space-y-8">
              {/* Creator Profile Header */}
              <ProfileHeader
                profile={profile}
                totalItems={filteredItems.length}
                selectedCount={selectedIds.size}
                onToggleSelectAll={handleToggleSelectAll}
                onDownloadAllZip={handleDownloadAllZip}
                onExportCsv={handleExportCsv}
                isDownloadingZip={isDownloadingZip}
              />

              {/* Filter Tabs & Search Bar */}
              <MediaFilterBar
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                categoryCounts={categoryCounts}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />

              {/* Media Grid */}
              {filteredItems.length > 0 ? (
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    activeCategory === 'reels'
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}
                >
                  {filteredItems.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      isSelected={selectedIds.has(item.id)}
                      onToggleSelect={handleToggleSelect}
                      onOpenModal={(selected) => setModalItem(selected)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-16 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400 mb-3">
                    <Inbox className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">No media found</h4>
                  <p className="mt-1 max-w-sm text-xs text-slate-400">
                    No items match the current category or filter query. Try selecting &quot;All Media&quot; or clearing the search text.
                  </p>
                </div>
              )}
            </div>
          ) : null}

          {/* Guide & FAQ Section */}
          <FaqSection />
        </div>
      </main>

      {/* Floating Batch Download Bar */}
      <BatchDownloadBar
        selectedCount={selectedIds.size}
        totalAvailable={filteredItems.length}
        onDownloadZip={handleBatchDownloadZip}
        onClearSelection={() => setSelectedIds(new Set())}
        isDownloading={isDownloadingZip}
        downloadProgress={downloadProgress}
        downloadStatusText={downloadStatusText}
      />

      {/* Fullscreen Video / Lightbox Modal */}
      {modalItem && (
        <MediaModal
          item={modalItem}
          onClose={() => setModalItem(null)}
          onNext={filteredItems.length > 1 ? handleNextModal : undefined}
          onPrev={filteredItems.length > 1 ? handlePrevModal : undefined}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
