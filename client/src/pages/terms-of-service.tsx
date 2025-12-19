import { useLanguage } from "@/lib/context";

export default function TermsOfService() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      title: "Terms of Service",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          heading: "2. Use License",
          content: "Permission is granted to temporarily download one copy of the materials (information or software) on Asthawaani's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"
        },
        {
          heading: "3. Disclaimer",
          content: "The materials on Asthawaani's website are provided on an 'as is' basis. Asthawaani makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        },
        {
          heading: "4. Limitations",
          content: "In no event shall Asthawaani or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Asthawaani's website."
        },
        {
          heading: "5. Accuracy of Materials",
          content: "The materials appearing on Asthawaani's website could include technical, typographical, or photographic errors. Asthawaani does not warrant that any of the materials on our website are accurate, complete, or current."
        },
        {
          heading: "6. Links",
          content: "Asthawaani has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Asthawaani of the site. Use of any such linked website is at the user's own risk."
        },
        {
          heading: "7. Modifications",
          content: "Asthawaani may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service."
        },
        {
          heading: "8. Governing Law",
          content: "These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
        }
      ]
    },
    hi: {
      title: "सेवा की शर्तें",
      sections: [
        {
          heading: "1. शर्तों का स्वीकार",
          content: "इस वेबसाइट को एक्सेस और उपयोग करके, आप इस समझौते की शर्तों से बंधे होने के लिए सहमत हैं। यदि आप सहमत नहीं हैं, तो कृपया इस सेवा का उपयोग न करें।"
        },
        {
          heading: "2. उपयोग लाइसेंस",
          content: "अस्थावणि की वेबसाइट पर सामग्री (जानकारी या सॉफ्टवेयर) की एक प्रति को व्यक्तिगत, गैर-वाणिज्यिक अस्थायी देखने के लिए अस्थायी रूप से डाउनलोड करने की अनुमति दी जाती है। यह एक लाइसेंस का अनुदान है, शीर्षक का हस्तांतरण नहीं।"
        },
        {
          heading: "3. अस्वीकरण",
          content: "अस्थावणि की वेबसाइट पर सामग्री 'जैसी है' के आधार पर प्रदान की जाती है। अस्थावणि कोई वारंटी नहीं देता, न ही व्यक्त किए गए या निहित किए गए। व्यापारिकता, किसी विशेष उद्देश्य के लिए फिटनेस, या बौद्धिक संपत्ति का गैर-उल्लंघन की वारंटी।"
        },
        {
          heading: "4. सीमाएं",
          content: "किसी भी स्थिति में अस्थावणि या इसके आपूर्तिकर्ता किसी भी नुकसान के लिए जिम्मेदार नहीं होंगे, जिसमें डेटा या लाभ की हानि या व्यावसायिक व्यवधान के कारण नुकसान शामिल है।"
        },
        {
          heading: "5. सामग्री की सटीकता",
          content: "अस्थावणि की वेबसाइट पर प्रकट होने वाली सामग्री में तकनीकी, टाइपोग्राफिक, या फोटोग्राफिक त्रुटियां हो सकती हैं। हम वारंटी नहीं देते कि हमारी वेबसाइट पर कोई भी सामग्री सटीक, पूर्ण या वर्तमान है।"
        },
        {
          heading: "6. लिंक",
          content: "अस्थावणि ने अपनी वेबसाइट से जुड़ी सभी साइटों की समीक्षा नहीं की है और किसी भी लिंक की गई साइट की सामग्री के लिए जिम्मेदार नहीं है।"
        },
        {
          heading: "7. संशोधन",
          content: "अस्थावणि किसी भी समय बिना नोटिस के हमारी वेबसाइट के लिए इन सेवा की शर्तों को संशोधित कर सकता है।"
        },
        {
          heading: "8. शासी कानून",
          content: "ये शर्तें और शर्तें भारत के कानूनों के अनुसार शासित होती हैं, और आप भारत में अदालतों के एकमात्र क्षेत्राधिकार को स्वीकार करते हैं।"
        }
      ]
    }
  };

  const currentContent = language === "hi" ? content.hi : content.en;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary mb-6">
            {currentContent.title}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {currentContent.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h2 className="text-2xl font-serif font-bold text-secondary">
                    {section.heading}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {language === "hi"
                  ? "अंतिम अपडेट: "
                  : "Last Updated: "}{" "}
                {new Date().toLocaleDateString(
                  language === "hi" ? "hi-IN" : "en-US"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
