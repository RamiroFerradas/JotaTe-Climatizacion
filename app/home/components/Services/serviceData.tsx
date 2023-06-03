import { MdPool } from "react-icons/md";
import { GiThermometerCold } from "react-icons/gi";
import termo from "../../../../public/Icons/termotanque.png";
import Image from "next/image";

export interface Service {
  title: string;
  description: string;
  img: JSX.Element;
}
const hotWeatherTank = (
  <Image
    className="m-3"
    height={128}
    width={128}
    src={termo}
    alt="termotanque solar"
  />
);

export const servicesData: Service[] = [
  {
    title: "Termotanques solares",
    description:
      "Venta, instalación y mantenimiento de sistemas de termotanques solares. Aproveche la energía solar para calentar agua de forma eficiente y sostenible.",
    img: hotWeatherTank,
  },
  {
    title: "Piscinas",
    description:
      "Climatización y mantenimiento de piscinas. Disfrute de su piscina en cualquier temporada y mantenga el agua en condiciones ideales con nuestros servicios especializados.",
    img: <MdPool />,
  },
  {
    title: "Aires Acondicionados",
    description:
      "Instalación de aires acondicionados. Mantenga su hogar u oficina frescos y cómodos durante los meses de calor con nuestros sistemas de aire acondicionado eficientes y de alta calidad.",
    img: <GiThermometerCold />,
  },
];
