import React from 'react';
import { FaCaretDown } from "react-icons/fa";

const Dropdown = ({ options, onSelect, firstOption }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	// console.log("**firstOption: ", firstOptionw ? firstOption : options[0])
	const [selectedOption, setSelectedOption] = React.useState(firstOption ? firstOption : options[0]);
	const menuRef = React.useRef();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsMenuOpen(false);
  };

	// Event handler to close the menu if clicked outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

	// console.log("****firstOption: ", selectedOption)

  return (
    <div className="relative cursor-pointer px-2 py-1">
          {/* Menu button for smaller screens */}
          <button className="flex items-center gap-[2px] " onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {selectedOption.label}
            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
          </button>
          {isMenuOpen &&
          <ul ref={menuRef} className="flex-col items-center absolute z-[9999] group-hover:block t-1 max-h-60 w-full overflow-auto rounded-md bg-white text-black shadow-md dark:bg-gray-900 dark:text-white">
            {options.map((option) => (
              <li 
                className={`px-4 hover:bg-primary/20 block transition-all duration-200 ${selectedOption.value === option.value ? 'text-primary' : ''}`}
                key={option.value} 
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
					}
		</div>
  )
}

// Usage
// const options = [
//   { value: 'name', label: 'Nom' },
//   { value: 'id', label: 'Id' },
// ];

// In your component
{/* <Dropdown
  options={options}
  onSelect={(option) => console.log(option)}
/> */}

export default Dropdown