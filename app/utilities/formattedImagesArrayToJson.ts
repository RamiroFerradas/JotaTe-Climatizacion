export const formattedImagesArrayToJson = (
  uploadedImages: string[]
): string => {
  const formattedImages = `{${uploadedImages.join(",")}}`;
  return formattedImages;
};
