import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaUpload } from "@/components/media-upload";
import { 
  RefreshCw, Youtube, LogOut, FileText, 
  Image, Settings, LayoutDashboard, PenSquare, Trash2, Plus, Save, Phone, Megaphone, FileCheck,
  ChevronLeft, Mail, X, Layers
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
  categoryId: string | null;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  nameHi: string | null;
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

interface LegalPage {
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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newPage, setNewPage] = useState({
    slug: "",
    title: "",
    titleHi: "",
    content: "",
    contentHi: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: true,
  });

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
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save page");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Page saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      setEditingPage(null);
      setIsCreating(false);
      setNewPage({
        slug: "",
        title: "",
        titleHi: "",
        content: "",
        contentHi: "",
        metaTitle: "",
        metaDescription: "",
        isPublished: true,
      });
    },
    onError: (error: Error) => {
      toast({ 
        title: error.message || "Failed to save page", 
        variant: "destructive",
        duration: 5000 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/pages/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete page");
      }
    },
    onSuccess: () => {
      toast({ title: "Page deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
    },
  });

  if (editingPage || isCreating) {
    const page = editingPage || newPage;
    const updateField = (field: string, value: any) => {
      if (editingPage) {
        setEditingPage({ ...editingPage, [field]: value });
      } else {
        setNewPage({ ...newPage, [field]: value });
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => { setEditingPage(null); setIsCreating(false); }}
              data-testid="button-back"
              className="cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
            </Button>
            <h2 className="text-2xl font-bold">{editingPage ? "Edit Page" : "Create Page"}</h2>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug (URL path)</Label>
                <Input
                  value={page.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  disabled={!!editingPage}
                  placeholder="about-us"
                />
              </div>
              <div className="space-y-2">
                <Label>Title (English)</Label>
                <Input
                  value={page.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Page Title"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title (Hindi)</Label>
              <Input
                value={page.titleHi || ""}
                onChange={(e) => updateField("titleHi", e.target.value)}
                placeholder="पृष्ठ शीर्षक"
              />
            </div>
            <div className="space-y-2">
              <Label>Content (English)</Label>
              <RichTextEditor
                content={page.content || ""}
                onChange={(content) => updateField("content", content)}
                placeholder="Page content..."
              />
            </div>
            <div className="space-y-2">
              <Label>Content (Hindi)</Label>
              <RichTextEditor
                content={page.contentHi || ""}
                onChange={(content) => updateField("contentHi", content)}
                placeholder="पृष्ठ सामग्री..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={page.metaTitle || ""}
                  onChange={(e) => updateField("metaTitle", e.target.value)}
                  placeholder="SEO Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input
                  value={page.metaDescription || ""}
                  onChange={(e) => updateField("metaDescription", e.target.value)}
                  placeholder="SEO Description"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={page.isPublished}
                onCheckedChange={(checked) => updateField("isPublished", checked)}
              />
              <Label>Published</Label>
            </div>
            <Button
              onClick={() => saveMutation.mutate(editingPage || newPage)}
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
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}>
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setDeleteConfirmId(page.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <AlertDialog open={deleteConfirmId === page.id} onOpenChange={() => setDeleteConfirmId(null)}>
                  <AlertDialogContent>
                    <AlertDialogTitle>Delete Page</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{page.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteMutation.mutate(page.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
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

function ContactsManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "old">("all");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data: contacts = [] } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/cms/contacts"],
    queryFn: async () => {
      const res = await fetch("/api/cms/contacts", { credentials: "include" });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : (data?.contacts || []);
    },
  });

  // Debounce search - only update after user stops typing for 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/contacts/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete contact");
    },
    onSuccess: () => {
      toast({ title: "Contact deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/contacts"] });
    },
  });

  // Client-side filtering (no API calls)
  let filteredContacts = contacts.filter((contact) => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    const matchesSearch = !searchLower || 
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.subject.toLowerCase().includes(searchLower) ||
      contact.message.toLowerCase().includes(searchLower);

    return matchesSearch;
  });

  // Sort by date based on filter
  if (statusFilter === "new") {
    // Newest first (most recent dates)
    filteredContacts = [...filteredContacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (statusFilter === "old") {
    // Oldest first (least recent dates)
    filteredContacts = [...filteredContacts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
      
      <div className="flex gap-4 items-end flex-wrap">
        <div className="flex-1 min-w-48">
          <Label className="text-sm mb-2 block">Search</Label>
          <Input
            placeholder="Search by name, email, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-contact-search"
          />
        </div>
        <div className="w-48">
          <Label className="text-sm mb-2 block">Status Filter</Label>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | "new" | "old")}>
            <SelectTrigger data-testid="select-contact-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="old">Old</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredContacts.length} submission{filteredContacts.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredContacts?.map((contact) => (
          <Card key={contact.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedContact(contact)} data-testid={`card-contact-${contact.id}`}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{contact.name}</p>
                    {contact.status === "new" && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">New</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                  <p className="font-medium mt-2">{contact.subject}</p>
                  <p className="text-sm text-muted-foreground">{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
                <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); deleteContactMutation.mutate(contact.id); }} data-testid={`button-delete-contact-${contact.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredContacts?.length === 0 && <p className="text-muted-foreground text-center py-8">No contact submissions found</p>}
      </div>
      <AlertDialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogTitle>Contact Details</AlertDialogTitle>
          {selectedContact && (
            <div className="space-y-4">
              <div><p className="text-sm text-muted-foreground">Name</p><p className="font-semibold">{selectedContact.name}</p></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p>{selectedContact.email}</p></div>
              {selectedContact.phone && <div><p className="text-sm text-muted-foreground">Phone</p><p>{selectedContact.phone}</p></div>}
              <div><p className="text-sm text-muted-foreground">Subject</p><p>{selectedContact.subject}</p></div>
              <div><p className="text-sm text-muted-foreground">Message</p><p className="whitespace-pre-wrap">{selectedContact.message}</p></div>
              <div><p className="text-sm text-muted-foreground">Submitted</p><p>{new Date(selectedContact.createdAt).toLocaleString()}</p></div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => { deleteContactMutation.mutate(selectedContact!.id); setSelectedContact(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function PostManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ slug: "", name: "", nameHi: "" });
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
    categoryId: "",
  });

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/cms/posts"],
    queryFn: async () => {
      const res = await fetch("/api/cms/posts", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (post: Partial<Post> & { id?: string; oldImage?: string | null }) => {
      const { oldImage, ...postData } = post;
      
      if (oldImage && oldImage !== postData.featuredImage) {
        try {
          const publicId = oldImage.split('/').pop()?.split('.')[0];
          if (publicId) {
            await fetch(`/api/cms/media/delete-cloudinary`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ publicId }),
              credentials: "include",
            });
          }
        } catch (error) {
          console.error("Failed to delete old image:", error);
        }
      }

      const url = postData.id ? `/api/cms/posts/${postData.id}` : "/api/cms/posts";
      const method = postData.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save post");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Post saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/posts"] });
      setEditingPost(null);
      setIsCreating(false);
      setOriginalImage(null);
      setNewPost({
        slug: "", title: "", titleHi: "", excerpt: "", excerptHi: "",
        content: "", contentHi: "", featuredImage: "", metaTitle: "", metaDescription: "", status: "draft", categoryId: "",
      });
    },
    onError: (error: Error) => {
      toast({ 
        title: error.message || "Failed to save post", 
        variant: "destructive",
        duration: 5000 
      });
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
      setDeleteConfirmId(null);
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (category: { slug: string; name: string; nameHi?: string }) => {
      const res = await fetch("/api/cms/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create category");
      }
      return res.json();
    },
    onSuccess: (newCat) => {
      toast({ title: "Category created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setNewCategory({ slug: "", name: "", nameHi: "" });
      setShowCategoryForm(false);
      setNewPost({ ...newPost, categoryId: newCat.id });
    },
    onError: (error: Error) => {
      toast({ title: error.message || "Failed to create category", variant: "destructive" });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/categories/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category deleted successfully" });
    },
  });

  useEffect(() => {
    if (editingPost || isCreating) {
      const post = editingPost || newPost;
      if (!originalImage) {
        setOriginalImage(post.featuredImage || null);
      }
    } else {
      setOriginalImage(null);
    }
  }, [editingPost, isCreating]);

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
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => { setEditingPost(null); setIsCreating(false); }}
              data-testid="button-back"
              className="cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
            </Button>
            <h2 className="text-2xl font-bold">{editingPost ? "Edit Post" : "Create Post"}</h2>
          </div>
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
            <div className="space-y-2">
              <Label>Category <span className="text-red-500">*</span></Label>
              <Select value={post.categoryId || ""} onValueChange={(value) => updateField("categoryId", value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category (required)" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Manage categories in the <strong>Categories</strong> menu item</p>
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
              <Label>Featured Image</Label>
              <MediaUpload
                currentImage={post.featuredImage || undefined}
                onUploadSuccess={(url) => updateField("featuredImage", url)}
                onUploadError={(error) => console.error("Upload error:", error)}
                onImageRemove={() => updateField("featuredImage", "")}
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
              onClick={() => saveMutation.mutate({ ...(editingPost || newPost), oldImage: originalImage })}
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
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingPost(post);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}>
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setDeleteConfirmId(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <AlertDialog open={deleteConfirmId === post.id} onOpenChange={() => setDeleteConfirmId(null)}>
                  <AlertDialogContent>
                    <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{post.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteMutation.mutate(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmFilename, setDeleteConfirmFilename] = useState<string>("");

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
      setDeleteConfirmId(null);
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
                    onClick={() => {
                      navigator.clipboard.writeText(item.secureUrl);
                      toast({ title: "URL copied to clipboard" });
                    }}
                  >
                    Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeleteConfirmId(item.id);
                      setDeleteConfirmFilename(item.filename);
                    }}
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
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Media</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{deleteConfirmFilename}"? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteMutation.mutate(deleteConfirmId || "")} 
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
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
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setEditing(false)}
              data-testid="button-back"
              className="cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
            </Button>
            <h2 className="text-2xl font-bold">Edit Contact Information</h2>
          </div>
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

function OfferingManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingOffering, setEditingOffering] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingOfferingId, setDeletingOfferingId] = useState<string | null>(null);
  const [newOffering, setNewOffering] = useState({
    slug: "",
    title: "",
    titleHi: "",
    subtitle: "",
    subtitleHi: "",
    description: "",
    descriptionHi: "",
    keywords: "",
    icon: "Heart",
    isPublished: true,
    order: 0,
  });

  const { data: offerings = [], isLoading } = useQuery({
    queryKey: ["/api/cms/offerings"],
    queryFn: async () => {
      const res = await fetch("/api/cms/offerings", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (offering: any) => {
      const url = offering.id ? `/api/cms/offerings/${offering.id}` : "/api/cms/offerings";
      const method = offering.id ? "PUT" : "POST";
      
      console.log("🚀 [Frontend] Sending offering data:", {
        method,
        url,
        offering,
        offeringKeys: Object.keys(offering),
      });
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offering),
        credentials: "include",
      });
      
      console.log("📦 [Frontend] API Response status:", res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ [Frontend] API Error response:", errorData);
        throw new Error(errorData.error || "Failed to save offering");
      }
      
      const responseData = await res.json();
      console.log("✅ [Frontend] API Success response:", responseData);
      return responseData;
    },
    onSuccess: () => {
      toast({ title: "Offering saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/offerings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/offerings"] });
      setEditingOffering(null);
      setIsCreating(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to save offering", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/offerings/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast({ title: "Offering deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/offerings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/offerings"] });
    },
  });

  if (editingOffering || isCreating) {
    const offering = editingOffering || newOffering;
    const updateField = (field: string, value: any) => {
      if (editingOffering) {
        setEditingOffering({ ...editingOffering, [field]: value });
      } else {
        setNewOffering({ ...newOffering, [field]: value });
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => { setEditingOffering(null); setIsCreating(false); }}
              data-testid="button-back"
              className="cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
            </Button>
            <h2 className="text-2xl font-bold">{editingOffering ? "Edit Offering" : "Create Offering"}</h2>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={offering.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="daily-satsang" />
              </div>
              {/* Icon Name input - commented out */}
              {/* <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input value={offering.icon} onChange={(e) => updateField("icon", e.target.value)} placeholder="Heart" />
              </div> */}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (EN)</Label>
                <Input value={offering.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Daily Satsang" />
              </div>
              <div className="space-y-2">
                <Label>Title (HI)</Label>
                <Input value={offering.titleHi} onChange={(e) => updateField("titleHi", e.target.value)} placeholder="दैनिक सत्संग" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subtitle (EN)</Label>
                <Input value={offering.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Subtitle (HI)</Label>
                <Input value={offering.subtitleHi} onChange={(e) => updateField("subtitleHi", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description (EN)</Label>
              <RichTextEditor 
                content={offering.description} 
                onChange={(content) => updateField("description", content)}
                placeholder="Enter description with formatting..."
              />
            </div>
            <div className="space-y-2">
              <Label>Description (HI)</Label>
              <RichTextEditor 
                content={offering.descriptionHi} 
                onChange={(content) => updateField("descriptionHi", content)}
                placeholder="विवरण दर्ज करें..."
              />
            </div>
            <div className="space-y-2">
              <Label>Keywords</Label>
              <Input value={offering.keywords} onChange={(e) => updateField("keywords", e.target.value)} placeholder="satsang, spirituality" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={offering.isPublished} onCheckedChange={(checked) => updateField("isPublished", checked)} />
              <Label>Published</Label>
            </div>
            <Button onClick={() => saveMutation.mutate(editingOffering || newOffering)} disabled={saveMutation.isPending} className="gap-2">
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Spiritual Offerings</h2>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Offering
        </Button>
      </div>
      {isLoading ? <p>Loading...</p> : (
        <div className="space-y-2">
          {offerings.map((offering: any) => (
            <Card key={offering.id}>
              <CardContent className="py-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{offering.title}</p>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      offering.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {offering.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">/{offering.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingOffering(offering);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}>
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeletingOfferingId(offering.id)} data-testid="button-delete-offering">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {offerings.length === 0 && <p className="text-muted-foreground text-center py-8">No offerings yet. Create your first one!</p>}
        </div>
      )}
      
      <AlertDialog open={!!deletingOfferingId} onOpenChange={(open) => !open && setDeletingOfferingId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Offering</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this offering? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingOfferingId) {
                  deleteMutation.mutate(deletingOfferingId);
                  setDeletingOfferingId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function NewsTickerManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingTickerId, setDeletingTickerId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ titleEn: "", titleHi: "", order: 0, isActive: true });

  interface NewsTickerItem {
    id: string;
    titleEn: string;
    titleHi: string;
    order: number;
    isActive: boolean;
  }

  const { data: tickers = [] } = useQuery<NewsTickerItem[]>({
    queryKey: ["/api/cms/news-tickers"],
    queryFn: async () => {
      const res = await fetch("/api/cms/news-tickers", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const url = editingId ? `/api/cms/news-tickers/${editingId}` : "/api/cms/news-tickers";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: editingId ? "Updated" : "Created" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/news-tickers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news-tickers"] });
      setEditingId(null);
      setFormData({ titleEn: "", titleHi: "", order: 0, isActive: true });
    },
    onError: () => {
      toast({ title: "Failed to save", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/news-tickers/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast({ title: "Deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/news-tickers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news-tickers"] });
    },
  });

  const handleEdit = (ticker: NewsTickerItem) => {
    setEditingId(ticker.id);
    setFormData(ticker);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">News Ticker</h2>
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit News Item" : "Add News Item"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>English Text</Label>
            <Input
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              placeholder="Enter English news text"
            />
          </div>
          <div className="space-y-2">
            <Label>Hindi Text</Label>
            <Input
              value={formData.titleHi}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              placeholder="हिंदी समाचार पाठ दर्ज करें"
            />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label>Active</Label>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {editingId ? "Update" : "Add"} News Item
            </Button>
            {editingId && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ titleEn: "", titleHi: "", order: 0, isActive: true });
                }}
                data-testid="button-back"
                className="cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 cursor-pointer" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="font-semibold">All News Items</h3>
        {tickers.map((ticker) => (
          <Card key={ticker.id}>
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="font-medium">{ticker.titleEn}</p>
                <p className="text-sm text-muted-foreground">{ticker.titleHi}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(ticker)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeletingTickerId(ticker.id)} data-testid="button-delete-news-ticker">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <AlertDialog open={!!deletingTickerId} onOpenChange={(open) => !open && setDeletingTickerId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete News Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this news item? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingTickerId) {
                  deleteMutation.mutate(deletingTickerId);
                  setDeletingTickerId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function LegalPageManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  const { data: pages, isLoading } = useQuery<Page[]>({
    queryKey: ["/api/cms/pages"],
    queryFn: async () => {
      const res = await fetch("/api/cms/pages", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const legalPages = pages?.filter(p => 
    p.slug === "privacy-policy" || p.slug === "terms-of-service"
  ) || [];

  const saveMutation = useMutation({
    mutationFn: async (page: Partial<Page>) => {
      const url = `/api/cms/pages/${page.id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save page");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Legal page updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      setEditingPage(null);
    },
    onError: () => {
      toast({ title: "Failed to save page", variant: "destructive" });
    },
  });

  if (editingPage) {
    const page = editingPage;

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setEditingPage(null)}
              data-testid="button-back"
              className="cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
            </Button>
            <h2 className="text-2xl font-bold">Edit Legal Page</h2>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Title (English)</Label>
              <Input
                value={page.title}
                onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                placeholder="Page Title"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (Hindi)</Label>
              <Input
                value={page.titleHi || ""}
                onChange={(e) => setEditingPage({ ...editingPage, titleHi: e.target.value })}
                placeholder="पृष्ठ शीर्षक"
              />
            </div>
            <div className="space-y-2">
              <Label>Content (English)</Label>
              <RichTextEditor
                content={page.content || ""}
                onChange={(content) => setEditingPage({ ...editingPage, content })}
                placeholder="Page content..."
              />
            </div>
            <div className="space-y-2">
              <Label>Content (Hindi)</Label>
              <RichTextEditor
                content={page.contentHi || ""}
                onChange={(content) => setEditingPage({ ...editingPage, contentHi: content })}
                placeholder="पृष्ठ सामग्री..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={page.metaTitle || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                  placeholder="SEO Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input
                  value={page.metaDescription || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  placeholder="SEO Description"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={page.isPublished}
                onCheckedChange={(checked) => setEditingPage({ ...editingPage, isPublished: checked })}
              />
              <Label>Published</Label>
            </div>
            <Button
              onClick={() => saveMutation.mutate(editingPage)}
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
      <h2 className="text-2xl font-bold">Legal Pages</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {legalPages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle className="text-lg">{page.title}</CardTitle>
                <CardDescription>{page.titleHi}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                    <p className={`text-sm font-medium ${page.isPublished ? "text-green-600" : "text-amber-600"}`}>
                      {page.isPublished ? "Published" : "Draft"}
                    </p>
                  </div>
                  <Button 
                    onClick={() => setEditingPage(page)}
                    className="w-full gap-2"
                  >
                    <PenSquare className="w-4 h-4" />
                    Edit Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {legalPages.length === 0 && (
            <div className="col-span-2">
              <p className="text-muted-foreground text-center py-8">No legal pages found. Create them from the Pages section first.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AdManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingAdId, setDeletingAdId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ titleEn: "", titleHi: "", imageUrl: "", imagePublicId: "", link: "", isActive: true, position: 0, placement: "blog_post_top", categoryId: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  interface AdItem {
    id: string;
    titleEn: string;
    titleHi: string | null;
    imageUrl: string;
    imagePublicId: string | null;
    imageWidth?: number | null;
    imageHeight?: number | null;
    link: string | null;
    isActive: boolean;
    position: number;
    placement?: string;
    categoryId?: string | null;
  }

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: ads = [] } = useQuery<AdItem[]>({
    queryKey: ["/api/cms/ads"],
    queryFn: async () => {
      const res = await fetch("/api/cms/ads", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formDataObj = new FormData();
      formDataObj.append("titleEn", formData.titleEn);
      formDataObj.append("titleHi", formData.titleHi || "");
      formDataObj.append("link", formData.link || "");
      formDataObj.append("isActive", String(formData.isActive));
      formDataObj.append("position", String(formData.position));
      formDataObj.append("placement", formData.placement);
      formDataObj.append("categoryId", formData.categoryId || "");
      if (!selectedFile) {
        formDataObj.append("imageUrl", formData.imageUrl);
        formDataObj.append("imagePublicId", formData.imagePublicId || "");
      } else {
        formDataObj.append("image", selectedFile);
      }

      const url = editingId ? `/api/cms/ads/${editingId}` : "/api/cms/ads";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: formDataObj,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: editingId ? "Updated" : "Created" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/ads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/ads"] });
      setEditingId(null);
      setSelectedFile(null);
      // Reset file input if it exists
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      setFormData({ titleEn: "", titleHi: "", imageUrl: "", imagePublicId: "", link: "", isActive: true, position: 0, placement: "blog_post_top", categoryId: "" });
    },
    onError: () => {
      toast({ title: "Failed to save", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/ads/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast({ title: "Deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/ads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/ads"] });
    },
  });

  const handleEdit = (ad: AdItem) => {
    setEditingId(ad.id);
    setFormData({
      titleEn: ad.titleEn,
      titleHi: ad.titleHi || "",
      imageUrl: ad.imageUrl,
      imagePublicId: ad.imagePublicId || "",
      link: ad.link || "",
      isActive: ad.isActive,
      position: ad.position,
      placement: ad.placement || "blog_post_top",
      categoryId: ad.categoryId || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog Ads</h2>
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Ad" : "Add Ad"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title (English) *</Label>
            <Input
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              placeholder="Ad title in English"
            />
          </div>
          <div className="space-y-2">
            <Label>Title (Hindi)</Label>
            <Input
              value={formData.titleHi || ""}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              placeholder="विज्ञापन शीर्षक"
            />
          </div>
          <div className="space-y-2">
            <Label>Ad Image *</Label>
            {formData.imageUrl && !selectedFile && (
              <div className="mb-2">
                <img src={formData.imageUrl} alt="Ad" className="h-32 object-cover rounded" />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label>Link URL</Label>
            <Input
              value={formData.link || ""}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Placement *</Label>
            <Select value={formData.placement} onValueChange={(value) => setFormData({ ...formData, placement: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blog_listing">Blog Listing Page</SelectItem>
                <SelectItem value="blog_post_top">Blog Post - Top</SelectItem>
                <SelectItem value="blog_post_sidebar">Blog Post - Sidebar</SelectItem>
                <SelectItem value="blog_post_bottom">Blog Post - Bottom</SelectItem>
                <SelectItem value="home_page">Home Page</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
                <SelectItem value="above_footer">Above Footer</SelectItem>
                <SelectItem value="home_full_width">Home - Full Width</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Category (Optional)</Label>
            <Select value={formData.categoryId || "all"} onValueChange={(value) => setFormData({ ...formData, categoryId: value === "all" ? "" : value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Position (Order)</Label>
            <Input
              type="number"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label>Active</Label>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {editingId ? "Update" : "Add"} Ad
            </Button>
            {editingId && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setEditingId(null);
                  setSelectedFile(null);
                  // Reset file input if it exists
                  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                  if (fileInput) fileInput.value = "";
                  setFormData({ titleEn: "", titleHi: "", imageUrl: "", imagePublicId: "", link: "", isActive: true, position: 0, placement: "blog_post_top", categoryId: "" });
                }}
                data-testid="button-back"
                className="cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 cursor-pointer" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="font-semibold text-lg">Active Ad Placements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { value: "blog_listing", label: "Blog Listing" },
            { value: "blog_post_top", label: "Blog Post - Top" },
            { value: "blog_post_sidebar", label: "Blog Post - Sidebar" },
            { value: "blog_post_bottom", label: "Blog Post - Bottom" },
            { value: "home_page", label: "Home Page" },
            { value: "footer", label: "Footer" },
          ].map((placement) => {
            const adAtPlacement = ads.find(a => a.placement === placement.value && a.isActive);
            return (
              <Card key={placement.value} className={cn(
                "p-3 text-center border-2 transition-colors",
                adAtPlacement ? "border-primary/50 bg-primary/5" : "border-dashed opacity-50"
              )}>
                <p className="text-xs font-medium mb-1">{placement.label}</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {adAtPlacement ? adAtPlacement.titleEn : "Empty"}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <h3 className="font-semibold">All Ads</h3>
        {ads.map((ad) => {
          const aspectRatio = ad.imageWidth && ad.imageHeight ? ad.imageWidth / ad.imageHeight : 1;
          const maxWidth = Math.min(150, ad.imageWidth || 150);
          const maxHeight = maxWidth / aspectRatio;
          
          return (
            <Card key={ad.id}>
              <CardContent className="pt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div style={{ flex: `0 0 ${maxWidth}px` }}>
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.titleEn} 
                      className="w-full h-auto object-contain rounded"
                      style={{ maxHeight: `${maxHeight}px` }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{ad.titleEn}</p>
                    <p className="text-sm text-muted-foreground truncate">{ad.titleHi}</p>
                    <p className="text-xs text-muted-foreground truncate">{ad.link}</p>
                    {ad.imageWidth && ad.imageHeight && (
                      <p className="text-xs text-muted-foreground">{ad.imageWidth}×{ad.imageHeight}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(ad)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeletingAdId(ad.id)} data-testid="button-delete-ad">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <AlertDialog open={!!deletingAdId} onOpenChange={(open) => !open && setDeletingAdId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Ad</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this ad? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingAdId) {
                  deleteMutation.mutate(deletingAdId);
                  setDeletingAdId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
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

function CategoryManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState({ slug: "", name: "", nameHi: "" });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (category: { slug: string; name: string; nameHi?: string }) => {
      const res = await fetch("/api/cms/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create category");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Category created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setNewCategory({ slug: "", name: "", nameHi: "" });
    },
    onError: (error: Error) => {
      toast({ title: error.message || "Failed to create category", variant: "destructive" });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/categories/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete category");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ 
        title: error.message,
        variant: "destructive",
        duration: 6000
      });
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog Categories</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Slug (URL path)</Label>
              <Input
                placeholder="category-slug"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                data-testid="input-category-slug"
              />
            </div>
            <div className="space-y-2">
              <Label>Name (English)</Label>
              <Input
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                data-testid="input-category-name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Name (Hindi)</Label>
            <Input
              placeholder="श्रेणी का नाम"
              value={newCategory.nameHi}
              onChange={(e) => setNewCategory({ ...newCategory, nameHi: e.target.value })}
              data-testid="input-category-name-hi"
            />
          </div>
          <Button
            onClick={() => createCategoryMutation.mutate(newCategory)}
            disabled={!newCategory.slug || !newCategory.name || createCategoryMutation.isPending}
            className="gap-2"
            data-testid="button-create-category"
          >
            <Plus className="w-4 h-4" />
            {createCategoryMutation.isPending ? "Creating..." : "Create Category"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Categories ({categories?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {categories && categories.length > 0 ? (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50" data-testid={`item-category-${cat.id}`}>
                  <div>
                    <p className="font-medium">{cat.name}</p>
                    {cat.nameHi && <p className="text-sm text-muted-foreground">{cat.nameHi}</p>}
                    <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteCategoryMutation.mutate(cat.id)}
                    data-testid={`button-delete-category-${cat.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No categories yet. Create one to get started.</p>
          )}
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
    { id: "legal", label: "Legal Pages", icon: FileCheck },
    { id: "posts", label: "Blog Posts", icon: PenSquare },
    { id: "categories", label: "Categories", icon: Layers },
    { id: "offerings", label: "Offerings", icon: PenSquare },
    { id: "ads", label: "Blog Ads", icon: Megaphone },
    { id: "media", label: "Media", icon: Image },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "contacts", label: "Contact Forms", icon: Mail },
    { id: "news-ticker", label: "News Ticker", icon: Megaphone },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-stone-900 min-h-screen p-4 text-white fixed left-0 top-0 flex flex-col">
          <div className="mb-8 flex-shrink-0">
            <h1 className="text-xl font-serif font-bold text-amber-400">Asthawaani CMS</h1>
            <p className="text-sm text-stone-400">{admin?.name}</p>
          </div>
          <nav className="space-y-2 flex-1 overflow-y-auto pr-2">
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
          <div className="mt-4 flex-shrink-0 pt-4 border-t border-stone-700">
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
          {activeTab === "legal" && <LegalPageManager />}
          {activeTab === "posts" && <PostManager />}
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "offerings" && <OfferingManager />}
          {activeTab === "ads" && <AdManager />}
          {activeTab === "contacts" && <ContactsManager />}
          {activeTab === "media" && <MediaManager />}
          {activeTab === "contact" && <ContactInfoManager />}
          {activeTab === "news-ticker" && <NewsTickerManager />}
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
