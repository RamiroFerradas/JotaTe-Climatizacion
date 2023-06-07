const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-5628114857087145-060712-44c5a00c940cc5f534bc2a6dfd453fe3-169857175", // Reemplaza con tu access token de Mercado Pago
});
export async function createPreference() {
  let preference = {
    purpose: "wallet_purchase",
    items: [
      {
        id: "item-ID-1234",
        title: "Mi producto",
        quantity: 1,
        unit_price: 75.76,
      },
    ],
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    return preferenceId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
