import { db } from "../server/db";
import { pages, siteSettings, youtubeChannels } from "../shared/schema";

async function seed() {
  console.log("🌱 Starting database seed...\n");

  console.log("\n2. Creating CMS pages...");
  const pagesData = [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      titleHi: "गोपनीयता नीति",
      content: `<h2>Privacy Policy</h2>
<h3>1. Introduction</h3>
<p>At Asthawaani, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your personal information.</p>
<h3>2. Information We Collect</h3>
<p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
<ul>
<li>Personal identification information (name, email address, phone number, etc.) that you voluntarily submit to us through our website or services.</li>
<li>Information we collect on the site, whether directly or indirectly, from you when you interact with our website.</li>
</ul>
<h3>3. How We Use Your Information</h3>
<p>We use the information we collect in various ways, including to:</p>
<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you regarding updates and offer technical notices and support</li>
<li>Send you marketing and promotional communications</li>
<li>Respond to your questions and requests</li>
</ul>
<h3>4. Protection of Your Information</h3>
<p>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. We use regular malware scanning, and your personal access is a secure, password protected.</p>
<p>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.</p>
<h3>5. Third-Party Disclosure</h3>
<p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
<h3>6. Third-Party Links</h3>
<p>Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.</p>
<h3>7. CCPA Privacy Rights</h3>
<p>If you are a resident of California, you are entitled to learn what data we collect about you, ask to delete your data, and opt out of the sale of your personal information. To make such a request, please contact us using the information provided at the bottom of this document.</p>
<h3>8. GDPR Information Rights</h3>
<p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. You are entitled to request access, correction, deletion, and portability of your data. To exercise any of these rights, please contact us using the information below.</p>
<h3>9. Contact Us</h3>
<p>If you have any questions about this Privacy Policy, please contact us at the details and email provided on our website footer, or through our contact form.</p>
<p><em>Last Updated: 12/22/2025</em></p>`,
      contentHi: `<h2>गोपनीयता नीति</h2>
<h3>1. परिचय</h3>
<p>आस्थावाणी में, हम आपकी गोपनीयता की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति समझाती है कि हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र करते हैं, उपयोग करते हैं, साझा करते हैं, और अन्यथा संभालते हैं।</p>
<h3>2. हम कौन सी जानकारी एकत्र करते हैं</h3>
<p>हम विभिन्न तरीकों से आपके बारे में जानकारी एकत्र कर सकते हैं। हम साइट पर जो जानकारी एकत्र कर सकते हैं उसमें शामिल है:</p>
<ul>
<li>व्यक्तिगत पहचान की जानकारी (नाम, ईमेल पता, फोन नंबर, आदि) जो आप स्वेच्छा से हमारी वेबसाइट या सेवाओं के माध्यम से जमा करते हैं।</li>
<li>जानकारी जो हम साइट पर एकत्र करते हैं, चाहे सीधे या अप्रत्यक्ष रूप से, आपसे जब आप हमारी वेबसाइट के साथ इंटरैक्ट करते हैं।</li>
</ul>
<h3>3. हम आपकी जानकारी का उपयोग कैसे करते हैं</h3>
<p>हम जो जानकारी एकत्र करते हैं उसका उपयोग विभिन्न तरीकों से करते हैं, जिनमें शामिल हैं:</p>
<ul>
<li>हमारी वेबसाइट प्रदान करना, संचालित करना और बनाए रखना</li>
<li>हमारी वेबसाइट को बेहतर बनाना, व्यक्तिगत बनाना और विस्तारित करना</li>
<li>समझना और विश्लेषण करना कि आप हमारी वेबसाइट का उपयोग कैसे करते हैं</li>
<li>नई उत्पाद, सेवाएं, सुविधाएं और कार्यक्षमता विकसित करना</li>
<li>अपडेट के संबंध में आपके साथ संवाद करना और तकनीकी सूचनाएं और समर्थन प्रदान करना</li>
<li>आपको विपणन और प्रचारणात्मक संचार भेजना</li>
<li>आपके प्रश्नों और अनुरोधों का जवाब देना</li>
</ul>
<h3>4. आपकी जानकारी की सुरक्षा</h3>
<p>हमारी वेबसाइट को सुरक्षा खामियों और ज्ञात कमजोरियों के लिए नियमित रूप से स्कैन किया जाता है ताकि हमारी साइट पर आपकी यात्रा यथासंभव सुरक्षित हो। हम नियमित मैलवेयर स्कैनिंग का उपयोग करते हैं, और आपकी व्यक्तिगत पहुंच एक सुरक्षित, पासवर्ड-सुरक्षित है।</p>
<p>आपकी व्यक्तिगत जानकारी सुरक्षित नेटवर्क के पीछे सुरक्षित है और केवल सीमित संख्या में लोग जिनके पास इस तरह की प्रणालियों तक विशेष पहुंच है, द्वारा ही पहुंचा जा सकता है, और उन्हें जानकारी को गोपनीय रखने की आवश्यकता होती है।</p>
<h3>5. तीसरे पक्ष का प्रकटीकरण</h3>
<p>हम आपकी व्यक्तिगत रूप से पहचानी जाने वाली जानकारी को बाहरी पक्षों को बेचते, व्यापार करते या अन्यथा हस्तांतरित नहीं करते हैं जब तक कि हम उपयोगकर्ताओं को अग्रिम नोटिस न दें। इसमें वेबसाइट होस्टिंग भागीदार और अन्य पक्ष शामिल नहीं हैं जो हमें हमारी वेबसाइट संचालित करने, हमारे व्यवसाय को संचालित करने, या हमारे उपयोगकर्ताओं की सेवा करने में सहायता करते हैं, जब तक वे पक्ष इस जानकारी को गोपनीय रखने के लिए सहमत न हों।</p>
<h3>6. तीसरे पक्ष के लिंक</h3>
<p>कभी-कभी, हमारे विवेक में, हम अपनी वेबसाइट पर तीसरे पक्ष की उत्पादों या सेवाओं को शामिल कर सकते हैं या प्रदान कर सकते हैं। इन तीसरे पक्ष की साइटों की अलग और स्वतंत्र गोपनीयता नीतियां हैं। इसलिए हमारे पास इन लिंक की गई साइटों की सामग्री और गतिविधियों के लिए कोई जिम्मेदारी या दायित्व नहीं है।</p>
<h3>7. CCPA गोपनीयता अधिकार</h3>
<p>यदि आप कैलिफोर्निया के निवासी हैं, तो आप यह सीखने के हकदार हैं कि हम आपके बारे में क्या डेटा एकत्र करते हैं, अपने डेटा को हटाने के लिए कहें, और अपनी व्यक्तिगत जानकारी की बिक्री से बाहर निकलें। ऐसा अनुरोध करने के लिए, कृपया इस दस्तावेज़ के निचले भाग में प्रदान की गई जानकारी का उपयोग करके हमसे संपर्क करें।</p>
<h3>8. GDPR सूचना अधिकार</h3>
<p>यदि आप यूरोपीय आर्थिक क्षेत्र (EEA) के निवासी हैं, तो आपके पास निश्चित डेटा सुरक्षा अधिकार हैं। आप अपने डेटा तक पहुंच, सुधार, हटाने और पोर्टेबिलिटी का अनुरोध करने के हकदार हैं। इन अधिकारों में से किसी का प्रयोग करने के लिए, कृपया नीचे दी गई जानकारी का उपयोग करके हमसे संपर्क करें।</p>
<h3>9. संपर्क करें</h3>
<p>यदि आपको इस गोपनीयता नीति के बारे में कोई प्रश्न है, तो कृपया हमारी वेबसाइट फुटर में दी गई जानकारी और ईमेल, या हमारे संपर्क फॉर्म के माध्यम से हमसे संपर्क करें।</p>
<p><em>अंतिम अपडेट: 12/22/2025</em></p>`,
      metaTitle: "Privacy Policy | Asthawaani",
      metaDescription: "Read Asthawaani's Privacy Policy to understand how we collect, use, and protect your personal information.",
      isPublished: true,
    },
    {
      slug: "terms-conditions",
      title: "Terms of Service",
      titleHi: "सेवा की शर्तें",
      content: `<h2>Terms of Service</h2>
<h3>1. Acceptance of Terms</h3>
<p>By accessing and using the website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
<h3>2. Use License</h3>
<p>Permission is granted to temporarily download one copy of the materials (information or software) on Asthawaani's website for personal, non-commercial viewing only. This is not a grant of a license, but a restriction of use, and under this license you may not:</p>
<ul>
<li>Modify or copy the materials</li>
<li>Use the materials for any commercial purpose or for any public display</li>
<li>Attempt to decompile or reverse engineer any software contained on the website</li>
<li>Remove any copyright or other proprietary notations from the materials</li>
<li>Transfer the materials to another person or "mirror" the materials on any other server</li>
</ul>
<h3>3. Disclaimer</h3>
<p>The materials on Asthawaani's website are provided on an "as is" basis. Asthawaani makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
<h3>4. Limitations</h3>
<p>In no event shall Asthawaani or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use of or inability to use the materials on Asthawaani's website, even if Asthawaani or a representative of this site has been notified orally or in writing of the possibility of such damage.</p>
<h3>5. Accuracy of Materials</h3>
<p>The materials appearing on Asthawaani's website could include technical, typographical, or photographic errors. Asthawaani does not warrant that any of the materials on the website are accurate, complete, or current. Asthawaani may make changes to the materials contained on its website at any time without notice.</p>
<h3>6. Links</h3>
<p>Asthawaani has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Asthawaani of the site. Use of any such linked website is at the user's own risk.</p>
<h3>7. Modifications</h3>
<p>Asthawaani may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
<h3>8. Governing Law</h3>
<p>These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
<p><em>Last Updated: 12/22/2025</em></p>`,
      contentHi: `<h2>सेवा की शर्तें</h2>
<h3>1. शर्तों की स्वीकृति</h3>
<p>वेबसाइट तक पहुँचकर और इसका उपयोग करके, आप इस समझौते की शर्तों और प्रावधानों से बंधे होने के लिए सहमत हैं। यदि आप उपरोक्त का पालन नहीं करने के लिए सहमत नहीं हैं, तो कृपया इस सेवा का उपयोग न करें।</p>
<h3>2. उपयोग लाइसेंस</h3>
<p>आस्थावाणी की वेबसाइट पर सामग्री (सूचना या सॉफ्टवेयर) की एक प्रति को व्यक्तिगत, गैर-वाणिज्यिक देखने के लिए केवल अस्थायी रूप से डाउनलोड करने की अनुमति दी जाती है। यह लाइसेंस का एक अनुदान नहीं है, बल्कि उपयोग का एक प्रतिबंध है, और इस लाइसेंस के तहत आप निम्नलिखित नहीं कर सकते:</p>
<ul>
<li>सामग्री को संशोधित करना या कॉपी करना</li>
<li>किसी वाणिज्यिक उद्देश्य के लिए या किसी सार्वजनिक प्रदर्शन के लिए सामग्री का उपयोग करना</li>
<li>वेबसाइट पर किसी भी सॉफ्टवेयर को डिकम्पाइल या रिवर्स इंजीनियर करने का प्रयास करना</li>
<li>सामग्री से किसी भी कॉपीराइट या अन्य स्वामित्व संकेतन को हटाना</li>
<li>सामग्री को किसी अन्य व्यक्ति को हस्तांतरित करना या किसी अन्य सर्वर पर सामग्री को "मिरर" करना</li>
</ul>
<h3>3. अस्वीकरण</h3>
<p>आस्थावाणी की वेबसाइट पर सामग्री "जैसी है" आधार पर प्रदान की जाती है। आस्थावाणी कोई वारंटी नहीं देता है, न ही निहित वारंटी देता है, और इसके द्वारा सभी अन्य वारंटियों को अस्वीकार करता है और निष्क्रिय करता है जिसमें सीमा के बिना, व्यापारिकता की निहित वारंटी या शर्तें, एक विशेष उद्देश्य के लिए उपयुक्तता, या बौद्धिक संपत्ति का गैर-उल्लंघन शामिल है।</p>
<h3>4. सीमाएँ</h3>
<p>किसी भी परिस्थिति में आस्थावाणी या इसके आपूर्तिकर्ता किसी भी नुकसान (सीमा के बिना, डेटा या लाभ के नुकसान के लिए नुकसान सहित, या व्यावसायिक व्यवधान के कारण,) के लिए देयता नहीं होंगे जो आस्थावाणी की वेबसाइट पर सामग्री के उपयोग या उपयोग में असमर्थता से उत्पन्न होता है।</p>
<h3>5. सामग्री की सटीकता</h3>
<p>आस्थावाणी की वेबसाइट पर दिखाई देने वाली सामग्री में तकनीकी, टाइपोग्राफिक, या फोटोग्राफिक त्रुटियां हो सकती हैं। आस्थावाणी वारंट नहीं करता है कि वेबसाइट पर कोई भी सामग्री सटीक, पूर्ण या वर्तमान है। आस्थावाणी बिना सूचना के किसी भी समय अपनी वेबसाइट पर सामग्री में परिवर्तन कर सकता है।</p>
<h3>6. लिंक</h3>
<p>आस्थावाणी ने अपनी वेबसाइट से जुड़ी सभी साइटों की समीक्षा नहीं की है और किसी भी लिंक की गई साइट की सामग्री के लिए जिम्मेदार नहीं है। किसी भी लिंक का समावेश आस्थावाणी द्वारा साइट के समर्थन का अर्थ नहीं है। किसी भी ऐसी लिंक की गई वेबसाइट का उपयोग उपयोगकर्ता के अपने जोखिम पर है।</p>
<h3>7. संशोधन</h3>
<p>आस्थावाणी बिना सूचना के किसी भी समय अपनी वेबसाइट के लिए सेवा की इन शर्तों को संशोधित कर सकता है। इस वेबसाइट का उपयोग करके, आप सेवा की शर्तों के तत्कालीन वर्तमान संस्करण द्वारा बंधे होने के लिए सहमत हैं।</p>
<h3>8. अनुगामी कानून</h3>
<p>ये शर्तें भारत के कानूनों द्वारा संचालित होती हैं, और आप उस स्थान की अदालतों के विशेष अधिकार क्षेत्र के लिए अपरिवर्तनीय रूप से प्रस्तुत करते हैं।</p>
<p><em>अंतिम अपडेट: 12/22/2025</em></p>`,
      metaTitle: "Terms of Service | Asthawaani",
      metaDescription: "Read Asthawaani's Terms of Service to understand the conditions and terms under which you can use our website and services.",
      isPublished: true,
    },
  ];

  for (const page of pagesData) {
    const [created] = await db
      .insert(pages)
      .values(page)
      .onConflictDoNothing()
      .returning();
    
    if (created) {
      console.log(`   ✓ Page created: ${page.slug}`);
    } else {
      console.log(`   ⚠ Page already exists: ${page.slug}`);
    }
  }


  console.log("\n4. Creating site settings...");
  const settingsData = [
    {
      key: "site_name",
      value: "Asthawaani",
    },
    {
      key: "site_name_hi",
      value: "आस्थावाणी",
    },
    {
      key: "site_tagline",
      value: "The Voice of Faith",
    },
    {
      key: "site_tagline_hi",
      value: "आस्था की वाणी",
    },
    {
      key: "site_description",
      value: "Asthawaani is a spiritual platform dedicated to spreading devotional wisdom from Mathura-Vrindavan through satsang, bhajans, and spiritual teachings.",
    },
    {
      key: "contact_email",
      value: "contact@asthawaani.com",
    },
    {
      key: "contact_location",
      value: "Vrindavan, Mathura, Uttar Pradesh, India",
    },
    {
      key: "social_youtube",
      value: "https://www.youtube.com/@asthawaani",
    },
    {
      key: "default_language",
      value: "en",
    },
    {
      key: "organization_schema",
      valueJson: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Asthawaani",
        "description": "Spiritual platform from Mathura-Vrindavan",
        "url": "https://asthawaani.com",
        "logo": "/attached_assets/Asthawani-logo_1765886539362.png",
        "sameAs": [
          "https://www.youtube.com/@asthawaani"
        ]
      },
    },
  ];

  for (const setting of settingsData) {
    const [created] = await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoNothing()
      .returning();
    
    if (created) {
      console.log(`   ✓ Setting created: ${setting.key}`);
    } else {
      console.log(`   ⚠ Setting already exists: ${setting.key}`);
    }
  }

  console.log("\n5. Creating YouTube channel entry...");
  const [channel] = await db
    .insert(youtubeChannels)
    .values({
      channelId: "UCasthawaani",
      channelName: "Asthawaani Official",
      description: "Official YouTube channel of Asthawaani - spreading spiritual wisdom from Vrindavan",
      thumbnailUrl: "/attached_assets/Asthawani-logo_1765886539362.png",
    })
    .onConflictDoNothing()
    .returning();

  if (channel) {
    console.log("   ✓ YouTube channel entry created");
  } else {
    console.log("   ⚠ YouTube channel already exists");
  }

  console.log("\n✨ Database seeding completed successfully!");
  console.log("\n📋 Summary:");
  console.log("   - Pages created: " + pagesData.length);
  console.log("   - Site settings configured: " + settingsData.length);
  console.log("\n⚠️  IMPORTANT: Please change the admin password after first login!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error during seeding:", error);
  process.exit(1);
});
