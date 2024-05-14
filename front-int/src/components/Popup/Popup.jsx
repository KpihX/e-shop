import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../axiosClient";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../utils/context/CartContext"
import { ClientContext } from "../../utils/context/ClientContext";
import Dropdown from "../Dropdown/Dropdown";

const Popup = ({ orderPopup, setOrderPopup, setEndCommand }) => {
  const { clientInfos, setClientInfos } = React.useContext(ClientContext)
  const [nomClient, setNomClient] = React.useState(clientInfos.nomClient ? clientInfos.nomClient : "")
  const [mobile, setMobile] = React.useState(clientInfos.mobile ? clientInfos.mobile : "")
  const [adresse, setAdresse] = React.useState(clientInfos.adresse ? clientInfos.adresse : "")
  const [villes, setVilles] = React.useState([])
  const [selectedVille, setSelectedVille] = React.useState(clientInfos.selectedVille ? clientInfos.selectedVille : null)
  const [isLoading, setLoading] = React.useState(false)
  const { cartItems, getTotalCartAmount} = React.useContext(CartContext)
  
  React.useEffect(() => {
    setLoading(true)
    axiosClient.get('/shop/town')
      .then(({data}) => {
        setVilles(data.data.map(({idVille, libelle}) => {
          return {
            value: idVille,
            label: libelle
          }
        }))
        if (selectedVille == null) {
          setSelectedVille({
            value: data.data[0].idVille,
            label: data.data[0].libelle
          })
        }

        setLoading(false)
      })
      .catch(error => {
        alert(error)
        console.error("Erreur lors de la récupération des villes: ", error);
        setLoading(false)
      });
  }, []);

  const handleValidation = () => {
    setLoading(true);
    setEndCommand(false)
    console.log("**", selectedVille)
    const client = {
      nomClient: nomClient,
      mobile: mobile,
      adresse: adresse,
      idVille: selectedVille.value
    };

    // setClientInfos(JSON.stringify(client));
    setClientInfos({
      nomClient: nomClient,
      mobile: mobile,
      adresse: adresse,
      selectedVille: selectedVille
    })
    
    const produits = cartItems.map(({codePro, quantite, size, color}) => {
      return {
        "codePro": codePro,
        "quantite": quantite,
        "taille": size,
        "couleur": color
      };
    });
    const montant = getTotalCartAmount();
    console.log(client);
    console.log(produits);
    console.log(montant);
  
    axiosClient.post('/shop/command', {
      client: client,
      produits: produits,
      montant: montant
    })
    .then((response) => {
      console.log(response.data);
      setLoading(false);
      setEndCommand(true)
      alert("Votre commande a bien été enregistrée!");
    })
    .catch(error => {
      alert(error.response.data.message); // Assurez-vous que le message d'erreur est bien dans error.response.data.message
      console.error(error.response);
      setLoading(false);
    });
  }
  console.log("***", clientInfos)
  console.log("***", selectedVille)
  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[400px]">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1>Commander maintenant</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      setOrderPopup(false)
                    }}
                  />
                </div>
              </div>
              {/* form section */}
              <div className="flex mt-4">
                <div>
                  <p className="px-2 py-1 mb-4">Nom:&nbsp;</p>
                  <p className="px-2 py-1 mb-4">Téléphone:&nbsp;</p>
                  <p className="px-2 py-1 mb-4">Adresse:&nbsp;</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nom" 
                    value={nomClient}
                    onChange={e => setNomClient(e.target.value)}
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Numéro de téléphone mobile"
                    value={mobile} 
                    onChange={e => setMobile(e.target.value)}
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Adresse"
                    value={adresse} 
                    onChange={e => setAdresse(e.target.value)}
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                {/* </div> */}
                {isLoading ? (
                  <Loader />
                ) : (
                <div className='flex sm:flex-row mb-2'>
                  <h1 className="mt-1">Ville:&nbsp;</h1>
                  <Dropdown 
                    options={villes}
                    onSelect={setSelectedVille}
                    firstOption={selectedVille}
                  />
                </div>
                )}
                
              </div>
              <div className="flex justify-center">
                  <button 
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full "
                    onClick={() => {
                      handleValidation();
                    }}
                  >
                    Commander maintenant
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
