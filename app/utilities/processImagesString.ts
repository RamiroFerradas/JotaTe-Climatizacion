export function processImagesString(imageString: string): string[] {
  if (typeof imageString !== "string") {
    return imageString;
  }

  const cleanedString = imageString.slice(1, -1);

  const urlsArray = cleanedString.split(",");

  const cleanedUrlsArray = urlsArray.map((url) => url.trim());

  return cleanedUrlsArray;
}
