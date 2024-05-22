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
import Dropdown from '../Dropdown/Dropdown';
import axiosClient from '../../axiosClient';
import { useGestionnaireContext } from '../../utils/context/GestionnaireContext.jsx'

const TABLE_HEAD = ["Libelle", "Prix (FCFA)", "Quantite", "Actions"];

const options = [
  { value: 'yes', label: 'Oui' },
  { value: 'no', label: 'Non' }
];

const BillNav = () => {
 
  const { cartItems, getTotalCartAmount, checkout, updateCartItemCount } = React.useContext(CartContext)
  // const [currentProduct, setCurrentProduct] = React.useState(null)
  const totalAmount = getTotalCartAmount();
  const [popups, setPopups] = React.useState(Array(cartItems.length).fill(false));
  const [codePro, setCodePro] = React.useState("");
  // const codeProRef = React.useRef()
  const [tva, setTva] =  React.useState("19.25");
  // const tvaRef = React.useRef()
  const [remise, setRemise] =  React.useState("0");
  const [tel, setTel] =  React.useState("");
  const [useTontine, setUseTontine] = React.useState(options[1]);
  // const remiseRef = React.useRef()
  const [clientCart, setClientCart] = React.useState({
    idCarte: null,
    nom: null,
    sexe: null,
    dateNaiss: null,
    idVille: null,
    mobile: null,
    whatsapp: null,
    creation: null,
    point: null,
    montantTontine: null
  });
  const { gestionnaire } = useGestionnaireContext()
  const [typeOper, setTypeOper] = React.useState("add")
  const [clientPopup, setClientPopup] = React.useState(true);
  const [realAmount, setRealAmount] = React.useState(totalAmount * (1 - (parseFloat(remise) + parseFloat(tva)) / 100))
  const [isLoading, setLoading] = React.useState(false)
  const [endCommand, setEndCommand] = React.useState(false)
  

  const changeAmounts = () => {
    const newAmount = totalAmount * (1 - (parseFloat(remise) + parseFloat(tva)) / 100)
    if (!clientCart.montantTontine) {
      return
    }
    if (useTontine) {
      const diff = newAmount - clientCart.montantTontine
      setRealAmount(Math.max(diff, 0))
      if (diff > 0) {
        setClientCart({
          ...clientCart, montantTontine: 0
        })
      } else {
        setClientCart({
          ...clientCart, montantTontine: Math.abs(diff)
        })
      }
    }
  }

  React.useEffect(() => { 
    changeAmounts()
  }, [totalAmount, clientCart.montantTontine, tva, remise])

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

  const handleTelChange = (e) => {
    if (!clientCart.idCarte) {
      setTel(e.target.value);
    } else {
      setTel(clientCart.mobile);
    }
    
  };
  

  const setPopupAtIndex = (index, value) => {
    setPopups(currentPopups => {
      const newPopups = [...currentPopups];
      newPopups[index] = value;
      return newPopups;
    });
  };


  const deleteCart = () => {
    if (!window.confirm("Êtes vous sûr de vouloir supprimer cet utilisateur ?")) {
      return
    }
    setLoading(true)
    axiosClient.delete(`/admin/clientcarte/${clientCart.idCarte}`, )
      .then(() => {
        setClientCart({
          idCarte: null,
          nom: null,
          sexe: null,
          dateNaiss: null,
          idVille: null,
          mobile: null,
          whatsapp: null,
          creation: null,
          point: null,
          montantTontine: null
        })
      })
      .catch(error => {
        console.error("Erreur lors de la sauvegarde de la carte du client: ", error);
        setLoading(false)
      });
  };
    

  const handleValidation = () => {
    setLoading(true);
    setEndCommand(false)

    // setClientInfos(JSON.stringify(client));
    // setClientInfos({
    //   nomClient: nomClient,
    //   mobile: mobile,
    //   adresse: adresse,
    //   selectedVille: selectedVille
    // })
    
    const lignes = cartItems.map(({codePro, quantite, size, color, prix}) => {
      return {
        "codePro": codePro,
        "qte": quantite,
        "prix": prix * quantite,
        // "taille": size,
        // "couleur": color
      };
    });
    // const montant = getTotalCartAmount();
    // console.log(client);
    console.log(lignes);
    // console.log(montant);

    if (clientCart.idCarte) {
      axiosClient.post(`/admin/facture/create-with-carte/${clientCart.idCarte}`, {
        // 'dateFac': clientCart.idCarte,
        'remise': remise,
        'montant': realAmount,
        'tel': clientCart.mobile,
        'typeFac': 0,
        'capital': 0,
        'idCaissiere': gestionnaire.idGest,
        'tva': tva,
        'lignes': lignes,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setEndCommand(true)
        alert("Votre facture a bien été enregistrée!");
      })
      .catch(error => {
        alert(error.response.data.message); // Assurez-vous que le message d'erreur est bien dans error.response.data.message
        console.error(error.response);
        setLoading(false);
      });
    } else {
      axiosClient.post(`/admin/facture/create-with-no-carte`, {
        'dateFac': new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        'remise': remise,
        'montant': realAmount,
        'tel': tel,
        'typeFac': 0,
        'capital': 0,
        'idCaissiere': gestionnaire.idGest,
        'tva': tva,
        'lignes': lignes,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setEndCommand(true)
        alert("Votre facture a bien été enregistrée!");
      })
      .catch(error => {
        alert(error.response.data.message); // Assurez-vous que le message d'erreur est bien dans error.response.data.message
        console.error(error.response);
        setLoading(false);
      });
    }
  
    
  }
    
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
                {!clientCart.idCarte && <Input color="blue" label="Téléphone" value={tel} onChange={handleTelChange}/>}
                <Input color="blue" label="Code promo" value={codePro} onChange={handleCodeProChange}/>
                <Input color="blue" label="Remise (en %)" value={remise} onChange={handleRemiseChange} onBlur={handleRemiseBlurOrEnter} onKeyDown={handleRemiseBlurOrEnter}/>
                <Input color="blue" label="TVA (en %)" value={tva} onChange={handleTvaChange} onBlur={handleTvaBlurOrEnter} onKeyDown={handleTvaBlurOrEnter}/>
              </div>
              <div>
                <h1>Carte Client</h1>
                {clientCart.idCarte == null ? (
                  <div>
                    <Tooltip content="Ajouter"  className="bg-green-500">
                                    <IconButton variant="text" className="bg-green-100" onClick={() => {setClientPopup(true); setTypeOper("add")}}>
                                      <PlusIcon className="h-4 w-4" />
                                    </IconButton>
                    </Tooltip>
                    <Tooltip content="Rechercher" className="bg-gray-500">
                                    <IconButton variant="text" className="bg-gray-100" onClick={() => {setClientPopup(true); setTypeOper("search")}}>
                                      <IoMdSearch className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                                    </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div>
                  <p>Carte de M/Mme {clientCart.nom}</p>
                  <Tooltip content="Editer"  className="bg-blue-500">
                                  <IconButton variant="text" className="bg-blue-100" onClick={() => {setClientPopup(true); setTypeOper("edit")}}>
                                    <PencilIcon className="h-4 w-4" />
                                  </IconButton>
                  </Tooltip>
                  <Tooltip content="Supprimer" className="bg-red-500">
                                  <IconButton variant="text" className="bg-red-100" onClick={deleteCart()}>
                                    <TrashIcon className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                                  </IconButton>
                  </Tooltip>
                </div>
                )}
                
              </div>
              <ClientCart
                    clientCart={clientCart}
                    setClientCart={setClientCart}
                    clientPopup={clientPopup}
                    setClientPopup={setClientPopup}
                    typeOper={typeOper}
                  />
              <h1 className="mx-10 flex flex-row text-2xl justify-center bg-primary hover:scale-105 duration-300 text-white py-4 px-4 rounded-full mt-10 group-hover:bg-white group-hover:text-primary">
                <p className="font-bold">Total :&nbsp;&nbsp;</p> {totalAmount} FCFA
              </h1>
              {clientCart.idCarte && 
              <>
              <p>Utiliser votre montant tontine ?</p>
              <Dropdown
                options={options}
                onSelect={setUseTontine}
                className="px-2"
              />
              {useTontine.value == "yes" && <p>Votre montant tontine s'élèvera à {clientCart.montantTontine} FCFA</p>}
              </>}
              <h1 className="mx-10 flex flex-row text-2xl justify-center bg-primary hover:scale-105 duration-300 text-white py-4 px-4 rounded-full mt-10 group-hover:bg-white group-hover:text-primary">
                <p className="font-bold">Net à payer :&nbsp;&nbsp;</p> {realAmount} FCFA
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
                  onClick={handleValidation}
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