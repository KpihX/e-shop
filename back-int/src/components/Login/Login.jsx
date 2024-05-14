import React from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useGestionnaireContext } from "../../utils/context/GestionnaireContext";
import Alert from "../Alert/Alert";
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
    const loginRef = React.useRef();
    const passwordRef = React.useRef();
		const [error, setError] = React.useState(null);
		const [passwordShown, setPasswordShown] = React.useState(false);

		const togglePasswordVisibility = () => {
			setPasswordShown(!passwordShown);
		};
    const {setGestionnaire, setToken} = useGestionnaireContext();

    const navigate = useNavigate()

    const Submit =  (ev) => {
        ev.preventDefault();
        const payload = {
            login: loginRef.current.value,
            pwd: passwordRef.current.value,
        }
        axiosClient.post("/login", payload)
        .then(({data})=>{
						console.log(data)
            setGestionnaire(data.gestionnaire)
            setToken(data.token)
            navigate('/')
        }).catch(err => {
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
    });
    }

    return(
			<div className="popup">
				<div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm dark:text-white">
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[400px]">
						{/* header */}
						{/* <div className="flex items-center justify-between"> */}
							<h1 className="text-center pb-4">Connexion</h1>
						{/* </div> */}
						{/* form section */}
						{error &&
							<Alert>{error}</Alert>
						}
								<form onSubmit={Submit} className="form">
									<div className="flex flex-row">
										<p className="px-2 py-1 mb-4 mr-5">Identifiant:&nbsp;</p>
                    <input 
											ref={loginRef} 
											type="text" 
											placeholder="Identifiant" 
											className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 focus:outline-none focus:border-1 focus:border-primary"
										/>
									</div>
									<div className="flex flex-row">
										<p className="flex-none px-2 py-1 mb-4 ">Mot de passe:&nbsp;</p>
										<input 
											ref={passwordRef} 
											type={passwordShown ? 'text' : 'password'}
											placeholder="Mot de passe" 
											className="w-12 flex-auto rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 pr-6  focus:outline-none focus:border-1 focus:border-primary"
										/>
										<div className="px-2 mt-2.5 mb-4 text-black dark:text-white">
											{passwordShown ? (
												<FiEyeOff onClick={togglePasswordVisibility} />
											) : (
												<FiEye onClick={togglePasswordVisibility} />
											)}
										</div>
									</div>
									<div className="flex justify-center">
										<button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full" onClick={() => setError(null)}>Se Connecter</button>
									</div>
                </form>
					</div>
				</div>
			</div>
    )
}