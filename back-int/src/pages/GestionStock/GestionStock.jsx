import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { CardHeader, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  'N_',
  'Code Produit',
  'ID gestionnaire',
  'Quantité',
  'Date',
  'Opération'
];

const operationLabels = {
  0: { label: 'Commandé', color: 'blue' },
  1: { label: 'Facturé', color: 'purple' },
  2: { label: 'Livré', color: 'green' },
  3: { label: 'Ajouté', color: 'teal' },
  4: { label: 'Retiré', color: 'orange' },
  5: {label: 'Supprimé', color:'red'}
};

export default function GestionStock() {
  const [historiques, setHistoriques] = useState([]);
  const [filteredHistoriques, setFilteredHistoriques] = useState([]);
  const [selectedGestionnaire, setSelectedGestionnaire] = useState('all');
  const [selectedOperation, setSelectedOperation] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);
  const gestionnaires = [...new Set(historiques.map(cmd => cmd.idGest))];
  const operations = Object.keys(operationLabels);

  useEffect(() => {
    axiosClient.get('/admin/allHistory')
      .then(({ data }) => {
        setHistoriques(data.data);
        setFilteredHistoriques(data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des Commandes: ", error);
      });
  }, []);
  
  useEffect(() => {
    let filtered = historiques;
    if (selectedGestionnaire !== 'all') {
      filtered = filtered.filter(history => history.idGest === parseInt(selectedGestionnaire));
    }

    if (selectedOperation !== 'all') {
      filtered = filtered.filter(history => history.operation === parseInt(selectedOperation));
    }

    setFilteredHistoriques(filtered);
  }, [selectedGestionnaire, selectedOperation, historiques]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="pt-4 flex items-center justify-between gap-8 bg-white dark:bg-gray-900 dark:text-white">
          <div className='bg-white dark:bg-gray-900 dark:text-white'>
            <Typography variant="h5" color="inherit" className='pl-5'>
              Historiques
            </Typography>
            <Typography color="inherit" className="mt-1 font-normal pl-5">
              Rapport des opérations passées. 
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 flex-row bg-white dark:bg-gray-900 dark:text-white p-5">
          <div className="flex space-x-4">
            <select
              className="py-2 px-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded"
              value={selectedGestionnaire}
              onChange={(e) => setSelectedGestionnaire(e.target.value)}
            >
              <option value="all">Tous les gestionnaires</option>
              {gestionnaires.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <select
              className="py-2 px-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded"
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
            >
              <option value="all">Toutes les opérations</option>
              {operations.map(op => (
                <option key={op} value={op}>{operationLabels[op].label}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-900 dark:text-white">
            <tr>
              {TABLE_HEAD.map((head) => (
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
            {filteredHistoriques.map((history) => {
              const classes = "px-6 py-4 whitespace-nowrap";
              const operation = operationLabels[history.operation];

              return (
                <tr
                  key={history.idStock}
                  style={{ backgroundColor: hoveredRow === history.idStock ? 'lightgray' : 'inherit' }}
                  onMouseEnter={() => setHoveredRow(history.idStock)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color='inherit'
                      className="font-normal"
                    >
                      {history.idStock}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-normal"
                    >
                      {history.codePro}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-normal"
                    >
                      {history.idGest}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-normal"
                    >
                      {history.qte}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="inherit"
                      className="font-normal"
                    >
                      {history.dateStock}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color={operation.color}
                      className="font-normal"
                    >
                      {operation.label}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
