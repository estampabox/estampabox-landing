/**
 * Preservação de parâmetros de rastreamento ao encaminhar para o checkout.
 * Mantém utm_source, utm_medium, utm_campaign, utm_content, utm_term e fbclid
 * presentes na URL da landing page, sem sobrescrever parâmetros já existentes
 * na URL de destino.
 */

const PARAMS_PRESERVADOS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export function buildCheckoutUrl(baseUrl: string): string {
  if (typeof window === "undefined") return baseUrl;

  let destino: URL;
  try {
    destino = new URL(baseUrl);
  } catch {
    return baseUrl;
  }

  const atual = new URLSearchParams(window.location.search);
  for (const param of PARAMS_PRESERVADOS) {
    const valor = atual.get(param);
    // Não substituir parâmetros já existentes na URL do checkout
    if (valor && !destino.searchParams.has(param)) {
      destino.searchParams.set(param, valor);
    }
  }

  return destino.toString();
}
