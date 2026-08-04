import { unstable_noStore as noStore } from 'next/cache';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { db, isDbConfigured } from './db';

const contactInfoTable = pgTable('contact_info', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  country: text('country'),
  postalCode: text('postal_code'),
  phone: text('phone'),
  email: text('email'),
  whatsapp: text('whatsapp'),
  nameHi: text('name_hi'),
  addressHi: text('address_hi'),
  cityHi: text('city_hi'),
});

export { DEFAULT_CONTACT_INFO, toDialDigits } from './contact-info-shared';
export type { ContactInfo } from './contact-info-shared';

import { DEFAULT_CONTACT_INFO, type ContactInfo } from './contact-info-shared';


export async function getContactInfo(): Promise<ContactInfo> {
  noStore();
  if (!isDbConfigured()) return DEFAULT_CONTACT_INFO;
  try {
    const [row] = await db.select().from(contactInfoTable).limit(1);
    if (!row) return DEFAULT_CONTACT_INFO;
    const addressParts = [row.address, row.city, row.state, row.postalCode].filter(Boolean);
    return {
      name: row.name || DEFAULT_CONTACT_INFO.name,
      nameHi: row.nameHi || row.name || DEFAULT_CONTACT_INFO.nameHi,
      address: addressParts.length ? addressParts.join(', ') : DEFAULT_CONTACT_INFO.address,
      addressHi: row.addressHi || (addressParts.length ? addressParts.join(', ') : DEFAULT_CONTACT_INFO.addressHi),
      phone: row.phone || DEFAULT_CONTACT_INFO.phone,
      email: row.email || DEFAULT_CONTACT_INFO.email,
      whatsapp: row.whatsapp || row.phone || DEFAULT_CONTACT_INFO.whatsapp,
    };
  } catch {
    return DEFAULT_CONTACT_INFO;
  }
}
