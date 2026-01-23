import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MediaBreakthrough from "./pages/packages/MediaBreakthrough";
import VisibilitySprint from "./pages/packages/VisibilitySprint";
import StoryStrategyRetainer from "./pages/packages/StoryStrategyRetainer";
import Addons from "./pages/Addons";
import NotFound from "./pages/NotFound";
import UPPTestPage from "./pages/UPPTestPage";
import NewsWire from "./pages/NewsWire";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news-wire" element={<NewsWire />} />
          <Route path="/packages/media-breakthrough" element={<MediaBreakthrough />} />
          <Route path="/packages/visibility-sprint" element={<VisibilitySprint />} />
          <Route path="/packages/story-strategy-retainer" element={<StoryStrategyRetainer />} />
          <Route path="/addons" element={<Addons />} />
          <Route path="/upp-test" element={<UPPTestPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
