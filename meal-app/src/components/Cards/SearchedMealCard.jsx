import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchedMealCardContainer = styled.div`
    position: relative;
    img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        /* cursor: pointer; */
    }
`;

const ButtonAction = styled.div`
    position: absolute;
    top: 7px;
    right: 8px;
    button{
        border-radius: 3px;
        cursor: pointer;
        padding: 7px 10px;
        background-color: #fff;
        border: none;
    }
`;


const SearchedMealCard = ({ idMeal, strMeal, strMealThumb }) => {
    const navigate = useNavigate();
    const handleRoute = (idMeal) => {
        navigate(`/meal/${idMeal}`);
    }

  return (
    <SearchedMealCardContainer>
        <img src={strMealThumb} alt={strMeal + "-image"} />
        <h3>{strMeal}</h3>
        <ButtonAction>
            <button onClick={() => handleRoute(idMeal)}>Show more</button>
        </ButtonAction>
    </SearchedMealCardContainer>
  )
}

export default SearchedMealCard