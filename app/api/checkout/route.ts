import { NextRequest, NextResponse } from "next/server";

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

const ACCES_TOKEN = process.env.NEXT_PUBLIC_MP_ACCES_TOKEN_TEST;
// const ACCES_TOKEN = process.env.NEXT_PUBLIC_MP_ACCES_TOKEN //REAL;
// Agrega credenciales
mercadopago.configure({
  access_token: ACCES_TOKEN,
});

// Crear un objeto de preferencia

export interface Item {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  currency_id: "ARS";
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { unit_price } = await req.json();
  // Crear un objeto de preferencia
  let preference = {
    // el "purpose": "wallet_purchase" solo permite pagos registrados
    // para permitir pagos de guests puede omitir esta propiedad
    purpose: "wallet_purchase",
    back_urls: {
      success: "http://localhost:3000/shop",
    },
    // notification_url: "https://localhost:3000/shop",
    items: [
      {
        id: "item-ID-1234",
        title: "Producto test",
        quantity: 1,
        unit_price: unit_price,
        currency_id: "ARS",
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
