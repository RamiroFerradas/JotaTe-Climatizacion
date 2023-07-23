export const formattedText = (text: string): string[] => {
  const textformatted = text
    .replace(/(\\|\((.*?)\))/g, (match, p1, p2) => {
      if (p1 === "\\") return p2; // Conservar el "\" como parte del texto
      if (p2) return `(${p2})`; // Conservar el contenido dentro de paréntesis
      return "\n"; // Reemplazar cualquier otro caso con un salto de línea
    })
    .split("\n");

  return textformatted;
};
