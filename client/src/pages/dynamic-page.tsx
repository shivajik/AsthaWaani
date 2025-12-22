import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/context";
import { useState, useEffect } from "react";
import NotFound from "./not-found";

interface PageContent {
  title: string;
  content: string;
}

export default function DynamicPage() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug as string;
  const { language } = useLanguage();
  const [currentContent, setCurrentContent] = useState<PageContent>({ title: "", content: "" });

  const { data: page, isLoading, isError } = useQuery({
    queryKey: [`/api/pages/${slug}`],
    queryFn: async () => {
      const res = await fetch(`/api/pages/${slug}`);
      if (!res.ok) throw new Error("Page not found");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (page) {
      if (language === "hi") {
        setCurrentContent({
          title: page.titleHi || page.title,
          content: page.contentHi || page.content || "",
        });
      } else {
        setCurrentContent({
          title: page.title,
          content: page.content || "",
        });
      }
    }
  }, [page, language]);

  if (!slug) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (isError || !page) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary mb-6">
            {currentContent.title}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div
                className="text-foreground/80 leading-relaxed text-lg space-y-4 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.content }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
