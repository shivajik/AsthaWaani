import { db } from "../server/db";
import { admins, contactInfo } from "../shared/schema";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@asthawaani.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Admin";

  console.log("Seeding admin user...");

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const [admin] = await db
      .insert(admins)
      .values({
        email,
        password: hashedPassword,
        name,
        role: "admin",
      })
      .onConflictDoNothing()
      .returning();

    if (admin) {
      console.log(`Admin user created: ${email}`);
    } else {
      console.log(`Admin user already exists: ${email}`);
    }

    console.log("Seeding contact information...");
    const [contact] = await db
      .insert(contactInfo)
      .values({
        name: "Asthawaani Kendra",
        nameHi: "आस्थावाणी केंद्र",
        address: "c/o Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar",
        addressHi: "सी/ओ आशीर्वाद पैलेस, स्वेज फार्म, यमुनापार, लक्ष्मीनगर",
        city: "Mathura",
        cityHi: "मथुरा",
        state: "Uttar Pradesh",
        country: "India",
        postalCode: "281001",
        phone: "+91 76684 09246",
        whatsapp: "+91 76684 09246",
        email: "contact@asthawaani.com",
      })
      .onConflictDoNothing()
      .returning();

    if (contact) {
      console.log("Contact information created");
    } else {
      console.log("Contact information already exists");
    }
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin();
