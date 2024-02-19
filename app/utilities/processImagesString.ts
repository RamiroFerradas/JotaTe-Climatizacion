// export function processImagesString(imageString: string): string[] {
//   if (typeof imageString !== "string" || imageString.trim() === "") {
//     return [];
//   }

//   const cleanedString = imageString.slice(1, -1);
//   const urlsArray = cleanedString.split(",");
//   const cleanedUrlsArray = urlsArray
//     .map((url) => url.trim())
//     .filter((url) => url !== ""); // Filtra las cadenas vacías

//   return cleanedUrlsArray;
// }
