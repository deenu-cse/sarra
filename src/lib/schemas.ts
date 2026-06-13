import { SITE_URL } from "./seo.config";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Spring and River Rejuvenation Authority (SARRA)",
    "alternateName": "SARRA Uttarakhand",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`, // Assuming a logo exists at root
    "description": "Official nodal agency for water conservation, spring restoration, and river rejuvenation in Uttarakhand.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dehradun",
      "addressRegion": "Uttarakhand",
      "addressCountry": "IN"
    },
    "parentOrganization": {
      "@type": "GovernmentOrganization",
      "name": "Government of Uttarakhand"
    }
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SARRA - Spring and River Rejuvenation Authority",
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  };
}

export function getArticleSchema(article: { title: string; description: string; url: string; image?: string; datePublished: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image ? [article.image] : [],
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "author": {
      "@type": "GovernmentOrganization",
      "name": "SARRA Uttarakhand"
    },
    "publisher": {
      "@type": "GovernmentOrganization",
      "name": "SARRA Uttarakhand",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}${article.url}`
    }
  };
}

export function getGovernmentServiceSchema(service: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": "SARRA Uttarakhand"
    },
    "url": `${SITE_URL}${service.url}`,
    "areaServed": {
      "@type": "State",
      "name": "Uttarakhand"
    }
  };
}
