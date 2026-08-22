import { site } from "@/content/site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/icon.png`,
  description: site.description,
  areaServed: ["Bruges", "West Flanders", "Flanders", "Belgium"],
};
