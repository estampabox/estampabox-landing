import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  CreditCard,
  Download,
  FileImage,
  Files,
  LayoutDashboard,
  Layers,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CHECKOUT_URL, META_PIXEL_ID, PACK } from "@/lib/pack-flavio";
import { initMetaPixel, trackInitiateCheckout, trackViewContent } from "@/lib/meta-pixel";
import { buildCheckoutUrl } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Pack Flávio — Coleção Patriota | EstampaBox",
      },
      {
        name: "description",
        content:
          "6 artes digitais para deixar suas canecas prontas para entrar no clima do Brasil. PNG em alta resolução, PDF da coleção, elementos extras e mockups. Produto 100% digital por R$ 14,90.",
      },
      { property: "og:title", content: "Pack Flávio — Coleção Patriota | EstampaBox" },
      {
        property: "og:description",
        content:
          "6 artes completas para canecas + elementos extras + mockups. Produto 100% digital por R$ 14,90.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const artes = [
  {
    src: "/pack-flavio/artes/arte-01.png",
    alt: "Arte 1 do Pack Flávio — Coleção Patriota",
    width: 5083,
    height: 2319,
  },
  {
    src: "/pack-flavio/artes/arte-02.png",
    alt: "Arte 2 do Pack Flávio — Coleção Patriota",
    width: 5083,
    height: 2319,
  },
  {
    src: "/pack-flavio/artes/arte-03.png",
    alt: "Arte 3 do Pack Flávio — Coleção Patriota",
    width: 5083,
    height: 2319,
  },
  {
    src: "/pack-flavio/artes/arte-04.png",
    alt: "Arte 4 do Pack Flávio — Coleção Patriota",
    width: 5083,
    height: 2319,
  },
  {
    src: "/pack-flavio/artes/arte-05.png",
    alt: "Arte 5 do Pack Flávio — Coleção Patriota",
    width: 5083,
    height: 2319,
  },
  {
    src: "/pack-flavio/artes/arte-06.png",
    alt: "Arte 6 do Pack Flávio — Coleção Patriota",
    width: 5083,
    height: 2319,
  },
];

