export const PAYLOAD_CMS_URL = process.env.PAYLOAD_CMS_URL || 'https://cms.morar.dev';
export const PAYLOAD_API_BASE = `${PAYLOAD_CMS_URL}/api`;

export function getCollectionUrl(collection: string, params?: string): string {
  const baseUrl = `${PAYLOAD_API_BASE}/${collection}`;
  return params ? `${baseUrl}?${params}` : baseUrl;
}
