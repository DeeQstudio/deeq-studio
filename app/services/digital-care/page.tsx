import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({title:"Website Maintenance & Digital Care",description:"Website maintenance, content and ongoing digital support without lock-in.",path:"/services/digital-care"});
export default function Page(){return <ServicePage eyebrow="Maintenance & ongoing support" title="Digital care." accent="Without lock-in." intro="Hand over recurring web and media work when keeping it moving yourself stops being a good use of time." heading="Keep the work off your own queue." paragraphs={["DeeQ can stay involved for maintenance, content changes, launches, media assets and practical coordination.","Your domain, code and accounts remain yours. Ongoing care is useful because it removes work—not because it creates dependency."]} />}
