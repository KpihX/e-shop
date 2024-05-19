import React, { useState } from 'react';
import PopupCommande from './PopupCommande.jsx';

        // ,commandeSelect
const Popup = (  { handleClose,commande }) => {

  const [popupCommandeVisible, setPopupCommandeVisible] = useState(false);

  const [formData, setFormData] = useState({
    ID: commande.idCommande,
    Date: commande.dateCom,
    Montant: commande.montant,
    nomClient: commande.nomClient,
    mobile: commande.mobile,
    adresse: commande.adresse,
    commentaire: commande.commentaire,
    livrer: commande.livrer,
    avance: commande.avance,
    remise: commande.remise,
    type: commande.type,
    idVille: commande.idVille,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="popup">
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[900px]">
          {/* header */}
        
          <div className="flex items-center justify-between">
            <div>
              <h1 className='text-2xl '>Infos Commande</h1>
            </div>
            <div>
              <button
                className="text-1xl cursor-pointer"
                onClick={handleClose}
              >
                Fermer
              </button>
            </div>
          </div>
          {/* form section */}
          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="idCommande" className="mr-2">
                ID_Commande
              </label>
              <input
                type="text"
                name="idCommande"
                value={formData.ID}
                onChange={handleChange}
                id="idCommande"
                className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 justify-end"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="date_Commande" className="mr-2">
                Date_Commande
              </label>
              <input
                type="text"
                name="date_Commande"
                value={formData.Date}
                onChange={handleChange}
                id="date_Commande"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="montant" className="mr-2">
                  montant
              </label>
              <input
                type="text"
                name="montant"
                value={formData.Montant}
                onChange={handleChange}
                id="montant"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />

            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="nomClient" className="mr-2">
                  NomClient
              </label>
              <input
                type="text"
                name="nomClient"
                value={formData.nomClient}
                onChange={handleChange}
                id="nomClient"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />

            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="mobile" className="mr-2">
              Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                id="mobile"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="adresse" className="mr-2">
              Adresse
              </label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                id="adresse"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="commentaire" className="mr-2">
              Commentaire
              </label>
              <input
                type="text"
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
                id="commentaire"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="livrer" className="mr-2">
              Livrer
              </label>
              <input
                type="text"
                name="livrer"
                value={formData.livrer}
                onChange={handleChange}
                id="livrer"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="avance" className="mr-2">
              Avance
              </label>
              <input
                type="text"
                name="avance"
                value={formData.avance}
                onChange={handleChange}
                id="avance"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="remise" className="mr-2">
              Remise
              </label>
              <input
                type="text"
                name="remise"
                value={formData.remise}
                onChange={handleChange}
                id="remise"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="type" className="mr-2">
              Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                id="type"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="idVille" className="mr-2">
              Id_Ville
              </label>
              <input
                type="text"
                name="idVille"
                value={formData.idVille}
                onChange={handleChange}
                id="idVille"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            {/* Add similar input fields for other data */}
            {/* Make sure to add proper names and values */}
            <div className="flex justify-between items-center">
            <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
             onClick={() => {setPopupCommandeVisible(true); handleClose}}>
                Voir La Commande
              </button>
              <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full">
                Enregistrer 
              </button>
            </div>
          </div>
        </div>
      </div>
      {popupCommandeVisible && <PopupCommande onClose={handleClose} />}
    </div>
  );
};

export default Popup;



