import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Post, Category } from "@shared/schema";
import { useState } from "react";
import { ensureProtocol } from "@/lib/utils";

interface Ad {
  id: string;
  titleEn: string;
  titleHi?: string;
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  link?: string;
  placement: string;
  categoryId?: string;
}

interface BlogPostDetailResponse {
  post: Post;
  categories?: Category[];
  ads?: {
    top: Ad[];
    sidebar: Ad[];
    bottom: Ad[];
  };
}

export default function BlogPostDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();

  // Fetch the current blog post
  const { data, isLoading, error } = useQuery<BlogPostDetailResponse>({
    queryKey: [`/api/blog/post/${slug}`],
    queryFn: async () => {
      const response = await fetch(`/api/blog/post/${slug}`);
      if (!response.ok) {
        throw new Error("Post not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  // Fetch all categories
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  }) as { data: Category[] };

  // Fetch all posts to show related posts
  const { data: allPosts = [] } = useQuery({
    queryKey: ["/api/blog/posts"],
  }) as { data: Post[] };

  const allText = language === "hi" ? "सभी" : "All";
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !data?.post) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Link href="/blog">
              <Button variant="outline" className="gap-2 mb-8">
                <ChevronLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
            <Card className="p-8 text-center">
              <p className="text-lg text-muted-foreground">
                {language === "hi" ? "पोस्ट नहीं मिली" : "Post not found"}
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const post = data.post;
  const isHindi = language === "hi";
  const title = isHindi ? post.titleHi || post.title : post.title;
  const content = isHindi ? post.contentHi || post.content : post.content;
  const excerpt = isHindi ? post.excerptHi || post.excerpt : post.excerpt;

  // Get related posts from the same category
  const relatedPosts = (allPosts as Post[])
    .filter((p: Post) => p.categoryId === post.categoryId && p.id !== post.id)
    .slice(0, 5);

  return (
    <div className="w-full bg-white dark:bg-black flex flex-col">
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-4 space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-6">
                  {language === "hi" ? "श्रेणियां" : "Categories"}
                </h2>
                <div className="flex flex-col gap-4">
                  <Link href="/blog">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      data-testid="button-category-all"
                    >
                      {allText}
                    </Button>
                  </Link>
                  {(categories as Category[]).map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.id}`}
                    >
                      <Button
                        variant={
                          post.categoryId === category.id ? "default" : "outline"
                        }
                        className="w-full justify-start"
                        data-testid={`button-category-${category.slug}`}
                      >
                        {language === "hi" ? category.nameHi || category.name : category.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ads - Inside Sticky Container */}
              {data?.ads?.sidebar && data.ads.sidebar.length > 0 && (
                <div className="space-y-4 flex flex-col items-center">
                  {data?.ads?.sidebar.map((ad) => {
                    const adTitle = language === "hi" ? ad.titleHi || ad.titleEn : ad.titleEn;
                    
                    return (
                      <div key={ad.id}>
                        <a href={ensureProtocol(ad.link)} target="_blank" rel="noopener noreferrer" data-testid={`ad-sidebar-${ad.id}`} className="block">
                          <div className="relative inline-block rounded-md overflow-hidden">
                            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                              {language === "hi" ? "विज्ञापन" : "Ad"}
                            </span>
                            <img 
                              src={ad.imageUrl} 
                              alt={adTitle} 
                              className="hover:opacity-90 transition-opacity block"
                              style={{
                                width: `${ad.imageWidth}px`,
                                height: `${ad.imageHeight}px`
                              }}
                            />
                          </div>
                        </a>
                        {/* {adTitle && <p className="mt-2 text-xs font-semibold text-foreground">{adTitle}</p>} */}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            <Link href="/blog">
              <Button variant="outline" className="gap-2 mb-8">
                <ChevronLeft className="w-4 h-4" />
                {language === "hi" ? "ब्लॉग पर वापस जाएँ" : "Back to Blog"}
              </Button>
            </Link>

            {/* Top Ads */}
            {data?.ads?.top && data.ads.top.length > 0 && (
              <div className="mb-3 space-y-2">
                {data?.ads?.top.map((ad) => {
                  const adTitle = language === "hi" ? ad.titleHi || ad.titleEn : ad.titleEn;
                  
                  return (
                    <div key={ad.id} className="flex flex-col items-center">
                      <a href={ensureProtocol(ad.link)} target="_blank" rel="noopener noreferrer" data-testid={`ad-top-${ad.id}`} className="block">
                        <div className="relative inline-block rounded-md overflow-hidden">
                          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                            {language === "hi" ? "विज्ञापन" : "Advertisement"}
                          </span>
                          <img 
                            src={ad.imageUrl} 
                            alt={adTitle} 
                            className="hover:opacity-90 transition-opacity block"
                            style={{
                              width: `${ad.imageWidth}px`,
                              height: `${ad.imageHeight}px`
                            }}
                          />
                        </div>
                      </a>
                      {/* {adTitle && <p className="mt-2 text-xs font-semibold text-foreground text-center">{adTitle}</p>} */}
                    </div>
                  );
                })}
              </div>
            )}

            <article className="space-y-6">
              {post.featuredImage && (
                <div className="w-full h-96 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                  <img
                    src={post.featuredImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {post.publishedAt && (
                    <div className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString(
                        language === "hi" ? "hi-IN" : "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  )}
                  {post.categoryId && data.categories?.find(c => c.id === post.categoryId) && (
                    <Badge variant="secondary">
                      {data.categories.find(c => c.id === post.categoryId)?.name}
                    </Badge>
                  )}
                </div>

                {excerpt && (
                  <p className="text-lg text-muted-foreground italic">{excerpt}</p>
                )}
              </div>

              {content && (
                <div
                  className="prose dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-p:text-foreground/90 prose-p:leading-7
                    prose-a:text-primary prose-a:underline
                    prose-strong:font-semibold prose-strong:text-foreground
                    prose-img:rounded-lg prose-img:border prose-img:border-border
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                    prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-secondary prose-pre:p-4 prose-pre:rounded-lg
                    prose-ul:list-disc prose-ul:ml-6
                    prose-ol:list-decimal prose-ol:ml-6"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </article>

            {/* Bottom Ads */}
            {data?.ads?.bottom && data.ads.bottom.length > 0 && (
              <div className="my-2 space-y-2">
                {data?.ads?.bottom.map((ad) => {
                  const adTitle = language === "hi" ? ad.titleHi || ad.titleEn : ad.titleEn;
                  
                  return (
                    <div key={ad.id} className="flex flex-col items-center">
                      <a href={ensureProtocol(ad.link)} target="_blank" rel="noopener noreferrer" data-testid={`ad-bottom-${ad.id}`} className="block">
                        <div className="relative inline-block rounded-md overflow-hidden">
                          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                            {language === "hi" ? "विज्ञापन" : "Advertisement"}
                          </span>
                          <img 
                            src={ad.imageUrl} 
                            alt={adTitle} 
                            className="hover:opacity-90 transition-opacity block"
                            style={{
                              width: `${ad.imageWidth}px`,
                              height: `${ad.imageHeight}px`
                            }}
                          />
                        </div>
                      </a>
                      {/* {adTitle && <p className="mt-2 text-xs font-semibold text-foreground text-center">{adTitle}</p>} */}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border">
              <Link href="/blog">
                <Button variant="outline" className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  {language === "hi" ? "सभी ब्लॉग देखें" : "View All Posts"}
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
