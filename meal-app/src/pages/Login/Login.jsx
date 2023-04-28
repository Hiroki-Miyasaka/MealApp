import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../reducers/userSlice";
import { useNavigate } from 'react-router-dom';

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

    const handleLogin = (e) => {
        e.preventDefault();
        if(email && password){
            dispatch(login({email, password}));
            if(error){
                return;
            }
            navigate("/profile");
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