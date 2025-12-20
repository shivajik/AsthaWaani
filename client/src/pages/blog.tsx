import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context";
import { Link } from "wouter";
import type { Category, Post } from "@shared/schema";

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
          {/* Categories Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-lg font-semibold mb-4">
                {language === "hi" ? "श्रेणियां" : "Categories"}
              </h2>
              <div className="space-y-2">
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
          </aside>

          {/* Blog Posts Grid */}
          <main className="md:col-span-3">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
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
