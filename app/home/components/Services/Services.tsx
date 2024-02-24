"use client";
import { Service, servicesData } from "./serviceData";

export type ServicesProps = {};

const Services: React.FC<ServicesProps> = () => {
  return (
    <section
      id="services"
      className="flex flex-col justify-around items-center min-h-[100vh]"
    >
      <div className="flex flex-col">
        <div className="text-5xl font-bold flex flex-wrap justify-center items-center gap-3">
          <p className="text-[#161616]">Nuestros</p>
          <p className="text-[#d18d3a]">servicios</p>
        </div>
      </div>
      <div className="flex items-stretch justify-center w-screen container flex-wrap md:flex-nowrap">
        {servicesData?.map((e: Service, index) => {
          return (
            <div
              key={index}
              className="p-10 gap-3 flex flex-col justify-center items-center md:w-1/3"
            >
              <p className="text-9xl text-[#d18d3a]">{e.img}</p>
              <p className="uppercase font-semibold text-lg">{e.title}</p>
              <p className="flex-grow text-center">{e.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
