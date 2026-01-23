import { useState } from "react";
import { MessageCircle, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import newsData from "@/data/news.json";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
  image: string;
  isFeatured?: boolean;
}

const NewsWire = () => {
  const [filter, setFilter] = useState<string>("all");

  const featuredNews = newsData.filter((item: NewsItem) => item.isFeatured);
  const regularNews = newsData.filter(
    (item: NewsItem) =>
      !item.isFeatured && (filter === "all" || item.category === filter)
  );

  const categories = ["all", "Personal Branding", "Business Strategy", "Marketing & Communications", "Thought Leadership", "Entrepreneurship"];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy to-blue-900 text-primary-foreground py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Curated Insights & Industry News</h1>
          <p className="text-xl text-primary-foreground/90 mb-6">
            Expert perspectives on business growth, personal branding, and strategic success
            from thought leaders and entrepreneurs transforming their markets.
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              <span className="text-sm">Curated content from industry leaders</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold" />
              <span className="text-sm">Actionable insights for growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {featuredNews.length > 0 && (
        <section className="py-12 px-6 bg-gold/5 border-b border-gold/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-navy">Featured Story</h2>
            <div className="grid md:grid-cols-1 gap-8">
              {featuredNews.map((item: NewsItem) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-gold"
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="md:col-span-2 p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-sm text-slate-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-navy mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>
                      <p className="text-slate-700 mb-6">{item.content}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-semibold text-navy">
                            By {item.author}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:block hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-colors text-sm ${
                  filter === cat
                    ? "bg-navy text-primary-foreground"
                    : "bg-slate-100 text-navy hover:bg-slate-200"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {regularNews.map((item: NewsItem) => (
              <article
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-200"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-navy bg-slate-100 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    By {item.author}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {regularNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Featured Placement CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-navy to-blue-900 text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Get Your Story Featured
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-6">
              This curated platform reaches entrepreneurs, business leaders, and decision-makers 
              actively seeking growth strategies and business insights. Feature your expertise, 
              company story, or thought leadership to establish authority with a highly engaged audience.
            </p>
            <div className="flex gap-4">
              <a href="mailto:jennifer@magneticmediamessaging.com">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-navy font-bold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Inquire About Featured Placement
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsWire;
