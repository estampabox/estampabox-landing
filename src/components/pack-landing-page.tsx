import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  CreditCard,
  Download,
  LockKeyhole,
  PackageCheck,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import type { PackConfig, PackImage } from "@/lib/packs";
import { ASSET_VERSION, META_PIXEL_ID } from "@/lib/packs";
import { initMetaPixel, trackInitiateCheckout, trackViewContent } from "@/lib/meta-pixel";
import { buildCheckoutUrl } from "@/lib/tracking";

type PackLandingPageProps = {
  pack: PackConfig;
};

function useCheckoutUrl(pack: PackConfig) {
  const [url, setUrl] = useState(pack.checkoutUrl);

  useEffect(() => {
    if (!pack.checkoutTodo) {
      setUrl(buildCheckoutUrl(pack.checkoutUrl));
    }
  }, [pack.checkoutTodo, pack.checkoutUrl]);

  return url;
}

function CtaButton({
  pack,
  children,
  className = "",
}: {
  pack: PackConfig;
  children: React.ReactNode;
  className?: string;
}) {
  const checkoutUrl = useCheckoutUrl(pack);

  if (pack.checkoutTodo) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary/45 px-6 py-4 text-base font-bold text-primary-foreground/70 shadow-lg sm:w-auto ${className}`}
      >
        CHECKOUT PENDENTE
      </span>
    );
  }

  return (
    <a
      href={checkoutUrl}
      onClick={() => trackInitiateCheckout(META_PIXEL_ID, pack)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto ${className}`}
    >
      {children}
      <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function ImageOrPlaceholder({
  image,
  className,
  priority = false,
}: {
  image: PackImage;
  className: string;
  priority?: boolean;
}) {
  if (image.src || image.previewSrc) {
    return (
      <img
        src={`${image.previewSrc ?? image.src}?v=${ASSET_VERSION}`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`${className} grid place-items-center border border-dashed border-border bg-card/70 p-4 text-center`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {image.placeholderLabel ?? "Asset pendente"}
      </span>
    </div>
  );
}

export function PackLandingPage({ pack }: PackLandingPageProps) {
  const stickyCheckoutUrl = useCheckoutUrl(pack);

  useEffect(() => {
    initMetaPixel(META_PIXEL_ID);
    trackViewContent(META_PIXEL_ID, pack);
  }, [pack]);

  const trustItems = [
    { icon: LockKeyhole, text: "Checkout seguro" },
    { icon: Download, text: "Entrega digital" },
    { icon: ShieldCheck, text: `Garantia de ${pack.garantiaDias} dias` },
  ];

  const sellingPoints = [
    {
      icon: Palette,
      title: "Artes prontas para vender",
      text: "Use em canecas personalizadas sem perder tempo criando tudo do zero.",
    },
    {
      icon: PackageCheck,
      title: "Kit completo e organizado",
      text: "PNG em alta resolução, PDF da coleção, extras e mockups reunidos em um só pack.",
    },
    {
      icon: Zap,
      title: "Compra simples, acesso rápido",
      text: "Pagou, confirmou, entrou na área de membros e baixou seus arquivos digitais.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,rgb(59_222_137/0.20),transparent_34%),linear-gradient(135deg,rgb(18_46_34),rgb(21_31_28)_48%,rgb(42_38_19))]">
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:pt-8 lg:pb-16">
          <div className="flex items-center justify-between gap-4">
            <div
              className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 px-4 py-3 backdrop-blur"
              aria-label="EstampaBox - Artes para suas criações"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-lg font-black text-background">
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
            <div className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary sm:inline-flex">
              <Clock3 className="h-3.5 w-3.5" />
              Oferta digital
            </div>
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.88fr)]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {pack.quantidadeArtes} artes + extras para canecas
              </span>

              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {pack.headline}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                {pack.subtitulo} Receba um material pronto para acelerar sua produção, montar ofertas e publicar mockups com mais confiança.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {trustItems.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/7 px-3 py-2 text-sm font-semibold"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="rounded-lg border border-accent/35 bg-accent/10 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    Por apenas
                  </p>
                  <p className="mt-1 text-5xl font-black tracking-tight text-accent">
                    {pack.preco}
                  </p>
                </div>
                <div className="flex-1">
                  <CtaButton pack={pack}>QUERO O {pack.nome.toUpperCase()}</CtaButton>
                  <p className="mt-3 max-w-md text-xs font-medium text-muted-foreground">
                    Produto 100% digital. Nenhuma caneca ou item físico será enviado.
                  </p>
                  {pack.checkoutTodo ? (
                    <p className="mt-2 max-w-sm text-xs font-semibold text-accent">
                      Checkout pendente: {pack.checkoutTodo}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-lg bg-primary/15 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/8 p-3 shadow-2xl shadow-black/30 backdrop-blur">
                <ImageOrPlaceholder
                  image={pack.hero}
                  className="h-auto w-full rounded-md object-contain"
                  priority
                />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <span className="rounded-md bg-background/55 px-2 py-2">PNG</span>
                  <span className="rounded-md bg-background/55 px-2 py-2">PDF</span>
                  <span className="rounded-md bg-background/55 px-2 py-2">Mockups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-card/35">
        <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-8 md:grid-cols-3">
          {sellingPoints.map((item) => (
            <article key={item.title} className="rounded-lg border border-border bg-card p-5">
              <item.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-lg font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid items-end gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Conteúdo do pack
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Tudo pronto para baixar, aplicar e divulgar
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Arquivos pensados para quem trabalha com personalizados e precisa transformar ideia em produto vendável rapidamente.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pack.inclusoes.map((item) => (
              <li
                key={item.texto}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-6 sm:text-base">{item.texto}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pack.artes.map((arte, index) => (
              <div
                key={`${pack.slug}-arte-${index}`}
                className="group relative aspect-[5083/2319] overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/15"
              >
                <ImageOrPlaceholder
                  image={arte}
                  className="absolute inset-0 h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                />
                {arte.previewSrc ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(-24deg,transparent_0,transparent_72px,rgb(7_36_20/0.08)_72px,rgb(7_36_20/0.08)_132px)]"
                  >
                    <span className="select-none rounded-full border border-background/20 bg-background/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-background/40 backdrop-blur-[1px]">
                      EstampaBox
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/35">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.85fr_1fr] lg:py-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Visual real
            </p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Veja as artes aplicadas</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              Use os mockups para apresentar a coleção, validar combinações e criar uma vitrine mais profissional para suas canecas.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <span className="rounded-full border border-border bg-background px-3 py-1.5">Pronto para divulgar</span>
              <span className="rounded-full border border-border bg-background px-3 py-1.5">Arquivos digitais</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {pack.mockups.map((mockup, index) => (
              <div key={`${pack.slug}-mockup-${index}`} className="rounded-lg border border-border bg-background p-3">
                <ImageOrPlaceholder image={mockup} className="aspect-square w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Compra sem complicação
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Como funciona</h2>
            </div>
            <ol className="grid gap-3">
              {[
                ["1", "Faça sua compra", "Finalize seu pedido pelo checkout seguro."],
                [
                  "2",
                  "Acesse sua área",
                  "Após a confirmação do pagamento, acesse sua área de membros EstampaBox.",
                ],
                ["3", "Baixe suas artes", "Faça o download dos arquivos disponíveis no seu pack."],
              ].map(([numero, titulo, texto]) => (
                <li key={numero} className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary text-base font-black text-primary-foreground">
                    {numero}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-black">{titulo}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[linear-gradient(135deg,rgb(29_55_40),rgb(37_40_28))]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 text-center md:grid-cols-[1fr_auto] md:text-left lg:py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              <Star className="h-3.5 w-3.5" />
              Oferta pronta para começar hoje
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{pack.nomeCompleto}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              {pack.quantidadeArtes} artes em PNG + PDF, elementos extras e mockups para transformar sua próxima coleção de canecas em uma oferta mais bonita e fácil de vender.
            </p>
          </div>
          <div className="rounded-lg border border-accent/35 bg-background/70 p-6 text-center shadow-xl shadow-black/20 backdrop-blur sm:min-w-80">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Acesso ao pack
            </p>
            <p className="mt-2 text-5xl font-black tracking-tight text-accent">{pack.preco}</p>
            <div className="mt-5">
              <CtaButton pack={pack} className="sm:w-full">
                QUERO ACESSAR AGORA
              </CtaButton>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              Produto digital com garantia de {pack.garantiaDias} dias
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/35">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 lg:py-16">
          <h2 className="text-center text-3xl font-black sm:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 grid gap-3">
            {pack.faqs.map((faq) => (
              <details key={faq.pergunta} className="group rounded-lg border border-border bg-card px-4 py-3 open:pb-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.pergunta}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-background pb-24 sm:pb-0">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 text-center">
          <p className="text-lg font-black tracking-tight">
            Estampa<span className="text-primary">Box</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Criação de artes para canecas</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Suporte:{" "}
            <a href={`mailto:${pack.suporte}`} className="text-primary underline-offset-2 hover:underline">
              {pack.suporte}
            </a>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Produto digital.</p>
          <nav className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span aria-disabled="true">Termos de Uso pendente</span>
            <span aria-hidden>·</span>
            <span aria-disabled="true">Política de Privacidade pendente</span>
          </nav>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-sm font-semibold">
            {pack.nome} - <span className="text-accent">{pack.preco}</span>
          </p>
          {pack.checkoutTodo ? (
            <span
              aria-disabled="true"
              className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-primary/45 px-4 py-2.5 text-sm font-bold text-primary-foreground/70"
            >
              PENDENTE
            </span>
          ) : (
            <a
              href={stickyCheckoutUrl}
              onClick={() => trackInitiateCheckout(META_PIXEL_ID, pack)}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-black text-primary-foreground"
            >
              Comprar
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

