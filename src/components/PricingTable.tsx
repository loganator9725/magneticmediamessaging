import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Newspaper, Mail, Share2, FolderOpen, Edit } from "lucide-react";

const services = [
  {
    icon: FileText,
    name: "Press Release",
    standalone: "$500",
    withPackage: "$400",
  },
  {
    icon: Newspaper,
    name: "Feature Article",
    standalone: "$600",
    withPackage: "$500",
  },
  {
    icon: Edit,
    name: "Blog Post",
    standalone: "$250",
    withPackage: "$200",
  },
  {
    icon: Mail,
    name: "Email Copy",
    standalone: "$150",
    withPackage: "$125",
  },
  {
    icon: Share2,
    name: "Social Media Content (30 posts)",
    standalone: "$400",
    withPackage: "$350",
  },
  {
    icon: FolderOpen,
    name: "Media Kit Creation",
    standalone: "$350",
    withPackage: "$300",
  },
];

const PricingTable = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              À La Carte <span className="text-gold">Options</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Need something specific? Build your own visibility strategy with our flexible à la carte services.
            </p>
          </div>

          {/* Pricing Card */}
          <Card className="shadow-lifted animate-fade-up">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Professional Content & Strategy Services</CardTitle>
              <CardDescription>
                All services can be purchased standalone or added to any package at a discounted rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Service</TableHead>
                      <TableHead className="text-right">Standalone Price</TableHead>
                      <TableHead className="text-right">With Package</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <TableRow key={service.name} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-hero">
                                <Icon className="w-4 h-4 text-primary-foreground" />
                              </div>
                              <span>{service.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-semibold text-foreground">
                            {service.standalone}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-gold">
                            {service.withPackage}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8 p-4 bg-gradient-elegant rounded-lg border border-border">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-semibold text-foreground">Ideal for ongoing visibility</span> or 
                  adding impact to an existing campaign. Mix and match to fit your needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
