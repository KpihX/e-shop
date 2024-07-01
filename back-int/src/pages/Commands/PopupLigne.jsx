import React, { useState } from 'react';


        // ,lignComSelect
const Popup = ( {handleCloseligne,lignCom}) => {

  const [formData, setFormData] = useState({
    ID: lignCom.idLignCom,
    codePro: lignCom.codePro,
    quantite: lignCom.quantite,
    taille: lignCom.taille,
    couleur: lignCom.couleur,
    Disponibilité: lignCom.disponible,
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
              <h1 className='text-2xl '>Infos ligne Commmande</h1>
            </div>
            <div>
              <button
                className="text-1xl cursor-pointer"
                onClick={()=>handleCloseligne(false)}
              >
                Fermer
              </button>
            </div>
          </div>
          {/* form section */}
          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="idlignCom" className="mr-2">
                ID_lignCom:
              </label>
              <input
                type="text"
                name="idlignCom"
                value={formData.ID}
                disabled
                id="idlignCom"
                className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 justify-end"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="date_lignCom" className="mr-2">
                CodePro:
              </label>
              <input
                type="text"
                name="date_lignCom"
                value={formData.codePro}
                disabled
                id="date_lignCom"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="montant" className="mr-2">
                Quantité
              </label>
              <input
                type="text"
                name="montant"
                value={formData.quantite}
                onChange={handleChange}
                id="montant"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />

            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="nomClient" className="mr-2">
                  Couleur:
              </label>
              <input
                type="text"
                name="nomClient"
                value={formData.couleur}
                onChange={handleChange}
                id="nomClient"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />

            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="mobile" className="mr-2">
              Taille:
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.taille}
                onChange={handleChange}
                id="mobile"
                className="justify-end w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
              />
            </div>
            {/* Add similar input fields for other data */}
            {/* Make sure to add proper names and values */}
            <div className="flex justify-center items-center">
            
              <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
              onClick={()=>{handleSubmit;handleCloseligne(false)}}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;



