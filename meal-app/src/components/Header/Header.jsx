import React from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/userSlice';

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    h1{
        margin-right: auto;
    }
    ul{
        list-style: none;
        display: flex;
        gap: 1rem;
        a{
            text-decoration: none;
            color: #fff;
        }
    }
`;


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return(
        <HeaderContainer>
            <h1 onClick={() => navigate("/")}>Logo</h1>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                {
                    isLoggedIn ? (
                        <>
                            <li>
                                <Link to={"/profile"} >{user && user.user.fullName}</Link>
                            </li>
                            <button onClick={handleLogout} >Logout</button>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to={"/login"}>Login</Link>
                            </li>
                            <li>
                                <Link to={"/register"}>Register</Link>
                            </li>
                        </>
                    )
                }
                
            </ul>
        </HeaderContainer>
    )
}

export default Header;