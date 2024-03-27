import { MP_ACCESS_TOKEN } from "@/app/constants";
import { Product } from "@/app/models";
import { ItemCheckout } from "@/app/models/ItemCheckout";
import { NextRequest, NextResponse } from "next/server";

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

const ACCES_TOKEN = process.env.NEXT_PUBLIC_MP_ACCES_TOKEN;

mercadopago.configure({
  access_token: ACCES_TOKEN,
});

// Crear un objeto de preferencia

export async function POST(req: NextRequest, res: NextResponse) {
  const products = await req.json();
  let items = [];

  for (const product of products) {
    const { price, name, id, image, subcategory, quantity } = product;

    items.push({
      id,
      name,
      quantity,
      unit_price: price,
      currency_id: "ARS",
      description: name,
      title: name,
      picture_url: image[0],
      category_id: subcategory,
      expiration_date_to: new Date().toISOString(),
    });
  }

  let preference = {
    purpose: "wallet_purchase",
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_API_URL}/productos/`,
    },
    items,
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body;
    console.log(preferenceId);

    return NextResponse.json(preferenceId);
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Error al crear la preferencia" });
  }
}
