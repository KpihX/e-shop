import React, { useState } from 'react';
import axiosClient from '../../axiosClient'
import PopupLigne from './PopupLigne.jsx';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
  



const TABLE_HEAD = [
    'ID',
    'Code Produit',
    'quantité',
    'taille',
    'couleur',
    'Disponibilité',
  ''];

const PopupCommande = ({onClose, idCommande}) => {
      // Appel de la fonction pour afficher toutes les lignes d'une commande
  const [lignesCommande, setLignesCommande] = React.useState([]);
  const [ligne, setLigne] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [popupVisibleligne, setPopupVisibleligne] = useState(false);


  React.useEffect(() => {
    console.log(idCommande)
    axiosClient.get(`/admin/getCommand?idCommande=${idCommande}`)
    console.log(lignesCommande)
    .then((response) => {
      setLignesCommande(response.data.data);
    })
    .catch(error => {
      alert(error.response.data.message); // Assurez-vous que le message d'erreur est bien dans error.response.data.message
      console.error(error.response);
    });
  }, []);


  // React.useEffect(()=>{
  //   axiosClient.post('/')
  // });
  const handleMouseEnter = (ID) => {
    setHoveredRow(ID);
  };


  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleClick = (ligne) => {
    // Logique pour afficher le Popup lors du clic
    setPopupVisibleligne(true);
    setLigne(ligne);
    
    const handleCloseligne = () => {
      setPopupVisibleligne(false);
    };

  };



  return (
    <div className="popup">
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[900px]">
          {/* header */}
        
          <div className="flex items-center justify-between">
            <div>
              <h1 className='text-2xl '>Commande</h1>
            </div>
            <div>
              <button
                className="text-1xl cursor-pointer"
                onClick={() => onClose(false)}
              >
                Fermer
              </button>
            </div>
          </div>
          {/* lignes commandes */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-900 dark:text-white">

                <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                            key={head}
                            className="cursor-pointer border-y border-inherit-100 bg-inherit-50/50 p-4 transition-colors hover:bg-inherit-50"
                            >
                            <Typography
                                variant="small"
                                color="inherit dark:text-white"
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
                <tbody >
                        {lignesCommande.map(
                        (commande) => {
                            // const isLast = index === commandeionnaires.length - 1;
                            const classes = "px-6 py-4 whitespace-nowrap"
                            //   ? "p-4"
                            //   : "p-4 border-b border-inherit-50";
            
                            return (
                            <tr key={commande.idLignCom} 
                            onMouseEnter={() => handleMouseEnter(commande.idLignCom)} 
                            onMouseLeave={handleMouseLeave} 
                            onClick={()=>handleClick(commande)}
                            style={{ backgroundColor: hoveredRow === commande.idLignCom ? 'lightgray' : 'inherit' }}
                        >
                                <td className={classes}>
                                <Typography
                                    variant="small"
                                    color='inherit'
                                    className="font-normal"
                                >
                                    {commande.idLignCom}
                                </Typography>
                                </td>
                                <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="inherit"
                                    className="font-normal"
                                >
                                    {commande.codePro}
                                </Typography>
                                </td>
                                <td className={classes}>
                                <div className="w-max">
                                <Typography
                                    variant="small"
                                    color="inherit"
                                    className="font-normal"
                                >
                                    {commande.quantite}
                                </Typography>
                                </div>
                                </td>
                                <td className={classes}>
                                <div className="w-max">
                                <Typography
                                    variant="small"
                                    color="inherit"
                                    className="font-normal"
                                >
                                    {commande.taille}
                                </Typography>
                                </div>
                                </td>
                                <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="inherit"
                                    className="font-normal"
                                >
                                    {commande.couleur}
                                </Typography>
                                </td>
                                <td className={classes}>
                                <Typography
                                    variant="small"
                                    color={commande.disponible == 0 ? "red" : "green"}
                                    className="font-normal"
                                >
                                    {commande.disponible == 0 ? "Non disponible" : "Disponible"}
                                </Typography>
                                </td>
                                <td className={`${classes} flex gap-10`}>
                                <Tooltip content="Editer"  className="bg-blue-500">
                                    <IconButton variant="text" className="bg-blue-100" onClick={() => {setPopupLigneVisible(true)}}>
                                    <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Supprimer" className="bg-red-500">
                                    <IconButton variant="text" className="bg-red-100" /*onClick={() => onDeleteClick(commande.idcommande)/*}*/> 
                                    <TrashIcon className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                                    </IconButton>
                                </Tooltip>
                                </td>
                            </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
          </div>
        </div>
        {popupVisibleligne && <PopupLigne lignCom={ligne} handleCloseligne={setPopupVisibleligne}/> }
        
      </div>
  )
}

export default PopupCommande
