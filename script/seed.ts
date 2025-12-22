import { db } from "../server/db";
import { pages, siteSettings, youtubeChannels } from "../shared/schema";

async function seed() {
  console.log("🌱 Starting database seed...\n");

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
  console.log("   - Site settings configured: " + settingsData.length);
  console.log("\n⚠️  IMPORTANT: Please change the admin password after first login!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error during seeding:", error);
  process.exit(1);
});
