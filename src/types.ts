export type MediaType = 'reel' | 'video' | 'photo' | 'carousel' | 'igtv';

export interface CarouselSlide {
  id: string;
  url: string;
  type: 'photo' | 'video';
  thumbnailUrl?: string;
}

export interface InstagramMediaItem {
  id: string;
  shortcode: string;
  type: MediaType;
  caption: string;
  timestamp: number; // Unix timestamp in seconds
  thumbnailUrl: string;
  displayUrl: string;
  videoUrl?: string;
  audioTitle?: string;
  duration?: number; // duration in seconds for reels/videos
  likeCount: number;
  commentCount: number;
  viewCount?: number;
  carouselItems?: CarouselSlide[];
  dimensions: {
    width: number;
    height: number;
  };
  isReel: boolean;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  isVerified: boolean;
  isPrivate: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  externalUrl?: string;
  category?: string;
  items: InstagramMediaItem[];
}

export type FilterCategory = 'all' | 'reels' | 'photos' | 'carousels' | 'videos';
export type SortOption = 'latest' | 'oldest' | 'most_viewed' | 'most_liked';
