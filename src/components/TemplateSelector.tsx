
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScraperTemplate, scraperTemplates } from "@/data/scraperTemplates";
import { Search, Linkedin, Mail, FileText } from "lucide-react";

interface TemplateSelectorProps {
  onSelectTemplate: (template: ScraperTemplate) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (template: ScraperTemplate) => {
    setSelectedTemplate(template.id);
    onSelectTemplate(template);
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {scraperTemplates.map((template) => (
        <Card 
          key={template.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id ? 'ring-2 ring-brand-blue' : ''
          }`}
          onClick={() => handleTemplateSelect(template)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg bg-blue-50">
                {getIcon(template.icon)}
              </div>
              <CardTitle className="text-lg mt-1">{template.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{template.description}</CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
