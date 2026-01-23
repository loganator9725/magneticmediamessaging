import { useState } from "react";
import { TrendingUp, Zap, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import newsData from "@/data/news.json";
import { Badge } from "@/components/ui/badge";

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

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const newsCategories = [
  "All",
  "Personal Branding",
  "Business Strategy",
  "Marketing & Communications",
  "Thought Leadership",
  "Entrepreneurship",
];

const NewsWire = () => {
  const [filter, setFilter] = useState("All");

  const featuredNews = newsData.filter((item) => item.isFeatured);
  const regularNews = newsData.filter((item) => !item.isFeatured);

  const filteredNews =
    filter === "All"
      ? regularNews
      : regularNews.filter((item) => item.category === filter);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy to-blue-900 text-white text-center py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Curated Insights & Industry News
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
          Stay ahead of the curve with expert perspectives on business growth, branding, and thought leadership.
        </p>
        <div className="mt-8 flex justify-center gap-8">
            <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-gold" />
                <span className="font-semibold">Market Trends</span>
            </div>
            <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-gold" />
                <span className="font-semibold">Growth Strategies</span>
            </div>
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        {/* Featured Section */}
        {featuredNews.map((item: NewsItem) => (
          <section key={item.id} className="mb-16 bg-gold/5 rounded-lg overflow-hidden shadow-lg border-l-4 border-gold">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 p-8">
                <Badge className="bg-gold/20 text-gold-foreground font-semibold mb-2">{item.category}</Badge>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {formatDate(item.date)}
                </p>
                <h2 className="text-3xl font-bold text-navy mb-4">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
                 <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> By {item.author}
                </p>
              </div>
              <div className="w-full h-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        ))}

        {/* Filter Tabs */}
        <section className="mb-8">
            <h2 className="text-3xl font-bold text-center text-navy mb-8">Latest Articles</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {newsCategories.map((category) => (
                <Button
                    key={category}
                    variant={filter === category ? "default" : "outline"}
                    onClick={() => setFilter(category)}
                    className={`rounded-full px-6 transition-colors ${filter === category ? 'bg-navy text-white hover:bg-navy/90' : 'bg-slate-100 text-gray-700 hover:bg-slate-200'}`}
                >
                    {category}
                </Button>
                ))}
            </div>
        </section>


        {/* News Grid */}
        <section>
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item: NewsItem) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl border border-slate-200 flex flex-col">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3"/>{formatDate(item.date)}</p>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2 flex-grow">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><User className="w-3 h-3"/>By {item.author}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500">No articles in this category yet.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="text-center py-20 mt-16 bg-gradient-to-r from-navy to-blue-900 text-white rounded-lg px-4">
          <h2 className="text-4xl font-bold mb-4">Get Your Story Featured</h2>
          <p className="max-w-2xl mx-auto text-primary-foreground/80 mb-8">
            Reach an engaged audience of entrepreneurs, executives, and industry leaders. Feature your insights on our platform to build authority and visibility.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-gold text-navy hover:bg-gold/90 font-bold text-lg px-8 py-6"
            asChild
          >
            <a href="mailto:jennifer@magneticmediamessaging.com">
              Inquire About Featured Placement
            </a>
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsWire;