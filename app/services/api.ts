import { Product } from "../models/Product";
import { imagesToArray } from "../utilities/imagesToArray";

const DB_URL = process.env.NEXT_PUBLIC_DB_BASE_URL as string;

const DB_URL_AUX =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_DB_BASE_URL_AUX as string)
    : (process.env.NEXT_PUBLIC_DB_BASE_URL_AUX_LOCAL as string);

const TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

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
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    const product = imagesToArray(data[0]);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// export const updateProduct = async (id: string, body: {}) => {
//   const url = `${DB_URL_AUX}/id/*${id}*`;

//   try {
//     const response = await fetch(url, {
//       method: "PATCH",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update name");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
export async function updateProduct(
  id: string,
  updatedData: Product
): Promise<Product | null> {
  try {
    const url = `${API_URL}/api/products/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: TOKEN,
      // },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el producto con ID ${id}`);
    }

    const data = await response.json();
    console.log(`Se actualizó el producto con ID ${id}`);
    return data as Product;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    return null;
  }
}
