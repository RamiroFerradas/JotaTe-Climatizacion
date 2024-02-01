export function processImagesString(imageString: string): string[] {
  // Eliminar las llaves al principio y al final
  const cleanedString = imageString.slice(1, -1);

  // Separar la cadena utilizando la coma como delimitador
  const urlsArray = cleanedString.split(",");

  // Limpiar cada URL de posibles espacios adicionales
  const cleanedUrlsArray = urlsArray.map((url) => url.trim());

  return cleanedUrlsArray;
}
