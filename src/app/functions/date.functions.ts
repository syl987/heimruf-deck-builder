/**
 * Creates a new date with modified value.
 */
export function modifyDate(date: string | number | Date, millisecondsToAdd: number): Date {
  return new Date(new Date(date).getTime() + millisecondsToAdd);
}
