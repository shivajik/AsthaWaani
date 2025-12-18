import { useQuery } from "@tanstack/react-query";

export interface CMSPage {
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

export function useCmsPage(slug: string) {
  return useQuery<CMSPage | null>({
    queryKey: ["/api/cms/public/pages", slug],
    queryFn: async () => {
      const res = await fetch(`/api/cms/public/pages/${slug}`);
      if (!res.ok) return null;
      return res.json();
    },
  });
}

export interface CMSPost {
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

export function useCmsPost(slug: string) {
  return useQuery<CMSPost | null>({
    queryKey: ["/api/cms/public/posts", slug],
    queryFn: async () => {
      const res = await fetch(`/api/cms/public/posts/${slug}`);
      if (!res.ok) return null;
      return res.json();
    },
  });
}

export function usePublishedPosts() {
  return useQuery<CMSPost[]>({
    queryKey: ["/api/cms/public/posts"],
    queryFn: async () => {
      const res = await fetch("/api/cms/public/posts");
      if (!res.ok) return [];
      return res.json();
    },
  });
}
