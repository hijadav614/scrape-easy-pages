
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RefreshCw, FileText } from "lucide-react";

interface ScraperResult {
  id: string;
  timestamp: string;
  data: Record<string, string>;
}

interface Scraper {
  id: string;
  name: string;
  url: string;
  elements: Array<{ id: string; name: string; selector: string; type: string }>;
  results: ScraperResult[];
}

const ResultsViewer = () => {
  const { toast } = useToast();
  const [scrapers, setScrapers] = useState<Scraper[]>([]);
  const [currentScraperId, setCurrentScraperId] = useState<string | null>(null);
  const [currentScraper, setCurrentScraper] = useState<Scraper | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load scrapers from localStorage
    const savedScrapers = JSON.parse(localStorage.getItem("scrapers") || "[]");
    setScrapers(savedScrapers);

    // Check if we have a current scraper ID from localStorage
    const savedCurrentScraperId = localStorage.getItem("current_scraper_id");
    if (savedCurrentScraperId) {
      setCurrentScraperId(savedCurrentScraperId);
    } else if (savedScrapers.length > 0) {
      // Default to the first scraper if none is selected
      setCurrentScraperId(savedScrapers[0].id);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currentScraperId && scrapers.length > 0) {
      const scraper = scrapers.find((s) => s.id === currentScraperId);
      setCurrentScraper(scraper || null);
    } else {
      setCurrentScraper(null);
    }
  }, [currentScraperId, scrapers]);

  const handleScraperChange = (scraperId: string) => {
    setCurrentScraperId(scraperId);
    localStorage.setItem("current_scraper_id", scraperId);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    toast({
      title: "Refreshing results",
      description: "Fetching the latest data from the target website",
    });
    
    // Simulate a refresh
    setTimeout(() => {
      if (currentScraper) {
        // Add a new result to the current scraper
        const newResult = {
          id: `result${Date.now()}`,
          timestamp: new Date().toISOString(),
          data: currentScraper.elements.reduce((acc, elem) => {
            acc[elem.name] = `Updated ${elem.name} data - ${new Date().toLocaleTimeString()}`;
            return acc;
          }, {} as Record<string, string>)
        };
        
        const updatedScrapers = scrapers.map(scraper => 
          scraper.id === currentScraperId
            ? { ...scraper, results: [newResult, ...scraper.results] }
            : scraper
        );
        
        setScrapers(updatedScrapers);
        localStorage.setItem("scrapers", JSON.stringify(updatedScrapers));
        
        toast({
          title: "Results refreshed",
          description: "Successfully fetched new data from the target website",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleExportCSV = () => {
    if (!currentScraper || currentScraper.results.length === 0) return;
    
    // Convert results to CSV
    const headers = Object.keys(currentScraper.results[0].data).join(",");
    const rows = currentScraper.results.map(result => {
      return Object.values(result.data).map(value => `"${value}"`).join(",");
    }).join("\n");
    
    const csv = `${headers}\n${rows}`;
    
    // Create a download link
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${currentScraper.name.replace(/\s+/g, "_")}_results.csv`);
    a.click();
    
    toast({
      title: "Export complete",
      description: "CSV file has been downloaded",
    });
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-lg text-gray-500">Loading results...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (scrapers.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-[60vh] text-center">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No scrapers found</h2>
            <p className="text-gray-500 mb-6">
              You haven't created any scrapers yet. Go to the Scraper Builder to get started.
            </p>
            <Button asChild>
              <a href="/builder">Create Scraper</a>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Scraper Results</h1>
            <p className="text-gray-600">View and analyze the data extracted from your target websites</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="w-64">
              <Select 
                value={currentScraperId || ""} 
                onValueChange={handleScraperChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a scraper" />
                </SelectTrigger>
                <SelectContent>
                  {scrapers.map((scraper) => (
                    <SelectItem key={scraper.id} value={scraper.id}>
                      {scraper.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRefresh}
              disabled={isLoading || !currentScraper}
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleExportCSV}
              disabled={!currentScraper || currentScraper.results.length === 0}
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {currentScraper ? (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{currentScraper.name}</CardTitle>
                <CardDescription>
                  Target URL: <a href={currentScraper.url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">{currentScraper.url}</a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">
                  <p>Total elements: {currentScraper.elements.length}</p>
                  <p>Results count: {currentScraper.results.length}</p>
                  {currentScraper.results.length > 0 && (
                    <p>Last updated: {new Date(currentScraper.results[0].timestamp).toLocaleString()}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="table" className="mb-6">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="json">JSON View</TabsTrigger>
              </TabsList>

              <TabsContent value="table">
                {currentScraper.results.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          {Object.keys(currentScraper.results[0].data).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentScraper.results.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell>
                              {new Date(result.timestamp).toLocaleString()}
                            </TableCell>
                            {Object.values(result.data).map((value, index) => (
                              <TableCell key={index}>{value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No results found. Run the scraper to collect data.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="json">
                {currentScraper.results.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="overflow-auto text-xs font-mono">
                      {JSON.stringify(currentScraper.results, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No results found. Run the scraper to collect data.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select a scraper to view results.
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ResultsViewer;
