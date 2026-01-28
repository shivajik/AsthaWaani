import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import promoImage from "@assets/image_1769606633932.png";

const POPUP_SESSION_KEY = "asthawaani_promo_popup_shown";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem(POPUP_SESSION_KEY);
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(POPUP_SESSION_KEY, "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Asthawaani Promotional</DialogTitle>
          <DialogDescription>Promotional image for Asthawaani spiritual platform</DialogDescription>
        </VisuallyHidden>
        <div className="relative">
          <Button
            size="icon"
            variant="outline"
            className="absolute top-2 right-2 z-10 rounded-full shadow-lg backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              sessionStorage.setItem(POPUP_SESSION_KEY, "true");
            }}
            data-testid="button-close-popup"
          >
            <X className="w-4 h-4" />
          </Button>
          <img
            src={promoImage}
            alt="Asthawaani Promotional"
            className="w-full h-auto rounded-lg"
            data-testid="img-promo-popup"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
