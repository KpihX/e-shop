import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import axiosClient from '../../axiosClient';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CardHeader, Input, Typography, IconButton, Tooltip } from "@material-tailwind/react";


const TABLE_HEAD = [
  'ID',
  'nomClient',
  'mobile',
  'Date',
  'Montant',
  'adresse',
  'Lieu',
  'livrer',
  ''
];

function Commands() {
  const [commandes, setCommandes] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [commande, setCommande] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    axiosClient.get('/admin/allCommands')
      .then(({ data }) => {
        setCommandes(data.data);
        setFilteredCommandes(data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des Commandes: ", error);
      });
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredCommandes(commandes);
    } else if (filter === '1') {
      setFilteredCommandes(commandes.filter(commande => commande.livrer === 1));
    } else if (filter === '0') {
      setFilteredCommandes(commandes.filter(commande => commande.livrer === 0));
    }
  }, [filter, commandes]);

  const handleMouseEnter = (ID) => {
    setHoveredRow(ID);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleClick = (commande) => {
    setPopupVisible(true);
    setCommande(commande);
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
<>{true ?
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
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
            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'} rounded`}
                onClick={() => handleFilterChange('all')}
              >
                Tous
              </button>
              <button
                className={`py-2 px-4 ${filter === '1' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'} rounded`}
                onClick={() => handleFilterChange('1')}
              >
                Livrée
              </button>
              <button
                className={`py-2 px-4 ${filter === '0' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'} rounded`}
                onClick={() => handleFilterChange('0')}
              >
                Non Livrée
              </button>
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
                      color="inherit"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCommandes.map((commande) => {
                const classes = "px-6 py-4 whitespace-nowrap";
                return (
                  <tr
                    key={commande.idCommande}
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
                        color={commande.livrer === 0 ? "red" : "green"}
                        className="font-normal"
                      >
                        {commande.livrer === 0 ? "Non livrée" : "Livrée"}
                      </Typography>
                    </td>
                    <td className={`${classes} flex gap-10`}>
                      <Tooltip content="Editer" className="bg-blue-500">
                        <IconButton 
                          variant="text" 
                          className="bg-blue-100"

                          onMouseEnter={() => handleMouseEnter(commande.idCommande)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleClick(commande)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Supprimer" className="bg-red-500">
                        <IconButton variant="text" className="bg-red-100">
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {popupVisible && <Popup handleClose={handleClose} commande={commande} setCommandes={setCommandes} setFilteredCommandes={setFilteredCommandes}/>}
        </div>
      </div>
    </>
    : null
  }
</>
  );
}

export default Commands;
