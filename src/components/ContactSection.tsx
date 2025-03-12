
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Send, Clock, GraduationCap, HeartHandshake } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log(data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary font-medium bg-primary/10">
            Get in Touch
          </Badge>
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Whether you have questions about MethodIQ, need technical support,
            or want to explore partnership opportunities, reach out to us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl shadow-lg border border-primary/10 hover:border-primary/20 transition-all">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Send Us a Message
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          {...field} 
                          className="border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="How can we help?" 
                          {...field} 
                          className="border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          {...field} 
                          className="min-h-[120px] border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information & Additional Info */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-card p-8 rounded-xl shadow-lg border border-primary/10 hover:border-primary/20 transition-all">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                How to Reach Us
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <a 
                      href="mailto:support@methodiq.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@methodiq.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Phone</h4>
                    <a 
                      href="tel:+1XXXXXXXXXX" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (XXX) XXX-XXXX
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Address</h4>
                    <p className="text-muted-foreground">
                      123 Research Ave, Innovation City, ST 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Business Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media and FAQ Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Social Media Links */}
              <div className="bg-card p-6 rounded-xl shadow-lg border border-primary/10 hover:border-primary/20 transition-all">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-card p-6 rounded-xl shadow-lg border border-primary/10 hover:border-primary/20 transition-all">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Resources
                </h3>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  Frequently Asked Questions
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded text-primary">FAQ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
