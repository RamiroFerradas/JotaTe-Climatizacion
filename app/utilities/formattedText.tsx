export const formattedText = (text: string): string[] => {
  const textformatted = text
    ?.replace(/mm/g, " mm\n")
    ?.replace(/cm/g, " cm\n")
    ?.replace(/kg/g, " kg\n")
    ?.replace(/m²/g, " m²\n")
    ?.split("\n");
  return textformatted;
};
