import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../axiosClient";
import { Loader } from "../../utils/style/Atoms";
import { LoaderWrapper } from "../../utils/style/Atoms";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../utils/context/CartContext"


const Popup = ({ orderPopup, setOrderPopup }) => {
  const [nomClient, setNomClient] = React.useState("")
  const [mobile, setMobile] = React.useState("")
  const [adresse, setAdresse] = React.useState("")
  const [villes, setVilles] = React.useState([])
  const [selectedVille, setSelectedVille] = React.useState()
  const [isLoading, setLoading] = React.useState(false)
  const { cartItems, getTotalCartAmount} = React.useContext(CartContext)
  const { checkout } = React.useContext(CartContext)
  const navigate = useNavigate();
  
  React.useEffect(() => {
    setLoading(true)
    axiosClient.get('/shop/town')
      .then(({data}) => {
        setVilles(data.data)
        setSelectedVille(data.data[0].libelle)
        console.log(data.data)
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
    const client = {
      "nomClient": nomClient,
      "mobile": mobile,
      "adresse": adresse,
      "idVille": villes.find((ville) => ville.libelle == selectedVille).idVille
    };
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
    })
    .catch(error => {
      alert(error.response.data.message); // Assurez-vous que le message d'erreur est bien dans error.response.data.message
      console.error(error.response);
      setLoading(false);
    });
  }

  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1>Commander maintenant</h1>
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
                <input
                  type="text"
                  placeholder="Nom du client"
                  onChange={e => setNomClient(e.target.value)}
                  className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                <input
                  type="text"
                  placeholder="Numéro de téléphone mobile" 
                  onChange={e => setMobile(e.target.value)}
                  className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  onChange={e => setAdresse(e.target.value)}
                  className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                {isLoading ? (
                  <LoaderWrapper>
                    <Loader />
                  </LoaderWrapper>
                ) : (
                  <select 
                    value={selectedVille} 
                    onChange={e => setSelectedVille(e.target.value)}
                    className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  >
                    {villes.map(({idVille, libelle}) => (
                      <option
                        key={idVille}
                        value={libelle}
                        className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      >
                        {libelle}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex justify-center">
                  <button 
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full "
                    onClick={() => {
                      handleValidation();
                      checkout();
                      // navigate("/");
                    }}
                  >
                    Commander maintenant
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
