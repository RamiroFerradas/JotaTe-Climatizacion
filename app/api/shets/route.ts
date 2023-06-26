// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`\

import jsonData from "./client_secret_977080299899-dlngal16smd5fcdnnp31c9cdspq736tl.apps.googleusercontent.com (1).json";

import { NextRequest, NextResponse } from "next/server";
const { readFile } = require("fs/promises");

const { google } = require("googleapis");
const sheets = google.sheets("v4");

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const authClient = await authorize();
    const request = {
      // The ID of the spreadsheet to retrieve data from.
      spreadsheetId: "1JhscTIJdfFuyT8hGF3YIVpt37rBTi0U2RKMTaBsmDXw", // TODO: Update placeholder value.

      // The A1 notation of the values to retrieve.
      range: "test", // TODO: Update placeholder value.

      // How values should be represented in the output.
      // The default render option is ValueRenderOption.FORMATTED_VALUE.
      valueRenderOption: "FORMATTED_VALUE",

      // How dates, times, and durations should be represented in the output.
      // This is ignored if value_render_option is
      // FORMATTED_VALUE.
      // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
      dateTimeRenderOption: "FORMATTED_STRING",

      auth: authClient,
    };

    const response = (await sheets.spreadsheets.values.get(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
async function authorize() {
  const credentials = require("./client_secret_977080299899-dlngal16smd5fcdnnp31c9cdspq736tl.apps.googleusercontent.com (1).json");
  const { client_secret, client_id, redirect_uris } = credentials.web;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Sigue el flujo de autenticación
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // Requerido para obtener un token de actualización
    scope: [
      "https://www.googleapis.com/auth/spreadsheets",
      // Agrega cualquier otro alcance requerido para tu aplicación
    ],
  });

  console.log("Autoriza esta aplicación visitando esta URL:", authUrl);

  // Después de autorizar la aplicación, serás redirigido a la URL de redireccionamiento con un código de autorización
  // Obtén el código de autorización y reemplaza 'TU_CODIGO_DE_AUTORIZACION' con él
  // const code = "TU_CODIGO_DE_AUTORIZACION";
  const code =
    "4/0AbUR2VNC6nT4aLA70PDs0_qH868JFYavANaflgosckGFOVjLGS0AEFxUZZnOPzpQ2wXAHg";

  // Intercambia el código de autorización por un token de acceso y un token de actualización
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  return oAuth2Client;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const authClient = await authorize();
  const request = {
    // ID de la hoja de cálculo en la que deseas escribir los datos
    spreadsheetId: "1JhscTIJdfFuyT8hGF3YIVpt37rBTi0U2RKMTaBsmDXw",
    // El rango en el que deseas escribir los datos, por ejemplo, 'Sheet1!A1:B2'
    range: "", // Reemplaza con el rango deseado

    // Los valores que deseas escribir en las celdas
    resource: {
      values: [
        ["Valor 1", "Valor 2"],
        ["Valor 3", "Valor 4"],
      ],
    },

    // La forma en que los valores se representarán en la salida (opcional)
    valueInputOption: "RAW", // Puedes utilizar 'RAW' para ingresar los valores directamente o 'USER_ENTERED' para aplicar formato a los valores

    auth: authClient,
  };

  try {
    const response = await sheets.spreadsheets.values.update(request);
    console.log("Datos escritos en la hoja de cálculo:");
    console.log(response.data);
  } catch (err) {
    console.error("Error al escribir los datos en la hoja de cálculo:", err);
  }
}
