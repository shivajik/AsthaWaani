import AdminClient from './AdminClient';

export const metadata = {
  title: 'Admin – Asthawaani CMS',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
