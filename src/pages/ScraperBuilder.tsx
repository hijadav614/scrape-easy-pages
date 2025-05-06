
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import TemplateSelector from "@/components/TemplateSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Code,
  Save,
  Play,
  Wand2,
  Plus,
  Trash2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { ScraperTemplate } from "@/data/scraperTemplates";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ScraperBuilder = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [selectedElements, setSelectedElements] = useState<
    Array<{ id: string; name: string; selector: string; type: string }>
  >([]);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [isScrapingInProgress, setIsScrapingInProgress] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleAddElement = () => {
    const newElement = {
      id: `elem${selectedElements.length + 1}`,
      name: `Element ${selectedElements.length + 1}`,
      selector: "",
      type: "text",
    };
    setSelectedElements([...selectedElements, newElement]);
  };

  const handleDeleteElement = (id: string) => {
    setSelectedElements(selectedElements.filter((elem) => elem.id !== id));
  };

  const handleUpdateElement = (
    id: string,
    field: "name" | "selector" | "type",
    value: string
  ) => {
    setSelectedElements(
      selectedElements.map((elem) =>
        elem.id === id ? { ...elem, [field]: value } : elem
      )
    );
  };

  const handleSelectTemplate = (template: ScraperTemplate) => {
    setName(template.name);
    if (template.url) {
      setUrl(template.url);
    }
    setSelectedElements(template.elements);
    setShowTemplateSelector(false);
    
    toast({
      title: "Template Applied",
      description: `Applied the "${template.name}" template. You can now customize it.`,
    });
  };

  const saveApiKey = () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your scraping API key",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would validate the API key here
    localStorage.setItem("scraper_api_key", apiKey);
    setApiKeyDialogOpen(false);
    
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved securely",
    });
  };

  const handleRunScraper = () => {
    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a target website URL",
        variant: "destructive",
      });
      return;
    }

    if (selectedElements.length === 0) {
      toast({
        title: "No elements selected",
        description: "Please select at least one element to extract",
        variant: "destructive",
      });
      return;
    }
    
    // Check if API key is saved
    const savedApiKey = localStorage.getItem("scraper_api_key");
    if (!savedApiKey) {
      setApiKeyDialogOpen(true);
      return;
    }

    setIsScrapingInProgress(true);
    toast({
      title: "Scraper started",
      description: "Your scraper is running. Results will be available soon.",
    });

    // Simulate a scraper response
    setTimeout(() => {
      setIsScrapingInProgress(false);
      
      // Store scraping info in localStorage for demo purposes
      // In a real app, this would be saved to a database
      const scraperId = Date.now().toString();
      const scraperData = {
        id: scraperId,
        name: name || "Unnamed Scraper",
        url,
        elements: selectedElements,
        results: [
          {
            id: "result1",
            timestamp: new Date().toISOString(),
            data: selectedElements.reduce((acc, elem) => {
              acc[elem.name] = `Sample ${elem.name} data`;
              return acc;
            }, {} as Record<string, string>)
          },
          {
            id: "result2",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            data: selectedElements.reduce((acc, elem) => {
              acc[elem.name] = `Another ${elem.name} sample`;
              return acc;
            }, {} as Record<string, string>)
          }
        ]
      };
      
      // Save the scraper
      const savedScrapers = JSON.parse(localStorage.getItem("scrapers") || "[]");
      localStorage.setItem("scrapers", JSON.stringify([...savedScrapers, scraperData]));
      
      // Save the current scraper ID to view its results
      localStorage.setItem("current_scraper_id", scraperId);
      
      toast({
        title: "Scraping completed",
        description: "View the results on the Results page.",
      });
      
      // Redirect to results page
      window.location.href = "/results";
    }, 2000);
  };

  const handleSaveScraper = () => {
    if (!name) {
      toast({
        title: "Name is required",
        description: "Please give your scraper a name",
        variant: "destructive",
      });
      return;
    }

    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a target website URL",
        variant: "destructive",
      });
      return;
    }

    if (selectedElements.length === 0) {
      toast({
        title: "No elements selected",
        description: "Please select at least one element to extract",
        variant: "destructive",
      });
      return;
    }

    // Save scraper configuration
    const scraperId = Date.now().toString();
    const scraperData = {
      id: scraperId,
      name,
      url,
      elements: selectedElements,
      results: []
    };
    
    const savedScrapers = JSON.parse(localStorage.getItem("scrapers") || "[]");
    localStorage.setItem("scrapers", JSON.stringify([...savedScrapers, scraperData]));

    toast({
      title: "Scraper saved",
      description: "Your scraper has been saved successfully.",
    });
    
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  const handleAutomaticSelection = () => {
    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a target website URL first",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "AI Detection Running",
      description: "Detecting common elements on the page...",
    });

    // In a real implementation, this would use some AI to detect elements
    setTimeout(() => {
      setSelectedElements([
        { id: "elem1", name: "Page Title", selector: "h1", type: "text" },
        { id: "elem2", name: "Main Content", selector: "main, article, .content", type: "text" },
        { id: "elem3", name: "Images", selector: "img", type: "attribute:src" },
        { id: "elem4", name: "Links", selector: "a", type: "attribute:href" },
        { id: "elem5", name: "Meta Description", selector: "meta[name='description']", type: "attribute:content" },
      ]);
      
      toast({
        title: "Elements Detected",
        description: "We've automatically identified 5 elements on the page",
      });
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Build Your Scraper</h1>
          <p className="text-gray-600">Configure what data to extract and how to process it</p>
        </div>

        {showTemplateSelector ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Get started quickly with a pre-built template or create your own custom scraper
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TemplateSelector onSelectTemplate={handleSelectTemplate} />
            </CardContent>
            <CardFooter className="justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowTemplateSelector(false);
                  setSelectedElements([]);
                }}
              >
                Skip - Create Custom Scraper
              </Button>
            </CardFooter>
          </Card>
        ) : null}

        {!showTemplateSelector && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Scraper Settings</CardTitle>
                  <CardDescription>
                    Define the basic settings for your web scraper
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Scraper Name</Label>
                    <Input
                      id="name"
                      placeholder="E.g. Product Price Monitor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">Target URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com/products"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual (Run on demand)</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="pagination" className="cursor-pointer">
                      Follow Pagination
                    </Label>
                    <Switch id="pagination" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="javascript" className="cursor-pointer">
                      Wait for JavaScript
                    </Label>
                    <Switch id="javascript" defaultChecked />
                  </div>

                  <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Backend Integration Required</AlertTitle>
                    <AlertDescription>
                      For production use, connect this to a backend scraping service with your API key.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleSaveScraper}>
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button 
                    onClick={handleRunScraper} 
                    disabled={isScrapingInProgress}
                  >
                    {isScrapingInProgress ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" /> Run Now
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Main Builder Area */}
            <div className="col-span-1 lg:col-span-2">
              <Tabs defaultValue="visual">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="visual">Visual Builder</TabsTrigger>
                    <TabsTrigger value="code">Code View</TabsTrigger>
                  </TabsList>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAutomaticSelection}
                  >
                    <Wand2 className="mr-2 h-4 w-4" /> Auto-Detect Elements
                  </Button>
                </div>

                <TabsContent value="visual" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Website Preview</CardTitle>
                      <CardDescription>
                        Select elements to extract from the webpage
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 h-[400px] border-t overflow-hidden">
                      <div className="bg-gray-50 h-full flex items-center justify-center">
                        {url ? (
                          <div className="text-center px-4">
                            <p className="text-gray-500 mb-2">
                              In the actual application, a preview of {url} would appear here
                            </p>
                            <p className="text-sm text-gray-400">
                              Click on elements in the website to select them for extraction
                            </p>
                          </div>
                        ) : (
                          <div className="text-center px-4">
                            <p className="text-gray-500">
                              Enter a URL above to load the website preview
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Selected Elements</CardTitle>
                        <CardDescription>
                          Data fields that will be extracted
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="ghost" onClick={handleAddElement}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedElements.map((element) => (
                          <div
                            key={element.id}
                            className="border rounded-md p-4 space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium flex items-center">
                                <span className="h-2 w-2 rounded-full bg-brand-blue mr-2"></span>
                                {element.name}
                              </h4>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteElement(element.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <Label htmlFor={`name-${element.id}`} className="text-xs">
                                  Field Name
                                </Label>
                                <Input
                                  id={`name-${element.id}`}
                                  value={element.name}
                                  onChange={(e) =>
                                    handleUpdateElement(element.id, "name", e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor={`selector-${element.id}`} className="text-xs">
                                  CSS Selector
                                </Label>
                                <Input
                                  id={`selector-${element.id}`}
                                  value={element.selector}
                                  onChange={(e) =>
                                    handleUpdateElement(
                                      element.id,
                                      "selector",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor={`type-${element.id}`} className="text-xs">
                                  Data Type
                                </Label>
                                <Select
                                  value={element.type}
                                  onValueChange={(value) =>
                                    handleUpdateElement(element.id, "type", value)
                                  }
                                >
                                  <SelectTrigger id={`type-${element.id}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text Content</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="attribute:href">
                                      Link (href)
                                    </SelectItem>
                                    <SelectItem value="attribute:src">
                                      Image URL (src)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}

                        {selectedElements.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                              <ChevronDown className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-1">No elements selected yet</p>
                            <p className="text-gray-400 text-sm">
                              Click "Auto-Detect Elements" or add them manually
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    {selectedElements.length > 0 && (
                      <CardFooter className="flex justify-end border-t pt-4">
                        <Button onClick={handleSaveScraper}>
                          <Save className="mr-2 h-4 w-4" /> Save Configuration
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Code Configuration</CardTitle>
                      <CardDescription>
                        Edit the scraper configuration directly in JSON format
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-xs sm:text-sm font-mono border">
{JSON.stringify(
  {
    name: name || "My Web Scraper",
    url: url || "https://example.com",
    schedule: "manual",
    options: {
      followPagination: false,
      waitForJavascript: true,
    },
    selectors: selectedElements.map((el) => ({
      name: el.name,
      selector: el.selector,
      type: el.type,
    })),
  },
  null,
  2
)}
                      </pre>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Code className="mr-2 h-4 w-4" /> Apply Code Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* API Key Dialog */}
        <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter API Key</DialogTitle>
              <DialogDescription>
                To use the scraping functionality, you need to provide an API key for our scraping service.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                Your API key is stored locally and is never sent to our servers.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApiKeyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveApiKey}>Save Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default ScraperBuilder;
