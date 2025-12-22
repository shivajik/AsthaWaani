import { useLanguage } from "@/lib/context";
import { Play, Calendar, Clock, Eye, ThumbsUp, RefreshCw, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCmsPage } from "@/lib/useCmsPage";

interface Video {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const hoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatViewCount(count: number) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

function VideoSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function Videos() {
  const { t, language } = useLanguage();
  const { data: videoPageData } = useCmsPage("videos");

  // Hardcoded videos - showing only 3 specific videos
  const hardcodedVideos: Video[] = [
    {
      id: "1",
      videoId: "8cAb1LM_cfo",
      title: "ॐ शं शनैश्चराय नमः 108 बार | Shani Dev Mantra Jaap | शनि देव के चमत्कारी मंत्र",
      description: "A wonderful discourse on spiritual wisdom",
      thumbnailUrl: "https://img.youtube.com/vi/8cAb1LM_cfo/maxresdefault.jpg",
      duration: "6:37",
      publishedAt: '2025-09-13T10:00:00Z',
      viewCount: 0,
      likeCount: 0,
      tags: []
    },
    {
      id: "2",
      videoId: "_R77olhRj74",
      title: "How to stay happy forever | Real Happiness Formula by Motivational Speaker Urmil Jain",
      description: "A wonderful discourse on spiritual wisdom",
      thumbnailUrl: "https://img.youtube.com/vi/_R77olhRj74/sddefault.jpg",
      duration: "4:31",
      publishedAt: '2025-12-04T10:00:00Z',
      viewCount: 0,
      likeCount: 0,
      tags: []
    },
    {
      id: "3",
      videoId: "y8WQ15YboH8",
      title: "श्रीनाथ जी के गोवर्धन परिक्रमा पर स्थित जतीपुरा मंदिर की अद्भुत महिमा #srinathji",
      description: "A wonderful discourse on spiritual wisdom",
      thumbnailUrl: "https://img.youtube.com/vi/y8WQ15YboH8/sddefault.jpg",
      duration: "1:26",
      publishedAt: new Date().toISOString(),
      viewCount: 0,
      likeCount: 0,
      tags: []
    },
    {
      id: "4",
      videoId: "zdrdSuRnYNs",
      title: "Morning Workout+Mantra 🔥 | Gym Anthem with Krishna, Shiv, Hanuman & Gayatri mantra.",
      description: "Bhakti + Fitness + Energy - Morning Workout with Krishna Mantras featuring Gym Anthem",
      thumbnailUrl: "https://i.ytimg.com/vi/zdrdSuRnYNs/mqdefault.jpg",
      duration: "3:34",
      publishedAt: "2025-09-08T10:00:00Z",
      viewCount: 12000,
      likeCount: 450,
      tags: ["workout", "mantra", "krishna", "fitness", "bhakti"],
    },
    {
      id: "5",
      videoId: "23jTVAeVHyA",
      title: "आस्थावाणी – आपकी आस्था का सच्चा साथी। Asthawaani",
      description: "Spiritual discourse about being amazed by your words - Aashwaani spiritual channel",
      duration: "0:25",
      thumbnailUrl: "https://i.ytimg.com/vi/23jTVAeVHyA/mqdefault.jpg",
      publishedAt: "2025-09-18T10:00:00Z",
      viewCount: 12000,
      likeCount: 320,
      tags: ["aashwaani", "spiritual", "discourse"],
    },
    {
      id: "6",
      videoId: "zc9SG4i-f64",
      title: "Death came in a beautiful form… and Krishna granted salvation | Putana Moksha Katha",
      description: "Death came in a beautiful form and Krishna granted salvation - Katha from Srimad Bhagavatam",
      thumbnailUrl: "https://i.ytimg.com/vi/zc9SG4i-f64/mqdefault.jpg",
      duration: "36:52",
      publishedAt: "2025-12-08T10:00:00Z",
      viewCount: 5900,
      likeCount: 280,
      tags: ["krishna", "putana", "bhagavatam", "katha", "spiritual"],
    },
    {
      id: "7",
      videoId: "hcEA17tEblc",
      title: "The feet of the devotee are the crown of the Lord - I am the servant of the devotees. Prem Ras Bhajan",
      description: "A soulful Prem Ras bhajan expressing devotion and surrender, highlighting the glory of devotees and love for the Lord.",
      thumbnailUrl: "https://i.ytimg.com/vi/hcEA17tEbLc/sddefault.jpg",
      duration: "1:25",
      publishedAt: "2025-12-07T00:00:00Z",
      viewCount: 3711,
      likeCount: 47,
      tags: ["prem ras", "bhajan", "bhakti", "devotion", "hindu", "spiritual"],
    }
  ];

  // Commented out - Originally fetches from API, now using hardcoded videos
  // const { data: videos, isLoading, error } = useQuery<Video[]>({
  //   queryKey: ["/api/videos"],
  //   queryFn: async () => {
  //     const response = await fetch("/api/videos");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch videos");
  //     }
  //     return response.json();
  //   },
  // });

  const videos = hardcodedVideos;
  const isLoading = false;
  const error = null;

  const openYouTubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div className="pt-40 md:pt-48 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header Section with Animation */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {language === 'en' ? 'Spiritual Wisdom' : 'आध्यात्मिक ज्ञान'}
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {language === 'en' 
              ? 'Watch our latest discourses, kirtans, and spiritual sessions. Connect with the divine wisdom of Mathura and Vrindavan from anywhere in the world.'
              : 'हमारे नवीनतम प्रवचन, कीर्तन और आध्यात्मिक सत्र देखें। दुनिया में कहीं से भी मथुरा और वृंदावन की दिव्य ज्ञान से जुड़ें।'
            }
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground mb-4">
              {language === 'en' ? 'Unable to load videos' : 'वीडियो लोड करने में असमर्थ'}
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && videos?.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block mb-6"
            >
              <Youtube className="w-16 h-16 text-red-500 mx-auto" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">
              {language === 'en' ? 'No Videos Yet' : 'अभी तक कोई वीडियो नहीं'}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {language === 'en' 
                ? 'Videos will appear here once synced from our YouTube channel. Check back soon!'
                : 'हमारे YouTube चैनल से सिंक होने के बाद वीडियो यहां दिखाई देंगे।'
              }
            </p>
          </motion.div>
        )}

        {/* Videos Grid */}
        {!isLoading && !error && videos && videos.length > 0 && (
          <>
            {/* Featured Video (Latest) */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => openYouTubeVideo(videos[0].videoId)}
              >
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg"
                    animate={{ 
                      boxShadow: ["0 0 0 0 rgba(220, 38, 38, 0.4)", "0 0 0 20px rgba(220, 38, 38, 0)", "0 0 0 0 rgba(220, 38, 38, 0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-8 h-8 text-white fill-current" />
                  </motion.div>
                </motion.div>
                <img 
                  src={videos[0].thumbnailUrl} 
                  alt={videos[0].title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <motion.span 
                    className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {language === 'en' ? 'LATEST VIDEO' : 'नवीनतम वीडियो'}
                  </motion.span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{videos[0].title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {formatDate(videos[0].publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {videos[0].duration}
                    </span>
                    {videos[0].viewCount > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> {formatViewCount(videos[0].viewCount)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Video Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {videos.slice(1).map((video, index) => (
                  <motion.div 
                    key={video.id}
                    variants={itemVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-border cursor-pointer"
                    onClick={() => openYouTubeVideo(video.videoId)}
                    data-testid={`card-video-${video.id}`}
                  >
                    <motion.div 
                      className="relative aspect-video bg-muted overflow-hidden"
                      variants={hoverVariants}
                    >
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg">
                          <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                      </motion.div>
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </motion.div>
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(video.publishedAt)}
                        </span>
                        {video.viewCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {formatViewCount(video.viewCount)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a 
            href="https://www.youtube.com/@Asthawaani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="link-youtube-channel"
          >
            <Youtube className="w-5 h-5" />
            {language === 'en' ? 'Subscribe on YouTube' : 'YouTube पर सब्सक्राइब करें'}
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}
