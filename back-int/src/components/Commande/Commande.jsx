

import React,{ useState } from 'react';
import Popup from '../PopupCommande/Popup';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axiosClient from '../../axiosClient'
function Commande() {
  const [commandes, setCommandes]=useState([]);
  const [isLoading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setLoading(true)
    axiosClient.get('/admin/allCommands')
      .then(({data}) => {
        setCommandes(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des Commandes: ", error);
        setLoading(false)
      })
  }, [])

    
  const [commande,setCommande]=useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = (ID) => {
    setHoveredRow(ID);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleClick = (commande) => {
    // Logique pour afficher le Popup lors du clic
    setPopupVisible(true);
    setCommande(commande);
    
  };

  const handleClose = () => {
    setPopupVisible(false);
  }

  return (

    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      
    <Navbar />

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">livrer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">nomClient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">adresse</th>
          </tr>
        </thead>
        <tbody >
          {commandes.map((commande) => (
            <tr key={commande.idCommande} 
                onMouseEnter={() => handleMouseEnter(commande.idCommande)} 
                onMouseLeave={handleMouseLeave} 
                onClick={()=>handleClick(commande)}
                style={{ backgroundColor: hoveredRow === commande.idCommande ? 'lightgray' : 'inherit' }}
            >
              <td className="px-6 py-4 whitespace-nowrap">{commande.idCommande}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.dateCom}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.montant}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.idVille}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.livrer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.nomClient}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.adresse}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Condition pour afficher le Popup */}
      
      {popupVisible && <Popup handleClose={handleClose} commande={commande} />}
    </div>

    <Footer />
    </div>
  );
}

export default Commande;