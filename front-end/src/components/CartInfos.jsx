// import PropTypes from 'prop-types'
// import { useContext } from 'react'
import styled from 'styled-components'
// import colors from '../utils/style/colors'
// import { useTheme } from '../utils/hooks'
import { CartContext } from '../utils/context/CartContext'
import { Loader } from '../utils/style/Atoms'
import { useState, useEffect, useContext } from 'react'
import axiosClient from '../axiosClient'


const ClientInfos = styled.div`
  height: '75vh';
  width: '15%';
  border: '1px solid #ccc';
  border-radius: '10px';
  padding: '20px';
  background-color: '#f9f9f9';
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ValidateButton = styled.button`
  background-color: '#007bff'; 
  color: 'white';
  padding: '10%';
  border-radius: '5px'; 
  border: 'none'; 
`


const CartInfos = () => {
  const [nomClient, setNomClient] = useState("")
  const [mobile, setMobile] = useState("")
  const [adresse, setAdresse] = useState("")
  const [villes, setVilles] = useState([])
  const [selectedVille, setSelectedVille] = useState()
  const [isLoading, setLoading] = useState(false)
  const { cartItems, getTotalCartAmount} = useContext(CartContext)

  useEffect(() => {
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
    <ClientInfos>
      <input 
        type="text" 
        placeholder="Nom du client" 
        onChange={e => setNomClient(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Numéro de téléphone mobile" 
        onChange={e => setMobile(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Adresse"
        onChange={e => setAdresse(e.target.value)}
      />
      {/* <input type="text" placeholder="Email" /> */}
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <select 
          value={selectedVille} 
          onChange={e => setSelectedVille(e.target.value)}
        >
          {villes.map(({idVille, libelle}) => (
            <option
              key={idVille}
              value={libelle}
            >
              {libelle}
            </option>
          ))}
        </select>
      )}
      <ValidateButton onClick={handleValidation}>
        Valider
      </ValidateButton>
    </ClientInfos>
  );
}

export default CartInfos;

