import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/videos', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

app.get('/api/channel', async (req, res) => {
  try {
    res.json({ message: "Channel endpoint" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch channel" });
  }
});

app.post('/api/sync-youtube', async (req, res) => {
  try {
    const { channelId } = req.body;
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID is required" });
    }
    res.json({ success: true, message: "Sync initiated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to sync" });
  }
});

app.all('/api/*', (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
