import { Product } from "../models/Product";
import Papa from "papaparse";
import { convertPropertiesToNumbers } from "../utilities/convertPropertiesToNumbers";
import { findDuplicateIds } from "../utilities/findDuplicateIds";

const DB_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_DB_BASE_URL as string)
    : (process.env.NEXT_PUBLIC_DB_BASE_URL_LOCAL as string);

const DB_URL_AUX =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_DB_BASE_URL_AUX as string)
    : (process.env.NEXT_PUBLIC_DB_BASE_URL_AUX_LOCAL as string);

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(DB_URL, {
      next: { revalidate: 10 },
      cache: "force-cache",
    });
    const blob = await response.blob();
    const text = await new Response(blob).text();

    const products = await new Promise<Product[]>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        complete: (results) => {
          const parsedProducts = results.data as Product[];
          //Solo traer productos que tengan "name"
          const filteredProducts = parsedProducts.filter(
            (product) => product.name
          );

          // Crear un array con las urls de las imagenes proporcionadas
          const productsWithMultipleImages = filteredProducts.map((product) => {
            let imageUrls: string[];
            if (Array.isArray(product.image)) {
              imageUrls = product.image;
            } else {
              imageUrls = (product.image as string)
                .split(",")
                .map((url) => url.trim());
            }
            return {
              ...product,
              image: imageUrls,
            };
          });

          //Transformar valores tipo string a numbers
          // const stringToNumber = productsWithMultipleImages.map(
          //   (prod: Product) => convertPropertiesToNumbers(prod)
          // );

          resolve(productsWithMultipleImages);
        },
        error: (error: Error) => reject(new Error(error.message)),
      });
    });

    const duplicateIds = findDuplicateIds(products);
    if (duplicateIds.length) console.error("IDs duplicadas:", duplicateIds);

    const filteredProducts = products.filter(
      (product) => !duplicateIds.includes(product.id)
    );
    return filteredProducts;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const inserProduct = async (data: Product) => {
  try {
    const response = await fetch(DB_URL_AUX, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("La solicitud POST se realizó correctamente.");
    } else {
      console.log("Error al realizar la solicitud POST:", response.status);
    }
  } catch (error) {
    console.log("Error al realizar la solicitud POST:", error);
  }
};

export const fetchProductById = async (productId: string) => {
  const url = `${DB_URL_AUX}/query?id=__eq(${productId})`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    // Si esperas un solo producto, puedes devolver directamente el primer elemento del array
    const product = data[0];
    console.log(data);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (id: string, body: {}) => {
  console.log(id);
  console.log(body);
  const url = `${DB_URL_AUX}/id/*${id}*`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update name");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
