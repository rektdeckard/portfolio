import type { CollectionEntry, CollectionKey } from "astro:content";
import { formatLongDate } from "./datetime";

export function omitDraftEntries<
  K extends CollectionKey,
  T extends CollectionEntry<K>,
>(entry: T): boolean {
  return import.meta.env.PROD ? !entry.data.draft : true;
}

export function getPostName(post: CollectionEntry<"writings">): string {
  return post.data.title ?? formatLongDate(post.data.date);
}

export function sortedCollectionByYear<
  K extends CollectionKey,
  T extends CollectionEntry<K>,
>(collection: T[]): [string, T[]][] {
  const entriesByYear = collection.reduce<Record<number, T[]>>((acc, curr) => {
    if ("year" in curr.data) {
      const startYear = Array.isArray(curr.data.year)
        ? curr.data.year[0]
        : curr.data.year;
      if (!acc[startYear]) acc[startYear] = [];
      acc[startYear].push(curr);
    } else if ("date" in curr.data) {
      const year = +curr.data.date.getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(curr);
    }
    return acc;
  }, {});

  for (const year of Object.values(entriesByYear)) {
    naturalSort(year);
  }

  return Object.entries(entriesByYear).sort(([a], [b]) => b.localeCompare(a));
}

export function sortedCollectionByTag<
  K extends CollectionKey,
  T extends CollectionEntry<K>,
>(collection: T[]): [string, T[]][] {
  const byTag = collection.reduce<Record<string, T[]>>((acc, curr) => {
    if ("tags" in curr.data && Array.isArray(curr.data.tags)) {
      for (const tag of curr.data.tags) {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(curr);
      }
    }
    return acc;
  }, {});

  for (const year of Object.values(byTag)) {
    naturalSort(year);
  }

  return Object.entries(byTag).sort(([a], [b]) => b.localeCompare(a));
}

function naturalSort<K extends CollectionKey, T extends CollectionEntry<K>>(
  out: Array<T>,
): void {
  switch (out[0].collection) {
    case "projects":
      (out as CollectionEntry<"projects">[]).sort((a, b) => {
        return a.data.title.localeCompare(b.data.title);
      });
      break;
    case "writings":
      (out as CollectionEntry<"writings">[]).sort((a, b) => {
        return +b.data.date - +a.data.date;
      });
      break;
    default:
      throw new Error(
        `Unable to sort collection type "${(out[0] as any).collection}"`,
      );
  }
}
