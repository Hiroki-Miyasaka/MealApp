import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    return(
        <HeaderContainer>
            <h1>Logo</h1>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/register"}>Register</Link>
                </li>
                {/* <li>
                    <Link to={"/profile"}>Profile</Link>
                </li> */}
            </ul>
        </HeaderContainer>
    )
}

export default Header;