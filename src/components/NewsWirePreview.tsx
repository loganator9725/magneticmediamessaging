import newsData from "@/data/news.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const NewsWirePreview = () => {
  const featuredArticle = newsData.find((article) => article.isFeatured);
  const recentArticles = newsData
    .filter((article) => !article.isFeatured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-20 sm:py-32 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <Badge className="bg-gold/20 text-gold-foreground font-semibold mb-2">
                INSIGHTS & STRATEGY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-navy">
                Curated Insights for Growth
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Expert perspectives on what's moving the needle in business and branding.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Featured Article */}
          {featuredArticle && (
            <Card className="flex flex-col group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-gold">
              <CardHeader className="p-0">
                 <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-64 object-cover" />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                 <div className="flex items-center gap-4 mb-2">
                    <Badge className="bg-gold text-navy font-bold">Featured</Badge>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featuredArticle.date)}</p>
                </div>
                <CardTitle className="text-2xl font-bold text-navy mb-2">{featuredArticle.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {featuredArticle.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="text-navy font-bold p-0">
                    <a href="/news-wire">Read More <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Recent Articles */}
          <div className="flex flex-col gap-4">
            {recentArticles.map((article) => (
              <Card key={article.id} className="flex group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-1/3">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
                </div>
                <div className="w-2/3">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                             <Badge variant="secondary">{article.category}</Badge>
                             <p className="text-xs text-gray-500">{formatDate(article.date)}</p>
                        </div>
                        <CardTitle className="text-md font-bold text-navy leading-tight mb-1">{article.title}</CardTitle>
                        <Button asChild variant="link" size="sm" className="text-navy font-semibold p-0 h-auto">
                            <a href="/news-wire">Read More <ArrowRight className="ml-1 w-3 h-3" /></a>
                        </Button>
                    </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-navy hover:bg-navy/90 text-white font-bold">
                <a href="/news-wire">
                    View All Articles <ArrowRight className="ml-2 w-5 h-5" />
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsWirePreview;