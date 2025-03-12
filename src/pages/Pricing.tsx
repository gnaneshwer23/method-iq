
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PricingSection } from "@/components/PricingSection"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"
import { Quote, Star, Shield, LifeBuoy } from "lucide-react"

const testimonials = [
  {
    quote: "MethodIQ's pricing structure is incredibly fair for the level of innovation they provide. The Premium tier has been instrumental for our research team.",
    name: "Dr. Sarah Chen",
    title: "Research Director, Biotech Innovations"
  },
  {
    quote: "As a university department, the institutional plan was perfect for our needs. The custom integration saved us months of development time.",
    name: "Prof. James Wilson",
    title: "Head of Department, Cambridge University"
  },
  {
    quote: "The free tier allowed us to test the platform thoroughly before committing to the premium plan. The transition was seamless.",
    name: "Alex Rodriguez",
    title: "Lead Researcher, NextGen Labs"
  }
];

const Pricing = () => {
  // Add scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PricingSection />
        
        {/* Benefits section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our pricing plans are designed to give you the best value for your research needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 hover:shadow-md transition-all hover:border-primary/20">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure & Compliant</h3>
                <p className="text-muted-foreground">
                  All plans include enterprise-grade security and compliance with research standards
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-all hover:border-primary/20">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Support</h3>
                <p className="text-muted-foreground">
                  All paid plans include priority support from our team of research experts
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-all hover:border-primary/20">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <LifeBuoy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Seamless Onboarding</h3>
                <p className="text-muted-foreground">
                  Get started quickly with guided setup and comprehensive documentation
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of satisfied researchers who've transformed their workflow
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 relative border-primary/10 hover:border-primary/30 transition-all">
                  <Quote className="h-10 w-10 text-primary/20 absolute top-4 right-4" />
                  <p className="text-muted-foreground mb-6 italic relative z-10">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Pricing
