import type { InstagramProfile, InstagramMediaItem } from '../types.ts';

// Curated high quality videos and images with reliable CDN URLs that support direct playback and CORS downloading
const SAMPLE_VIDEOS = [
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    duration: 15,
    title: 'Original Audio - Wild Nature Sounds'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    duration: 15,
    title: 'Acoustic Sunset Beats · Ambient Flow'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    duration: 60,
    title: 'Trending Reel Sound · Urban Vibes'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    duration: 15,
    title: 'Cinematic Orchestral · Studio Master'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    duration: 15,
    title: 'Deep Bass Lo-Fi · Late Night Sessions'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    duration: 45,
    title: 'Mountain Echoes · Original Audio'
  }
];

export const CURATED_PROFILES: Record<string, InstagramProfile> = {
  natgeo: {
    username: 'natgeo',
    fullName: 'National Geographic',
    biography: 'Inspiring people to care about the planet since 1888. Discover extraordinary stories from around the globe. 🌍📸',
    profilePicUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&h=300&q=80',
    isVerified: true,
    isPrivate: false,
    postsCount: 28410,
    followersCount: 283000000,
    followingCount: 142,
    externalUrl: 'https://www.nationalgeographic.com',
    category: 'Media / News Company',
    items: [
      {
        id: 'ng-reel-1',
        shortcode: 'C9xK401_A',
        type: 'reel',
        isReel: true,
        caption: 'Beneath the turquoise waters of the Galápagos, marine iguanas graze on underwater algae like miniature prehistoric sea dragons. Video by @paulnicklen with @sea_legacy.',
        timestamp: Date.now() / 1000 - 3600 * 4,
        thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[0].videoUrl,
        audioTitle: 'Galápagos Oceanic Ambience - Paul Nicklen',
        duration: 24,
        likeCount: 482100,
        commentCount: 3820,
        viewCount: 2950000,
        dimensions: { width: 1080, height: 1920 }
      },
      {
        id: 'ng-reel-2',
        shortcode: 'C9wJ290_B',
        type: 'reel',
        isReel: true,
        caption: 'A golden eagle soaring over the snow-dusted Karakoram range at 18,000 feet altitude. Pure grace and predatory precision. Captured on 4K RED Cinema.',
        timestamp: Date.now() / 1000 - 3600 * 22,
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[1].videoUrl,
        audioTitle: 'Alpine Wind Echoes · NatGeo Sound Lab',
        duration: 32,
        likeCount: 612400,
        commentCount: 4910,
        viewCount: 4210000,
        dimensions: { width: 1080, height: 1920 }
      },
      {
        id: 'ng-post-1',
        shortcode: 'C9vP771_C',
        type: 'carousel',
        isReel: false,
        caption: 'The ancient baobabs of Madagascar standing sentinel against the Milky Way. Swipe through to see the astronomical timelapse and canopy details. Photos by @babaktafreshi.',
        timestamp: Date.now() / 1000 - 3600 * 48,
        thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        likeCount: 924300,
        commentCount: 5820,
        carouselItems: [
          { id: 'ng-car-1', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', type: 'photo' },
          { id: 'ng-car-2', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', type: 'photo' },
          { id: 'ng-car-3', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', type: 'photo' }
        ],
        dimensions: { width: 1080, height: 1350 }
      },
      {
        id: 'ng-reel-3',
        shortcode: 'C9tM112_D',
        type: 'reel',
        isReel: true,
        caption: 'Night dive with bioluminescent plankton along the coral reefs of Raja Ampat. Every stroke ignites the sea in electric neon blue.',
        timestamp: Date.now() / 1000 - 3600 * 72,
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[2].videoUrl,
        audioTitle: 'Raja Ampat Bioluminescence - Field Recording',
        duration: 18,
        likeCount: 749000,
        commentCount: 6100,
        viewCount: 5100000,
        dimensions: { width: 1080, height: 1920 }
      },
      {
        id: 'ng-photo-2',
        shortcode: 'C9rT998_E',
        type: 'photo',
        isReel: false,
        caption: 'A red fox paused in heavy Siberian snowfall, ears angled forward listening for movement deep beneath the powder. Photo by @sergey_gorshkov.',
        timestamp: Date.now() / 1000 - 3600 * 96,
        thumbnailUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
        likeCount: 883000,
        commentCount: 4120,
        dimensions: { width: 1080, height: 1080 }
      },
      {
        id: 'ng-igtv-1',
        shortcode: 'C9pX334_F',
        type: 'igtv',
        isReel: false,
        caption: 'Deep Ocean Expedition 2026: 45 Minutes Inside the Mariana Trench Exploration Submersible. Full documentary segment.',
        timestamp: Date.now() / 1000 - 3600 * 120,
        thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[3].videoUrl,
        audioTitle: 'Mariana Trench Chronicles · Documentary Score',
        duration: 185,
        likeCount: 512000,
        commentCount: 3990,
        viewCount: 3400000,
        dimensions: { width: 1920, height: 1080 }
      }
    ]
  },
  nasa: {
    username: 'nasa',
    fullName: 'NASA',
    biography: 'Exploring the secrets of the universe for the benefit of all. Discover our latest missions, Webb Telescope findings, and Mars rovers. 🚀✨',
    profilePicUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=300&h=300&q=80',
    isVerified: true,
    isPrivate: false,
    postsCount: 4105,
    followersCount: 97800000,
    followingCount: 68,
    externalUrl: 'https://www.nasa.gov',
    category: 'Government Organization',
    items: [
      {
        id: 'nasa-reel-1',
        shortcode: 'C9zL881_X',
        type: 'reel',
        isReel: true,
        caption: 'Spectacular aurora borealis photographed from the International Space Station as it flew over North America at 17,500 mph! Video courtesy NASA ISS Crew.',
        timestamp: Date.now() / 1000 - 3600 * 6,
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[4].videoUrl,
        audioTitle: 'Interstellar Soundscapes · NASA Audio Library',
        duration: 28,
        likeCount: 1240000,
        commentCount: 9400,
        viewCount: 6800000,
        dimensions: { width: 1080, height: 1920 }
      },
      {
        id: 'nasa-reel-2',
        shortcode: 'C9yM554_Y',
        type: 'reel',
        isReel: true,
        caption: 'Artemis rocket static fire test at Stennis Space Center. Generating over 8.8 million pounds of maximum thrust in 4K high speed slow motion.',
        timestamp: Date.now() / 1000 - 3600 * 18,
        thumbnailUrl: 'https://images.unsplash.com/photo-1517976487507-5b3b4a45091a?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1517976487507-5b3b4a45091a?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[5].videoUrl,
        audioTitle: 'Rocket Acoustics & Thunder Engine Sound',
        duration: 36,
        likeCount: 882000,
        commentCount: 6200,
        viewCount: 4900000,
        dimensions: { width: 1080, height: 1920 }
      },
      {
        id: 'nasa-post-1',
        shortcode: 'C9xK221_Z',
        type: 'carousel',
        isReel: false,
        caption: 'James Webb Space Telescope captures the Pillars of Creation in unprecedented mid-infrared resolution, revealing newborn stars hidden within cosmic dust clouds.',
        timestamp: Date.now() / 1000 - 3600 * 36,
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        likeCount: 1540000,
        commentCount: 11200,
        carouselItems: [
          { id: 'nasa-car-1', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', type: 'photo' },
          { id: 'nasa-car-2', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80', type: 'photo' },
          { id: 'nasa-car-3', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80', type: 'photo' }
        ],
        dimensions: { width: 1080, height: 1350 }
      },
      {
        id: 'nasa-photo-1',
        shortcode: 'C9wH119_W',
        type: 'photo',
        isReel: false,
        caption: 'Martian sunset captured by the Perseverance Rover in Jezero Crater. The thin atmosphere scatters blue light toward the sun, creating an alien twilight.',
        timestamp: Date.now() / 1000 - 3600 * 60,
        thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
        likeCount: 960000,
        commentCount: 7800,
        dimensions: { width: 1080, height: 1080 }
      }
    ]
  },
  archdigest: {
    username: 'archdigest',
    fullName: 'Architectural Digest',
    biography: 'The international design authority. Inside the world’s most extraordinary private homes, luxury architecture, and visionary interiors. 🏛️',
    profilePicUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&h=300&q=80',
    isVerified: true,
    isPrivate: false,
    postsCount: 11200,
    followersCount: 10900000,
    followingCount: 840,
    externalUrl: 'https://www.architecturaldigest.com',
    category: 'Design & Architecture',
    items: [
      {
        id: 'ad-reel-1',
        shortcode: 'C9vR300_A',
        type: 'reel',
        isReel: true,
        caption: 'Inside a brutalist concrete villa cantilevered over the cliffs of Mallorca, featuring an infinity pool merging into the Mediterranean horizon.',
        timestamp: Date.now() / 1000 - 3600 * 8,
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[1].videoUrl,
        audioTitle: 'Minimalist Architecture Chill · AD Sound',
        duration: 22,
        likeCount: 310000,
        commentCount: 2150,
        viewCount: 2200000,
        dimensions: { width: 1080, height: 1920 }
      },
      {
        id: 'ad-post-1',
        shortcode: 'C9uQ772_B',
        type: 'carousel',
        isReel: false,
        caption: 'Step inside this 19th-century Parisian Haussmann apartment renovated with custom marble fireplaces, chevron parquet, and Pierre Jeanneret chairs.',
        timestamp: Date.now() / 1000 - 3600 * 30,
        thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        likeCount: 245000,
        commentCount: 1840,
        carouselItems: [
          { id: 'ad-car-1', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', type: 'photo' },
          { id: 'ad-car-2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', type: 'photo' },
          { id: 'ad-car-3', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', type: 'photo' }
        ],
        dimensions: { width: 1080, height: 1350 }
      },
      {
        id: 'ad-reel-2',
        shortcode: 'C9tN884_C',
        type: 'reel',
        isReel: true,
        caption: 'Open House Tour: A serene Kyoto minka transformed into a minimalist sanctuary with tatami suites and an inner moss garden.',
        timestamp: Date.now() / 1000 - 3600 * 55,
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        displayUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        videoUrl: SAMPLE_VIDEOS[0].videoUrl,
        audioTitle: 'Zen Garden Meditations · Kyoto Sessions',
        duration: 35,
        likeCount: 420000,
        commentCount: 3100,
        viewCount: 3100000,
        dimensions: { width: 1080, height: 1920 }
      }
    ]
  }
};

// Generate procedural realistic Instagram public media for any custom username
export function generateProceduralProfile(username: string): InstagramProfile {
  const cleanUser = username.trim().toLowerCase().replace(/^@/, '');
  const seed = cleanUser.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const displayNames: Record<string, string> = {
    cristiano: 'Cristiano Ronaldo',
    leomessi: 'Leo Messi',
    selenagomez: 'Selena Gomez',
    kyliejenner: 'Kylie Jenner',
    therock: 'Dwayne Johnson',
    arianagrande: 'Ariana Grande',
    kimkardashian: 'Kim Kardashian',
    beyonce: 'Beyoncé',
    mrbeast: 'MrBeast',
    apple: 'Apple Inc.',
    nike: 'Nike'
  };

  const fullName = displayNames[cleanUser] || cleanUser.charAt(0).toUpperCase() + cleanUser.slice(1);
  const postsCount = 200 + (seed * 17) % 3500;
  const followersCount = 10000 + (seed * 123456) % 95000000;
  const followingCount = 80 + (seed * 7) % 1500;

  const photoPool = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80'
  ];

  const captions = [
    'Chasing golden light and quiet moments where the city meets the ocean. 🌅 #visualsoflife #reels',
    'Behind the scenes of our latest production. Turn sound ON! 🎧🔥 #creator #trending',
    'A series of frames captured during yesterday’s spontaneous road trip through the pass. Which slide is your favorite? 1, 2, or 3?',
    'Consistency over intensity. Daily movement, fresh air, and deep focus. ⚡️ #lifestyle #energy',
    'The architecture in this neighborhood never ceases to inspire new ideas. Swipe through for angles.',
    'Full studio session recap! Drop a comment if you want the breakdown video dropping tomorrow.',
    'Early morning mist clearing over the ridge. Nothing beats starting the day like this. 🌲🏔️',
    'Testing out the new cinema prime lenses in low light conditions. The bokeh is breathtaking.'
  ];

  const items: InstagramMediaItem[] = [];

  // Generate 8 rich media items (reels, carousels, videos, photos)
  for (let i = 0; i < 8; i++) {
    const isReel = i % 2 === 0;
    const isCarousel = i === 3 || i === 7;
    const isIgtv = i === 5;
    const videoData = SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length];
    const photoUrl = photoPool[(seed + i) % photoPool.length];
    const shortcode = `C${(seed + i * 19).toString(36).toUpperCase()}_${i}`;

    let type: InstagramMediaItem['type'] = 'photo';
    if (isReel) type = 'reel';
    else if (isCarousel) type = 'carousel';
    else if (isIgtv) type = 'igtv';

    const item: InstagramMediaItem = {
      id: `${cleanUser}-item-${i + 1}`,
      shortcode,
      type,
      isReel,
      caption: captions[i % captions.length],
      timestamp: Math.floor(Date.now() / 1000 - (i * 3600 * 18 + 7200)),
      thumbnailUrl: photoUrl,
      displayUrl: photoUrl,
      likeCount: 4500 + ((seed * (i + 1)) % 85000),
      commentCount: 120 + ((seed * (i + 3)) % 1400),
      dimensions: isReel ? { width: 1080, height: 1920 } : isCarousel ? { width: 1080, height: 1350 } : { width: 1080, height: 1080 }
    };

    if (isReel || isIgtv) {
      item.videoUrl = videoData.videoUrl;
      item.duration = videoData.duration;
      item.audioTitle = videoData.title;
      item.viewCount = item.likeCount * 4 + 15000;
    }

    if (isCarousel) {
      item.carouselItems = [
        { id: `${cleanUser}-slide-${i}-1`, url: photoPool[(seed + i) % photoPool.length], type: 'photo' },
        { id: `${cleanUser}-slide-${i}-2`, url: photoPool[(seed + i + 1) % photoPool.length], type: 'photo' },
        { id: `${cleanUser}-slide-${i}-3`, url: photoPool[(seed + i + 2) % photoPool.length], type: 'photo' }
      ];
    }

    items.push(item);
  }

  return {
    username: cleanUser,
    fullName,
    biography: `Creator, visual storyteller & creative director based worldwide. Sharing reels, films & photography daily. ✨ Contact: colabs@${cleanUser}.com`,
    profilePicUrl: `https://images.unsplash.com/photo-${1534528741775 + (seed % 50000)}?auto=format&fit=crop&w=300&h=300&q=80`,
    isVerified: followersCount > 100000,
    isPrivate: false,
    postsCount,
    followersCount,
    followingCount,
    externalUrl: `https://${cleanUser}.link`,
    category: 'Digital Creator',
    items
  };
}
