import React from 'react';
import { Download, Film, Music, ArrowLeft, Play, Eye, Heart, MessageCircle } from 'lucide-react';
import { InstagramMediaItem } from '../types';
import { triggerDirectDownload } from '../services/api';

interface SinglePostViewProps {
  post: InstagramMediaItem;
  onBackToProfile: () => void;
  onOpenModal: (item: InstagramMediaItem) => void;
}

export const SinglePostView: React.FC<SinglePostViewProps> = ({
  post,
  onBackToProfile,
  onOpenModal
}) => {
  const isVideo = (post.type === 'reel' || post.type === 'video' || post.type === 'igtv') && Boolean(post.videoUrl);

  const handleDownloadVideo = () => {
    if (isVideo && post.videoUrl) {
      triggerDirectDownload(post.videoUrl, `reel_${post.shortcode}.mp4`);
    } else {
      triggerDirectDownload(post.displayUrl, `post_${post.shortcode}.jpg`);
    }
  };

  const handleDownloadAudio = () => {
    if (post.videoUrl) {
      triggerDirectDownload(post.videoUrl, `audio_${post.shortcode}.mp3`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        type="button"
        onClick={onBackToProfile}
        className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Profile Search</span>
      </button>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Player Box */}
          <div
            onClick={() => onOpenModal(post)}
            className="group relative flex aspect-[9/16] md:aspect-auto h-full min-h-[420px] cursor-pointer items-center justify-center bg-black overflow-hidden"
          >
            {isVideo ? (
              <video
                src={post.videoUrl}
                poster={post.thumbnailUrl}
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={post.displayUrl}
                alt="Post preview"
                className="h-full w-full object-contain"
              />
            )}

            {/* Overlay prompt */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                <Play className="h-4 w-4 fill-white" />
                <span>Open Fullscreen Player</span>
              </div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-rose-500/20 px-2.5 py-1 text-xs font-bold text-rose-300 border border-rose-500/30">
                  {post.type.toUpperCase()} READY
                </span>
                <span className="text-xs font-mono text-slate-400">#{post.shortcode}</span>
              </div>

              <h3 className="text-lg font-bold text-white">Extracted Instagram Reel</h3>

              {post.audioTitle && (
                <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-xs text-amber-300">
                  <Music className="h-4 w-4 shrink-0" />
                  <span className="truncate">{post.audioTitle}</span>
                </div>
              )}

              <p className="text-xs leading-relaxed text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                {post.caption}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-slate-800 py-3">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span className="text-white font-semibold">{post.likeCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-sky-400" />
                  <span className="text-white font-semibold">{post.commentCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="mt-6 space-y-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleDownloadVideo}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 py-3 text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-amber-500 transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="h-4 w-4" />
                <span>Download {isVideo ? 'Reel Video (1080p MP4)' : 'Photo (Original HD)'}</span>
              </button>

              {isVideo && (
                <button
                  type="button"
                  onClick={handleDownloadAudio}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  <Music className="h-3.5 w-3.5 text-amber-400" />
                  <span>Download Audio Track (MP3)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
