import { useLanguage } from "@/lib/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Facebook, Instagram, MessageCircle, ExternalLink } from "lucide-react";

export default function CommunityPage() {
  const { language } = useLanguage();
  
  const socialLinks = [
    {
      name: "WhatsApp Group",
      nameHi: "व्हाट्सएप ग्रुप",
      icon: MessageCircle,
      url: "https://chat.whatsapp.com/GzS7zIunP975V5uN2nO8kE",
      color: "bg-green-500",
      description: "Get daily satsang updates directly on WhatsApp",
      descriptionHi: "व्हाट्सएप पर सीधे दैनिक सत्संग अपडेट प्राप्त करें"
    },
    {
      name: "YouTube Channel",
      nameHi: "यूट्यूब चैनल",
      icon: Youtube,
      url: "https://www.youtube.com/@Asthawaani",
      color: "bg-red-600",
      description: "Watch our spiritual videos and live sessions",
      descriptionHi: "हमारे आध्यात्मिक वीडियो और लाइव सत्र देखें"
    },
    {
      name: "Instagram",
      nameHi: "इंस्टाग्राम",
      icon: Instagram,
      url: "https://www.instagram.com/Asthawaani",
      color: "bg-pink-600",
      description: "Follow us for daily spiritual quotes and reels",
      descriptionHi: "दैनिक आध्यात्मिक उद्धरणों और रीलों के लिए हमें फॉलो करें"
    },
    {
      name: "Facebook",
      nameHi: "फेसबुक",
      icon: Facebook,
      url: "https://www.facebook.com/share/1ACBKJFoW9/",
      color: "bg-blue-600",
      description: "Connect with our community on Facebook",
      descriptionHi: "फेसबुक पर हमारे समुदाय से जुड़ें"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {language === "hi" ? "हमारे समुदाय से जुड़ें" : "Join Our Community"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === "hi" 
              ? "आस्थावाणी परिवार का हिस्सा बनें और आध्यात्मिक ज्ञान प्राप्त करें" 
              : "Become part of the Asthawaani family and receive spiritual wisdom"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <Card key={link.name} className="hover-elevate transition-all overflow-hidden border-primary/10">
              <CardContent className="p-0">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-6 p-6"
                >
                  <div className={`${link.color} text-white p-4 rounded-2xl shadow-lg`}>
                    <link.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      {language === "hi" ? link.nameHi : link.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "hi" ? link.descriptionHi : link.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground/50" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
