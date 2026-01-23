import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import newsData from "@/data/news.json";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  isFeatured?: boolean;
}

const NewsWirePreview = () => {
  const featuredNews = newsData.filter((item: NewsItem) => item.isFeatured)[0];
  const regularNews = newsData.filter((item: NewsItem) => !item.isFeatured).slice(0, 3);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block mb-2">
            <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full">
              INSIGHTS & STRATEGY
            </span>
          </div>
          <h2 className="text-4xl font-bold text-navy mb-4">
            Curated Insights for Growth
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Expert perspectives on business strategy, personal branding, and thought leadership from industry leaders.
          </p>
        </div>

        {/* Featured Article + 3 Recent */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Featured Large Card */}
          {featuredNews && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-gold h-full hover:shadow-xl transition-shadow">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDate(featuredNews.date)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {featuredNews.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2">
                  {featuredNews.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* 3 Recent Articles */}
          <div className="space-y-4">
            {regularNews.map((item: NewsItem) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-slate-200 flex gap-4 items-start"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-navy bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-navy line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="flex justify-center">
          <a href="/news-wire">
            <Button
              size="lg"
              className="bg-navy hover:bg-navy/90 text-white"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsWirePreview;
