import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

/**
 * Like `getCollection`, but drops entries marked `draft: true` from production
 * builds. Drafts stay visible in `npm run dev` so you can preview them.
 */
export async function getPublished<C extends CollectionKey>(
  collection: C,
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);
  if (import.meta.env.DEV) return entries;
  return entries.filter((entry) => !(entry.data as { draft?: boolean }).draft);
}

/** Group items by a key, preserving the order in which keys first appear. */
export function groupBy<T, K>(items: T[], key: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const group = groups.get(k);
    if (group) group.push(item);
    else groups.set(k, [item]);
  }
  return groups;
}

const SEASON_ORDER: Record<string, number> = { Winter: 0, Spring: 1, Summer: 2, Fall: 3 };

/** Sortable number for a term like "Fall 2025" (later terms → larger numbers). */
export function termSortKey(term: string): number {
  const [season = '', year = '0'] = term.split(' ');
  return Number(year) * 10 + (SEASON_ORDER[season] ?? 0);
}

export function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}
