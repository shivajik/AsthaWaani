import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context";
import { Link } from "wouter";
import type { Category, Post } from "@shared/schema";
import { ensureProtocol } from "@/lib/utils";

export default function Blog() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all categories
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  }) as { data: Category[] };

  // Fetch all published posts
  const { data: allPosts = [] } = useQuery({
    queryKey: ["/api/blog/posts"],
  }) as { data: Post[] };

  // Fetch ads for blog listing placement only
  const { data: listingAds = [] } = useQuery({
    queryKey: ["/api/ads", { placement: "blog_listing" }],
    queryFn: async () => {
      const res = await fetch("/api/ads?placement=blog_listing");
      if (!res.ok) return [];
      return res.json();
    },
  }) as { data: Array<{ id: string; titleEn: string; titleHi?: string; imageUrl: string; imageWidth?: number; imageHeight?: number; link?: string }> };

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? (allPosts as Post[]).filter((post: Post) => post.categoryId === selectedCategory)
    : (allPosts as Post[]);

  const title = language === "hi" ? "ब्लॉग" : "Blog";
  const allText = language === "hi" ? "सभी" : "All";
  const noPostsText =
    language === "hi" ? "कोई पोस्ट नहीं मिली" : "No posts found";

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          {title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {language === "hi" ? "श्रेणियां" : "Categories"}
                </h2>
                <div className="space-y-3">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedCategory(null)}
                    className="w-full justify-start"
                    data-testid="button-category-all"
                  >
                    {allText}
                  </Button>
                  {(categories as Category[]).map((category: Category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "outline"
                      }
                      onClick={() => setSelectedCategory(category.id)}
                      className="w-full justify-start"
                      data-testid={`button-category-${category.slug}`}
                    >
                      {language === "hi" ? category.nameHi || category.name : category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ads Section - Below Sticky Sidebar */}
            {listingAds.length > 0 && (
              <div className="mt-6 space-y-3">
                {listingAds.map((ad) => {
                  const adTitle = language === "hi" ? ad.titleHi || ad.titleEn : ad.titleEn;
                  const aspectRatio = ad.imageWidth && ad.imageHeight ? ad.imageWidth / ad.imageHeight : 1;
                  const maxWidth = 200;
                  const calculatedHeight = maxWidth / aspectRatio;
                  
                  return (
                    <a
                      key={ad.id}
                      href={ensureProtocol(ad.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                      data-testid={`ad-card-${ad.id}`}
                    >
                      <Card className="overflow-hidden hover-elevate cursor-pointer">
                        <div className="w-full bg-gray-200 dark:bg-gray-800" style={{ height: `${calculatedHeight}px` }}>
                          <img
                            src={ad.imageUrl}
                            alt={adTitle}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-semibold text-sm">{adTitle}</p>
                        </div>
                      </Card>
                    </a>
                  );
                })}
              </div>
            )}
          </aside>

          {/* Blog Posts Grid */}
          <main className="md:col-span-3">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {(filteredPosts as Post[]).map((post: Post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full hover-elevate"
                      data-testid={`card-blog-post-${post.id}`}
                    >
                      {post.featuredImage && (
                        <div className="w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                          <img
                            src={post.featuredImage}
                            alt={language === "hi" ? (post.titleHi || post.title) : post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {language === "hi" ? post.titleHi || post.title : post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-secondary-foreground mb-4">
                            {language === "hi" ? post.excerptHi || post.excerpt : post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
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
                          {post.categoryId && (
                            <Badge variant="secondary" className="text-xs">
                              {categories.find(c => c.id === post.categoryId)?.name || ""}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">{noPostsText}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
