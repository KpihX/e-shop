import React from 'react';
// import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import Loader from '../../components/Loader/Loader';
import { useGestionnaireContext } from '../../utils/context/GestionnaireContext';
import Error from '../../components/Error/Error';
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { PageContext } from '../../utils/context/PageContext';
import { CategoryContext } from '../../utils/context/CategoryContext';
import AOS from "aos";
import { GestPopupProvider } from '../../utils/context/GestionnaireContext';
import Footer from '../../components/Footer/Footer';
import {
  // MagnifyingGlassIcon,
  // ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  // Input,
  Typography,
  Button,
  CardBody,
  Chip,
  // CardFooter,
  // Tabs,
  // TabsHeader,
  // Tab,
  // Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Monitored",
//     value: "monitored",
//   },
//   {
//     label: "Unmonitored",
//     value: "unmonitored",
//   },
// ];

const options = [
  { value: 'name', label: 'Nom' },
  { value: 'id', label: 'Login' }
];

const TABLE_HEAD = ["Identifiant", "Nom", "Type", "Actif", "Mobile", "Actions"];

export default function Gestionnaires(){
    const { gestionnaire } = useGestionnaireContext();
    const [gestionnaires, setGestionnaires] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [popup, setPopup] = React.useState(false);
    const navigate = useNavigate();
    const [configEnd, setConfigEnd] = React.useState(false);

    const [searchValue, setSearchValue] = React.useState('')
    const [currentSearchValue, setCurrentSearchValue] = React.useState('')
    const [searchType, setSearchType] = React.useState(options[0])
    const { setCurrentPage } = React.useContext(PageContext)
    const { selectedCategory, setSelectedCategory} = React.useContext(CategoryContext)
    
    const goHome = () => {
      setCurrentPage(0)
      setCurrentSearchValue("")
      setSelectedCategory(-1)
    }

    React.useEffect(()=> {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
      getGestionnaires();
    }, [configEnd])

    React.useEffect(() => {
      if (currentSearchValue === "") {
        setSearchValue("")
      }
    }, [currentSearchValue]);

    const onDeleteClick = (idGest) => {
        if (!window.confirm("Êtes vous sûr de vouloir supprimer cet utilisateur ?")) {
          return
        }
        axiosClient.delete(`/gestionnaires/${idGest}`)
          .then(() => {
            getGestionnaires()
          })
      }

    const getGestionnaires = () => {
        setLoading(true)
        axiosClient.get('/gestionnaires')
          .then(({ data }) => {
            setLoading(false)
            setGestionnaires(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

      if (gestionnaire.typeGest != 0) {
        return <Error />
      }

      return (
        <div className="bg-white dark:bg-gray-700 dark:text-white transition duration-200">
        <Navbar />
        <Card className="h-full w-full overflow-scroll">
        <GestPopupProvider popup={popup} setPopup={setPopup} configEnd={configEnd} setConfigEnd={setConfigEnd}>
          <Outlet />
        </GestPopupProvider>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mt-4 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Liste des Gestionnaires
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Obtenir les informations sur tous les gestionnaires & Faire des CRUD
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" size="sm">
                  view all
                </Button> */}
                <Button className="flex items-center gap-3 bg-green-500" size="sm" onClick={() => {setPopup(true); navigate('/gestionnaires/new')}}>
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter un Gestionnaire
                </Button>
              </div>
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
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
            </div> */}
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
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
              {loading &&
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      <Loader />
                    </td>
                  </tr>
                </tbody>
              }
              {!loading &&
              <tbody>
                {gestionnaires
                .filter(({ nomGest, login }) => {
                  if (searchType.value == "name") {
                    return nomGest.toLowerCase().includes(searchValue.toLowerCase())
                  } else if (searchType.value == "id") {
                    return login.toLowerCase().includes(searchValue.toLowerCase())
                  }
                })
                .map(
                  (gest, index) => {
                    const isLast = index === gestionnaires.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
     
                    return (
                      <tr key={gest.idGest}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {gest.login}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {gest.nomGest}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={gest.typeGest == 0 ? "ADMINISTRATEUR" : (gest.typeGest == 1 ? "GESTIONNAIRE" : "CAISSIER")}
                              color={gest.typeGest == 0 ? "red" : (gest.typeGest == 1 ? "orange" : "blue")}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={gest.actif == 0 ? "Inactif" : "Actif"}
                              color={gest.actif == 0 ? "red" : "green"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {gest.mobile}
                          </Typography>
                        </td>
                        <td className={`${classes} flex gap-10`}>
                          <Tooltip content="Editer"  className="bg-blue-500">
                            <IconButton variant="text" className="bg-blue-100" onClick={() => {setPopup(true); navigate('/gestionnaires/' + gest.idGest + '/edit')}}>
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Supprimer" className="bg-red-500">
                            <IconButton variant="text" className="bg-red-100" onClick={() => onDeleteClick(gest.idGest)}>
                              <TrashIcon className="h-4 w-4" /> {/* Assurez-vous d'importer TrashIcon depuis vos icônes */}
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            }
            </table>
          </CardBody>
          {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1/10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Précédent
              </Button>
              <Button variant="outlined" size="sm">
                Suivant
              </Button>
            </div>
          </CardFooter> */}
        </Card>
        <Footer />
        </div>
      )
    }