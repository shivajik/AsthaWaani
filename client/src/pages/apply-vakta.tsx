import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { vaktaCategories } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mic2, Music, BookOpen, Sparkles, Play, CheckCircle, Loader2, MapPin, Phone, Mail, User } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  experience: z.string().min(10, "Please describe your experience (minimum 10 characters)"),
});

type FormData = z.infer<typeof formSchema>;

const categoryIcons: Record<string, typeof Mic2> = {
  "Katha Vachak": BookOpen,
  "Bhajan": Music,
  "Pravachan": Mic2,
  "Motivational": Sparkles,
  "Bhakti Sangeet": Music,
  "Live Darshan": Play,
};

export default function ApplyVakta() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      categories: [],
      experience: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/vakta-application", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We will contact you soon. Thank you for your interest!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-yellow-950/30">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <Card className="max-w-lg w-full text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Application Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest in joining as a Vakta. Our team will review your application and contact you soon.
              </p>
              <p className="text-sm text-muted-foreground">
                We promote spiritual content from Mathura Vrindavan Dham and look forward to having you on our platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-yellow-950/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Mathura Vrindavan Dham</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Apply Now as <span className="text-orange-600 dark:text-orange-400">Vakta</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our platform to share your spiritual knowledge and connect with devotees worldwide. We are looking for talented speakers, singers, and spiritual guides.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <Card className="shadow-xl border-orange-200/50 dark:border-orange-800/30">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-foreground">Registration Form</CardTitle>
                <CardDescription>Fill out the form below to apply</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                              data-testid="input-name"
                            />
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
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Contact Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your phone number" 
                              type="tel"
                              {...field} 
                              data-testid="input-phone"
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
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email ID
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email address" 
                              type="email"
                              {...field} 
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categories"
                      render={() => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4" />
                            Are you interested in? (Select all that apply)
                          </FormLabel>
                          <div className="grid grid-cols-2 gap-3">
                            {vaktaCategories.map((category) => {
                              const Icon = categoryIcons[category] || Mic2;
                              return (
                                <FormField
                                  key={category}
                                  control={form.control}
                                  name="categories"
                                  render={({ field }) => {
                                    const isChecked = field.value?.includes(category);
                                    const handleToggle = () => {
                                      const newValue = isChecked
                                        ? field.value.filter((v) => v !== category)
                                        : [...(field.value || []), category];
                                      field.onChange(newValue);
                                    };
                                    return (
                                      <FormItem
                                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover-elevate cursor-pointer"
                                        data-testid={`category-item-${category.toLowerCase().replace(/\s+/g, '-')}`}
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={handleToggle}
                                            data-testid={`checkbox-${category.toLowerCase().replace(/\s+/g, '-')}`}
                                          />
                                        </FormControl>
                                        <label 
                                          className="flex items-center gap-2 flex-1 cursor-pointer"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleToggle();
                                          }}
                                          data-testid={`label-${category.toLowerCase().replace(/\s+/g, '-')}`}
                                        >
                                          <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                          <span className="text-sm font-medium">{category}</span>
                                        </label>
                                      </FormItem>
                                    );
                                  }}
                                />
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us about your experience</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your experience in katha, bhajan, pravachan, or other spiritual activities. Include any notable events or programs you have participated in..."
                              className="min-h-32 resize-none"
                              {...field} 
                              data-testid="textarea-experience"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={mutation.isPending}
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-8">
            <Card className="shadow-xl border-orange-200/50 dark:border-orange-800/30 overflow-hidden">
              <div className="aspect-video relative bg-black">
                <iframe
                  src="https://res.cloudinary.com/ddejz4aju/video/upload/v1769604522/Asthawani_Video_sf4nhb.mp4"
                  title="Promotional Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="video-promo"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Join Our Spiritual Community</h3>
                <p className="text-muted-foreground mb-4">
                  We are promoting spiritual content from Mathura Vrindavan Dham. If you are a Katha Vachak, Bhajan singer, or spiritual guide, we want to help you reach a wider audience.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Reach thousands of devotees worldwide</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Professional video production support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Grow your spiritual presence online</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
