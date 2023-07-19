import Head from "next/head";

import { About, Featured, Landing, Navbar, Services } from "./components";

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KNWJJVW');
            `,
          }}
        />
        <link rel="icon" href="./favicon.ico" />
        <link
          rel="canonical"
          href="https://www.jotateclimatizacion.com/productos"
        />
        <title>Homeeee</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Navbar />
      <Landing />
      <About />
      <Services />
      <Featured />
    </>
  );
};

export default Home;
