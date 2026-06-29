'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/language-context';
import { SITE_VIDEOS } from './videos-data';

const displayVideos = SITE_VIDEOS;


export default function VideosClient() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  return (
    <main className="min-h-screen pt-32 md:pt-36 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{hi ? 'आध्यात्मिक वीडियो' : 'Spiritual Videos'}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{hi ? 'हमारे नवीनतम सत्संग, भजन और प्रवचन देखें' : 'Watch our latest Satsangs, Bhajans and Pravachans'}</p>
        </div>

        <div className="mb-12">
          <a href={`https://www.youtube.com/watch?v=${displayVideos[0].videoId}`} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
              <img src={displayVideos[0].thumbnailUrl} alt={displayVideos[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                  <svg className="w-10 h-10 fill-current ml-1" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded">{displayVideos[0].duration}</div>
            </div>
            <h2 className="text-xl font-serif font-bold text-center mt-4 text-[hsl(225,55%,35%)]">{displayVideos[0].title}</h2>
          </a>
        </div>

        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[hsl(225,55%,35%)]">
                {hi ? 'आस्थावाणी प्लेलिस्ट' : 'Asthawaani Playlist'}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {hi ? 'हमारी क्यूरेटेड यूट्यूब प्लेलिस्ट देखें' : 'Watch our curated YouTube playlist'}
              </p>
            </div>
            <a
              href="https://www.youtube.com/playlist?list=PLegEhEFSX6VqQ8DapSEgpZF22FRHeUPpa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              {hi ? 'यूट्यूब पर खोलें' : 'Open on YouTube'} →
            </a>
          </div>
          <div className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl bg-black">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLegEhEFSX6VqQ8DapSEgpZF22FRHeUPpa"
              title={hi ? 'आस्थावाणी प्लेलिस्ट' : 'Asthawaani Playlist'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.slice(1).map((video) => (
            <a key={video.videoId} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border">
              <div className="relative aspect-video bg-black overflow-hidden">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    <svg className="w-7 h-7 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{video.duration}</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-[hsl(225,55%,35%)] line-clamp-2 group-hover:text-amber-600 transition-colors">{video.title}</h3>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-colors shadow-lg text-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {hi ? 'यूट्यूब पर सब्सक्राइब करें' : 'Subscribe on YouTube'}
          </a>
        </div>
      </div>
    </main>
  );
}