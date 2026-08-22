import { JsonLd } from "@/components/json-ld";
import { projects } from "@/content/projects";
import { projectSchema } from "@/lib/schema";

export default function KwartierWestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><JsonLd data={projectSchema(projects["kwartier-west"])} />{children}</>;
}
