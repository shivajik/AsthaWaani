import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  RefreshCw, Youtube, LogOut, FileText, 
  Image, Settings, LayoutDashboard, PenSquare, Trash2, Plus, Save, Phone
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { type ContactInfo } from "@shared/schema";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  titleHi: string | null;
  content: string | null;
  contentHi: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  titleHi: string | null;
  excerpt: string | null;
  excerptHi: string | null;
  content: string | null;
  contentHi: string | null;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  status: string;
  publishedAt: string | null;
}

interface MediaItem {
  id: string;
  publicId: string;
  url: string;
  secureUrl: string;
  filename: string;
  format: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  altText: string | null;
}

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

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Login successful" });
      onLogin();
    },
    onError: (error: Error) => {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 to-stone-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="w-[400px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Asthawaani CMS</CardTitle>
            <CardDescription>Sign in to manage your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loginMutation.isPending) {
                    loginMutation.mutate();
                  }
                }}
                placeholder="Enter your password"
                data-testid="input-password"
              />
            </div>
            <Button
              className="w-full"
              onClick={() => loginMutation.mutate()}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function DashboardOverview() {
  const { data: pages } = useQuery<Page[]>({
    queryKey: ["/api/cms/pages"],
    queryFn: async () => {
      const res = await fetch("/api/cms/pages", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: posts } = useQuery<Post[]>({
    queryKey: ["/api/cms/posts"],
    queryFn: async () => {
      const res = await fetch("/api/cms/posts", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: media } = useQuery<MediaItem[]>({
    queryKey: ["/api/cms/media"],
    queryFn: async () => {
      const res = await fetch("/api/cms/media", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pages?.length || 0}</p>
              <p className="text-muted-foreground text-sm">Pages</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <PenSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{posts?.length || 0}</p>
              <p className="text-muted-foreground text-sm">Blog Posts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Image className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{media?.length || 0}</p>
              <p className="text-muted-foreground text-sm">Media Files</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PageManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: pages, isLoading } = useQuery<Page[]>({
    queryKey: ["/api/cms/pages"],
    queryFn: async () => {
      const res = await fetch("/api/cms/pages", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (page: Partial<Page> & { id?: string }) => {
      const url = page.id ? `/api/cms/pages/${page.id}` : "/api/cms/pages";
      const method = page.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save page");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Page saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      setEditingPage(null);
      setIsCreating(false);
    },
    onError: () => {
      toast({ title: "Failed to save page", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/pages/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete page");
    },
    onSuccess: () => {
      toast({ title: "Page deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
    },
  });

  if (editingPage || isCreating) {
    const page = editingPage || {
      slug: "",
      title: "",
      titleHi: "",
      content: "",
      contentHi: "",
      metaTitle: "",
      metaDescription: "",
      isPublished: true,
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{editingPage ? "Edit Page" : "Create Page"}</h2>
          <Button variant="outline" onClick={() => { setEditingPage(null); setIsCreating(false); }}>
            Cancel
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug (URL path)</Label>
                <Input
                  value={page.slug}
                  onChange={(e) => editingPage 
                    ? setEditingPage({ ...editingPage, slug: e.target.value })
                    : setIsCreating(true)
                  }
                  disabled={!!editingPage}
                  placeholder="about-us"
                />
              </div>
              <div className="space-y-2">
                <Label>Title (English)</Label>
                <Input
                  value={page.title}
                  onChange={(e) => editingPage 
                    ? setEditingPage({ ...editingPage, title: e.target.value })
                    : null
                  }
                  placeholder="Page Title"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title (Hindi)</Label>
              <Input
                value={page.titleHi || ""}
                onChange={(e) => editingPage && setEditingPage({ ...editingPage, titleHi: e.target.value })}
                placeholder="पृष्ठ शीर्षक"
              />
            </div>
            <div className="space-y-2">
              <Label>Content (English)</Label>
              <RichTextEditor
                content={page.content || ""}
                onChange={(content) => editingPage && setEditingPage({ ...editingPage, content })}
                placeholder="Page content..."
              />
            </div>
            <div className="space-y-2">
              <Label>Content (Hindi)</Label>
              <RichTextEditor
                content={page.contentHi || ""}
                onChange={(content) => editingPage && setEditingPage({ ...editingPage, contentHi: content })}
                placeholder="पृष्ठ सामग्री..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={page.metaTitle || ""}
                  onChange={(e) => editingPage && setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                  placeholder="SEO Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input
                  value={page.metaDescription || ""}
                  onChange={(e) => editingPage && setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  placeholder="SEO Description"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={page.isPublished}
                onCheckedChange={(checked) => editingPage && setEditingPage({ ...editingPage, isPublished: checked })}
              />
              <Label>Published</Label>
            </div>
            <Button
              onClick={() => saveMutation.mutate(editingPage as Page)}
              disabled={saveMutation.isPending}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Saving..." : "Save Page"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Page
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {pages?.map((page) => (
            <Card key={page.id}>
              <CardContent className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingPage(page)}>
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => deleteMutation.mutate(page.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {pages?.length === 0 && (
            <p className="text-muted-foreground text-center py-8">No pages yet. Create your first page!</p>
          )}
        </div>
      )}
    </div>
  );
}

function PostManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    slug: "",
    title: "",
    titleHi: "",
    excerpt: "",
    excerptHi: "",
    content: "",
    contentHi: "",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
  });

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/cms/posts"],
    queryFn: async () => {
      const res = await fetch("/api/cms/posts", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (post: Partial<Post> & { id?: string }) => {
      const url = post.id ? `/api/cms/posts/${post.id}` : "/api/cms/posts";
      const method = post.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save post");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Post saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/posts"] });
      setEditingPost(null);
      setIsCreating(false);
      setNewPost({
        slug: "", title: "", titleHi: "", excerpt: "", excerptHi: "",
        content: "", contentHi: "", featuredImage: "", metaTitle: "", metaDescription: "", status: "draft",
      });
    },
    onError: () => {
      toast({ title: "Failed to save post", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/posts/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete post");
    },
    onSuccess: () => {
      toast({ title: "Post deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/posts"] });
    },
  });

  if (editingPost || isCreating) {
    const post = editingPost || newPost;
    const updateField = (field: string, value: any) => {
      if (editingPost) {
        setEditingPost({ ...editingPost, [field]: value });
      } else {
        setNewPost({ ...newPost, [field]: value });
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{editingPost ? "Edit Post" : "Create Post"}</h2>
          <Button variant="outline" onClick={() => { setEditingPost(null); setIsCreating(false); }}>
            Cancel
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug (URL path)</Label>
                <Input
                  value={post.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="my-blog-post"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={post.status} onValueChange={(value) => updateField("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (English)</Label>
                <Input
                  value={post.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Post Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Title (Hindi)</Label>
                <Input
                  value={post.titleHi || ""}
                  onChange={(e) => updateField("titleHi", e.target.value)}
                  placeholder="पोस्ट शीर्षक"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Featured Image URL</Label>
              <Input
                value={post.featuredImage || ""}
                onChange={(e) => updateField("featuredImage", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Excerpt (English)</Label>
              <Textarea
                value={post.excerpt || ""}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={2}
                placeholder="Brief summary..."
              />
            </div>
            <div className="space-y-2">
              <Label>Content (English)</Label>
              <RichTextEditor
                content={post.content || ""}
                onChange={(content) => updateField("content", content)}
                placeholder="Post content..."
              />
            </div>
            <div className="space-y-2">
              <Label>Content (Hindi)</Label>
              <RichTextEditor
                content={post.contentHi || ""}
                onChange={(content) => updateField("contentHi", content)}
                placeholder="पोस्ट सामग्री..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={post.metaTitle || ""}
                  onChange={(e) => updateField("metaTitle", e.target.value)}
                  placeholder="SEO Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input
                  value={post.metaDescription || ""}
                  onChange={(e) => updateField("metaDescription", e.target.value)}
                  placeholder="SEO Description"
                />
              </div>
            </div>
            <Button
              onClick={() => saveMutation.mutate(editingPost || newPost)}
              disabled={saveMutation.isPending}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Saving..." : "Save Post"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardContent className="py-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{post.title}</p>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">/blog/{post.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => deleteMutation.mutate(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {posts?.length === 0 && (
            <p className="text-muted-foreground text-center py-8">No posts yet. Create your first blog post!</p>
          )}
        </div>
      )}
    </div>
  );
}

function MediaManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const { data: media, isLoading } = useQuery<MediaItem[]>({
    queryKey: ["/api/cms/media"],
    queryFn: async () => {
      const res = await fetch("/api/cms/media", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cms/media/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
      }
      toast({ title: "Image uploaded successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/media"] });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/media/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast({ title: "Media deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/media"] });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button asChild disabled={uploading} className="gap-2">
            <span>
              <Plus className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Image"}
            </span>
          </Button>
        </label>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media?.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square relative group">
                <img
                  src={item.secureUrl}
                  alt={item.altText || item.filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigator.clipboard.writeText(item.secureUrl)}
                  >
                    Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-xs truncate">{item.filename}</p>
              </CardContent>
            </Card>
          ))}
          {media?.length === 0 && (
            <p className="text-muted-foreground text-center py-8 col-span-full">No media uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ContactInfoManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data: contactInfo, isLoading } = useQuery<ContactInfo | null>({
    queryKey: ["/api/cms/public/contact-info"],
    queryFn: async () => {
      const res = await fetch("/api/cms/public/contact-info", { credentials: "include" });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const [formData, setFormData] = useState<Partial<ContactInfo>>({
    name: "",
    nameHi: "",
    address: "",
    addressHi: "",
    city: "",
    cityHi: "",
    state: "",
    country: "",
    postalCode: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData(contactInfo);
    }
  }, [contactInfo]);

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<ContactInfo>) => {
      const res = await fetch("/api/admin/contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save contact info");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Contact information saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/public/contact-info"] });
      setEditing(false);
    },
    onError: () => {
      toast({ title: "Failed to save contact information", variant: "destructive" });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Contact Information</h2>
          <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name (English)</Label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Organization Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Name (Hindi)</Label>
                <Input
                  value={formData.nameHi || ""}
                  onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                  placeholder="संस्था का नाम"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address (English)</Label>
              <Textarea
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street Address"
              />
            </div>
            <div className="space-y-2">
              <Label>Address (Hindi)</Label>
              <Textarea
                value={formData.addressHi || ""}
                onChange={(e) => setFormData({ ...formData, addressHi: e.target.value })}
                placeholder="पता"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City (English)</Label>
                <Input
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label>City (Hindi)</Label>
                <Input
                  value={formData.cityHi || ""}
                  onChange={(e) => setFormData({ ...formData, cityHi: e.target.value })}
                  placeholder="शहर"
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={formData.state || ""}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="State"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country</Label>
                <Input
                  value={formData.country || ""}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Country"
                />
              </div>
              <div className="space-y-2">
                <Label>Postal Code</Label>
                <Input
                  value={formData.postalCode || ""}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input
                value={formData.whatsapp || ""}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <Button
              onClick={() => saveMutation.mutate(formData)}
              disabled={saveMutation.isPending}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Saving..." : "Save Contact Information"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <Button onClick={() => setEditing(true)} className="gap-2">
          <PenSquare className="w-4 h-4" /> Edit
        </Button>
      </div>
      {contactInfo && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name (English)</p>
                <p className="font-medium">{contactInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name (Hindi)</p>
                <p className="font-medium">{contactInfo.nameHi || "-"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{contactInfo.address}</p>
              {contactInfo.city && <p>{contactInfo.city}, {contactInfo.state} {contactInfo.postalCode}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{contactInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{contactInfo.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">WhatsApp Number</p>
              <p className="font-medium">{contactInfo.whatsapp || "-"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function YouTubeSync() {
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
        description: `Synced ${data.totalVideos} videos from ${data.channel.channelName}`,
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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">YouTube Sync</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            Sync from YouTube
          </CardTitle>
          <CardDescription>
            Enter your YouTube channel ID to fetch and sync videos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter YouTube Channel ID"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => syncMutation.mutate(channelId)}
              disabled={syncMutation.isPending}
              className="gap-2"
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
          <p className="text-sm text-muted-foreground">
            Total synced videos: {videos?.length || 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const { data: authData, isLoading } = useQuery({
    queryKey: ["/api/cms/auth/me"],
    queryFn: async () => {
      const res = await fetch("/api/cms/auth/me", { credentials: "include" });
      if (!res.ok) return null;
      return res.json();
    },
    retry: false,
  });

  useEffect(() => {
    if (authData?.admin) {
      setIsAuthenticated(true);
      setAdmin(authData.admin);
    }
  }, [authData]);

  const handleLogout = async () => {
    await fetch("/api/cms/auth/logout", { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
    setAdmin(null);
    toast({ title: "Logged out successfully" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => window.location.reload()} />;
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pages", label: "Pages", icon: FileText },
    { id: "posts", label: "Blog Posts", icon: PenSquare },
    { id: "media", label: "Media", icon: Image },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-stone-900 min-h-screen p-4 text-white fixed left-0 top-0">
          <div className="mb-8">
            <h1 className="text-xl font-serif font-bold text-amber-400">Asthawaani CMS</h1>
            <p className="text-sm text-stone-400">{admin?.name}</p>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? "bg-amber-600 text-white" 
                    : "text-stone-300 hover:bg-stone-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="ghost"
              className="w-full text-stone-400 hover:text-white hover:bg-stone-800"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "pages" && <PageManager />}
          {activeTab === "posts" && <PostManager />}
          {activeTab === "media" && <MediaManager />}
          {activeTab === "contact" && <ContactInfoManager />}
          {activeTab === "youtube" && <YouTubeSync />}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Settings</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">Site settings coming soon...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
