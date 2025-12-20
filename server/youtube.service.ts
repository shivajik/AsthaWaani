import { InsertVideo } from "@shared/schema";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  subscriberCount: number;
}

export class YouTubeService {
  private apiKey: string;
  private baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Resolve a YouTube handle (like @Asthawaani) to a channel ID
  async resolveHandle(handle: string): Promise<string | null> {
    try {
      // Remove @ if present
      const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
      
      // Use the search endpoint to find the channel by handle/username
      // Note: We search for the handle and filter by channel type
      const url = `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(cleanHandle)}&type=channel&maxResults=1&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return null;
      }

      return data.items[0].id.channelId;
    } catch (error) {
      console.error("Error resolving handle:", error);
      throw error;
    }
  }

  async getChannelInfo(channelId: string): Promise<YouTubeChannel | null> {
    try {
      const url = `${this.baseUrl}/channels?part=snippet,statistics&id=${channelId}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return null;
      }

      const channel = data.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnailUrl: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url,
        subscriberCount: parseInt(channel.statistics.subscriberCount || "0"),
      };
    } catch (error) {
      console.error("Error fetching channel info:", error);
      throw error;
    }
  }

  async getChannelVideos(channelId: string, maxResults: number = 50): Promise<YouTubeVideo[]> {
    try {
      // First, get the uploads playlist ID
      const channelUrl = `${this.baseUrl}/channels?part=contentDetails&id=${channelId}&key=${this.apiKey}`;
      const channelResponse = await fetch(channelUrl);
      
      if (!channelResponse.ok) {
        throw new Error(`YouTube API error: ${channelResponse.statusText}`);
      }

      const channelData = await channelResponse.json();
      
      if (!channelData.items || channelData.items.length === 0) {
        return [];
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

      // Get videos from the uploads playlist
      const playlistUrl = `${this.baseUrl}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${this.apiKey}`;
      const playlistResponse = await fetch(playlistUrl);
      
      if (!playlistResponse.ok) {
        throw new Error(`YouTube API error: ${playlistResponse.statusText}`);
      }

      const playlistData = await playlistResponse.json();
      
      if (!playlistData.items || playlistData.items.length === 0) {
        return [];
      }

      // Get video IDs
      const videoIds = playlistData.items
        .map((item: any) => item.contentDetails.videoId)
        .join(",");

      // Get detailed video information
      const videosUrl = `${this.baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`;
      const videosResponse = await fetch(videosUrl);
      
      if (!videosResponse.ok) {
        throw new Error(`YouTube API error: ${videosResponse.statusText}`);
      }

      const videosData = await videosResponse.json();

      return videosData.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        publishedAt: video.snippet.publishedAt,
        duration: this.parseDuration(video.contentDetails.duration),
        viewCount: parseInt(video.statistics.viewCount || "0"),
        likeCount: parseInt(video.statistics.likeCount || "0"),
        tags: video.snippet.tags || [],
      }));
    } catch (error) {
      console.error("Error fetching channel videos:", error);
      throw error;
    }
  }

  private parseDuration(isoDuration: string): string {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}
