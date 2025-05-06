
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WalletCards } from "lucide-react";
import CreditPurchase from "./CreditPurchase";

interface CreditPurchaseDialogProps {
  triggerButton?: React.ReactNode;
}

const CreditPurchaseDialog = ({ triggerButton }: CreditPurchaseDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline">
            <WalletCards className="mr-2 h-4 w-4" />
            Add Credits
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <CreditPurchase />
      </DialogContent>
    </Dialog>
  );
};

export default CreditPurchaseDialog;
