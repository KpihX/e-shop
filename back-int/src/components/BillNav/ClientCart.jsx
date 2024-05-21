import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../axiosClient";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../utils/context/CartContext"
import { ClientContext } from "../../utils/context/ClientContext";
import Dropdown from "../Dropdown/Dropdown";
import CartItem from "../CartItem/CartItem";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ClientCart = ({ clientCart, clientPopup, setClientPopup }) => {
  
  const handleValidation = () => {
    setClientPopup(!clientPopup);
  }

  return (
    <>
      <Dialog open={clientPopup} handler={handleValidation}>
        <DialogHeader className="flex items-center justify-between">
          Personnalisation
          <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      setClientPopup(clientPopup)
                    }}
                  />
          </div>
        </DialogHeader>
        <DialogBody>
          {/* <CartItem
                  key={codePro} 
                  codePro={codePro} 
                  nomPro={nomPro}
                  prix={prix}
                  quantite={quantite}
                  size1={size1}
                  size2={size2}
                  image={image}
          /> */}
        </DialogBody>
        <DialogFooter className=" justify-center">
          <Button 
            variant="gradient" 
            className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-4 px-4 rounded-full" 
            // color="green" 
            onClick={handleValidation}>
            <span>Confirmer</span>
          </Button>
        </DialogFooter>
      </Dialog>
      
    </>
  );
};

export default ClientCart;
