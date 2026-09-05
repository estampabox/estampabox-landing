/**
 * Estrutura preparada para Meta Pixel.
 * Carrega o script somente se META_PIXEL_ID estiver preenchido em
 * src/lib/pack-flavio.ts — nenhum ID fictício é usado.
 *
 * Eventos:
 * - PageView: disparado no carregamento (automático pelo snippet do Meta)
 * - ViewContent: disparado no carregamento da página do produto
 * - InitiateCheckout: disparado no clique de qualquer CTA que leva ao checkout
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function initMetaPixel(pixelId: string) {
  if (!pixelId || typeof window === "undefined") return;
  if (window.fbq) return;

  const n = (window.fbq = function (...args: unknown[]) {
    // Fila padrão do snippet do Meta.
    const callMethod = (n as typeof n & { callMethod?: (...args: unknown[]) => void }).callMethod;
    if (callMethod) {
      callMethod(...args);
    } else {
      n.queue.push(args);
    }
  }) as Window["fbq"] & { queue: unknown[]; loaded: boolean; version: string };

  if (!window._fbq) window._fbq = n;
  // @ts-expect-error propriedades do snippet
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
}

export function trackViewContent(pixelId: string) {
  if (!pixelId || !window.fbq) return;
  window.fbq("track", "ViewContent", {
    content_name: "Pack Flávio — Coleção Patriota",
    content_category: "Artes Digitais para Canecas",
    content_type: "product",
    value: 14.9,
    currency: "BRL",
  });
}

export function trackInitiateCheckout(pixelId: string) {
  if (!pixelId || !window.fbq) return;
  window.fbq("track", "InitiateCheckout", {
    content_name: "Pack Flávio — Coleção Patriota",
    value: 14.9,
    currency: "BRL",
    num_items: 1,
  });
}
