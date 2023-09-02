export type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  return (
    <section className="min-h-[80vh] md:hscreen" id="about">
      <div className="flex items-center justify-center p-4 flex-col md:flex-row bg-[#d3a16592] min-h-[60vh]">
        <div className="md:w-1/2 flex flex-col justify-center items-center">
          <div className="text-5xl font-bold">
            <p className="text-[#161616]">Sobre</p>
            <p className="text-[#d18d3a]"> nosotros</p>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center items-center p-10 md:p-20 text-xl leading-7">
          <p>
            Somos una empresa familiar joven que inició en el sector de
            climatización. Con el paso del tiempo, hemos logrado expandirnos
            hacia nuevos horizontes y ampliar nuestra presencia en diferentes
            sectores de la industria. Gracias a nuestro arduo trabajo en los
            últimos años, hemos logrado abrir nuestra primera sucursal en la
            ciudad de Rafaela, Santa Fe. Esta expansión nos ha permitido ofrecer
            una amplia gama de servicios y productos para nuestros clientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
