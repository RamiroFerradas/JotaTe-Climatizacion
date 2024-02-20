import { Product } from "@/app/models";

export function createDataFromAPI(item: Product) {
  return {
    name: item.name,
    brand: item.brand,
    category: item.category,
    subcategory: item.subcategory,
    description: item.description,
    image: item.image,
    price: item.price,
    stock: item.stock,
    destacado: item.destacado,
    id: item.id,
    visible: item.visible,
    recommendedJson: item.recommendedJson,
  };
}
