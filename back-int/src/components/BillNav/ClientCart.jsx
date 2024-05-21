import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../axiosClient";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../utils/context/CartContext"
import { ClientContext } from "../../utils/context/ClientContext";
import Dropdown from "../Dropdown/Dropdown";
import CartItem from "../CartItem/CartItem";
import { IoMdSearch } from "react-icons/io";
import { Input } from "@material-tailwind/react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ClientCart = ({ clientCart, setClientCart, clientPopup, setClientPopup, typeOper }) => {
  const [currentSearchValue, setCurrentSearchValue] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleValidation = () => {
    setClientPopup(!clientPopup);
  }

  useEffect(() => {
    if (typeOper == "search") {
      searchClientCart()
    } else if (typeOper == "edit") {
      saveClientCart()
    } else if (typeOper == "add") {
      addClientCart()
    }
  }, [currentSearchValue])

  const addClientCart = () => {
    
    setLoading(true)
    axiosClient.post(`/admin/clientcarte`, clientCart)
      .then(response => {
        let data = response.data.data
        // console.log("data: ", data)
        setClientCart(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la sauvegarde de la carte du client: ", error);
        setLoading(false)
      });
  };

  const saveClientCart = () => {
    
    setLoading(true)
    axiosClient.post(`/admin/clientcarte/${clientCart.idCarte}`, clientCart)
      .then(response => {
        let data = response.data.data
        // console.log("data: ", data)
        setClientCart(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la sauvegarde de la carte du client: ", error);
        setLoading(false)
      });
  };

  const searchClientCart = () => {
    
    setLoading(true)
    axiosClient.post(`/clientcarte/search/${currentSearchValue}`)
      .then(response => {
        let data = response.data.data
        // console.log("data: ", data)
        setClientCart(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la recherche de la carte du client: ", error);
        setLoading(false)
      });
  };

  // alert("Hi")
  return (
    <>
      
      <Dialog open={clientPopup} handler={handleValidation}>
        <DialogHeader className="flex items-center justify-between">
          Gestion de la carte du client
          <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      setClientPopup(false)
                    }}
                  />
          </div>
        </DialogHeader>
        <DialogBody>
        {typeOper == "add" || typeOper == "edit" ? (
        <>
        <Input color="blue" label="Nom" value={clientCart.nom} onChange={(e) => setClientCart({...clientCart, nom: e.target.value})}/>
        <Input color="blue" label="Sexe" value={clientCart.sexe} onChange={(e) => setClientCart({...clientCart, sexe: e.target.value})}/>
        <Input color="blue" label="Date de naissance" value={clientCart.dateNaiss} onChange={(e) => setClientCart({...clientCart, dateNaiss: e.target.value})}/>
        <Input color="blue" label="Ville" value={clientCart.idVille} onChange={(e) => setClientCart({...clientCart, idVille: e.target.value})}/>
        <Input color="blue" label="Mobile" value={clientCart.mobile} onChange={(e) => setClientCart({...clientCart, mobile: e.target.value})}/>
        <Input color="blue" label="Whatsapp" value={clientCart.whatsapp} onChange={(e) => setClientCart({...clientCart, whatsapp: e.target.value})}/>
        <Input color="blue" label="Tontine" value={clientCart.montantTontine} onChange={(e) => setClientCart({...clientCart, montantTontine: e.target.value})}/>
        </>
      ) : (
      <>
      {typeOper == "search" ? (
        <div>
        <div className="relative group flex justify-center pl-2 pt-3 gap-2">
                <div className="relative group block">
                  <input
                    type="text"
                    placeholder="Recherchez vos le numéro de téléphone"
                    value={currentSearchValue}
                    onChange={(e) => setCurrentSearchValue(e.target.value)}
                    className="w-[250px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                  />
                  <IoMdSearch 
                    className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" 
                    onClick={() => setCurrentSearchValue(currentSearchValue)}
                  />
                  
                </div>
        </div>
        <button>
          Résultat: {clientCart.idCarte ? "Carte client de M/Mme" + clientCart.nom : "Aucun résultat trouvé"}
        </button>
        </div>
      ) : null}
      </>)}
      </DialogBody>
        <DialogFooter className=" justify-center">
          <Button 
            variant="gradient" 
            className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-4 px-4 rounded-full" 
            // color="green" 
            onClick={handleValidation}>
            <span>Valider</span>
          </Button>
        </DialogFooter>
      </Dialog>
      
    </>
  );
};

export default ClientCart;
