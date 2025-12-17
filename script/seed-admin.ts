import { db } from "../server/db";
import { admins } from "../shared/schema";
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
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin();
