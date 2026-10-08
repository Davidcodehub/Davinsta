import React, { useState, useRef } from 'react';
import {
  Download,
  Play,
  Film,
  Layers,
  Heart,
  MessageCircle,
  Eye,
  Check,
  Maximize2,
  Music,
  Share2
} from 'lucide-react';
import { InstagramMediaItem } from '../types';
import { triggerDirectDownload } from '../services/api';

interface MediaCardProps {
  item: InstagramMediaItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onOpenModal: (item: InstagramMediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onOpenModal
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = (item.type === 'reel' || item.type === 'video' || item.type === 'igtv') && Boolean(item.videoUrl);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch(() => {
          // Autoplay blocked by browser
        });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      setIsPlayingPreview(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toLocaleString();
  };

  const handleDirectDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVideo && item.videoUrl) {
      triggerDirectDownload(item.videoUrl, `reel_${item.shortcode}.mp4`);
    } else {
      triggerDirectDownload(item.displayUrl, `photo_${item.shortcode}.jpg`);
    }
  };

  const handleDownloadAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.videoUrl) {
      triggerDirectDownload(item.videoUrl, `audio_${item.shortcode}.mp3`);
    }
  };

  const handleCopyCaption = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-slate-900 transition-all duration-200 ${
        isSelected
          ? 'border-rose-500 ring-2 ring-rose-500/30'
          : 'border-slate-800 hover:border-slate-700 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Media Container */}
      <div
        onClick={() => onOpenModal(item)}
        className={`relative w-full cursor-pointer overflow-hidden bg-slate-950 ${
          item.isReel ? 'aspect-[9/16]' : 'aspect-square'
        }`}
      >
        {/* Poster / Thumbnail image */}
        <img
          src={item.thumbnailUrl}
          alt={item.caption.slice(0, 50) || 'Instagram media'}
          referrerPolicy="no-referrer"
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isHovered && !isPlayingPreview ? 'scale-105' : 'scale-100'
          } ${isPlayingPreview ? 'opacity-0' : 'opacity-100'}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Live video preview on hover */}
        {isVideo && (
          <video
            ref={videoRef}
            src={item.videoUrl}
            muted
            playsInline
            loop
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              isPlayingPreview ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {/* Top Badges and Selection */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 pointer-events-none z-10">
          {/* Checkbox for batch download */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect(item.id);
            }}
            className={`pointer-events-auto flex h-7 w-7 items-center justify-center rounded-lg border backdrop-blur-md transition-all cursor-pointer ${
              isSelected
                ? 'border-rose-500 bg-rose-600 text-white shadow-md'
                : 'border-white/30 bg-black/40 text-transparent hover:border-white/60 hover:text-white/60'
            }`}
            title={isSelected ? 'Deselect item' : 'Select for batch download'}
          >
            <Check className="h-4 w-4 stroke-[3]" />
          </button>

          {/* Media Type Indicator */}
          <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/10">
            {item.type === 'reel' && (
              <>
                <Film className="h-3 w-3 text-amber-400" />
                <span>REEL {item.duration ? `· ${item.duration}s` : ''}</span>
              </>
            )}
            {item.type === 'carousel' && (
              <>
                <Layers className="h-3 w-3 text-emerald-400" />
                <span>CAROUSEL {item.carouselItems ? `(${item.carouselItems.length})` : ''}</span>
              </>
            )}
            {item.type === 'photo' && <span>PHOTO</span>}
            {item.type === 'igtv' && <span>IGTV</span>}
            {item.type === 'video' && <span>VIDEO</span>}
          </div>
        </div>

        {/* Center Play Icon Indicator on Reels when not previewing */}
        {isVideo && !isPlayingPreview && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
              <Play className="h-5 w-5 fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Dark Scrim overlay for legibility at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Metrics info on thumbnail */}
        <div className="absolute inset-x-0 bottom-0 p-3 z-10 pointer-events-none">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
            {item.viewCount && (
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-slate-300" />
                <span className="tabular-nums">{formatNumber(item.viewCount)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span className="tabular-nums">{formatNumber(item.likeCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5 text-sky-400" />
              <span className="tabular-nums">{formatNumber(item.commentCount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content & Action Area */}
      <div className="flex flex-1 flex-col justify-between p-3.5 bg-slate-900 border-t border-slate-800/80">
        {/* Caption snippet */}
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-300" title={item.caption}>
          {item.caption || 'No caption provided.'}
        </p>

        {/* Audio tag if Reel */}
        {item.audioTitle && (
          <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400 truncate">
            <Music className="h-3 w-3 shrink-0 text-amber-400" />
            <span className="truncate">{item.audioTitle}</span>
          </div>
        )}

        {/* Action Buttons Bar */}
        <div className="mt-3.5 flex items-center gap-1.5 pt-2 border-t border-slate-800">
          {/* Primary Download Button */}
          <button
            type="button"
            onClick={handleDirectDownload}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 py-2 px-2 text-xs font-bold text-white shadow-sm hover:from-rose-500 hover:to-amber-500 transition-all cursor-pointer whitespace-nowrap"
            title={isVideo ? 'Download Reel Video (MP4)' : 'Download Photo (JPEG)'}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download {isVideo ? 'MP4' : 'JPG'}</span>
          </button>

          {/* Quick Audio Extract Button (if Reel) */}
          {isVideo && (
            <button
              type="button"
              onClick={handleDownloadAudio}
              className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              title="Download Audio Track (MP3)"
            >
              <Music className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Copy Caption */}
          <button
            type="button"
            onClick={handleCopyCaption}
            className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            title={copiedCaption ? 'Copied!' : 'Copy Caption & Hashtags'}
          >
            {copiedCaption ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
          </button>

          {/* View Fullscreen Modal */}
          <button
            type="button"
            onClick={() => onOpenModal(item)}
            className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Expand in Fullscreen Player"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
