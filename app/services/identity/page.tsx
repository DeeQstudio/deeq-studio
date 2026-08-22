import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({title:"Brand Identity & Content Design",description:"Brand identity, visual direction and content systems by DeeQ Studio.",path:"/services/identity"});
export default function Page(){return <ServicePage eyebrow="Identity & content" title="Identity that" accent="holds together." intro="Logo, type, colour, motion and content should reinforce each other—not feel like unrelated deliverables." heading="Recognition before decoration." paragraphs={["Identity work makes every public touchpoint feel like it belongs to the same organisation.","The system has to survive browser icons, social crops, light and dark contexts, campaign work and daily use—not only one polished mockup."]} />}
