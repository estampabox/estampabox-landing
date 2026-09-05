/**
 * Configuração central do Pack Flávio — Coleção Patriota.
 *
 * ⚠️ SUBSTITUIR ANTES DE PUBLICAR:
 * - CHECKOUT_URL: cole aqui a URL real do checkout (ex.: Hotmart, Kiwify, etc.)
 * - META_PIXEL_ID: cole o ID real do seu Meta Pixel (somente números).
 *   Enquanto estiver vazio, o pixel não é carregado e nenhum evento é disparado.
 */

export const CHECKOUT_URL = "https://pay.cakto.com.br/3agfs9n_1082656";

export const META_PIXEL_ID = "1595712898900708";

export const PACK = {
  nome: "Pack Flávio",
  colecao: "Coleção Patriota",
  preco: "R$ 14,90",
  precoNumero: 14.9,
  suporte: "estampabox.suporte@gmail.com",
  garantiaDias: 7,
} as const;
