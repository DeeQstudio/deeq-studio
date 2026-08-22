import type { MetadataRoute } from "next";
import { site } from "@/content/site";
const routes=["/","/work","/work/de-kweker","/work/kwartier-west","/services","/services/web-design","/services/identity","/services/digital-care","/process","/contact","/nl/webdesign-brugge"] as const;
export default function sitemap():MetadataRoute.Sitemap{return routes.map(path=>({url:path==="/"?site.url:`${site.url}${path}`,changeFrequency:path.startsWith("/work/")?"yearly":"monthly"}))}
