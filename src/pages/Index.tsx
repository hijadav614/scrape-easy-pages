
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Code, Database, LineChart, LayoutDashboard, CreditCard, WalletCards } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
      
      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Only pay for what you use. No hidden fees or long-term commitments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="border-2 border-gray-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$9</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 min-h-[100px]">
                  Perfect for small projects or individual use.
                </CardDescription>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>100 credits per month</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>3 projects</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>CSV & JSON exports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            
            {/* Pro Plan - Highlighted */}
            <Card className="border-2 border-brand-blue relative transition-all hover:shadow-md">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Professional</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 min-h-[100px]">
                  Best for businesses and power users who need more data.
                </CardDescription>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>500 credits per month</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>10 projects</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>All templates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>All export formats</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>Scheduled scraping</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">Choose Plan</Button>
              </CardFooter>
            </Card>
            
            {/* Business Plan */}
            <Card className="border-2 border-gray-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Business</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$79</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 min-h-[100px]">
                  For teams and companies with advanced data extraction needs.
                </CardDescription>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>2000 credits per month</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>Unlimited projects</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>Premium templates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-blue mr-2">✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Pay as you go option */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-3">Pay as you go</h3>
              <p className="text-lg text-gray-600 mb-6">
                Need more credits? Purchase additional credits anytime.
              </p>
              <div className="flex justify-center items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-xl font-semibold">100 credits</div>
                  <div className="text-2xl font-bold text-brand-blue mt-1">$4.99</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">500 credits</div>
                  <div className="text-2xl font-bold text-brand-blue mt-1">$19.99</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">1000 credits</div>
                  <div className="text-2xl font-bold text-brand-blue mt-1">$34.99</div>
                </div>
              </div>
              <Button variant="outline" className="px-8">
                <WalletCards className="mr-2" />
                Add Credits
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Credit System Info */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-2xl font-bold mb-4 text-center">How our credit system works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-brand-blue">Web Scraping Costs</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">•</span>
                      <span>1 credit = 1 page scraped</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">•</span>
                      <span>Complex pages (e.g., with pagination) may cost more credits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">•</span>
                      <span>Scheduled runs use credits each time they execute</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-brand-blue">Credit Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">•</span>
                      <span>Credits never expire on paid plans</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">•</span>
                      <span>Unused credits roll over to the next month</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">•</span>
                      <span>Volume discounts available for large credit purchases</span>
                    </li>
                  </ul>
                </div>
              </div>
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
