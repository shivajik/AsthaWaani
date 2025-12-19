import { useLanguage } from "@/lib/context";

export default function PrivacyPolicy() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "1. Introduction",
          content: "At Asthawaani, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your personal information."
        },
        {
          heading: "2. Information We Collect",
          content: "We may collect information about you in a variety of ways. The information we may collect on the site includes: personal identification information (name, email address, phone number, etc.) that you voluntarily submit to us through our contact forms; and usage data through cookies and similar technologies."
        },
        {
          heading: "3. How We Use Your Information",
          content: "We use the information we collect in various ways, including to: provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; develop new products, services, features, and functionality; send promotional communications; and respond to your comments, questions and requests."
        },
        {
          heading: "4. Protection of Your Information",
          content: "Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential."
        },
        {
          heading: "5. Third-Party Disclosure",
          content: "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential."
        },
        {
          heading: "6. Third-Party Links",
          content: "Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites."
        },
        {
          heading: "7. CCPA Privacy Rights",
          content: "If you are a California resident, you are entitled to learn what data we collect about you, ask to delete your data, and opt-out of the sale of your personal information. To make such a request, please contact us using the information provided at the bottom of this document."
        },
        {
          heading: "8. GDPR Data Protection Rights",
          content: "If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data."
        },
        {
          heading: "9. Contact Us",
          content: "If you have questions about this Privacy Policy, please contact us at the address and email provided in our website footer, or through our contact form."
        }
      ]
    },
    hi: {
      title: "गोपनीयता नीति",
      sections: [
        {
          heading: "1. परिचय",
          content: "अस्थावणि में, हम आपकी गोपनीयता की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र, उपयोग, प्रकट और अन्यथा संभालते हैं।"
        },
        {
          heading: "2. हम कौन सी जानकारी एकत्र करते हैं",
          content: "हम विभिन्न तरीकों से आपके बारे में जानकारी एकत्र कर सकते हैं। साइट पर एकत्र की जाने वाली जानकारी में शामिल हो सकते हैं: व्यक्तिगत पहचान की जानकारी; उपयोग डेटा और कुकीज़ के माध्यम से एकत्र की गई जानकारी।"
        },
        {
          heading: "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
          content: "हम विभिन्न उद्देश्यों के लिए एकत्र की गई जानकारी का उपयोग करते हैं, जिसमें शामिल हैं: हमारी वेबसाइट प्रदान करना; वेबसाइट में सुधार करना; आपके साथ संचार करना; और आपकी प्रतिक्रिया का जवाब देना।"
        },
        {
          heading: "4. आपकी जानकारी की सुरक्षा",
          content: "हमारी वेबसाइट नियमित रूप से सुरक्षा जांच के लिए स्कैन की जाती है। आपकी व्यक्तिगत जानकारी सुरक्षित नेटवर्क के पीछे निहित है और केवल सीमित संख्या में व्यक्तियों द्वारा एक्सेस योग्य है।"
        },
        {
          heading: "5. तीसरे पक्ष का प्रकटीकरण",
          content: "हम आपकी व्यक्तिगत जानकारी को बाहरी पार्टियों को नहीं बेचते हैं, न ही हम इसे हस्तांतरित करते हैं, जब तक कि हम आपको पहले से अग्रिम सूचना न दें।"
        },
        {
          heading: "6. तीसरे पक्ष के लिंक",
          content: "कभी-कभी, हम अपनी वेबसाइट पर तीसरे पक्ष के उत्पाद या सेवाएं शामिल कर सकते हैं। इन तीसरे पक्ष की साइटों के पास अलग गोपनीयता नीतियां हैं।"
        },
        {
          heading: "7. डेटा सुरक्षा अधिकार",
          content: "यदि आप भारत के अंतर्गत आते हैं, तो आपके पास अपनी व्यक्तिगत डेटा को सुधारने, संशोधित करने, हटाने या सीमित करने का अधिकार है।"
        },
        {
          heading: "8. हमसे संपर्क करें",
          content: "यदि आपके पास इस गोपनीयता नीति के बारे में प्रश्न हैं, तो कृपया हमारी वेबसाइट के फूटर में दिए गए पते पर या हमारे संपर्क फॉर्म के माध्यम से हमसे संपर्क करें।"
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
