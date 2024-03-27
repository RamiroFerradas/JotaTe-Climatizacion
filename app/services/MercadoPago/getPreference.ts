import { Product } from "@/app/models";

export async function getPreference(products: Product[]): Promise<Response> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    return response;
  } catch (error) {
    // Manejar el error adecuadamente
    console.error("Error al realizar la solicitud de checkout:", error);
    throw error;
  }
}
