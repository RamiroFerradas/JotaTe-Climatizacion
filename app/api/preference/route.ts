// import { NextRequest, NextResponse } from "next/server";

// //  async createConsultPay(id) {
// //     const url = `https://api.mercadopago.com/checkout/preferences/${id}`;

// //     const consult = await axios.get(url, {
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
// //       },
// //     });
// //     return consult.data;
// // }

// export async function GET(request: NextRequest) {
//   // const { id } = request.params;

//   const { searchParams } = new URL(request.url);

//   const ACCESS_TOKEN =
//     "TEST-5628114857087145-060712-44c5a00c940cc5f534bc2a6dfd453fe3-169857175";

//   const id = `169857175-5c1dc831-dc05-446d-9cb7-69dd96e5c962`;

//   const url = `https://api.mercadopago.com/checkout/preferences/${searchParams.id}`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//       },
//     });

//     if (!response.ok) {
//       console.log(response);
//       return NextResponse.json(response, { status: 500 });
//     }

//     const consultData = await response.json();

//     return NextResponse.json(consultData, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: Error }, { status: 500 });
//   }
// }
