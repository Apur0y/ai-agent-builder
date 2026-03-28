export const PROVIDERS = ['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek'] as const

export type Provider = (typeof PROVIDERS)[number]

export const PROVIDER_COLORS: Record<Provider, string> = {
  Gemini: '#4285F4',
  ChatGPT: '#10a37f',
  Kimi: '#ff6b35',
  Claude: '#d4a853',
  DeepSeek: '#7c3aed',
}

export const CATALOG_TABS = ['profiles', 'skills', 'layers'] as const
export type CatalogTab = (typeof CATALOG_TABS)[number]