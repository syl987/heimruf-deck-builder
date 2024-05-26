/**
 * Filter a string array by a filter string. Searches inside each string and uses internally `.toLowerCase()`.
 */
export function filterStringArray<T extends string>(array: T[], filterString?: string | null): T[] {
  return filterString ? array.filter(country => country.toLowerCase().includes(filterString.trim().toLowerCase())) : array;
}
