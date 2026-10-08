import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, ShieldCheck, Zap, DownloadCloud, Music2 } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I download Instagram Reels and videos by username?',
      a: 'Simply type any public Instagram handle (e.g. "natgeo" or "nasa") into the search box and press "Fetch Media". InstaHarvest loads all publicly available reels, videos, carousel albums, and photos. You can click "Download MP4" on any item or click "Download All as ZIP" to grab everything at once.'
    },
    {
      q: 'Can I also download single Reels using direct URLs?',
      a: 'Yes! Toggle to "Direct Post / Reel URL" in the search box, paste any link (e.g. https://www.instagram.com/reel/Cxxxx/), and click Fetch. You can immediately preview and download the video in 1080p MP4 format.'
    },
    {
      q: 'Does it support multi-photo Carousels and audio tracks?',
      a: 'Yes. For carousels, you can view each slide, download individual photos, or download the full album. For Reels, you can download the video MP4 file or click the audio icon to extract the soundtrack as an MP3 file.'
    },
    {
      q: 'Is any login or Instagram account required?',
      a: 'No login, password, or cookies are ever required. All scraping and media extractions are performed against public Instagram data without touching your personal credentials.'
    },
    {
      q: 'What quality are the downloaded media files?',
      a: 'InstaHarvest retrieves media directly in original source fidelity: up to 1080x1920 (1080p Full HD) for vertical Reels and videos, and full uncompressed JPEG resolutions for photography.'
    }
  ];

  return (
    <section id="faq" className="mt-20 border-t border-slate-800 pt-16 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Features highlights */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-14">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 mb-3 border border-rose-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Instant One-Click Fetch</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Load entire creator public archives in seconds without login or authentication.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 mb-3 border border-amber-500/20">
              <DownloadCloud className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Batch ZIP Packaging</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Select multiple reels or entire profiles and package them into an organized ZIP archive.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-3 border border-purple-500/20">
              <Music2 className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Audio & Quality Retention</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Preserve original 1080p MP4 video bitrates and extract standalone audio tracks.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight text-white">Frequently Asked Questions</h3>
          <p className="mt-2 text-sm text-slate-400">
            Everything you need to know about downloading Instagram Reels, videos, and photos.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-white hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm leading-relaxed text-slate-300 border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
