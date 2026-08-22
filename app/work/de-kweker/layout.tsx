import { JsonLd } from "@/components/json-ld";
import { projects } from "@/content/projects";
import { projectSchema } from "@/lib/schema";

export default function DeKwekerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><JsonLd data={projectSchema(projects["de-kweker"])} />{children}</>;
}
