
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { Download, Filter, RefreshCw } from "lucide-react";

// Mock data for scraping results
const mockResults = [
  {
    id: "r1",
    title: "Lightweight Ergonomic Desk Chair",
    price: "$129.99",
    rating: "4.5/5",
    inStock: "Yes",
    imageUrl: "https://example.com/chair1.jpg",
  },
  {
    id: "r2",
    title: "Executive Office Chair with Lumbar Support",
    price: "$249.99",
    rating: "4.8/5",
    inStock: "Yes",
    imageUrl: "https://example.com/chair2.jpg",
  },
  {
    id: "r3",
    title: "Gaming Chair with Footrest",
    price: "$189.95",
    rating: "4.2/5",
    inStock: "No",
    imageUrl: "https://example.com/chair3.jpg",
  },
  {
    id: "r4",
    title: "Mesh Back Office Chair",
    price: "$119.50",
    rating: "3.9/5",
    inStock: "Yes",
    imageUrl: "https://example.com/chair4.jpg",
  },
  {
    id: "r5",
    title: "Adjustable Standing Desk Converter",
    price: "$299.99",
    rating: "4.7/5",
    inStock: "Yes",
    imageUrl: "https://example.com/desk1.jpg",
  },
  {
    id: "r6",
    title: "Kneeling Chair for Better Posture",
    price: "$89.95",
    rating: "4.0/5",
    inStock: "Yes",
    imageUrl: "https://example.com/chair5.jpg",
  },
  {
    id: "r7",
    title: "Conference Room Chair Set (4-Pack)",
    price: "$379.99",
    rating: "4.4/5",
    inStock: "No",
    imageUrl: "https://example.com/chairs-set.jpg",
  },
];

const ResultsViewer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results] = useState(mockResults);

  const filteredResults = results.filter((result) =>
    Object.values(result).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Scraper Results</h1>
            <p className="text-gray-600">
              Product Prices - Amazon (Last run: 3 hours ago)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="table">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="table">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex justify-between">
                  <CardTitle>Data Output</CardTitle>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  Showing {filteredResults.length} of {results.length} results
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>In Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium max-w-[300px] truncate">
                            {result.title}
                          </TableCell>
                          <TableCell>{result.price}</TableCell>
                          <TableCell>{result.rating}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.inStock === "Yes"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {result.inStock}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredResults.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                            No results found matching your search
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between py-4">
                <div className="text-sm text-gray-500">
                  Last updated: May 5, 2025 at 10:45 AM
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export CSV
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="json">
            <Card>
              <CardHeader>
                <CardTitle>JSON Data</CardTitle>
                <CardDescription>
                  Raw JSON output from your scraper
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-xs sm:text-sm font-mono border max-h-[500px]">
                  {JSON.stringify(filteredResults, null, 2)}
                </pre>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download JSON
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Scraping History</CardTitle>
                <CardDescription>
                  View historical data collections from this scraper
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Items Scraped</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 5, 2025 10:45 AM</TableCell>
                      <TableCell>7 items</TableCell>
                      <TableCell>12 seconds</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 4, 2025 10:45 AM</TableCell>
                      <TableCell>7 items</TableCell>
                      <TableCell>14 seconds</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 3, 2025 10:45 AM</TableCell>
                      <TableCell>8 items</TableCell>
                      <TableCell>11 seconds</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 2, 2025 10:45 AM</TableCell>
                      <TableCell>8 items</TableCell>
                      <TableCell>12 seconds</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ResultsViewer;
