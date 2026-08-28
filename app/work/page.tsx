import type { Metadata } from "next";
import { ContactStage } from "@/components/contact-stage";
import { ProjectWorlds } from "@/components/project-worlds";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({title:"Selected Work",description:"Selected live work by DeeQ Studio for De Kweker and Kwartier West.",path:"/work"});

export default function WorkPage(){return <><section className="workIntroP4"><span>Selected work</span><h1>Two live projects.<br/>Built differently.</h1><p>De Kweker and Kwartier West share a studio, not a visual system.</p></section><ProjectWorlds/><ContactStage kicker="Tell me what you are building."/></>}
