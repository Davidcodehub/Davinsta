import React, { useState } from 'react';
import { Search, Link as LinkIcon, AtSign, ArrowRight, Loader2, Clipboard, X, Check } from 'lucide-react';

interface SearchHeroProps {
  onSearchUser: (username: string) => void;
  onSearchUrl: (url: string) => void;
  isLoading: boolean;
  activeUsername: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  onSearchUser,
  onSearchUrl,
  isLoading,
  activeUsername
}) => {
  const [mode, setMode] = useState<'username' | 'url'>('username');
  const [inputValue, setInputValue] = useState('');
  const [copiedState, setCopiedState] = useState(false);

  const presets = [
    { label: '@natgeo', username: 'natgeo', desc: 'Wildlife & Nature' },
    { label: '@nasa', username: 'nasa', desc: 'Space Exploration' },
    { label: '@archdigest', username: 'archdigest', desc: 'Luxury Architecture' },
    { label: '@apple', username: 'apple', desc: 'Shot on iPhone' },
    { label: '@cristiano', username: 'cristiano', desc: 'Sports & Fitness' },
    { label: '@mrbeast', username: 'mrbeast', desc: 'Entertainment' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (mode === 'url' || inputValue.includes('instagram.com/')) {
      onSearchUrl(inputValue.trim());
    } else {
      onSearchUser(inputValue.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputValue(text);
        if (text.includes('instagram.com/')) {
          setMode('url');
        }
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 1500);
      }
    } catch {
      // Clipboard permissions denied
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 px-4 pt-12 pb-14 sm:px-6 lg:px-8">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
        <div className="h-96 w-96 rounded-full bg-gradient-to-tr from-rose-600/30 via-purple-600/20 to-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Title and tagline */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span>Universal Instagram Media Extractor</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Download Instagram Reels, Videos & Photos
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Type any public Instagram username to view all their available reels, videos, carousel photos, and IGTV. Download single items in 1-click or batch download as a ZIP.
        </p>

        {/* Mode Selector */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setMode('username');
                if (inputValue.includes('instagram.com/')) setInputValue('');
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                mode === 'username'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AtSign className="h-4 w-4" />
              <span>Username / Profile</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('url');
                if (!inputValue.includes('instagram.com/')) setInputValue('');
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                mode === 'url'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LinkIcon className="h-4 w-4" />
              <span>Direct Post / Reel URL</span>
            </button>
          </div>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSubmit} className="mt-6 mx-auto max-w-2xl">
          <div className="relative flex items-center rounded-2xl border border-slate-700 bg-slate-900/90 p-1.5 shadow-2xl focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
            <div className="pointer-events-none pl-3 text-slate-400">
              {mode === 'username' ? (
                <AtSign className="h-5 w-5 text-rose-400" />
              ) : (
                <LinkIcon className="h-5 w-5 text-rose-400" />
              )}
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                mode === 'username'
                  ? 'Enter Instagram username (e.g. natgeo, nasa, archdigest)'
                  : 'Paste Instagram Reel or Post URL (e.g. https://www.instagram.com/reel/C...)'
              }
              className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              autoFocus
            />

            {/* Quick Actions inside input */}
            <div className="flex items-center gap-1 pr-1.5">
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue('')}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  title="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="Paste from clipboard"
              >
                {copiedState ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Clipboard className="h-3.5 w-3.5" />}
                <span>Paste</span>
              </button>

              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <span>Fetch Media</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Creator Suggestions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1">Popular creators:</span>
          {presets.map((preset) => (
            <button
              key={preset.username}
              type="button"
              onClick={() => {
                setMode('username');
                setInputValue(preset.username);
                onSearchUser(preset.username);
              }}
              className={`rounded-lg border px-3 py-1.5 font-medium transition-all cursor-pointer ${
                activeUsername.toLowerCase() === preset.username
                  ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{preset.label}</span>
              <span className="ml-1.5 hidden sm:inline text-slate-400">· {preset.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
