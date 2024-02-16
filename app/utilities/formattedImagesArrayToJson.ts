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
  formattedImages: string
): string[] => {
  if (typeof formattedImages === "string") {
    const imagesArray = formattedImages
      .replace(/^\{|\}$/g, "") // Elimina las llaves al principio y al final
      .split(",")
      .map((url) => url.trim());

    return imagesArray;
  }
  return [];
};

