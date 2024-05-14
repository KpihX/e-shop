import React from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Function to detect scroll position and set state accordingly
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrolled > 500) { // The number 300 is when the button shows up
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 z-30 cursor-pointer text-4xl text-primary  rounded-full shadow-lg hover:scale-110 transition ease-in duration-200"
        >
          <FaArrowCircleUp />
        </button>
      )}
    </div>
  );
};

export default ScrollTopButton;