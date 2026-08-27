import { PaginationError } from "./errors.js";

export interface PageParameters {
  page: number;
  pageSize: number;
}

export interface PaginatedPage<Item> {
  data: Item[];
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationOptions {
  pageSize?: number;
  startPage?: number;
  maxPages?: number;
}

export async function* paginate<Item>(
  pageFetcher: (parameters: PageParameters) => Promise<PaginatedPage<Item>>,
  options: PaginationOptions = {},
): AsyncGenerator<Item, void, undefined> {
  const pageSize = options.pageSize ?? 100;
  let currentPage = options.startPage ?? 1;
  const maxPages = options.maxPages ?? 10_000;
  if (pageSize < 1 || pageSize > 100 || currentPage < 1 || maxPages < 1) {
    throw new RangeError("pageSize must be 1..100; startPage and maxPages must be positive.");
  }

  for (let iteration = 0; iteration < maxPages; iteration += 1) {
    const result = await pageFetcher({ page: currentPage, pageSize });
    if (
      !Array.isArray(result.data) ||
      !Number.isInteger(result.page) ||
      !Number.isInteger(result.total) ||
      result.page !== currentPage
    ) {
      throw new PaginationError("The API returned invalid or unexpected page metadata.");
    }
    yield* result.data;
    if (result.data.length === 0 || currentPage * pageSize >= result.total) return;
    currentPage += 1;
  }
  throw new PaginationError("Pagination stopped after the configured maximum number of pages.");
}
