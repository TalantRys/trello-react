type id = number | string;

export function findById<T extends { id: id }>(
  arr: T[],
  id: id,
): T | undefined {
  return arr.find((item) => item.id === id);
}

export function findIndexById<T extends { id: id }>(arr: T[], id: id): number {
  return arr.findIndex((item) => item.id === id);
}
