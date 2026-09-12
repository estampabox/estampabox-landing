import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileImage,
  Files,
  LayoutDashboard,
  Layers,
  MonitorSmartphone,
} from "lucide-react";

export const META_PIXEL_ID = "1595712898900708";
export const ASSET_VERSION = "20260905";

export type PackSlug = "flavio" | "lula" | "augusto";

export type PackImage = {
  src?: string;
  previewSrc?: string;
  alt: string;
  width: number;
  height: number;
  placeholderLabel?: string;
};

export type PackInclusion = {
  icon: LucideIcon;
  texto: string;
};

export type PackFaq = {
  pergunta: string;
  resposta: string;
};

export type PackConfig = {
  slug: PackSlug;
  routePath: "/" | "/pack-lula/" | "/pack-augusto/";
  nome: string;
  colecao: string;
  nomeCompleto: string;
  headline: string;
  subtitulo: string;
  descricaoSeo: string;
  ogDescricao: string;
  preco: string;
  precoNumero: number;
  quantidadeArtes: number;
  checkoutUrl: string;
  checkoutTodo?: string;
  suporte: string;
  garantiaDias: number;
  hero: PackImage;
  artes: PackImage[];
  mockups: PackImage[];
  inclusoes: PackInclusion[];
  faqs: PackFaq[];
};

const suporte = "estampabox.suporte@gmail.com";
const garantiaDias = 7;
const preco = "R$ 9,90";
const precoNumero = 9.9;

const baseInclusoes: PackInclusion[] = [
  { icon: FileImage, texto: "6 artes completas para canecas" },
  { icon: BadgeCheck, texto: "Arquivos PNG em alta resolução" },
  { icon: Files, texto: "PDF com as 6 artes da coleção" },
  { icon: Layers, texto: "Elementos extras em PNG para personalização" },
  { icon: MonitorSmartphone, texto: "Mockups da coleção" },
  { icon: LayoutDashboard, texto: "Acesso pela área de membros EstampaBox" },
];

function createPreviewImages(
  packPath: string,
  packName: string,
  hasAssets: boolean,
  imageFileName: (number: string, index: number) => string = (number) => `arte-${number}.png`,
  dimensions:
    | Pick<PackImage, "width" | "height">
    | ((number: string, index: number) => Pick<PackImage, "width" | "height">) = {
    width: 1400,
    height: 639,
  },
): PackImage[] {
  return Array.from({ length: 6 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const imageDimensions =
      typeof dimensions === "function" ? dimensions(number, index) : dimensions;

    return {
      ...(hasAssets
        ? {
            src: `/${packPath}/artes/${imageFileName(number, index)}`,
            previewSrc: `/${packPath}/artes-preview/arte-${number}.webp`,
          }
        : {}),
      alt: `Arte ${index + 1} do ${packName}`,
      width: imageDimensions.width,
      height: imageDimensions.height,
      placeholderLabel: `Arte ${index + 1} pendente`,
    };
  });
}

function createMockups(
  packPath: string,
  packName: string,
  hasAssets: boolean,
  mockups: Array<{ altLabel: string; fileName: string; placeholderLabel: string }> = [
    { altLabel: "pelo frente", fileName: "mockup-frente.png", placeholderLabel: "frente" },
    { altLabel: "pelo verso", fileName: "mockup-verso.png", placeholderLabel: "verso" },
  ],
): PackImage[] {
  return mockups.map(({ altLabel, fileName, placeholderLabel }) => ({
    ...(hasAssets ? { src: `/${packPath}/mockups/${fileName}` } : {}),
    alt: `Caneca com arte do ${packName} vista ${altLabel}`,
    width: 340,
    height: 340,
    placeholderLabel: `Mockup ${placeholderLabel} pendente`,
  }));
}

function createFaqs(packName: string): PackFaq[] {
  return [
    {
      pergunta: "O produto é físico?",
      resposta: `Não. O ${packName} é um produto 100% digital.`,
    },
    {
      pergunta: "Quantas artes estão incluídas?",
      resposta: "São 6 artes completas para canecas.",
    },
    {
      pergunta: "Quais formatos recebo?",
      resposta:
        "As artes são entregues em PNG em alta resolução e também há um PDF com as 6 artes da coleção. O pack inclui ainda elementos extras em PNG.",
    },
    {
      pergunta: "Como recebo os arquivos?",
      resposta:
        "Após a confirmação do pagamento, o acesso é disponibilizado pela área de membros EstampaBox.",
    },
    {
      pergunta: "Posso utilizar as artes em produtos físicos?",
      resposta: "A utilização deve seguir os Termos de Uso disponibilizados junto ao pack.",
    },
  ];
}

