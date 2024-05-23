import React from "react";
import Products from "../Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";

const Stock = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex flex-row">
        <Products/>
      </div>
    </div>
  );
};

export default Stock;
