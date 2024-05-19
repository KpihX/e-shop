

import { useState } from 'react';
import Popup from '../../components/PopupCommande/Popup';

function Commande() {


    const commandes = [
        {
          ID: '1',
          Date: '03/01/2022',
          Montant: '100',
          nomClient: 'Jean Dupont',
          mobile: '0123456789',
          adresse: '123 rue de Paris, 75001 Paris',
          commentaire: 'Livrer avant 18h',
          livrer: "true",
          avance: '50',
          remise: '10',
          type: 'standard',
          idVille: '1',
        },
        {
          ID: '2',
          Date: '05/01/2022',
          Montant: '200',
          nomClient: 'Marie Curie',
          mobile: '9876543210',
          adresse: '456 avenue des Champs-Élysées, 75008 Paris',
          commentaire: 'Sonner à l\'interphone',
          livrer: "false",
          avance: '100',
          remise: '20',
          type: 'express',
          idVille: '1',
        },
        {
          ID: '3',
          Date: '08/01/2022',
          Montant: '150',
          nomClient: 'Alexandre Dumas',
          mobile: '6789054321',
          adresse: '789 boulevard Saint-Germain, 75006 Paris',
          commentaire: 'Livraison urgente demandée',
          livrer: "true",
          avance: '75',
          remise: '15',
          type: 'standard',
          idVille: '2',
        },
        {
          ID: '4',
          Date: '10/01/2022',
          Montant: '250',
          nomClient: 'Sophie Germain',
          mobile: '4561237890',
          adresse: '321 rue Montmartre, 75002 Paris',
          commentaire: 'Pas de commentaire',
          livrer: "false",
          avance: '125',
          remise: '25',
          type: 'luxury',
          idVille: '3',
        },
        {
          ID: '5',
          Date: '12/01/2022',
          Montant: '300',
          nomClient: 'Émile Zola',
          mobile: '3216549870',
          adresse: '654 rue Lafayette, 75009 Paris',
          commentaire: 'Livrer au bureau',
          livrer: "true",
          avance: '150',
          remise: '30',
          type: 'express',
          idVille: '1',
        },
        {
            ID: '6',
            Date: '15/01/2022',
            Montant: '350',
            nomClient: 'Victor Hugo',
            mobile: '1593574862',
            adresse: '112 rue de Rivoli, 75001 Paris',
            commentaire: 'Laisser à l’accueil si absent',
            livrer: "true",
            avance: '175',
            remise: '35',
            type: 'standard',
            idVille: '4',
          },
          {
            ID: '7',
            Date: '18/01/2022',
            Montant: '180',
            nomClient: 'Gustave Flaubert',
            mobile: '7539514562',
            adresse: '228 rue de Vaugirard, 75015 Paris',
            commentaire: 'Appeler 10 minutes avant d\'arriver',
            livrer: "true",
            avance: '90',
            remise: '18',
            type: 'express',
            idVille: '1',
          },
          {
            ID: '8',
            Date: '20/01/2022',
            Montant: '400',
            nomClient: 'George Sand',
            mobile: '2587413690',
            adresse: '300 boulevard Saint-Michel, 75006 Paris',
            commentaire: 'Interphone ne fonctionne pas',
            livrer: "false",
            avance: '200',
            remise: '40',
            type: 'luxury',
            idVille: '2',
          },
          {
            ID: '9',
            Date: '23/01/2022',
            Montant: '225',
            nomClient: 'Charles Baudelaire',
            mobile: '3214569870',
            adresse: '456 avenue Montaigne, 75008 Paris',
            commentaire: 'La commande contient des articles fragiles',
            livrer: "true",
            avance: '112.5',
            remise: '22.5',
            type: 'standard',
            idVille: '3',
          },
          {
            ID: '10',
            Date: '26/01/2022',
            Montant: '275',
            nomClient: 'Honoré de Balzac',
            mobile: '6541237890',
            adresse: '789 rue du Faubourg Saint-Honoré, 75008 Paris',
            commentaire: 'Demande de livraison discrète',
            livrer: "true",
            avance: '137.5',
            remise: '27.5',
            type: 'express',
            idVille: '1',
          }
              ];
      

    
  const [commandeSelect,setCommandeSelect]=useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = (ID) => {
    setHoveredRow(ID);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleClick = (idCommande) => {
    // Logique pour afficher le Popup lors du clic
    setPopupVisible(true);
    setCommandeSelect(idCommande);
    
  };

  const handleClose = () => {
    setPopupVisible(false);
  }

  return (
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
            <tr key={commande.ID} 
                onMouseEnter={() => handleMouseEnter(commande.ID)} 
                onMouseLeave={handleMouseLeave} 
                onClick={()=>handleClick(commande.ID)}
                style={{ backgroundColor: hoveredRow === commande.ID ? 'lightgray' : 'inherit' }}
            >
              <td className="px-6 py-4 whitespace-nowrap">{commande.ID}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.Date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commande.Montant}</td>
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
      
      {popupVisible && <Popup handleClose={handleClose} commandeSelect={commandeSelect} />}
    </div>
  );
}

export default Commande;