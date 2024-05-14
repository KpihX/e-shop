import { useState, useEffect } from 'react';
import { Alert as AlertDefault} from "@material-tailwind/react";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function Icon({ type }) {
  return type === 1 ? <FaCheckCircle className="h-6 w-6" /> : <FaExclamationCircle className="h-6 w-6" />;
}

export default function Alert({ children, type = 0 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const alertClasses = type === 1
    ? "rounded-none border-l-4 border-green-500 bg-green-500/10 font-medium text-green-500"
    : "rounded-none border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500";

  return show ? (
    <div className='py-2 text-center'>
    <AlertDefault
      icon={<Icon type={type} />}
      className={alertClasses}
    >
      &nbsp;{children}
    </AlertDefault>
    </div>
  ) : null;
}
