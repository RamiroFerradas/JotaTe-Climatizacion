export const formattedImagesArrayToJson = (
  uploadedImages: string[]
): string => {
  if (Array.isArray(uploadedImages)) {
    const formattedImages = `{${uploadedImages.join(",")}}`;
    return formattedImages;
  }
  return uploadedImages;
};
