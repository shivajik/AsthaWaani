import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw, Youtube, Check, AlertCircle, Video, Users } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface SyncResult {
  success: boolean;
  channel: {
    channelName: string;
    subscriberCount: number;
  };
  newVideos: number;
  updatedVideos: number;
  totalVideos: number;
}

export default function Admin() {
  const [channelId, setChannelId] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: videos } = useQuery({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) return [];
      return response.json();
    },
  });

  const syncMutation = useMutation({
    mutationFn: async (channelId: string): Promise<SyncResult> => {
      const response = await fetch("/api/sync-youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to sync");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Sync Successful!",
        description: `Synced ${data.totalVideos} videos from ${data.channel.channelName}. New: ${data.newVideos}, Updated: ${data.updatedVideos}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Sync Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSync = () => {
    if (!channelId.trim()) {
      toast({
        title: "Channel ID Required",
        description: "Please enter a YouTube channel ID",
        variant: "destructive",
      });
      return;
    }
    syncMutation.mutate(channelId.trim());
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-secondary mb-2">YouTube Channel Sync</h1>
          <p className="text-muted-foreground">
            Manage and sync videos from your YouTube channel
          </p>
        </motion.div>

        <div className="grid gap-6">
          {/* Stats Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{videos?.length || 0}</p>
                  <p className="text-muted-foreground text-sm">Synced Videos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Asthawaani</p>
                  <p className="text-muted-foreground text-sm">YouTube Channel</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sync Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  Sync from YouTube
                </CardTitle>
                <CardDescription>
                  Enter your YouTube channel ID to fetch and sync all videos. You can find your channel ID in your YouTube channel URL or settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter YouTube Channel ID (e.g., UCxxxxxxxxxxxxxxxx)"
                    value={channelId}
                    onChange={(e) => setChannelId(e.target.value)}
                    className="flex-1"
                    data-testid="input-channel-id"
                  />
                  <Button 
                    onClick={handleSync}
                    disabled={syncMutation.isPending}
                    className="gap-2"
                    data-testid="button-sync"
                  >
                    {syncMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Sync Now
                      </>
                    )}
                  </Button>
                </div>

                {syncMutation.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Sync Complete!</p>
                      <p className="text-sm text-green-700">
                        Channel: {syncMutation.data.channel.channelName}<br />
                        New videos: {syncMutation.data.newVideos}, Updated: {syncMutation.data.updatedVideos}
                      </p>
                    </div>
                  </motion.div>
                )}

                {syncMutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Sync Failed</p>
                      <p className="text-sm text-red-700">{syncMutation.error.message}</p>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm">How to find your Channel ID:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Go to your YouTube channel page</li>
                    <li>Click on your channel avatar or name</li>
                    <li>The URL will contain your channel ID (looks like UCxxxxxxxxxxxxxxxxxx)</li>
                    <li>Or go to YouTube Studio → Settings → Channel → Advanced settings</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Videos */}
          {videos && videos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Synced Videos</CardTitle>
                  <CardDescription>Last {Math.min(5, videos.length)} videos in database</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {videos.slice(0, 5).map((video: any) => (
                      <div key={video.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{video.title}</p>
                          <p className="text-xs text-muted-foreground">{video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