export const packs = {
  flavio: {
    slug: "flavio",
    routePath: "/",
    nome: "Pack Flávio",
    colecao: "Coleção Patriota",
    nomeCompleto: "Pack Flávio — Coleção Patriota",
    headline: "6 artes para deixar suas canecas prontas para entrar no clima do Brasil",
    subtitulo:
      "Pack Flávio — Coleção Patriota com artes digitais prontas para personalização de canecas.",
    descricaoSeo:
      "6 artes digitais para deixar suas canecas prontas para entrar no clima do Brasil. PNG em alta resolução, PDF da coleção, elementos extras e mockups. Produto 100% digital por R$ 9,90.",
    ogDescricao:
      "6 artes completas para canecas + elementos extras + mockups. Produto 100% digital por R$ 9,90.",
    preco,
    precoNumero,
    quantidadeArtes: 6,
    checkoutUrl: "https://pay.cakto.com.br/3agfs9n_1082656",
    suporte,
    garantiaDias,
    hero: {
      src: "/pack-flavio/hero/pack-flavio-principal.png",
      alt: "Pack Flávio — Coleção Patriota com seis artes digitais para canecas",
      width: 1402,
      height: 1122,
    },
    artes: createPreviewImages("pack-flavio", "Pack Flávio — Coleção Patriota", true),
    mockups: createMockups("pack-flavio", "Pack Flávio", true),
    inclusoes: baseInclusoes,
    faqs: createFaqs("Pack Flávio"),
  },
  lula: {
    slug: "lula",
    routePath: "/pack-lula/",
    nome: "Pack Lula",
    colecao: "Coleção Brasil do Povo",
    nomeCompleto: "Pack Lula — Coleção Brasil do Povo",
    headline: "6 artes para personalizar canecas com visual brasileiro e popular",
    subtitulo:
      "Pack Lula — Coleção Brasil do Povo com artes digitais prontas para personalização de canecas.",
    descricaoSeo:
      "6 artes digitais do Pack Lula — Coleção Brasil do Povo para personalização de canecas. Produto 100% digital por R$ 9,90.",
    ogDescricao:
      "6 artes digitais para canecas do Pack Lula — Coleção Brasil do Povo. Produto 100% digital por R$ 9,90.",
    preco,
    precoNumero,
    quantidadeArtes: 6,
    checkoutUrl: "https://pay.cakto.com.br/ohhb3xu_1085881",
    suporte,
    garantiaDias,
    hero: {
      src: "/pack-lula/hero/ChatGPT Image 4 de set. de 2026, 13_02_48.png",
      alt: "Pack Lula — Coleção Brasil do Povo com seis artes digitais para canecas",
      width: 1254,
      height: 1254,
    },
    artes: createPreviewImages(
      "pack-lula",
      "Pack Lula — Coleção Brasil do Povo",
      true,
      (_number, index) => `${index + 1}.png`,
    ),
    mockups: createMockups("pack-lula", "Pack Lula", true, [
      { altLabel: "no mockup 1", fileName: "M1.png", placeholderLabel: "1" },
      { altLabel: "no mockup 2", fileName: "M2.png", placeholderLabel: "2" },
    ]),
    inclusoes: baseInclusoes,
    faqs: createFaqs("Pack Lula"),
  },
  augusto: {
    slug: "augusto",
    routePath: "/pack-augusto/",
    nome: "Pack Augusto Cury",
    colecao: "Coleção Brasil Avante",
    nomeCompleto: "Pack Augusto Cury — Coleção Brasil Avante",
    headline: "6 artes para canecas com uma coleção pronta para produção",
    subtitulo:
      "Pack Augusto Cury — Coleção Brasil Avante com artes digitais prontas para personalização de canecas.",
    descricaoSeo:
      "6 artes digitais do Pack Augusto Cury — Coleção Brasil Avante para personalização de canecas. Produto 100% digital por R$ 9,90.",
    ogDescricao:
      "6 artes digitais para canecas do Pack Augusto Cury — Coleção Brasil Avante. Produto 100% digital por R$ 9,90.",
    preco,
    precoNumero,
    quantidadeArtes: 6,
    checkoutUrl: "https://pay.cakto.com.br/wqz9fwp_1085922",
    suporte,
    garantiaDias,
    hero: {
      src: "/pack-augustoCury/hero/ChatGPT Image 4 de set. de 2026, 15_38_36.png",
      alt: "Pack Augusto Cury — Coleção Brasil Avante com seis artes digitais para canecas",
      width: 1254,
      height: 1254,
    },
    artes: createPreviewImages(
      "pack-augustoCury",
      "Pack Augusto Cury — Coleção Brasil Avante",
      true,
      (_number, index) => `${index + 1}.png`,
      (_number, index) => ({ width: 1400, height: [624, 616, 639, 639, 630, 639][index] ?? 639 }),
    ),
    mockups: createMockups("pack-augustoCury", "Pack Augusto Cury", true, [
      { altLabel: "no mockup 1", fileName: "M4.png", placeholderLabel: "1" },
      { altLabel: "no mockup 2", fileName: "M10.png", placeholderLabel: "2" },
    ]),
    inclusoes: baseInclusoes,
    faqs: createFaqs("Pack Augusto Cury"),
  },
} satisfies Record<PackSlug, PackConfig>;