function useCheckoutUrl() {
  const [url, setUrl] = useState(CHECKOUT_URL);
  useEffect(() => {
    setUrl(buildCheckoutUrl(CHECKOUT_URL));
  }, []);
  return url;
}

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const checkoutUrl = useCheckoutUrl();
  return (
    <a
      href={checkoutUrl}
      onClick={() => trackInitiateCheckout(META_PIXEL_ID)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:w-auto ${className}`}
    >
      {children}
    </a>
  );
}

const entregaveis = [
  { icon: FileImage, texto: "6 artes completas para canecas" },
  { icon: BadgeCheck, texto: "Arquivos PNG em alta resolução — 300 DPI" },
  { icon: Files, texto: "PDF com as 6 artes da coleção" },
  { icon: Layers, texto: "Elementos extras em PNG para personalização" },
  { icon: MonitorSmartphone, texto: "Mockups da coleção" },
  { icon: LayoutDashboard, texto: "Acesso pela área de membros EstampaBox" },
];

const passos = [
  {
    numero: "1",
    titulo: "Faça sua compra",
    texto: "Finalize seu pedido pelo checkout seguro.",
  },
  {
    numero: "2",
    titulo: "Acesse sua área",
    texto: "Após a confirmação do pagamento, acesse sua área de membros EstampaBox.",
  },
  {
    numero: "3",
    titulo: "Baixe suas artes",
    texto: "Faça o download dos arquivos disponíveis no seu pack.",
  },
];

const faqs = [
  {
    pergunta: "O produto é físico?",
    resposta: "Não. O Pack Flávio é um produto 100% digital.",
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

function LandingPage() {
  const stickyCheckoutUrl = useCheckoutUrl();

  useEffect(() => {
    initMetaPixel(META_PIXEL_ID);
    trackViewContent(META_PIXEL_ID);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ============================== HERO ============================== */}
      <header className="mx-auto w-full max-w-3xl px-4 pb-10 pt-6 sm:pt-10">
        <div
          className="flex items-center justify-center"
          aria-label="EstampaBox — Artes para suas criações"
        >
          <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card/60 px-5 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-lg font-black text-background">
              EB
            </div>
            <div className="text-left leading-tight">
              <div className="text-xl font-black tracking-tight">
                ESTAMPA<span className="text-primary">BOX</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Artes para suas criações
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            PRODUTO 100% DIGITAL
          </span>

          <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            6 artes para deixar suas canecas prontas para entrar no clima do Brasil
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {PACK.nome} — {PACK.colecao} com artes digitais prontas para personalização de canecas.
          </p>
        </div>

        <div className="mt-8">
          <img
            src={"/pack-flavio/hero/pack-flavio-principal.png"}
            alt="Pack Flávio — Coleção Patriota com seis artes digitais para canecas"
            width={1402}
            height={1122}
            className="aspect-square w-full rounded-xl object-cover"
            fetchPriority="high"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Por apenas</p>
          <p className="text-5xl font-black tracking-tight text-accent">{PACK.preco}</p>
          <div className="mt-5">
            <CtaButton>QUERO O PACK FLÁVIO</CtaButton>
          </div>
          <div className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              Checkout seguro
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
              <Download className="h-3.5 w-3.5 text-primary" />
              Acesso digital
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Garantia de {PACK.garantiaDias} dias
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Acesso digital após a confirmação do pagamento.
          </p>
        </div>
      </header>

      {/* ====================== O QUE VOCÊ RECEBE ====================== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Tudo organizado para você baixar e criar
          </h2>

          <ul className="mx-auto mt-8 grid max-w-xl gap-3">
            {entregaveis.map((item) => (
              <li
                key={item.texto}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <item.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm sm:text-base">{item.texto}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {artes.map((arte) => (
              <div
                key={arte.src}
                className="relative overflow-hidden rounded-lg border border-border bg-card"
              >
                <img
                  src={arte.src}
                  alt={arte.alt}
                  width={arte.width}
                  height={arte.height}
                  className="aspect-[2.2/1] w-full object-contain"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(-24deg,transparent_0,transparent_72px,hsl(var(--background)/0.08)_72px,hsl(var(--background)/0.08)_132px)]"
                >
                  <span className="select-none rounded-full border border-background/25 bg-background/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-background/45 backdrop-blur-[1px]">
                    EstampaBox
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ MOCKUPS ============================ */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Veja as artes aplicadas</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground sm:text-base">
            Visualize algumas das artes aplicadas em canecas antes de começar suas criações.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <img
              src={"/pack-flavio/mockups/mockup-frente.png"}
              alt="Caneca com arte do Pack Flávio vista pela frente"
              width={340}
              height={340}
              className="aspect-square w-full object-contain"
              loading="lazy"
            />
            <img
              src={"/pack-flavio/mockups/mockup-verso.png"}
              alt="Caneca com arte do Pack Flávio vista pelo verso"
              width={340}
              height={340}
              className="aspect-square w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ========================== COMO FUNCIONA ========================== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Como funciona</h2>
          <ol className="mx-auto mt-8 grid max-w-xl gap-4">
            {passos.map((passo) => (
              <li
                key={passo.numero}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-base font-black text-primary-foreground">
                  {passo.numero}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{passo.titulo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================== PARA QUEM É =========================== */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Feito para quem trabalha com personalizados
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            Uma coleção prática para sublimadores e criadores de personalizados que desejam ter
            artes organizadas e prontas para aplicar em suas produções.
          </p>
        </div>
      </section>

      {/* ============================ PREÇO / CTA ============================ */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto w-full max-w-xl px-4 py-12">
          <div className="rounded-2xl border border-primary/40 bg-card p-6 text-center sm:p-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {PACK.nome} — {PACK.colecao}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              6 artes + elementos extras + mockups
            </p>
            <p className="mt-6 text-5xl font-black tracking-tight text-accent">{PACK.preco}</p>
            <div className="mt-6">
              <CtaButton className="sm:w-full">QUERO ACESSAR O PACK</CtaButton>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Produto digital. Nenhum produto físico será enviado.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Garantia de {PACK.garantiaDias} dias
            </p>
          </div>
        </div>
      </section>

      {/* ================================ FAQ ================================ */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-xl px-4 py-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Perguntas frequentes</h2>
          <div className="mt-8 grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.pergunta}
                className="group rounded-xl border border-border bg-card px-4 py-3 open:pb-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.pergunta}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{faq.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== RODAPÉ ============================== */}
      <footer className="border-t border-border bg-card/40 pb-24 sm:pb-0">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 text-center">
          <p className="text-lg font-black tracking-tight">
            Estampa<span className="text-primary">Box</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Criação de artes para canecas</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Suporte:{" "}
            <a
              href={`mailto:${PACK.suporte}`}
              className="text-primary underline-offset-2 hover:underline"
            >
              {PACK.suporte}
            </a>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Produto digital.</p>
          <nav className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {/* Substituir href="#" pelas URLs reais das páginas legais */}
            <a href="#" className="underline-offset-2 hover:underline">
              Termos de Uso
            </a>
            <span aria-hidden>·</span>
            <a href="#" className="underline-offset-2 hover:underline">
              Política de Privacidade
            </a>
          </nav>
        </div>
      </footer>

      {/* ====================== CTA STICKY (MOBILE) ====================== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-sm font-semibold">
            {PACK.nome} — <span className="text-accent">{PACK.preco}</span>
          </p>
          <a
            href={stickyCheckoutUrl}
            onClick={() => trackInitiateCheckout(META_PIXEL_ID)}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            QUERO O PACK
          </a>
        </div>
      </div>
    </div>
  );
}
