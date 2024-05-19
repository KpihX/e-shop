

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
    label: "Non_Livrée",
    value: 0,
  },
];

const options = [
  { value: 'name', label: 'Nom' },
  { value: 'id', label: 'Login' }
];

const TABLE_HEAD = [
  'ID',
  'nomClient',
  'mobile',
  'Date',
  'Montant',
  'adresse',
  'Lieu',
  'livrer',
''];
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

    <>
    <Navbar />
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 ">
    <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="pt-4 flex items-center justify-between gap-8 bg-white dark:bg-gray-900 dark:text-white">
              <div className='bg-white dark:bg-gray-900 dark:text-white'>
                <Typography variant="h5" color="inherit dark:text-secondary" className='pl-5'>
                  Liste des Commandes
                </Typography>
                <Typography color="gray dark:text-white" className="mt-1 font-normal pl-5">
                  Obtenir les informations sur une commande   
                </Typography>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 flex-row bg-white dark:bg-gray-900 dark:text-white p-5">
              <Tabs value="all" className="w-full flex">
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
                {commandes
                .map(
                  (commande) => {
                    // const isLast = index === commandeionnaires.length - 1;
                    const classes = "px-6 py-4 whitespace-nowrap"
                    //   ? "p-4"
                    //   : "p-4 border-b border-inherit-50";
     
                    return (
                      <tr key={commande.idCommande} 
                      onMouseEnter={() => handleMouseEnter(commande.idCommande)} 
                      onMouseLeave={handleMouseLeave} 
                      onClick={()=>handleClick(commande)}
                      style={{ backgroundColor: hoveredRow === commande.idCommande ? 'lightgray' : 'inherit' }}
                  >
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color='inherit'
                            className="font-normal"
                          >
                            {commande.idCommande}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="inherit"
                            className="font-normal"
                          >
                            {commande.nomClient}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                          <Typography
                            variant="small"
                            color="inherit"
                            className="font-normal"
                          >
                            {commande.mobile}
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
                            {commande.dateCom}
                          </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="inherit"
                            className="font-normal"
                          >
                            {commande.montant}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="inherit"
                            className="font-normal"
                          >
                            {commande.adresse}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="inherit"
                            className="font-normal"
                          >
                            {commande.idVille}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color={commande.livrer == 0 ? "red" : "green"}
                            className="font-normal"
                          >
                            {commande.livrer == 0 ? "Non livrée" : "Livrée"}
                          </Typography>
                        </td>
                        <td className={`${classes} flex gap-10`}>
                          <Tooltip content="Editer"  className="bg-blue-500">
                            <IconButton variant="text" className="bg-blue-100" onClick={() => {setPopupVisible(true)}}>
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
      {/* Condition pour afficher le Popup */}
      
      {popupVisible && <Popup handleClose={handleClose} commande={commande} />}
    </div>
    </div>
    <Footer />
    </>
  );
}

export default Commande;