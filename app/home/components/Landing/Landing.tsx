import { Carrousel } from "../Carrousel";

export type LandingProps = {};

const Landing: React.FC<LandingProps> = () => {
  return (
    <section
      id="home"
      className="flex justify-center items-center min-h-[100vh] pt-28 md:pt-0 p-4"
    >
      <div className="container flex justify-center  md:p-4 md:gap-5 gap-3 flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:gap-2 gap-10 flex flex-col">
          <p className="md:text-7xl text-4xl">Climatización Ecológica</p>
          <p>
            Nos dedicamos a la venta e instalación de termotanques solares,
            estufas a pellets, parrilleros, salamandras a leña, entre otros...
          </p>

          <a
            className="border-2 border-[#d3a265] rounded-lg uppercase px-5 text-sm transition-all hover:bg-[#d3a165b8] flex items-center h-12 w-40 text-center justify-center"
            href="#about"
          >
            Conoce mas
          </a>
        </div>
        <div className="md:w-1/2 p-1 flex items-center justify-center relative">
          <Carrousel />
        </div>
      </div>
    </section>
  );
};

export default Landing;
