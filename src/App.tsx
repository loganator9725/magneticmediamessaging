import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Route-based code splitting - loads only when navigated to
const Index = lazy(() => import("./pages/Index"));
const MediaBreakthrough = lazy(() => import("./pages/packages/MediaBreakthrough"));
const VisibilitySprint = lazy(() => import("./pages/packages/VisibilitySprint"));
const StoryStrategyRetainer = lazy(() => import("./pages/packages/StoryStrategyRetainer"));
const Addons = lazy(() => import("./pages/Addons"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="animate-pulse text-lg">Loading...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packages/media-breakthrough" element={<MediaBreakthrough />} />
            <Route path="/packages/visibility-sprint" element={<VisibilitySprint />} />
            <Route path="/packages/story-strategy-retainer" element={<StoryStrategyRetainer />} />
            <Route path="/addons" element={<Addons />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
