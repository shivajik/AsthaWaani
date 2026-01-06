import { useLanguage } from "@/lib/context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const partnerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  organization: z.string().optional(),
  message: z.string().min(10, "Please provide some details about your interest in partnering"),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

export default function JoinPartnersPage() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: PartnerFormData) => {
      // Mapping fields to match backend expectations in server/routes.ts
      const payload = {
        name: data.name,
        email: data.email,
        subject: `Partnership Inquiry${data.organization ? ` from ${data.organization}` : ""}`,
        message: data.message,
        phone: data.phone,
      };
      const res = await apiRequest("POST", "/api/contact", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: language === "hi" ? "सफलता" : "Success",
        description: language === "hi" ? "आपका अनुरोध प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।" : "Your request has been received. We will contact you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: PartnerFormData) {
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {language === "hi" ? "साझेदार के रूप में जुड़ें" : "Join as Partners"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === "hi" 
                ? "आस्थावाणी के साथ आध्यात्मिक यात्रा में सहयोगी बनें" 
                : "Collaborate with Asthawaani in the spiritual journey"}
            </p>
          </div>

          <Card className="border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle>{language === "hi" ? "साझेदारी फॉर्म" : "Partnership Form"}</CardTitle>
              <CardDescription>
                {language === "hi" 
                  ? "कृपया नीचे दिए गए विवरण भरें और हम आपसे संपर्क करेंगे।" 
                  : "Please fill in the details below and we will get back to you."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === "hi" ? "नाम" : "Full Name"}</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === "hi" ? "ईमेल" : "Email"}</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
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
                          <FormLabel>{language === "hi" ? "फोन" : "Phone"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 XXXXX XXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === "hi" ? "संस्था (वैकल्पिक)" : "Organization (Optional)"}</FormLabel>
                        <FormControl>
                          <Input placeholder="Organization Name" {...field} />
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
                        <FormLabel>{language === "hi" ? "विवरण" : "Partnership Details"}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={language === "hi" ? "बताएं कि आप हमारे साथ कैसे जुड़ना चाहते हैं..." : "Tell us how you would like to collaborate..."} 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 text-lg"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending 
                      ? (language === "hi" ? "भेज रहा है..." : "Sending...") 
                      : (language === "hi" ? "फॉर्म जमा करें" : "Submit Form")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
