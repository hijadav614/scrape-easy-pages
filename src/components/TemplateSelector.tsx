
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScraperTemplate, scraperTemplates } from "@/data/scraperTemplates";
import { Search, Linkedin, Mail, FileText, WalletCards } from "lucide-react";
import CreditPurchaseDialog from "./CreditPurchaseDialog";

interface TemplateSelectorProps {
  onSelectTemplate: (template: ScraperTemplate) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [availableCredits, setAvailableCredits] = useState<number>(50); // Simulate 50 available credits

  const handleTemplateSelect = (template: ScraperTemplate) => {
    // Check if user has enough credits
    const cost = getTemplateCreditCost(template);
    
    if (availableCredits < cost) {
      // Not enough credits, we would show the purchase dialog here
      return;
    }
    
    setSelectedTemplate(template.id);
    onSelectTemplate(template);
  };

  const getTemplateCreditCost = (template: ScraperTemplate): number => {
    // Different templates have different credit costs
    switch (template.id) {
      case "google-search":
        return 5;
      case "linkedin":
        return 10;
      case "email-extractor":
        return 8;
      case "product-catalog":
        return 12;
      default:
        return 5;
    }
  };

  const getIcon = (iconName: ScraperTemplate['icon']) => {
    switch (iconName) {
      case 'search':
        return <Search className="h-10 w-10 text-brand-blue" />;
      case 'linkedin':
        return <Linkedin className="h-10 w-10 text-brand-blue" />;
      case 'mail':
        return <Mail className="h-10 w-10 text-brand-blue" />;
      case 'file-text':
        return <FileText className="h-10 w-10 text-brand-blue" />;
      default:
        return <Search className="h-10 w-10 text-brand-blue" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Choose a Template</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="font-medium">{availableCredits}</span> credits available
          </div>
          <CreditPurchaseDialog />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scraperTemplates.map((template) => {
          const creditCost = getTemplateCreditCost(template);
          const canAfford = availableCredits >= creditCost;
          
          return (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id ? 'ring-2 ring-brand-blue' : ''
              } ${!canAfford ? 'opacity-70' : ''}`}
              onClick={() => canAfford && handleTemplateSelect(template)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-blue-50">
                    {getIcon(template.icon)}
                  </div>
                  <div className="flex flex-col items-end">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                      <WalletCards className="h-3.5 w-3.5" />
                      <span>{creditCost} credits</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{template.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                {canAfford ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template);
                    }}
                  >
                    Use Template
                  </Button>
                ) : (
                  <CreditPurchaseDialog 
                    triggerButton={
                      <Button variant="outline" size="sm" className="w-full">
                        Add Credits to Use
                      </Button>
                    } 
                  />
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
