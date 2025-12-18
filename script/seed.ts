import { db } from "../server/db";
import { admins, pages, posts, siteSettings, youtubeChannels } from "../shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Starting database seed...\n");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@asthawaani.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "Asthawaani Admin";

  console.log("1. Creating admin user...");
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  const [admin] = await db
    .insert(admins)
    .values({
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: "admin",
    })
    .onConflictDoNothing()
    .returning();

  const adminId = admin?.id;
  if (admin) {
    console.log(`   ✓ Admin created: ${adminEmail}`);
  } else {
    console.log(`   ⚠ Admin already exists: ${adminEmail}`);
  }

  console.log("\n2. Creating CMS pages...");
  const pagesData = [
    {
      slug: "home",
      title: "Welcome to Asthawaani",
      titleHi: "आस्थावाणी में आपका स्वागत है",
      content: `<h2>The Voice of Faith</h2>
<p>Asthawaani is a spiritual platform dedicated to spreading devotional wisdom from the sacred lands of Mathura-Vrindavan. We bring the essence of Sanatan Dharma to your digital doorstep through satsang, bhajans, and spiritual teachings.</p>
<h3>Our Mission</h3>
<p>To connect devotees worldwide with authentic spiritual content, preserving and sharing the rich heritage of Vrindavan's devotional traditions.</p>
<h3>What We Offer</h3>
<ul>
<li>Daily spiritual discourses and satsang</li>
<li>Devotional bhajans and kirtans</li>
<li>Teachings from revered saints and gurus</li>
<li>Virtual darshan of sacred temples</li>
</ul>`,
      contentHi: `<h2>आस्था की वाणी</h2>
<p>आस्थावाणी एक आध्यात्मिक मंच है जो मथुरा-वृंदावन की पवित्र भूमि से भक्ति ज्ञान का प्रसार करने के लिए समर्पित है। हम सत्संग, भजन और आध्यात्मिक शिक्षाओं के माध्यम से सनातन धर्म का सार आपके डिजिटल द्वार तक लाते हैं।</p>
<h3>हमारा मिशन</h3>
<p>वृंदावन की भक्ति परंपराओं की समृद्ध विरासत को संरक्षित और साझा करते हुए, दुनिया भर के भक्तों को प्रामाणिक आध्यात्मिक सामग्री से जोड़ना।</p>
<h3>हम क्या प्रदान करते हैं</h3>
<ul>
<li>दैनिक आध्यात्मिक प्रवचन और सत्संग</li>
<li>भक्तिमय भजन और कीर्तन</li>
<li>श्रद्धेय संतों और गुरुओं की शिक्षाएं</li>
<li>पवित्र मंदिरों के आभासी दर्शन</li>
</ul>`,
      metaTitle: "Asthawaani - The Voice of Faith | Spiritual Platform from Vrindavan",
      metaDescription: "Experience authentic spiritual content from Mathura-Vrindavan. Daily satsang, devotional bhajans, and teachings from revered saints. Join our spiritual community.",
      isPublished: true,
    },
    {
      slug: "about",
      title: "About Asthawaani",
      titleHi: "आस्थावाणी के बारे में",
      content: `<h2>Our Story</h2>
<p>Asthawaani was born from the sacred soil of Mathura-Vrindavan, the divine playground of Lord Krishna. Our journey began with a simple vision: to bring the transformative power of devotional wisdom to every home, transcending geographical boundaries.</p>
<h3>Our Values</h3>
<p><strong>Authenticity:</strong> We share teachings rooted in the timeless wisdom of Sanatan Dharma.</p>
<p><strong>Accessibility:</strong> Making spiritual knowledge available to seekers worldwide, regardless of their location.</p>
<p><strong>Community:</strong> Building a global family of devotees united in their love for the Divine.</p>
<h3>Our Team</h3>
<p>Our team consists of dedicated devotees, scholars, and content creators who work tirelessly to curate and share the most uplifting spiritual content.</p>`,
      contentHi: `<h2>हमारी कहानी</h2>
<p>आस्थावाणी मथुरा-वृंदावन की पवित्र भूमि से जन्मी है, जो भगवान कृष्ण की दिव्य लीलाभूमि है। हमारी यात्रा एक सरल दृष्टिकोण के साथ शुरू हुई: भौगोलिक सीमाओं को पार करते हुए, भक्ति ज्ञान की परिवर्तनकारी शक्ति को हर घर तक पहुंचाना।</p>
<h3>हमारे मूल्य</h3>
<p><strong>प्रामाणिकता:</strong> हम सनातन धर्म के शाश्वत ज्ञान में निहित शिक्षाएं साझा करते हैं।</p>
<p><strong>सुलभता:</strong> आध्यात्मिक ज्ञान को दुनिया भर के साधकों के लिए उपलब्ध कराना, चाहे वे कहीं भी हों।</p>
<p><strong>समुदाय:</strong> परमात्मा के प्रति प्रेम में एकजुट भक्तों का एक वैश्विक परिवार बनाना।</p>
<h3>हमारी टीम</h3>
<p>हमारी टीम में समर्पित भक्त, विद्वान और कंटेंट क्रिएटर शामिल हैं जो सबसे उत्थानकारी आध्यात्मिक सामग्री को संग्रहित और साझा करने के लिए अथक प्रयास करते हैं।</p>`,
      metaTitle: "About Asthawaani - Our Spiritual Journey from Vrindavan",
      metaDescription: "Learn about Asthawaani's mission to spread devotional wisdom from Mathura-Vrindavan. Our story, values, and dedicated team of spiritual content creators.",
      isPublished: true,
    },
    {
      slug: "contact",
      title: "Contact Us",
      titleHi: "संपर्क करें",
      content: `<h2>Get in Touch</h2>
<p>We would love to hear from you! Whether you have questions about our content, want to share your spiritual experiences, or wish to collaborate with us, please reach out.</p>
<h3>Connect With Us</h3>
<p>Email: contact@asthawaani.com</p>
<p>Location: Vrindavan, Mathura, Uttar Pradesh, India</p>
<h3>Follow Us</h3>
<p>Stay connected with us on social media for daily spiritual inspiration and updates about new content.</p>`,
      contentHi: `<h2>संपर्क में रहें</h2>
<p>हम आपसे सुनना पसंद करेंगे! चाहे आपके पास हमारी सामग्री के बारे में प्रश्न हों, अपने आध्यात्मिक अनुभव साझा करना चाहते हों, या हमारे साथ सहयोग करना चाहते हों, कृपया संपर्क करें।</p>
<h3>हमसे जुड़ें</h3>
<p>ईमेल: contact@asthawaani.com</p>
<p>स्थान: वृंदावन, मथुरा, उत्तर प्रदेश, भारत</p>
<h3>हमें फॉलो करें</h3>
<p>दैनिक आध्यात्मिक प्रेरणा और नई सामग्री के बारे में अपडेट के लिए सोशल मीडिया पर हमसे जुड़े रहें।</p>`,
      metaTitle: "Contact Asthawaani - Reach Out to Us",
      metaDescription: "Get in touch with Asthawaani. Contact us for questions, collaborations, or to share your spiritual experiences. Located in Vrindavan, Mathura.",
      isPublished: true,
    },
    {
      slug: "gallery",
      title: "Gallery",
      titleHi: "गैलरी",
      content: `<h2>Sacred Moments</h2>
<p>Experience the divine beauty of Mathura-Vrindavan through our collection of sacred images and moments captured during festivals, temple darshans, and spiritual gatherings.</p>`,
      contentHi: `<h2>पवित्र क्षण</h2>
<p>त्योहारों, मंदिर दर्शनों और आध्यात्मिक सभाओं के दौरान कैद किए गए पवित्र चित्रों और क्षणों के हमारे संग्रह के माध्यम से मथुरा-वृंदावन की दिव्य सुंदरता का अनुभव करें।</p>`,
      metaTitle: "Gallery - Sacred Images from Vrindavan | Asthawaani",
      metaDescription: "Browse our gallery of sacred images from Mathura-Vrindavan. Temple darshans, festival celebrations, and spiritual moments captured in photos.",
      isPublished: true,
    },
    {
      slug: "videos",
      title: "Videos",
      titleHi: "वीडियो",
      content: `<h2>Spiritual Video Content</h2>
<p>Watch our collection of devotional videos including bhajans, kirtans, spiritual discourses, and virtual temple darshans from Vrindavan.</p>`,
      contentHi: `<h2>आध्यात्मिक वीडियो सामग्री</h2>
<p>वृंदावन से भजन, कीर्तन, आध्यात्मिक प्रवचन और आभासी मंदिर दर्शन सहित हमारे भक्ति वीडियो का संग्रह देखें।</p>`,
      metaTitle: "Videos - Devotional Content from Vrindavan | Asthawaani",
      metaDescription: "Watch devotional videos from Asthawaani. Bhajans, kirtans, spiritual discourses, and virtual temple darshans from Mathura-Vrindavan.",
      isPublished: true,
    },
    {
      slug: "offerings",
      title: "Daily Offerings",
      titleHi: "दैनिक प्रसाद",
      content: `<h2>Our Spiritual Offerings</h2>
<p>Asthawaani offers a comprehensive range of spiritual services designed to bring peace, wisdom, and devotion into your daily life.</p>
<h3>Daily Satsang</h3>
<p>Daily Satsang on Asthawaani is a peaceful and meaningful way to receive real spiritual guidance for daily life. These satsangs are shared from the sacred land of Vrindavan, where devotion, bhakti, and Sanatan wisdom flow naturally.</p>
<h3>Katha & Pravachan</h3>
<p>Katha and Pravachan bring Sanatan Dharma teachings in easy, relatable language. Through Bhagwat Katha, Ram Katha, Shiv Katha, and spiritual pravachan, listeners learn deep life lessons through stories and examples.</p>
<h3>Bhajan & Kirtan</h3>
<p>Bhajan and Kirtan offer pure devotional music that calms the mind and fills the heart with bhakti. These bhajans include Krishna bhajan, Ram bhajan, naam kirtan, and soulful chanting rooted in Vrindavan and Braj traditions.</p>
<h3>Jaap & Mantra</h3>
<p>Jaap and Mantra are designed to support mental calmness and spiritual strength. Through Naam Jaap, Mantra Jaap, and guided chanting, listeners experience focus, positivity, and inner stability.</p>
<h3>Navgrah Shanti Path</h3>
<p>Navgrah Shanti Path focuses on faith, patience, and inner balance, based on Sanatan belief. This paath helps devotees stay mentally steady during challenging phases of life.</p>
<h3>Spiritual & Emotional Healing</h3>
<p>Through satsang, bhajan, mantra, and katha, we support people dealing with stress, anxiety, fear, sadness, or confusion. Spiritual healing helps calm the mind and build positive thinking.</p>
<h3>Morning Aarti</h3>
<p>Morning Aarti allows devotees to begin their day with gratitude, discipline, and divine remembrance. Starting the day with aarti helps remove negativity and improve concentration.</p>
<h3>Community</h3>
<p>Asthawaani Community is a spiritual family where seekers come together to share faith, devotion, and positivity. Being part of a community helps people stay motivated on their spiritual journey.</p>`,
      contentHi: `<h2>हमारी आध्यात्मिक सेवाएं</h2>
<p>आस्थावाणी आपके दैनिक जीवन में शांति, ज्ञान और भक्ति लाने के लिए डिज़ाइन की गई व्यापक आध्यात्मिक सेवाएं प्रदान करता है।</p>
<h3>दैनिक सत्संग</h3>
<p>आस्थावाणी पर दैनिक सत्संग दैनिक जीवन के लिए वास्तविक आध्यात्मिक मार्गदर्शन प्राप्त करने का एक शांतिपूर्ण और सार्थक तरीका है।</p>
<h3>कथा और प्रवचन</h3>
<p>कथा और प्रवचन सनातन धर्म की शिक्षाओं को सरल, संबंधित भाषा में लाते हैं। भागवत कथा, राम कथा और शिव कथा के माध्यम से श्रोता गहरे जीवन के पाठ सीखते हैं।</p>
<h3>भजन और कीर्तन</h3>
<p>भजन और कीर्तन शुद्ध भक्ति संगीत प्रदान करते हैं जो मन को शांत करते हैं। इन भजनों में कृष्ण भजन, राम भजन और वृंदावन परंपराओं में निहित जप शामिल हैं।</p>
<h3>जाप और मंत्र</h3>
<p>जाप और मंत्र मानसिक शांति और आध्यात्मिक शक्ति का समर्थन करने के लिए डिज़ाइन किए गए हैं। नाम जाप और मंत्र जाप के माध्यम से श्रोता ध्यान और सकारात्मकता का अनुभव करते हैं।</p>
<h3>नवग्रह शांति पाठ</h3>
<p>नवग्रह शांति पाठ सनातन विश्वास के आधार पर विश्वास, धैर्य और आंतरिक संतुलन पर केंद्रित है।</p>
<h3>आध्यात्मिक और भावनात्मक उपचार</h3>
<p>सत्संग, भजन, मंत्र और कथा के माध्यम से हम तनाव, चिंता और भय से जूझ रहे लोगों का समर्थन करते हैं।</p>
<h3>प्रातः आरती</h3>
<p>प्रातः आरती भक्तों को कृतज्ञता, अनुशासन और दिव्य स्मरण के साथ अपना दिन शुरू करने की अनुमति देती है।</p>
<h3>समुदाय</h3>
<p>आस्थावाणी समुदाय एक आध्यात्मिक परिवार है जहां साधक विश्वास, भक्ति और सकारात्मकता साझा करने के लिए एक साथ आते हैं।</p>`,
      metaTitle: "Daily Offerings - Spiritual Services | Asthawaani",
      metaDescription: "Explore Asthawaani's spiritual offerings including Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Morning Aarti, and Community services.",
      isPublished: true,
    },
    {
      slug: "brajbhoomi",
      title: "Brajbhoomi Darshan",
      titleHi: "ब्रजभूमि दर्शन",
      content: `<h2>The Sacred Land of Braj</h2>
<p>Brajbhoomi encompasses the sacred lands associated with Lord Krishna's divine pastimes. Each location carries unique spiritual significance and divine energy.</p>
<h3>Mathura - The Divine Birthplace of Lord Krishna</h3>
<p>Mathura is the eternal heart of Braj Bhoomi and the sacred birthplace of Lord Shri Krishna, making it one of the most revered spiritual destinations in India. Asthawaani's spiritual presence in Mathura represents the origin of divine consciousness, bhakti, and Sanatan wisdom.</p>
<h3>Vrindavan - The Land of Divine Love and Bhakti</h3>
<p>Vrindavan is the soul of Krishna Bhakti, where every particle breathes devotion and divine love. Known for Raas Leela, Bhajan-Kirtan, and Naam Jap, Vrindavan is the spiritual heartbeat of Asthawaani.</p>
<h3>Gokul - The Sacred Childhood Abode of Shri Krishna</h3>
<p>Gokul is the sacred land where Lord Krishna's bal-leelas unfolded under the loving care of Yashoda Maiya and Nand Baba. Asthawaani's spiritual offerings from Gokul highlight innocence, divine protection, and pure devotion.</p>
<h3>Govardhan - The Sacred Hill of Protection and Surrender</h3>
<p>Govardhan is the divine symbol of faith, protection, and surrender, where Lord Krishna lifted the Govardhan Parvat to protect devotees. Asthawaani's spiritual presence focuses on teachings of humility, seva, and unwavering faith.</p>
<h3>Mahavan - The Forest of Divine Protection</h3>
<p>Mahavan is a deeply sacred forest region where Lord Krishna performed powerful childhood leelas and protected devotees from demons. Asthawaani highlights Mahavan as a land of divine courage, protection, and inner strength.</p>
<h3>Barsana - The Divine Land of Radha Rani</h3>
<p>Barsana is the sacred birthplace of Shri Radha Rani, the embodiment of supreme devotion and divine love. Asthawaani's presence celebrates Radha-Krishna Bhakti, spiritual femininity, and unconditional surrender.</p>`,
      contentHi: `<h2>ब्रज की पवित्र भूमि</h2>
<p>ब्रजभूमि भगवान कृष्ण की दिव्य लीलाओं से जुड़ी पवित्र भूमि को शामिल करती है। प्रत्येक स्थान अद्वितीय आध्यात्मिक महत्व और दिव्य ऊर्जा रखता है।</p>
<h3>मथुरा - भगवान कृष्ण की दिव्य जन्मभूमि</h3>
<p>मथुरा ब्रज भूमि का शाश्वत हृदय है और भगवान श्री कृष्ण की पवित्र जन्मभूमि है, जो इसे भारत के सबसे सम्मानित आध्यात्मिक गंतव्यों में से एक बनाती है।</p>
<h3>वृंदावन - दिव्य प्रेम और भक्ति की भूमि</h3>
<p>वृंदावन कृष्ण भक्ति की आत्मा है, जहां हर कण भक्ति और दिव्य प्रेम से सांस लेता है। रास लीला, भजन-कीर्तन और नाम जप के लिए प्रसिद्ध, वृंदावन आस्थावाणी की आध्यात्मिक धड़कन है।</p>
<h3>गोकुल - श्री कृष्ण का पवित्र बाल्यकाल निवास</h3>
<p>गोकुल वह पवित्र भूमि है जहां यशोदा मैया और नंद बाबा की प्रेमपूर्ण देखभाल में भगवान कृष्ण की बाल-लीलाएं प्रकट हुईं।</p>
<h3>गोवर्धन - सुरक्षा और समर्पण का पवित्र पर्वत</h3>
<p>गोवर्धन विश्वास, सुरक्षा और समर्पण का दिव्य प्रतीक है, जहां भगवान कृष्ण ने भक्तों की रक्षा के लिए गोवर्धन पर्वत उठाया था।</p>
<h3>महावन - दिव्य सुरक्षा का वन</h3>
<p>महावन एक गहन पवित्र वन क्षेत्र है जहां भगवान कृष्ण ने शक्तिशाली बचपन की लीलाएं कीं और भक्तों को राक्षसों से बचाया।</p>
<h3>बरसाना - राधा रानी की दिव्य भूमि</h3>
<p>बरसाना श्री राधा रानी की पवित्र जन्मभूमि है, जो सर्वोच्च भक्ति और दिव्य प्रेम का मूर्त रूप हैं।</p>`,
      metaTitle: "Brajbhoomi Darshan - Sacred Places of Lord Krishna | Asthawaani",
      metaDescription: "Explore the sacred Brajbhoomi - Mathura, Vrindavan, Gokul, Govardhan, Mahavan, and Barsana. Experience divine temples and spiritual heritage of Lord Krishna's land.",
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

  console.log("\n3. Creating blog posts...");
  const postsData = [
    {
      slug: "importance-of-satsang",
      title: "The Importance of Satsang in Spiritual Life",
      titleHi: "आध्यात्मिक जीवन में सत्संग का महत्व",
      excerpt: "Discover why attending satsang is considered one of the most powerful practices for spiritual growth and inner transformation.",
      excerptHi: "जानें कि सत्संग में भाग लेना आध्यात्मिक विकास और आंतरिक परिवर्तन के लिए सबसे शक्तिशाली अभ्यासों में से एक क्यों माना जाता है।",
      content: `<h2>What is Satsang?</h2>
<p>Satsang, derived from Sanskrit words 'Sat' (truth) and 'Sang' (company), means being in the company of truth or the wise. It is a gathering where spiritual seekers come together to listen to, discuss, and meditate on spiritual teachings.</p>
<h3>Benefits of Regular Satsang</h3>
<ul>
<li><strong>Purification of Mind:</strong> Regular satsang helps cleanse negative thoughts and emotions.</li>
<li><strong>Spiritual Knowledge:</strong> Gain deeper understanding of scriptures and spiritual concepts.</li>
<li><strong>Community Support:</strong> Connect with like-minded seekers on the spiritual path.</li>
<li><strong>Divine Grace:</strong> Satsang is believed to attract divine blessings and grace.</li>
</ul>
<h3>How to Practice Satsang</h3>
<p>You can participate in satsang by:</p>
<ul>
<li>Attending local spiritual gatherings</li>
<li>Joining online satsang sessions</li>
<li>Reading spiritual scriptures with devotion</li>
<li>Listening to discourses of enlightened masters</li>
</ul>`,
      contentHi: `<h2>सत्संग क्या है?</h2>
<p>सत्संग, संस्कृत शब्दों 'सत्' (सत्य) और 'संग' (साथ) से बना है, जिसका अर्थ है सत्य या बुद्धिमानों की संगति में रहना। यह एक सभा है जहाँ आध्यात्मिक साधक आध्यात्मिक शिक्षाओं को सुनने, चर्चा करने और ध्यान करने के लिए एक साथ आते हैं।</p>
<h3>नियमित सत्संग के लाभ</h3>
<ul>
<li><strong>मन की शुद्धि:</strong> नियमित सत्संग नकारात्मक विचारों और भावनाओं को शुद्ध करने में मदद करता है।</li>
<li><strong>आध्यात्मिक ज्ञान:</strong> शास्त्रों और आध्यात्मिक अवधारणाओं की गहरी समझ प्राप्त करें।</li>
<li><strong>सामुदायिक समर्थन:</strong> आध्यात्मिक पथ पर समान विचारधारा वाले साधकों से जुड़ें।</li>
<li><strong>दिव्य कृपा:</strong> माना जाता है कि सत्संग दिव्य आशीर्वाद और कृपा को आकर्षित करता है।</li>
</ul>`,
      featuredImage: "/attached_assets/stock_images/vrindavan_temple_arc_5815b304.jpg",
      metaTitle: "The Importance of Satsang in Spiritual Life | Asthawaani",
      metaDescription: "Learn about the significance of satsang in spiritual growth. Discover how gathering in the company of truth can transform your life.",
      status: "published",
      authorId: adminId,
      publishedAt: new Date(),
    },
    {
      slug: "vrindavan-the-land-of-krishna",
      title: "Vrindavan - The Sacred Land of Lord Krishna",
      titleHi: "वृंदावन - भगवान कृष्ण की पवित्र भूमि",
      excerpt: "Explore the spiritual significance of Vrindavan, where every dust particle is said to be sacred with the footprints of Lord Krishna.",
      excerptHi: "वृंदावन के आध्यात्मिक महत्व का अन्वेषण करें, जहां कहा जाता है कि हर धूल कण भगवान कृष्ण के चरण चिह्नों से पवित्र है।",
      content: `<h2>The Divine Playground</h2>
<p>Vrindavan, located in the Mathura district of Uttar Pradesh, India, is one of the holiest places for devotees of Lord Krishna. This ancient town is where Lord Krishna spent his childhood and youth, performing divine pastimes (leelas) that continue to inspire millions.</p>
<h3>Sacred Places in Vrindavan</h3>
<ul>
<li><strong>Banke Bihari Temple:</strong> One of the most popular temples dedicated to Lord Krishna.</li>
<li><strong>ISKCON Temple:</strong> A magnificent temple that attracts visitors from around the world.</li>
<li><strong>Radha Raman Temple:</strong> Housing a self-manifested deity of Lord Krishna.</li>
<li><strong>Yamuna Ghat:</strong> Sacred bathing ghats along the Yamuna river.</li>
</ul>
<h3>Spiritual Practices</h3>
<p>Devotees engage in various spiritual practices in Vrindavan including:</p>
<ul>
<li>Parikrama (circumambulation) of sacred places</li>
<li>Kirtan and bhajan singing</li>
<li>Temple darshan at auspicious times</li>
<li>Seva (selfless service) at temples and ashrams</li>
</ul>`,
      contentHi: `<h2>दिव्य लीलाभूमि</h2>
<p>वृंदावन, भारत के उत्तर प्रदेश के मथुरा जिले में स्थित, भगवान कृष्ण के भक्तों के लिए सबसे पवित्र स्थानों में से एक है। यह प्राचीन नगर वह जगह है जहां भगवान कृष्ण ने अपना बचपन और युवावस्था बिताई, दिव्य लीलाएं कीं जो लाखों लोगों को प्रेरित करती हैं।</p>
<h3>वृंदावन में पवित्र स्थान</h3>
<ul>
<li><strong>बांके बिहारी मंदिर:</strong> भगवान कृष्ण को समर्पित सबसे लोकप्रिय मंदिरों में से एक।</li>
<li><strong>इस्कॉन मंदिर:</strong> एक भव्य मंदिर जो दुनिया भर के आगंतुकों को आकर्षित करता है।</li>
<li><strong>राधा रमण मंदिर:</strong> भगवान कृष्ण की स्वयं प्रकट मूर्ति का निवास।</li>
<li><strong>यमुना घाट:</strong> यमुना नदी के किनारे पवित्र स्नान घाट।</li>
</ul>`,
      featuredImage: "/attached_assets/stock_images/vrindavan_banke_biha_e70bac1b.jpg",
      metaTitle: "Vrindavan - The Sacred Land of Lord Krishna | Asthawaani",
      metaDescription: "Explore Vrindavan, the divine playground of Lord Krishna. Learn about sacred temples, spiritual practices, and the significance of this holy land.",
      status: "published",
      authorId: adminId,
      publishedAt: new Date(),
    },
    {
      slug: "power-of-bhajans",
      title: "The Healing Power of Devotional Bhajans",
      titleHi: "भक्ति भजनों की उपचारात्मक शक्ति",
      excerpt: "Understand how singing and listening to bhajans can bring peace, healing, and spiritual upliftment to your life.",
      excerptHi: "समझें कि भजन गाने और सुनने से आपके जीवन में शांति, उपचार और आध्यात्मिक उत्थान कैसे आ सकता है।",
      content: `<h2>The Science of Sacred Sound</h2>
<p>Bhajans are devotional songs that have been sung for centuries in India. These sacred songs carry vibrations that can heal the mind, body, and soul. Modern science is now recognizing what our ancient rishis knew - that sound has profound effects on our well-being.</p>
<h3>Benefits of Bhajan Singing</h3>
<ul>
<li><strong>Stress Relief:</strong> The rhythmic patterns and melodies help calm the nervous system.</li>
<li><strong>Emotional Healing:</strong> Express and release emotions in a healthy, devotional way.</li>
<li><strong>Spiritual Connection:</strong> Deepen your relationship with the Divine through music.</li>
<li><strong>Community Bonding:</strong> Singing together creates strong spiritual bonds.</li>
</ul>
<h3>How to Start</h3>
<p>Begin your bhajan practice by:</p>
<ul>
<li>Listening to traditional bhajans daily</li>
<li>Learning simple devotional songs</li>
<li>Joining kirtan groups in your area</li>
<li>Creating a daily practice of singing for the Divine</li>
</ul>`,
      contentHi: `<h2>पवित्र ध्वनि का विज्ञान</h2>
<p>भजन भक्ति गीत हैं जो भारत में सदियों से गाए जाते रहे हैं। ये पवित्र गीत ऐसे स्पंदन लेकर आते हैं जो मन, शरीर और आत्मा को ठीक कर सकते हैं।</p>
<h3>भजन गायन के लाभ</h3>
<ul>
<li><strong>तनाव मुक्ति:</strong> लयबद्ध पैटर्न और धुनें तंत्रिका तंत्र को शांत करने में मदद करती हैं।</li>
<li><strong>भावनात्मक उपचार:</strong> स्वस्थ, भक्तिपूर्ण तरीके से भावनाओं को व्यक्त करें और मुक्त करें।</li>
<li><strong>आध्यात्मिक संबंध:</strong> संगीत के माध्यम से परमात्मा के साथ अपने संबंध को गहरा करें।</li>
<li><strong>सामुदायिक बंधन:</strong> एक साथ गाने से मजबूत आध्यात्मिक बंधन बनते हैं।</li>
</ul>`,
      featuredImage: "/attached_assets/generated_images/devotional_bhajan_kirtan.png",
      metaTitle: "The Healing Power of Devotional Bhajans | Asthawaani",
      metaDescription: "Discover the healing power of bhajans. Learn how devotional singing can bring peace, stress relief, and spiritual growth to your life.",
      status: "published",
      authorId: adminId,
      publishedAt: new Date(),
    },
  ];

  for (const post of postsData) {
    const [created] = await db
      .insert(posts)
      .values(post)
      .onConflictDoNothing()
      .returning();
    
    if (created) {
      console.log(`   ✓ Post created: ${post.slug}`);
    } else {
      console.log(`   ⚠ Post already exists: ${post.slug}`);
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
  console.log("   - Admin login: " + adminEmail);
  console.log("   - Password: " + adminPassword);
  console.log("   - Pages created: " + pagesData.length);
  console.log("   - Blog posts created: " + postsData.length);
  console.log("   - Site settings configured: " + settingsData.length);
  console.log("\n⚠️  IMPORTANT: Please change the admin password after first login!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error during seeding:", error);
  process.exit(1);
});
