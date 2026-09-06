import { createFileRoute } from "@tanstack/react-router";
import { PackLandingPage } from "@/components/pack-landing-page";
import { createPackHead } from "@/lib/pack-seo";
import { packs } from "@/lib/packs";

export const Route = createFileRoute("/pack-lula")({
  head: () => createPackHead(packs.lula),
  component: () => <PackLandingPage pack={packs.lula} />,
});
