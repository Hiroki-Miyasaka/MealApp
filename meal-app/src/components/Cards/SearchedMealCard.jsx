import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchedMealCardContainer = styled.div`
    img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        cursor: pointer;
    }
`;

const SearchedMealCard = ({ idMeal, strMeal, strMealThumb }) => {
  return (
    <SearchedMealCardContainer>
        <img src={strMealThumb} alt={strMeal + "-image"} />
        <h3>{strMeal}</h3>
    </SearchedMealCardContainer>
  )
}

export default SearchedMealCard