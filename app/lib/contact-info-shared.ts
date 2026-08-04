// Client-safe contact info types/helpers. No DB imports here so client
// components can use them without pulling `pg` into the browser bundle.

export type ContactInfo = {
  name: string;
  nameHi: string;
  address: string;
  addressHi: string;
  phone: string;
  email: string;
  whatsapp: string;
};

/** Fallback values, used only when the CMS has no contact_info row yet. */
export const DEFAULT_CONTACT_INFO: ContactInfo = {
  name: 'Asthawaani',
  nameHi: 'अस्थावाणी',
  address: 'Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh 281001',
  addressHi: 'आशीर्वाद पैलेस, स्वेज फार्म, यमुनापार, लक्ष्मीनगर, मथुरा, उत्तर प्रदेश 281001',
  phone: '+91 76684 09246',
  email: 'contact@asthawaani.com',
  whatsapp: '+91 76684 09246',
};

/** Digits-only phone suitable for wa.me / tel: links. */
export function toDialDigits(value: string): string {
  const digits = (value || '').replace(/\D/g, '');
  if (!digits) return '';
  return digits.length === 10 ? `91${digits}` : digits;
}
