import { describe, expect, it } from "vitest";
import { PaginationError, paginate } from "../src/index.js";

describe("paginate", () => {
  it("walks page/pageSize responses lazily", async () => {
    const calls: number[] = [];
    const iterator = paginate(
      async ({ page, pageSize }) => {
        calls.push(page);
        return {
          data: page === 1 ? [1, 2] : [3],
          page,
          pageSize,
          total: 3,
        };
      },
      { pageSize: 2 },
    );

    expect(calls).toEqual([]);
    const values: number[] = [];
    for await (const value of iterator) values.push(value);
    expect(values).toEqual([1, 2, 3]);
    expect(calls).toEqual([1, 2]);
  });

  it("rejects unexpected metadata and invalid page sizes", async () => {
    const invalidPage = paginate(async () => ({ data: [1], page: 2, pageSize: 1, total: 2 }));
    await expect(invalidPage.next()).rejects.toBeInstanceOf(PaginationError);

    const invalidSize = paginate(async () => ({ data: [], page: 1, pageSize: 101, total: 0 }), {
      pageSize: 101,
    });
    await expect(invalidSize.next()).rejects.toBeInstanceOf(RangeError);
  });
});
