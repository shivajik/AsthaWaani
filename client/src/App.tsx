import { LanguageProvider } from "./lib/context";
import { Header, Footer } from "@/components/layout";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Videos from "@/pages/videos";
import Admin from "@/pages/admin";
import Offerings from "@/pages/offerings";
import Brajbhoomi from "@/pages/brajbhoomi";
import Blog from "@/pages/blog";
import BlogPostDetail from "@/pages/blog-post";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/videos" component={Videos} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/offerings" component={Offerings} />
      <Route path="/brajbhoomi" component={Brajbhoomi} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPostDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";
  
  // Trigger smooth scroll to top on route changes
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isAdmin && <Header />}
      <main className="flex-1">
        <Router />
      </main>
      {!isAdmin && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
