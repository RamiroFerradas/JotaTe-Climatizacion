import { Product } from "../models";

export const getOptionsByProperty = (data: Product[], propertyName: string) => {
  const propertySet = new Set(data.map((product) => product[propertyName]));
  const uniqueValues = Array.from(propertySet);

  return uniqueValues.map((value) => ({
    value,
    label: value,
  }));
};
