import { Carrousel, carrouselDataInstallations } from "../Carrousel";

type Props = {};
export default function Installations({}: Props) {
  return (
    <section
      id="installations"
      className="flex flex-col justify-center gap-20 items-center min-h-[100vh]"
    >
      <div className="flex flex-col">
        <div className="text-5xl font-bold flex flex-wrap justify-center items-center gap-3">
          <p className="text-[#161616]">Nuestras</p>
          <p className="text-[#d18d3a]">instalaciones</p>
        </div>
      </div>
      <div className="flex justify-center w-screen container items-center p-2 md:p-0">
        <Carrousel
          dataImage={carrouselDataInstallations}
          className="h-[32rem] w-full object-cover"
        />
      </div>
    </section>
  );
}
