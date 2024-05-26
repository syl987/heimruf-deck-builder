export function getStyleUrl(url: string): string;
export function getStyleUrl(url?: string | null): string | null;
export function getStyleUrl(url?: string | null): string | null {
  return url ? `url(${url})` : null;
}
