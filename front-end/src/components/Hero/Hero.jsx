// import React from "react";
import Image1 from "../../assets/hero/hero1.png";
import Image2 from "../../assets/hero/hero2.png";
import Image3 from "../../assets/hero/hero3.png";
import Image4 from "../../assets/hero/hero4.png";
import Image5 from "../../assets/hero/hero5.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Exprimez votre essence avec style",
    description:
      "Rejoignez la révolution de la mode africaine, où chaque tenue est une affirmation de votre unicité et de votre patrimoine.",
  },
  {
    id: 2,
    img: Image2,
    title: "Réinventez votre garde-robe avec audace",
    description:
      "Faites l’expérience de la transformation de la mode africaine, où tradition et modernité fusionnent pour créer des looks inoubliables.",
  },
  {
    id: 3,
    img: Image3,
    title: "L’art de la mode africaine à votre portée",
    description:
      "Embarquez pour une aventure de mode sans pareil, où chaque pièce raconte une histoire d’innovation et d’héritage africain",
  },
  {
    id: 4,
    img: Image5,
    title: "Voyagez à travers les tendances avec nous",
    description:
      "Embarquez pour une aventure de mode sans pareil, où chaque pièce raconte une histoire d’innovation et d’héritage africain.",
  },
  {
    id: 5,
    img: Image4,
    title: "Au carrefour de l’élégance africaine",
    description:
      "Là où chaque clic vous rapproche de la grandeur de la mode africaine, découvrez un monde où style et culture se rencontrent.",
  },
];

const Hero = () => {
  // const {addToCart, cartItemCount } = React.useContext(CartContext);
  // const cartItemCountValue = cartItemCount(codePro)
  
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                  >
                    {/* <button
                      className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                      onClick={() => addToCart(codePro, nomPro, prix, size1, size2, size1, image, "")}
                    >
                      Ajouter au panier {cartItemCountValue != 0 && <> ({cartItemCountValue})</>}
                    </button> */}
                  </div>
                </div>
                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className="relative z-10"
                  >
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
