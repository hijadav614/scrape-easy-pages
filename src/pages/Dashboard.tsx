
import { useState } from "react";
import { Link } from "react-router-dom";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  MoreVertical,
  Play,
  Pause,
  Download,
  Copy,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";

// Mock data
const scrapers = [
  {
    id: "scraper-1",
    name: "Product Prices - Amazon",
    url: "https://www.amazon.com/best-sellers-books",
    lastRun: "3 hours ago",
    schedule: "Every 12 hours",
    status: "active",
    results: 32,
  },
  {
    id: "scraper-2",
    name: "News Articles - CNN",
    url: "https://www.cnn.com/world",
    lastRun: "1 day ago",
    schedule: "Daily",
    status: "active",
    results: 28,
  },
  {
    id: "scraper-3",
    name: "Job Listings - LinkedIn",
    url: "https://www.linkedin.com/jobs",
    lastRun: "2 days ago",
    schedule: "Weekly",
    status: "paused",
    results: 156,
  },
  {
    id: "scraper-4",
    name: "Real Estate Listings",
    url: "https://www.realestate.com/listings",
    lastRun: "5 days ago",
    schedule: "Manual",
    status: "completed",
    results: 47,
  },
  {
    id: "scraper-5",
    name: "Stock Prices",
    url: "https://finance.yahoo.com",
    lastRun: "2 hours ago",
    schedule: "Every hour",
    status: "active",
    results: 95,
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredScrapers = scrapers.filter(
    (scraper) =>
      scraper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scraper.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "paused":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-600">Manage your web scrapers and view results</p>
          </div>
          <Button asChild>
            <Link to="/builder">
              <Plus className="mr-2 h-4 w-4" /> New Scraper
            </Link>
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Scrapers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-blue">3</div>
              <CardDescription>Running on schedule</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Data Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-purple">358</div>
              <CardDescription>Collected this month</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Scheduled Run</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-800">2h 12m</div>
              <CardDescription>Amazon price scraper</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search scrapers..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Scrapers table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Target URL</TableHead>
                  <TableHead className="hidden md:table-cell">Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Results</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScrapers.map((scraper) => (
                  <TableRow key={scraper.id}>
                    <TableCell className="font-medium">
                      <div>{scraper.name}</div>
                      <div className="text-xs text-gray-500 md:hidden">
                        {scraper.url}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell truncate max-w-[200px]">
                      {scraper.url}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{scraper.schedule}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(scraper.status)}`}>
                        {scraper.status.charAt(0).toUpperCase() + scraper.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        to="/results"
                        className="text-brand-blue hover:underline flex items-center"
                      >
                        <FileSpreadsheet className="h-3 w-3 mr-1" />
                        {scraper.results}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link to="/results" className="flex items-center w-full">
                              <FileSpreadsheet className="mr-2 h-4 w-4" /> View Results
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to="/builder" className="flex items-center w-full">
                              <Copy className="mr-2 h-4 w-4" /> Edit Scraper
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {scraper.status === "active" ? (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" /> Pause Scraper
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" /> Resume Scraper
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" /> Run Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Export Results
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <div className="text-sm text-gray-500">
              Showing {filteredScrapers.length} of {scrapers.length} scrapers
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
