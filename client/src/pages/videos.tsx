import { useLanguage } from "@/lib/context";
import { Play, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Placeholder data - In a real app, this would come from the YouTube API
const SAMPLE_VIDEOS = [
  {
    id: "J8a-7kL_wFw", // Example ID
    title: "Divine Morning in Vrindavan",
    date: "2024-03-15",
    duration: "12:45",
    thumbnail: "https://images.unsplash.com/photo-1561582209-6c3d4f40d7c7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Understanding the Bhagavad Gita - Chapter 1",
    date: "2024-03-10",
    duration: "45:20",
    thumbnail: "https://images.unsplash.com/photo-1623947158782-965ba95c5240?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Evening Aarti at Prem Mandir",
    date: "2024-03-05",
    duration: "08:30",
    thumbnail: "https://images.unsplash.com/photo-1582556272659-548c4eb53503?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "The Significance of Ekadashi",
    date: "2024-03-01",
    duration: "15:10",
    thumbnail: "https://images.unsplash.com/photo-1544256273-df3e659345a5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Holi Celebration in Mathura",
    date: "2024-02-25",
    duration: "10:05",
    thumbnail: "https://images.unsplash.com/photo-1615967676644-245b0851897d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Meditation for Inner Peace",
    date: "2024-02-20",
    duration: "20:00",
    thumbnail: "https://images.unsplash.com/photo-1599447421405-0c323d216d1a?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Videos() {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Spiritual Wisdom
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Watch our latest discourses, kirtans, and spiritual sessions. 
            Connect with the divine wisdom of Mathura and Vrindavan from anywhere in the world.
          </p>
        </div>

        {/* Featured Video (Latest) */}
        <div className="mb-16">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-secondary/90 rounded-full flex items-center justify-center pl-1 shadow-lg transition-transform group-hover:scale-110">
                <Play className="w-8 h-8 text-secondary-foreground fill-current" />
              </div>
            </div>
            <img 
              src={SAMPLE_VIDEOS[0].thumbnail} 
              alt={SAMPLE_VIDEOS[0].title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full mb-3">
                LATEST VIDEO
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">{SAMPLE_VIDEOS[0].title}</h2>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {SAMPLE_VIDEOS[0].date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {SAMPLE_VIDEOS[0].duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_VIDEOS.slice(1).map((video, index) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 bg-secondary/90 rounded-full flex items-center justify-center pl-1 shadow-lg">
                    <Play className="w-5 h-5 text-secondary-foreground fill-current" />
                  </div>
                </div>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {video.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
            View All Videos on YouTube
          </button>
        </div>

      </div>
    </div>
  );
}
