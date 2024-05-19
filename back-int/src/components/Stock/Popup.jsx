import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Popup = ({ orderPopup, setOrderPopup }) => {
  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-1/2">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1>Infos Produit</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
              </div>
              {/* form section */}
              <div className="mt-4">
                <div className="flex items-center justify-between flex-row">
                <p>CodeProduit</p>
                <input 
                  type="text"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  placeholder="codePro"
                  disabled
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Id Categorie</p>
                <input
                  type="text"
                  placeholder="idCategorie"
                  disabled
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Nom Produit</p>
                <input
                  type="text"
                  placeholder="nom"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Prix</p>
                <input
                  type="text"
                  placeholder="prix"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Quantité</p>
                <input
                  type="text"
                  placeholder="qte"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Description</p>
                <input
                  type="text"
                  placeholder="description"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Code Arrivage</p>
                <input
                  type="text"
                  placeholder="code arrivage"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Date d'insertion</p>
                <input
                  type="text"
                  placeholder="date"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Prix d'achat</p>
                <input
                  type="text"
                  placeholder="prix d'achat"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Pourcentage</p>
                <input
                  type="text"
                  placeholder="pourcentage"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Promo</p>
                <input
                  type="text"
                  placeholder="promo"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Size 1</p>
                <input
                  type="text"
                  placeholder="size 1"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>Size 2</p>
                <input
                  type="text"
                  placeholder="size 2"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <div className="flex items-center justify-between flex-row">
                <p>TypeSize</p>
                <input
                  type="text"
                  placeholder="type size"
                  className=" w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                </div>
                <label className="flex items-center justify-between flex-row">
                  <p>Image</p>
                  <input
                    type="file"
                    multiple
                    className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                </label>
                <div className="flex justify-center">
                  <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full ">
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
