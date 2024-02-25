import { MP_ACCESS_TOKEN } from "@/app/constants";
import { Product } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// const ACCES_TOKEN = process.env.NEXT_PUBLIC_MP_ACCES_TOKEN_TEST;
mercadopago.configure({
  access_token: MP_ACCESS_TOKEN,
});

// Crear un objeto de preferencia

export interface Item extends Product {
  currency_id: "ARS";
  quantity: number;
  unit_price: number;
  picture_url: string;
  title: string;
  category_id: string;
  expiration_date_to: string;
}
export async function POST(req: NextRequest, res: NextResponse) {
  const { price, name, id, image, subcategory } = await req.json();
  // Crear un objeto de preferencia
  let preference = {
    // el "purpose": "wallet_purchase" solo permite pagos registrados
    // para permitir pagos de guests puede omitir esta propiedad
    purpose: "wallet_purchase",
    back_urls: {
      success: "https://www.jotateclimatizacion.com/productos/",
    },
    // notification_url: "https://localhost:3000/shop",
    items: [
      {
        id,
        name,
        quantity: 1,
        unit_price: price,
        currency_id: "ARS",
        description: name,
        title: name,
        picture_url: image[0],
        category_id: subcategory,
        expiration_date_to: new Date().toISOString(),
      },
    ] as Item[],
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body;

    return NextResponse.json(preferenceId);
  } catch (error) {
    console.error(error);

    NextResponse.json({ error: "Error al crear la preferencia" });
  }
}
