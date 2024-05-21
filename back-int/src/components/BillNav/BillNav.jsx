import React from 'react';
import { CartContext } from '../../utils/context/CartContext';
import {
  // MagnifyingGlassIcon,
  // ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { IoMdSearch } from "react-icons/io";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  // Input,
  Typography,
  CardBody,
  // CardFooter,
  // Tabs,
  // TabsHeader,
  // Tab,
  // Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import ProductPopup from '../Product/ProductPopup';
import { Input } from "@material-tailwind/react";
import ClientCart from './ClientCart';

const TABLE_HEAD = ["Libelle", "Prix (FCFA)", "Quantite", "Actions"];

const BillNav = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const { cartItems, getTotalCartAmount, checkout, updateCartItemCount } = React.useContext(CartContext)
  // const [currentProduct, setCurrentProduct] = React.useState(null)
  const totalAmount = getTotalCartAmount();
  const [popups, setPopups] = React.useState(Array(cartItems.length).fill(false));
  const [codePro, setCodePro] = React.useState("");
  // const codeProRef = React.useRef()
  const [tva, setTva] =  React.useState("19.25");
  // const tvaRef = React.useRef()
  const [remise, setRemise] =  React.useState(0);
  // const remiseRef = React.useRef()
  const [clientCart, setClientCart] = React.useState({
    matr: null,
    nom: null,
    sexe: null,
    dateNaiss: null,
    ville: null,
    mobile: null,
    whatsapp: null,
    point: null,
    montantTontine: null
  });
  const [clientPopup, setClientPopup] = React.useState(false);

  function isFloat(str) {
    const num = parseFloat(str, 10);
    // console.log(num)
    return !isNaN(num) && str === num.toString();
  }

  const handleTvaChange = (e) => {
    const value = e.target.value
    if (isFloat(value) && parseFloat(value) >= 0) {
      setTva(value)
      // alert(value)
    } else if (value == "") {
      setTva("0")
    } else {
      alert('Veuillez saisir un entier positif pour la TVA!');
    }
  }

  // Appelé lorsque l'utilisateur quitte l'input ou appuie sur Entrée
  const handleTvaBlurOrEnter = (e) => {
    
    let value = e.target.value
    // alert("Value: " + value)
    if (value == "") {
      value = "0"
    } else if (!isFloat(value) || parseFloat(value) < 0) {
      alert('Veuillez saisir un entier positif pour la quantité!')
      return
    }
    
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      const newValue = Number(value) || 0;
      
      setTva(newValue.toString()); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
      // console.log(inputValue)
    }
    
  };

  const handleRemiseChange = (e) => {
    const value = e.target.value
    if (isFloat(value) && parseFloat(value) >= 0) {
      setRemise(value)
      // alert(value)
    } else if (value == "") {
      setRemise("0")
    } else {
      alert('Veuillez saisir un entier positif pour la TVA!');
    }
  }

  // Appelé lorsque l'utilisateur quitte l'input ou appuie sur Entrée
  const handleRemiseBlurOrEnter = (e) => {
    
    let value = e.target.value
    // alert("Value: " + value)
    if (value == "") {
      value = "0"
    } else if (!isFloat(value) || parseFloat(value) < 0) {
      alert('Veuillez saisir un entier positif pour la quantité!')
      return
    }
    
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      const newValue = Number(value) || 0;
      
      setRemise(newValue.toString()); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
      // console.log(inputValue)
    }
    
  };
  
  const handleCodeProChange = (e) => {
    setCodePro(e.target.value);
  };

  // React.useEffect(() => {
  //   if (!currentProduct) {
  //     setPopup(false)
  //   }
  // }, [currentProduct])

  const setPopupAtIndex = (index, value) => {
    setPopups(currentPopups => {
      const newPopups = [...currentPopups];
      newPopups[index] = value;
      return newPopups;
    });
  };
    
    console.log("*", cartItems)
    return (
       <div className=" bg-orange-200 min-w-fit min-h-lvh shadow-md p-4 text-center" style={{ overflowY: 'auto' }}>
           <h1 className="text-4xl font-bold mb-4">Facture</h1>
           {cartItems.length !== 0 ? (
           <Card className=" w-full overflow-scroll">
            
              <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th
                          key={head}
                          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                          >
                            {head}{" "}
                            {/* {index !== TABLE_HEAD.length - 1 && (
                              <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                            )} */}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  {
                  <tbody>
                    {cartItems
                    .map(
                      (product, index) => {
                        const isLast = index === cartItems.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";
        
                        return (
                          <tr key={product.codePro}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {product.nomPro}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {product.prix}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {product.quantite}
                              </Typography>
                            </td>
                            
                            <td className={`${classes} flex gap-10`}>
                              <Tooltip content="Editer"  className="bg-blue-500">
                                <IconButton variant="text" className="bg-blue-100" onClick={() => {setPopupAtIndex(index, true)}}>
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Supprimer" className="bg-red-500">
                                <IconButton variant="text" className="bg-red-100" onClick={() => updateCartItemCount(0, product.codePro)}>
                                  <TrashIcon className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                                </IconButton>
                              </Tooltip>
                            </td>
                            { popups[index] &&
                              <ProductPopup 
                                orderPopup={popups[index]} 
                                setOrderPopup={(value) => setPopupAtIndex(index, value)} 
                                codePro={product.codePro}
                                nomPro={product.nomPro}
                                prix={product.prix}
                                quantite={product.quantite}
                                size1={product.size1}
                                size2={product.size2}
                                image={product.image}
                              />
                            }
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                }
                </table>
              </CardBody>
            </Card> ) : null}
              
          {totalAmount > 0 ? (
            <div className="flex-row">
              <div className="pt-2 flex flex-col gap-6 justify-center">
                <Input color="blue" label="Code promo" value={codePro} onChange={handleCodeProChange}/>
                <Input color="blue" label="Remise (en %)" value={remise} onChange={handleRemiseChange} onBlur={handleRemiseBlurOrEnter} onKeyDown={handleRemiseBlurOrEnter}/>
                <Input color="blue" label="TVA (en %)" value={tva} onChange={handleTvaChange} onBlur={handleTvaBlurOrEnter} onKeyDown={handleTvaBlurOrEnter}/>
              </div>
              <div>
                <h1>Carte Client</h1>
                {clientCart.matr == null ? (
                  <div>
                    <Tooltip content="Ajouter"  className="bg-green-500">
                                    <IconButton variant="text" className="bg-green-100" onClick={() => {setClientPopup(true)}}>
                                      <PlusIcon className="h-4 w-4" />
                                    </IconButton>
                    </Tooltip>
                    <Tooltip content="Rechercher" className="bg-gray-500">
                                    <IconButton variant="text" className="bg-gray-100" onClick={() => {setClientPopup(true)}}>
                                      <IoMdSearch className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                                    </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div>
                  <p>Carte de M/Mme {clientCart.nom}</p>
                  <Tooltip content="Editer"  className="bg-blue-500">
                                  <IconButton variant="text" className="bg-blue-100" onClick={() => {setClientPopup(true)}}>
                                    <PencilIcon className="h-4 w-4" />
                                  </IconButton>
                  </Tooltip>
                  <Tooltip content="Supprimer" className="bg-red-500">
                                  <IconButton variant="text" className="bg-red-100" onClick={() => {setClientPopup(true)}}>
                                    <TrashIcon className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                                  </IconButton>
                  </Tooltip>
                  <ClientCart
                    clientCart={clientCart}
                    clientPopup={clientPopup}
                    setClientPopup={(value) => setClientPopup(value)}
                  />
                </div>
                )}
                
              </div>
              <h1 className="mx-10 flex flex-row text-2xl justify-center bg-primary hover:scale-105 duration-300 text-white py-4 px-4 rounded-full mt-10 group-hover:bg-white group-hover:text-primary">
                <p className="font-bold">Total :&nbsp;&nbsp;</p> {totalAmount} FCFA
              </h1>
              <div className="mt-10 mx-10 grid grid-rows-1 place-items-center">
                <button
                  className="w-full text-center border border-primary dark:border-white dark:text-white dark:bg-gray-800 bg-white hover:scale-105 duration-300 text-primary py-2 px-4 rounded-full mb-10"
                  onClick={() => {
                    checkout()
                  }}
                >
                  Vider votre panier
                </button>
                <button
                  className="w-full border border-primary dark:border-white dark:text-white dark:bg-gray-800 bg-white hover:scale-105 duration-300 text-primary py-2 px-4 rounded-full mb-10 "
                  onClick={() => {setOrderPopup(true)}}
                >
                  Facturer
                </button>
              </div>
            </div>
          ) : (
            <h1 className="py-10 text-xl text-center font-bold"> 
              Le panier est vide!
            </h1>
          )}
       </div>
    );
};

export default BillNav;