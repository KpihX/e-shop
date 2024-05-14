import { ImSpinner2 } from 'react-icons/im'; // Vous pouvez choisir une autre icône de rotation

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner2 className="my-3 animate-spin text-4xl text-primary" />
    </div>
  );
};

export default Loader;