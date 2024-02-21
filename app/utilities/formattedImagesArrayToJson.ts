export const formattedImagesArrayToJson = (
  uploadedImages: string[]
): string => {
  if (Array.isArray(uploadedImages)) {
    const formattedImages = `{${uploadedImages.join(",")}}`;
    return formattedImages;
  }
  return uploadedImages;
};

export const formattedJsonToImagesArray = (
  formattedImages: string | string[]
): string[] => {
  if (typeof formattedImages === "string") {
    const imagesArray = formattedImages
      .replace(/^\{|\}$/g, "") // Elimina las llaves al principio y al final
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url !== "" && url !== '""'); // Filtra las cadenas vacías y las cadenas que contienen solo comillas dobles

    return imagesArray;
  } else if (Array.isArray(formattedImages)) {
    // Si ya es un array, simplemente devuélvelo
    return formattedImages;
  }

  return [];
};
