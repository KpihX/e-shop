import React from 'react';
import Home from './pages/Home/Home';
import AOS from "aos";
import "aos/dist/aos.css";
function AppLayout() {
   
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
    <>
    <Home/>
    </>
  );
}

export default AppLayout;