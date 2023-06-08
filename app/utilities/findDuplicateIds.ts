import { Product } from "../models";

export const findDuplicateIds = (products: Product[]): string[] => {
  const countById: Record<string, number> = {};
  const duplicateIds: string[] = [];

  for (const product of products) {
    const id = product.id;
    countById[id] = (countById[id] || 0) + 1;
    if (countById[id] === 2) {
      duplicateIds.push(id);
    }
  }

  return duplicateIds;
};
