export const settings = {
  dots: false,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  draggable: true,
  useCSS: true,
  slickPlay: true,
  className: "center",
  centerMode: true,
  centerPadding: "60px",

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
