import { useLanguage } from "@/lib/context";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface PageContent {
  title: string;
  content: string;
}

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const [currentContent, setCurrentContent] = useState<PageContent>({ title: "Privacy Policy", content: "" });

  const { data: page } = useQuery({
    queryKey: ["/api/pages/privacy-policy"],
    queryFn: async () => {
      const res = await fetch("/api/pages/privacy-policy");
      if (!res.ok) throw new Error("Failed to fetch page");
      return res.json();
    },
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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary mb-6">
            {currentContent.title}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div
                className="text-foreground/80 leading-relaxed text-lg space-y-4 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.content }}
              /></div>

            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {language === "hi"
                  ? "अंतिम अपडेट: "
                  : "Last Updated: "}{" "}
                {new Date().toLocaleDateString(
                  language === "hi" ? "hi-IN" : "en-US"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
