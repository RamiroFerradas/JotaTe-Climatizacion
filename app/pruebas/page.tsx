// "use client";

// import { Payment } from "@mercadopago/sdk-react";
// import React from "react";

// interface Props {}

// export default function Page({}: Props) {
//   const AMOUNT: number = 30000;

//   const initialization = {
//     amount: 100,
//     preferenceId: "169857175-d36d9ba9-b7e5-4491-a35c-fa7a2147a588",
//   };
//   const customization = {
//     paymentMethods: {
//       ticket: "all",
//       creditCard: "all",
//       debitCard: "all",
//       mercadoPago: "all",
//     },
//   };
//   const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
//     // callback llamado al hacer clic en el botón enviar datos
//     return new Promise((resolve, reject) => {
//       fetch("/process_payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((response) => response.json())
//         .then((response) => {
//           // recibir el resultado del pago
//           resolve();
//         })
//         .catch((error) => {
//           // manejar la respuesta de error al intentar crear el pago
//           reject();
//         });
//     });
//   };
//   const onError = async (error: any) => {
//     // callback llamado para todos los casos de error de Brick
//     console.log(error);
//   };
//   const onReady = async () => {
//     /*
//       Callback llamado cuando el Brick está listo.
//       Aquí puede ocultar cargamentos de su sitio, por ejemplo.
//     */
//   };

//   return (
//     <div>
//       <h1>HOLAAAAAAA</h1>
//       <Payment
//         initialization={initialization}
//         customization={customization}
//         onSubmit={onSubmit}
//         onReady={onReady}
//         locale="es"
//         onError={onError}
//       />
//     </div>
//   );
// }
