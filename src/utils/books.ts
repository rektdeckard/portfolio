const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org/api/books";

type ResponseKey = `ISBN:${number}`;

export type BookDetails<ISBN extends ResponseKey> = {
  bib_key: ISBN;
  info_url: string;
  preview: string;
  preview_url: string;
  thumbnail_url: string;
  details: {
    title: string;
    authors?: { key: string; name: string }[];
    contributors?: { role: string; name: string }[];
    publish_date: string;
    type: { key: string };
    local_id: string[];
    publishers: string[];
    source_records: string[];
    key: string;
    works: { key: string }[];
    identifiers: Record<string, string[]>;
    isbn_10: string[];
    isbn_13: string[];
    ocaid: string;
    languages: { key: string }[];
    covers: number[];
    latest_revision: number;
    revision: number;
    created: { type: string; value: string };
    last_modified: { type: string; value: string };
  };
};

type BookDetailsResponse<ISBN extends ResponseKey> = {
  [key in ISBN]: BookDetails<key>;
};

export async function fetchBookDetails<ISBN extends number>(
  isbn: ISBN,
): Promise<BookDetails<`ISBN:${ISBN}`>> {
  const url = new URL(OPEN_LIBRARY_BASE_URL);
  url.searchParams.append("bibkeys", `ISBN:${isbn}`);
  url.searchParams.append("jscmd", "details");
  url.searchParams.append("format", "json");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching book data: ${response.statusText}`);
  }

  const data = (await response.json()) as BookDetailsResponse<`ISBN:${ISBN}`>;
  return data[`ISBN:${isbn}`];
}
