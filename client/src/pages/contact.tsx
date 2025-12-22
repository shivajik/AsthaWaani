import { useLanguage } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { useCmsPage } from "@/lib/useCmsPage";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type ContactInfo } from "@shared/schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  email: z.string().email("Invalid email address").max(200, "Email must be less than 200 characters"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { data: pageData } = useCmsPage("contact");
  const { data: contactData } = useQuery<ContactInfo | null>({
    queryKey: ["/api/cms/public/contact-info"],
    queryFn: async () => {
      const res = await fetch("/api/cms/public/contact-info");
      if (!res.ok) return null;
      return res.json();
    },
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'hi' ? "सफल" : "Success",
        description: language === 'hi' ? "आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे!" : "Your message has been sent successfully. We will get back to you soon!",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: language === 'hi' ? "त्रुटि" : "Error",
        description: error.message,
      });
    },
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-secondary py-20 text-white text-center">
        <h1 className="text-5xl font-serif font-bold">{t('nav.contact')}</h1>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-secondary mb-8">
               {language === 'hi' ? (pageData?.titleHi || pageData?.title) : pageData?.title || (language === 'en' ? "Get in Touch" : "संपर्क करें")}
            </h2>
            <p className="text-muted-foreground mb-12 text-lg">
              {pageData && pageData.content && (
                <div className="preserve-whitespace" dangerouslySetInnerHTML={{ __html: language === 'hi' ? (pageData.contentHi || pageData.content) : pageData.content }} />
              )}
              {!pageData && (
                <>
                  {language === 'en' 
                    ? "Whether you are a seeker looking for guidance or a speaker wishing to join our platform, we are here for you."
                    : "चाहे आप मार्गदर्शन की तलाश में एक साधक हों या हमारे मंच से जुड़ने की इच्छा रखने वाले वक्ता, हम आपके लिए यहां हैं।"
                  }
                </>
              )}
            </p>
            
            <div className="space-y-8">
              {contactData && (
                <>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        {language === 'hi' ? (contactData.nameHi || contactData.name) : contactData.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'hi' ? (contactData.addressHi || contactData.address) : contactData.address}<br/>
                        {contactData.city && <>{language === 'hi' ? (contactData.cityHi || contactData.city) : contactData.city}, </>}
                        {contactData.state} {contactData.postalCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WhatsApp / Call</h3>
                      <p className="text-muted-foreground">{contactData.whatsapp || contactData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{language === 'en' ? 'Email' : 'ईमेल'}</h3>
                      <a href={`mailto:${contactData.email}`} className="text-primary hover:underline">
                        {contactData.email}
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => contactMutation.mutate(data))} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91..." {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} data-testid="input-email" />
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
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject of your message" {...field} data-testid="input-subject" />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help you?" className="min-h-[150px]" {...field} data-testid="input-message" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  type="submit"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
