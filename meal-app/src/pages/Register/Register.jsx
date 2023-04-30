import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterContainer = styled.div`
    padding: 1rem 2rem;
    h1{
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
        button{
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

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.user.error);
    
    useEffect(() => {
        console.log(error);
    }, [error])

    const [ user, setUser ] = useState({
        userName: "",
        fullName: "",
        email: "",
        password: "",
    });

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(!user.userName || !user.fullName || !user.email || !user.password){
            return;
        }
        dispatch(register(user));
        
        if(error){
            return;
        }
        navigate("/login");
    }

  return (
    <RegisterContainer>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <FormController>
                <label htmlFor='userName'>Username</label>
                <input onChange={handleChanges} type='text' name='userName' id='userName' placeholder='userName' />
            </FormController>
            <FormController>
                <label htmlFor='fullName'>Full Name</label>
                <input onChange={handleChanges} type='text' name='fullName' id='fullName' placeholder='fullName' />
            </FormController>
            <FormController>
                <label htmlFor='email'>Email</label>
                <input onChange={handleChanges} type='email' name='email' id='email' placeholder='email'/>
            </FormController>
            <FormController>
                <label htmlFor='password'>Password</label>
                <input onChange={handleChanges} type='password' name='password' id='password' placeholder='password'/>
            </FormController>

            <button type='submit'>Register</button>
        </form>
    </RegisterContainer>
  )
};

export default Register