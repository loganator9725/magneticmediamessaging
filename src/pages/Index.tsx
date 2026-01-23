import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import NewsWirePreview from "@/components/NewsWirePreview";
import PricingTable from "@/components/PricingTable";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <NewsWirePreview />
      <PricingTable />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
