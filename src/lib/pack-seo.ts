import type { PackConfig } from "./packs";

export function createPackHead(pack: PackConfig) {
  return {
    meta: [
      { title: `${pack.nomeCompleto} | EstampaBox` },
      { name: "description", content: pack.descricaoSeo },
      { property: "og:title", content: `${pack.nomeCompleto} | EstampaBox` },
      { property: "og:description", content: pack.ogDescricao },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pack.routePath }],
  };
}
