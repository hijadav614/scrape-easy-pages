
export interface ScraperTemplate {
  id: string;
  name: string;
  description: string;
  icon: 'search' | 'linkedin' | 'mail' | 'file-text';
  url?: string;
  elements: Array<{
    id: string;
    name: string;
    selector: string;
    type: string;
  }>;
}

export const scraperTemplates: ScraperTemplate[] = [
  {
    id: "google-search",
    name: "Google Search Results",
    description: "Extract search results from Google including titles, links, and snippets",
    icon: "search",
    url: "https://www.google.com/search?q=web+scraping",
    elements: [
      { id: "elem1", name: "Result Title", selector: "h3", type: "text" },
      { id: "elem2", name: "Result URL", selector: "a[href]", type: "attribute:href" },
      { id: "elem3", name: "Result Snippet", selector: "div.VwiC3b", type: "text" },
    ]
  },
  {
    id: "linkedin-profiles",
    name: "LinkedIn Profiles",
    description: "Extract profile information from LinkedIn including name, title, and experience",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/",
    elements: [
      { id: "elem1", name: "Full Name", selector: "h1.text-heading-xlarge", type: "text" },
      { id: "elem2", name: "Title", selector: "div.text-body-medium", type: "text" },
      { id: "elem3", name: "Company", selector: "span.pv-text-details__right-panel-item-text", type: "text" },
      { id: "elem4", name: "Location", selector: "span.text-body-small.inline", type: "text" },
      { id: "elem5", name: "Experience", selector: "div.pvs-entity", type: "text" },
    ]
  },
  {
    id: "email-extractor",
    name: "Email Extractor",
    description: "Find and extract email addresses from any webpage",
    icon: "mail",
    elements: [
      { id: "elem1", name: "Email Addresses", selector: "a[href^='mailto:']", type: "attribute:href" },
      { id: "elem2", name: "Email Text", selector: "a[href^='mailto:']", type: "text" },
      { id: "elem3", name: "Contact Info", selector: "div:contains('@')", type: "text" },
    ]
  },
  {
    id: "product-catalog",
    name: "Product Catalog",
    description: "Extract product information from e-commerce sites",
    icon: "file-text",
    elements: [
      { id: "elem1", name: "Product Name", selector: "h1.product-title, div.product-title, span.product-title", type: "text" },
      { id: "elem2", name: "Price", selector: "span.price, div.price, p.price", type: "text" },
      { id: "elem3", name: "Description", selector: "div.product-description, p.description", type: "text" },
      { id: "elem4", name: "Image URL", selector: "img.product-image", type: "attribute:src" },
      { id: "elem5", name: "SKU/ID", selector: "span.sku, div.product-id", type: "text" },
    ]
  }
];
