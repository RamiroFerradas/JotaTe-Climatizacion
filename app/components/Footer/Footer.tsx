export type FooterProps = {};
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

const Footer: React.FC<FooterProps> = () => {
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;
  return (
    <section id="footer">
      <div
        className={`flex item-center justify-center text-white bg-[#6b6b6b] text-5xl py-8 gap-5`}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/jotate.climatizacion/"
          className="text-[#dbd8d8] hover:text-[#d6249f]"
        >
          <BsInstagram />
        </a>

        <a
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${phone}`}
          rel="noreferrer"
          className="text-[#dbd8d8] hover:text-[#00bb2d]"
        >
          <BsWhatsapp />
        </a>

        <a
          href="tel:+5493492410583"
          target="_blank"
          rel="noreferrer"
          className="text-[#dbd8d8] hover:text-red-500"
        >
          <BiPhoneCall />
        </a>
        <a
          href="mailto:cuenta@deemail.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#dbd8d8] hover:text-[#f2a60c]"
        >
          <BiMailSend />
        </a>
        <a
          href="https://goo.gl/maps/XycV1fvGLQwo2VWVA"
          target="_blank"
          rel="noreferrer"
          className="text-[#dbd8d8] hover:text-[#4285f4]"
        >
          <GoLocation />
        </a>
      </div>
      <div
        className={`flex flex-col justify-center items-center text-white bg-[#212121] py-5`}
      >
        <p className="text-[#dbd8d8] ml-4">
          Horario de atención: Lunes a viernes de 8:30 AM a 12:00 PM y de 4:00
          PM a 8:00 PM, sábados de 9:00 AM a 1:00 PM.
        </p>

        <p>
          {`© Derechos de autor Jotaté Climatización. Todos los derechos reservados. Diseñado y desarrollado por `}
          <a
            href="https://www.ramiroferradas.com.ar/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 font-semibold"
          >
            Ramiro Ferradas
          </a>
        </p>
      </div>
    </section>
  );
};

export default Footer;
