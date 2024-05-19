

import React,{ useState } from 'react';
import Popup from '../PopupCommande/Popup';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axiosClient from '../../axiosClient'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "Tous",
    value: "all",
  },
  {
    label: "Livrée",
    value:1,
  },
  {
    label: "Non Livrée",
    value: 0,
  },
];


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
    <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mt-4 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Liste des Commandes
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Obtenir les informations sur une commande   
                </Typography>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 m-2 flex-row">
              <Tabs value="all" className="w-full md:w-max flex">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
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