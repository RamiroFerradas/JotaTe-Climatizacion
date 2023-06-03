import frente_local from "../../../../public/trabajos/IMG-20221213-WA0003.jpg";
import termotanque_solar from "../../../../public/trabajos/IMG-20221213-WA0005.jpg";
import jorge from "../../../../public/trabajos/IMG-20221213-WA0006.jpg";
import termotanque_solar_2 from "../../../../public/trabajos/IMG-20221213-WA0008.jpg";
import panel_solar from "../../../../public/trabajos/IMG-20221213-WA0009.jpg";
import { StaticImageData } from "next/image";

export interface Carrousel {
  src: StaticImageData;
  alt: string;
}

export const carrouselData: Carrousel[] = [
  { src: frente_local, alt: "frente local" },
  { src: termotanque_solar, alt: "termotanque solar" },
  { src: jorge, alt: "jorge" },
  { src: termotanque_solar_2, alt: "termotanque solar" },
  { src: panel_solar, alt: "panel solar" },
];
