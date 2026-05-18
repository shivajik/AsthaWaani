import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
  description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan. Subscribe to Asthawaani YouTube channel for daily wisdom.',
  openGraph: {
    title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
    description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan.',
    url: 'https://www.asthawaani.com/videos',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/videos' },
};

const displayVideos = [
  { videoId: 'wRAHgryads0', title: 'पंडित अखिलेश गौड़ जी की चेतावनी! आज नहीं संभले तो देर हो जाएगी।', duration: '13:53' },
  { videoId: 'WkuCencbA9g', title: 'Sankat Mochan Hanuman Ashtak – Asthavaani Version', duration: '5:16' },
  { videoId: '7CHJ-56pf7s', title: 'अंजनी के लाल सालासर वाले | जय बजरंगबली | Salasar ji Balaji', duration: '2:12' },
  { videoId: '_R77olhRj74', title: 'Spiritual Wisdom Session 2', duration: '4:32' },
  { videoId: '8cAb1LM_cfo', title: 'Spiritual Wisdom Session 1', duration: '6:37' },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Spiritual Videos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Watch our latest Satsangs, Bhajans and Pravachans</p>
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <a href={`https://www.youtube.com/watch?v=${displayVideos[0].videoId}`} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
              <img src={`https://i.ytimg.com/vi/${displayVideos[0].videoId}/sddefault.jpg`} alt={displayVideos[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.slice(1).map((video) => (
            <a key={video.videoId} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border">
              <div className="relative aspect-video bg-black overflow-hidden">
                <img src={`https://i.ytimg.com/vi/${video.videoId}/sddefault.jpg`} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
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

        {/* Subscribe CTA */}
        <div className="text-center mt-16">
          <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-colors shadow-lg text-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </main>
  );
}
