import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import Loader from "../../components/Loader/Loader";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useGestionnaireContext } from '../../utils/context/GestionnaireContext';
import Error from '../../components/Error/Error';
import { IoCloseOutline } from "react-icons/io5";
import { useGestPopup } from "../../utils/context/GestionnaireContext";
import Alert from "../../components/Alert/Alert";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const typesGest = [
  {value: 0, label: 'Administrateur'},
  {value: 1, label: 'Gestionnaire'},
  {value: 2, label: 'Caissier/ière'},
]

const actifOptions = [
  {value: 0, label: 'Inactif'},
  {value: 1, label: 'Actif'},
]

export default function GestionnaireForm() {
    const { popup, setPopup, configEnd, setConfigEnd } = useGestPopup()
    const { gestionnaire } = useGestionnaireContext();
    const {id} = useParams();
    const navigate = useNavigate();
    const [newGest, setNewGest] = React.useState({
        idGest: null,
        login: null,
        nomGest: null,
        typeGest: null,
        pwd: null,
        actif: null,
        mobile: null,
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [typeGest, setTypeGest] = React.useState(newGest.idGest ? typesGest[newGest.typeGest] : typesGest[2]);
    const [actif, setActif] = React.useState(newGest.idGest ? actifOptions[newGest.typeGest] : actifOptions[1]);
    const [passwordShown, setPasswordShown] = React.useState(false);

    const togglePasswordVisibility = () => {
			setPasswordShown(!passwordShown);
		};

    React.useEffect(() => {
      if (gestionnaire.typeGest != 0) {
        return <Error />
      }
    }, [])

    React.useEffect(() => {
      // alert(`/gestionnaires/${id}`);
      if(id) {
          setLoading(true);
          axiosClient.get(`/gestionnaires/${id}`)
              .then(({data}) => {
                  // console.log("data: ", data)
                  setLoading(false);
                  setNewGest(data);
              })
              .catch(() => {
                  setLoading(false);
              });
      }
  }, [id]);

    React.useEffect(() => {
      setNewGest({...newGest, typeGest: typeGest.value})
    }, [typeGest])

    React.useEffect(() => {
      setNewGest({...newGest, actif: actif.value})
    }, [actif])

    const onSubmit = () => {
        // const typeGestVal = typeGest.value
        // const actifVal = actif.value
        // // alert(actifVal)
        setNewGest({...newGest, typeGest: typeGest.value, actif: actif.value})
        if (newGest.idGest) {
          axiosClient.put(`/gestionnaires/${newGest.idGest}`, newGest)
            .then(() => {
              setConfigEnd(!configEnd)
              navigate('/gestionnaires')
            })
            .catch(err => {
              const response = err.response;
              console.log(response);
              if (!response) {
                setError("Une erreur interne est survenue!")
                return
              }
              if(response.status === 422){
                setError("Vous n'avez pas entré toutes vos informations!")
              } else {
                setError(response.data.message)
              }
            })
        } else {
          axiosClient.post('/gestionnaires', newGest)
            .then(() => {
              setConfigEnd(!configEnd)
              navigate('/gestionnaires')
            })
            .catch(err => {
              const response = err.response;
              console.log(response);
              if (!response) {
                setError("Une erreur interne est survenue!")
                return
              }
              if(response.status === 422){
                setError("Vous n'avez pas entré toutes vos informations!")
              } else {
                setError(response.data.message)
              }
            })
        }
      }

    console.log("newGest: ", newGest, "id :", id)

    return( 
      <>
      {popup && (
    <div className="popup">
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[400px]">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            {newGest.idGest && <h1>Mise à jour de: {newGest.nomGest}</h1>}
            {!newGest.idGest && <h1>Nouvel Utilisateur</h1>}
          </div>
          <div>
                    <IoCloseOutline
                      className="text-2xl cursor-pointer "
                      onClick={() => {
                        setPopup(false)
                      }}
                    />
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
        {error &&
							<Alert>{error}</Alert>
				}
        {/* form section */}
          {!loading && (
            <>
              <div className="flex mt-4">
                <div className="flex-none">
                  <p className="px-2 py-1 mb-4">Type:&nbsp;</p>
                  <p className="px-2 py-1 mb-4">Nom:&nbsp;</p>
                  <p className="px-2 py-1 mb-4">Mot de passe:&nbsp;</p>
                  <p className="px-2 py-1 mb-4">Mobile:&nbsp;</p>
                  <p className="px-2 py-1 mb-4">Actif?:&nbsp;</p>
                </div>
                <div>
                  <div className=" px-2 mb-4">
                    <Dropdown 
                      options={typesGest}
                      onSelect={setTypeGest}
                      firstOption={newGest.idGest ? typesGest[newGest.typeGest] : typeGest}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Nom" 
                    value={newGest.nomGest}
                    onChange={ev => setNewGest({...newGest, nomGest: ev.target.value})}
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 focus:outline-none focus:border-1 focus:border-primary"
                  />
                  <div className="flex flex-row">
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      placeholder="Mot de passe"
                      value={newGest.pwd} 
                      onChange={ev => setNewGest({...newGest, pwd: ev.target.value})}
                      className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 focus:outline-none focus:border-1 focus:border-primary"
                    />
                    <div className="px-2 mt-2.5 mb-4 text-black dark:text-white">
											{passwordShown ? (
												<FiEyeOff onClick={togglePasswordVisibility} />
											) : (
												<FiEye onClick={togglePasswordVisibility} />
											)}
										</div>
									</div>
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={newGest.mobile} 
                    onChange={ev => setNewGest({...newGest, mobile: ev.target.value})}
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-2 focus:outline-none focus:border-1 focus:border-primary"
                  />
                  <div  className=" px-2 mb-4">
                    <Dropdown 
                      options={actifOptions}
                      onSelect={setActif}
                      firstOption={newGest.idGest ? actifOptions[newGest.actif] : actif}
                    />
                  </div>
                </div>
                
              </div>
              <div className="flex justify-center">
              <button 
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full "
                onClick={() => {
                  onSubmit();
                }}
              >
                Valider
              </button>
            </div>
          </>
          )}
      </div>
    </div>
  </div>
    )}
  </>)
}