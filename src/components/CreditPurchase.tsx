
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletCards } from "lucide-react";
import { toast } from "sonner";

const creditPackages = [
  { id: 1, credits: 100, price: 4.99 },
  { id: 2, credits: 500, price: 19.99 },
  { id: 3, credits: 1000, price: 34.99 }
];

interface CreditPurchaseProps {
  onClose?: () => void;
}

const CreditPurchase = ({ onClose }: CreditPurchaseProps) => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExpiryChange = (value: string) => {
    // Format expiry as MM/YY
    const formatted = value
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d)/, '$1/$2');
    setExpiry(formatted);
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces every 4 digits
    const formatted = value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleCvcChange = (value: string) => {
    // Only allow up to 3 digits for CVC
    const formatted = value.replace(/\D/g, '').slice(0, 3);
    setCvc(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) {
      toast.error("Please select a credit package");
      return;
    }

    if (!cardNumber || !cardName || !expiry || !cvc) {
      toast.error("Please fill in all payment details");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      
      const packageDetails = creditPackages.find(pkg => pkg.id === selectedPackage);
      if (packageDetails) {
        toast.success(`Successfully purchased ${packageDetails.credits} credits!`);
        if (onClose) onClose();
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Purchase Credits</CardTitle>
        <CardDescription>
          Add credits to your account to continue scraping data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Select a Package:</h3>
            <div className="grid grid-cols-3 gap-3">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? "border-brand-blue bg-brand-blue/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="font-semibold">{pkg.credits}</div>
                  <div className="text-brand-blue font-bold">${pkg.price}</div>
                  <div className="text-xs text-gray-500">credits</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => handleCvcChange(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button 
          className="flex items-center" 
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          <WalletCards className="mr-2 h-4 w-4" />
          {isSubmitting ? "Processing..." : "Purchase Credits"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditPurchase;
