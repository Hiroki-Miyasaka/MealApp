import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from "../../reducers/userSlice";
import { useNavigate } from 'react-router-dom';
import { setUser, setLoggedIn, setLoading, setError } from "../../reducers/userSlice.js";
import { loadFavorites } from "../../reducers/favoriteSlice.js";
import axios from 'axios';

const LoginContainer = styled.div`
    padding: 1rem 2rem;
    h1 {
        text-align: center;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
        margin: 0 auto;
        input {
        outline: none;
        border: none;
        height: 2.4rem;
        padding: 0 1rem;
        border-radius: 4px;
        font-size: 1rem;
        }
        button {
        height: 2.4rem;
        margin-top: 1rem;
        border: none;
        outline: none;
        border-radius: 4px;
        cursor: pointer;
        }
    }
`;

const FormController = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
`;

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const error = useSelector((state) => state.user.error);

    const dispatch = useDispatch();

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     if(email && password){
    //         dispatch(login({email, password}));
    //         if(error){
    //             return;
    //         }
    //         navigate("/profile");
    //     }
    // }

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            setLoading(true);
            await axios.post(import.meta.env.VITE_APP_URL + "/api/auth/login", {email, password})
            .then((res) => {
                axios.defaults.headers.common["Authorization"] = res.data.token;
                console.log(res.data.user);
                dispatch(setUser(res.data.user));
                if(res.data.user.favMeals.length > 0){
                    console.log("loaded", res.data.user.favMeals);
                    dispatch(loadFavorites(res.data.user.favMeals));
                }
                dispatch(setLoggedIn(true));
                navigate("/profile");
            }).catch((error) => {
                console.log(error.response.data.message);
                dispatch(setError(error.response.data.message));
                dispatch(setLoading(false));
            })
            
        } catch(error){
            console.log(error);
            dispatch(setError(error));
        }
    }

  return (
    <LoginContainer>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <FormController>
                <label htmlFor='email'>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' name='email' id='email' placeholder='email'/>
            </FormController>
            <FormController>
                <label htmlFor='password'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' id='password' placeholder='password'/>
            </FormController>
            <button type='submit'>Login</button>
        </form>
    </LoginContainer>
  )
}

export default Login