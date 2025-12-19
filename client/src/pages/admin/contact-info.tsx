import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContactInfo } from "@shared/schema";

export default function AdminContactInfo() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ContactInfo | null>(null);

  const { data: contactInfo, isLoading } = useQuery<ContactInfo | null>({
    queryKey: ["/api/cms/public/contact-info"],
    queryFn: async () => {
      const res = await fetch("/api/cms/public/contact-info");
      if (!res.ok) return null;
      return res.json();
    },
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData(contactInfo);
    }
  }, [contactInfo]);

  const mutation = useMutation({
    mutationFn: async (data: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await fetch("/api/admin/contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'en' ? "Success" : "सफलता",
        description: language === 'en' ? "Contact info updated" : "संपर्क जानकारी अपडेट हुई",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/public/contact-info"] });
    },
    onError: () => {
      toast({
        title: language === 'en' ? "Error" : "त्रुटि",
        description: language === 'en' ? "Failed to update contact info" : "संपर्क जानकारी अपडेट करने में विफल",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const { id, createdAt, updatedAt, ...submitData } = formData;
    mutation.mutate(submitData);
  };

  if (isLoading) {
    return <div className="p-8">{language === 'en' ? 'Loading...' : 'लोड हो रहा है...'}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{language === 'en' ? 'Contact Information' : 'संपर्क जानकारी'}</h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' 
            ? 'Manage your contact details displayed on the contact page'
            : 'संपर्क पृष्ठ पर प्रदर्शित आपकी संपर्क जानकारी को प्रबंधित करें'
          }
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* English Fields */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'Organization Name' : 'संगठन का नाम'}</label>
              <Input
                value={formData?.name || ""}
                onChange={(e) => setFormData(formData ? { ...formData, name: e.target.value } : null)}
                placeholder={language === 'en' ? 'Organization name' : 'संगठन का नाम'}
                data-testid="input-contact-name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'Organization Name (Hindi)' : 'संगठन का नाम (हिंदी)'}</label>
              <Input
                value={formData?.nameHi || ""}
                onChange={(e) => setFormData(formData ? { ...formData, nameHi: e.target.value } : null)}
                placeholder={language === 'en' ? 'Organization name in Hindi' : 'हिंदी में संगठन का नाम'}
                data-testid="input-contact-name-hi"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'Address' : 'पता'}</label>
              <Input
                value={formData?.address || ""}
                onChange={(e) => setFormData(formData ? { ...formData, address: e.target.value } : null)}
                placeholder={language === 'en' ? 'Street address' : 'पता'}
                data-testid="input-contact-address"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'Address (Hindi)' : 'पता (हिंदी)'}</label>
              <Input
                value={formData?.addressHi || ""}
                onChange={(e) => setFormData(formData ? { ...formData, addressHi: e.target.value } : null)}
                placeholder={language === 'en' ? 'Address in Hindi' : 'हिंदी में पता'}
                data-testid="input-contact-address-hi"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'City' : 'शहर'}</label>
              <Input
                value={formData?.city || ""}
                onChange={(e) => setFormData(formData ? { ...formData, city: e.target.value } : null)}
                placeholder={language === 'en' ? 'City' : 'शहर'}
                data-testid="input-contact-city"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'City (Hindi)' : 'शहर (हिंदी)'}</label>
              <Input
                value={formData?.cityHi || ""}
                onChange={(e) => setFormData(formData ? { ...formData, cityHi: e.target.value } : null)}
                placeholder={language === 'en' ? 'City in Hindi' : 'हिंदी में शहर'}
                data-testid="input-contact-city-hi"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'State' : 'राज्य'}</label>
              <Input
                value={formData?.state || ""}
                onChange={(e) => setFormData(formData ? { ...formData, state: e.target.value } : null)}
                placeholder={language === 'en' ? 'State' : 'राज्य'}
                data-testid="input-contact-state"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'Postal Code' : 'पिन कोड'}</label>
              <Input
                value={formData?.postalCode || ""}
                onChange={(e) => setFormData(formData ? { ...formData, postalCode: e.target.value } : null)}
                placeholder={language === 'en' ? 'Postal code' : 'पिन कोड'}
                data-testid="input-contact-postal"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'Country' : 'देश'}</label>
              <Input
                value={formData?.country || ""}
                onChange={(e) => setFormData(formData ? { ...formData, country: e.target.value } : null)}
                placeholder={language === 'en' ? 'Country' : 'देश'}
                data-testid="input-contact-country"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'en' ? 'Email' : 'ईमेल'} <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={formData?.email || ""}
                onChange={(e) => setFormData(formData ? { ...formData, email: e.target.value } : null)}
                placeholder={language === 'en' ? 'contact@example.com' : 'contact@example.com'}
                required
                data-testid="input-contact-email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'en' ? 'Phone' : 'फोन'} <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData?.phone || ""}
                onChange={(e) => setFormData(formData ? { ...formData, phone: e.target.value } : null)}
                placeholder={language === 'en' ? '+91-XXXXX-XXXXX' : '+91-XXXXX-XXXXX'}
                required
                data-testid="input-contact-phone"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</label>
              <Input
                value={formData?.whatsapp || ""}
                onChange={(e) => setFormData(formData ? { ...formData, whatsapp: e.target.value } : null)}
                placeholder={language === 'en' ? '+91-XXXXX-XXXXX' : '+91-XXXXX-XXXXX'}
                data-testid="input-contact-whatsapp"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={mutation.isPending}
              data-testid="button-save-contact"
            >
              {mutation.isPending 
                ? (language === 'en' ? 'Saving...' : 'सहेज रहा है...')
                : (language === 'en' ? 'Save Changes' : 'परिवर्तन सहेजें')
              }
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
