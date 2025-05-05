
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Code, Database, LineChart, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
              <span className="text-sm font-medium">Web scraping made simple</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-brand-blue to-brand-purple text-transparent bg-clip-text">
              Extract web data without writing code
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Point, click, and extract. ScrapeEasy turns any website into structured data you can use, without a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/builder">Start Scraping Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8">
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
          
          {/* Browser mockup */}
          <div className="relative mx-auto max-w-4xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 h-8 flex items-center px-4 border-b border-gray-200">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="bg-white rounded-md flex-1 h-5"></div>
            </div>
            <div className="bg-white h-[400px] md:h-[500px] flex items-center justify-center p-4">
              <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-lg border border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse-slow">
                    <div className="h-12 w-12 mx-auto mb-4 bg-gradient-to-br from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-gray-500">Scraping website data...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Web scraping shouldn't be complicated
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're monitoring prices, tracking content, or building a dataset, ScrapeEasy does the heavy lifting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No-Code Builder</h3>
              <p className="text-gray-600">
                Point and click interface to visually select the data you want to extract, no programming required.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized Dashboard</h3>
              <p className="text-gray-600">
                Manage all your scraping projects from a clean, intuitive dashboard with real-time status updates.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-brand-lightBlue/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-brand-lightBlue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Export Anywhere</h3>
              <p className="text-gray-600">
                Download your data in CSV, JSON, or Excel formats, or connect directly to your favorite tools.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scheduled Scraping</h3>
              <p className="text-gray-600">
                Set up automatic data collection on your schedule - hourly, daily, weekly, or monthly.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Cleaning</h3>
              <p className="text-gray-600">
                Automatically clean and transform your scraped data with built-in data processing tools.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-brand-lightBlue/10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-brand-lightBlue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Change Detection</h3>
              <p className="text-gray-600">
                Get notified when content changes on the websites you're monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-purple text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start scraping?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of businesses and individuals who use ScrapeEasy to collect web data.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base px-8">
              <Link to="/builder">Create Your First Scraper</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
