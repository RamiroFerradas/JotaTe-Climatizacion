import React from "react";
import Head from "next/head";

const Seo = ({ id, title, description, img }) => {
  const url = id
    ? `https://www.jotateclimatizacion.com/productos/${id}`
    : "https://www.jotateclimatizacion.com/";
  const _title = title ? title : "Jotate Climatizacion";
  const _description = description
    ? description.toLowerCase()
    : "Quedate en casa! tu compra te llega a tu hogar";
  const image = img
    ? img
    : "https://www.jotateclimatizacion.com/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté símbolo1.png";
  const imagetype = img ? "image/webp" : "image/png";

  return (
    <Head>
      <title>
        {title ? `Jotate Climatizacion - ${title}` : "Jotate Climatizacion"}
      </title>
      <meta name="description" content="Climatizacion ecologica" key="desc" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        href="/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté símbolo1.png"
      />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:image" itemProp="image" content={image} />
      <link itemProp="thumbnailUrl" href={image} />
      <meta property="og:image:type" content={imagetype} />
    </Head>
  );
};

export default Seo;
