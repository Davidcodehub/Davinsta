import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Music,
  Heart,
  MessageCircle,
  Copy,
  Check,
  Layers,
  Sparkles
} from 'lucide-react';
import { InstagramMediaItem } from '../types';
import { triggerDirectDownload } from '../services/api';

interface MediaModalProps {
  item: InstagramMediaItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev
}) => {
  if (!item) return null;

  const isVideo = (item.type === 'reel' || item.type === 'video' || item.type === 'igtv') && Boolean(item.videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(item.duration || 0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, isPlaying]);

  // Video time tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (!duration && videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentMediaUrl = item.type === 'carousel' && item.carouselItems
    ? item.carouselItems[activeSlideIndex]?.url || item.displayUrl
    : isVideo && item.videoUrl
    ? item.videoUrl
    : item.displayUrl;

  const handleDownloadCurrent = () => {
    if (isVideo && item.videoUrl) {
      triggerDirectDownload(item.videoUrl, `reel_${item.shortcode}.mp4`);
    } else {
      triggerDirectDownload(currentMediaUrl, `instagram_${item.shortcode}_${activeSlideIndex + 1}.jpg`);
    }
  };

  const handleDownloadAudio = () => {
    if (item.videoUrl) {
      triggerDirectDownload(item.videoUrl, `audio_${item.shortcode}.mp3`);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(item.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl md:flex-row">
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Previous / Next Arrow buttons on desktop */}
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-slate-800 transition-colors cursor-pointer"
            title="Previous Post (Left Arrow)"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 md:right-[390px] top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-slate-800 transition-colors cursor-pointer"
            title="Next Post (Right Arrow)"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Media Viewing Column */}
        <div className="relative flex flex-1 items-center justify-center bg-black overflow-hidden select-none">
          {isVideo ? (
            <div className="relative flex h-full w-full items-center justify-center">
              <video
                ref={videoRef}
                src={item.videoUrl}
                autoPlay
                playsInline
                loop={isLooping}
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="max-h-[85vh] w-auto max-w-full object-contain cursor-pointer"
              />

              {/* Video Controls Bar Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-300 tabular-nums">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700 accent-rose-500"
                  />
                  <span className="text-[11px] font-mono text-slate-300 tabular-nums">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Control Action Buttons */}
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="rounded-lg p-1.5 text-white hover:bg-white/10 transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="rounded-lg p-1.5 text-white hover:bg-white/10 transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsLooping(!isLooping)}
                      className={`rounded-lg p-1.5 transition-colors ${
                        isLooping ? 'text-rose-400 bg-white/10' : 'text-slate-400 hover:text-white'
                      }`}
                      title={isLooping ? 'Looping enabled' : 'Loop disabled'}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Playback speed buttons */}
                  <div className="flex items-center gap-1 rounded-lg bg-black/40 p-1 border border-white/10 text-xs">
                    {[1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleRateChange(rate)}
                        className={`rounded px-1.5 py-0.5 font-medium transition-colors ${
                          playbackRate === rate ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : item.type === 'carousel' && item.carouselItems ? (
            <div className="relative flex h-full w-full items-center justify-center p-4">
              <img
                src={item.carouselItems[activeSlideIndex]?.url}
                alt={`Slide ${activeSlideIndex + 1}`}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
              />

              {/* Carousel navigation controls */}
              {item.carouselItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : item.carouselItems!.length - 1))}
                    className="absolute left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-black transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlideIndex((prev) => (prev < item.carouselItems!.length - 1 ? prev + 1 : 0))}
                    className="absolute right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-black transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Slide dots */}
                  <div className="absolute bottom-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
                    {item.carouselItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeSlideIndex === idx ? 'w-5 bg-rose-500' : 'w-2 bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4">
              <img
                src={item.displayUrl}
                alt="Instagram post"
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Right Info & Download Sidebar */}
        <div className="flex w-full md:w-[380px] shrink-0 flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900/95 p-6 overflow-y-auto">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  {item.type.toUpperCase()} PREVIEW
                </span>
                <span className="text-xs font-mono text-slate-400">#{item.shortcode}</span>
              </div>
              {item.audioTitle && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1.5">
                  <Music className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.audioTitle}</span>
                </div>
              )}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-4 border-y border-slate-800 py-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-400" />
                <span className="font-semibold text-white tabular-nums">
                  {item.likeCount.toLocaleString()}
                </span>{' '}
                likes
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-sky-400" />
                <span className="font-semibold text-white tabular-nums">
                  {item.commentCount.toLocaleString()}
                </span>{' '}
                comments
              </div>
            </div>

            {/* Caption */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Original Caption</span>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCaption ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCaption ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto rounded-lg bg-slate-950 p-3 text-xs leading-relaxed text-slate-200 border border-slate-800/80">
                {item.caption || 'No caption available.'}
              </div>
            </div>

            {/* Carousel slide details if applicable */}
            {item.type === 'carousel' && item.carouselItems && (
              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Layers className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Carousel Slide</span>
                  </span>
                  <span className="font-mono text-slate-400">
                    {activeSlideIndex + 1} of {item.carouselItems.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Download Buttons Section */}
          <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleDownloadCurrent}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 py-3 text-xs font-bold text-white shadow-lg hover:from-rose-500 hover:to-amber-500 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              <span>
                Download {isVideo ? 'Reel Video (1080p MP4)' : 'Current Photo (JPEG)'}
              </span>
            </button>

            {isVideo && (
              <button
                type="button"
                onClick={handleDownloadAudio}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <Music className="h-3.5 w-3.5 text-amber-400" />
                <span>Extract & Download Audio Track (MP3)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => triggerDirectDownload(item.thumbnailUrl, `cover_${item.shortcode}.jpg`)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span>Download Cover Artwork</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
