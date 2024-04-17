// import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useUserContext } from "../utils/context/UserContext";

export default function Register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const {setUser, setToken} = useUserContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
            navigate('/')
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}

    return(
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Create A New Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="name" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}