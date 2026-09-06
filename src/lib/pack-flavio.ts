/**
 * Compatibilidade para imports antigos do Pack Flávio.
 * A fonte de verdade agora é src/lib/packs.ts.
 */

import { META_PIXEL_ID as PIXEL_ID, packs } from "./packs";

export const CHECKOUT_URL = packs.flavio.checkoutUrl;

export const META_PIXEL_ID = PIXEL_ID;

export const PACK = {
  nome: packs.flavio.nome,
  colecao: packs.flavio.colecao,
  preco: packs.flavio.preco,
  precoNumero: packs.flavio.precoNumero,
  suporte: packs.flavio.suporte,
  garantiaDias: packs.flavio.garantiaDias,
} as const;
