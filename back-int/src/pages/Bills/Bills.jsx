import React from "react";
import Products from "../../components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import BillNav from "../../components/BillNav/BillNav";

const Bills = () => {
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
        <BillNav className="flex-auto"/>
        <Products/>
      </div>
    </div>
  );
};

export default Bills;
