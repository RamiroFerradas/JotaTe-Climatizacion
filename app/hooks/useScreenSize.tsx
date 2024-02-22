import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Ejecutar handleWidthChange inmediatamente para configurar isMobile
    handleWidthChange(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    setHeight(window.innerHeight);

    // Llamar a handleWidthChange con el nuevo ancho
    handleWidthChange(newWidth);
  };

  const handleWidthChange = (newWidth) => {
    setIsMobile(newWidth < 720);

    // Puedes realizar otras acciones basadas en el nuevo ancho aquí
  };

  return { width, height, isMobile };
};

export default useScreenSize;
