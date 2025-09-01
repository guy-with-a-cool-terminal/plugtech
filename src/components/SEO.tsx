
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title = "Plug Tech Business - Quality Laptops & Computers in Nairobi, Kenya",
  description = "Find the best laptops, desktops, and computer accessories in Nairobi, Kenya. Quality refurbished and new computers at competitive prices. Located at Tom Mboya Street, Nairobi CBD.",
  keywords = "laptops Nairobi, computers Kenya, refurbished laptops, desktop computers, computer accessories, Tom Mboya Street, Nairobi CBD, affordable laptops, gaming computers",
  image = "/favicon.ico",
  url = "https://plugtechbusiness.co.ke",
  type = "website"
}: SEOProps) => {
  const fullTitle = title.includes("Plug Tech Business") ? title : `${title} | Plug Tech Business`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Plug Tech Business",
          "description": "Quality computer hardware and accessories in Nairobi, Kenya",
          "image": image,
          "telephone": "+254711483989",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rasumal House, Shop 5, 1st Floor, Tom Mboya Street",
            "addressLocality": "Nairobi",
            "addressCountry": "Kenya"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -1.2864,
            "longitude": 36.8172
          },
          "openingHours": "Mo-Sa 09:00-19:00",
          "priceRange": "$$",
          "paymentAccepted": "Cash, Mobile Money",
          "currenciesAccepted": "KES"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
