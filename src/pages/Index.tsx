import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import StudentAthletePackage from "@/components/StudentAthletePackage";
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
      <StudentAthletePackage />
      <PricingTable />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
