import { db } from '../lib/db';
import { eq, and } from 'drizzle-orm';
import { pgTable, text, varchar, integer, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { FooterClient } from './FooterClient';

const ads = pgTable("ads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  imageUrl: text("image_url").notNull(),
  imageWidth: integer("image_width"),
  imageHeight: integer("image_height"),
  link: text("link"),
  isActive: boolean("is_active").notNull(),
  placement: text("placement").notNull(),
  position: integer("position").notNull(),
});

export async function Footer() {
  let aboveFooterAds: any[] = [];
  let footerAds: any[] = [];
  try {
    aboveFooterAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'above_footer')));
    footerAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'footer')));
  } catch (e) { /* ignore */ }
  const sanitize = (a: any) => ({ id: a.id, titleEn: a.titleEn, imageUrl: a.imageUrl, link: a.link ?? null });
  return <FooterClient aboveFooterAds={aboveFooterAds.map(sanitize)} footerAds={footerAds.map(sanitize)} />;
}
