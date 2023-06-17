import { NextRequest, NextResponse } from "next/server";

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-2187884601335675-060822-f815befbcaaa62b54b00dd2a0c463fe9-1394988542",
  // "APP_USR-5628114857087145-060712-a1f3a749ca6d267a1c2c5905c6bdea7f-169857175", //real
});

// Crear un objeto de preferencia

export interface Item {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  currency_id: "ARS";
}

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "entro" });
}
export async function POST(req: NextRequest, res: NextResponse) {
  console.log("entro");
  const { unit_price } = await req.json();
  console.log(unit_price);
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
