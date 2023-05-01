import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

const SearchedMealCardContainer = styled.div`
    position: relative;
    img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
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

const FavButton = styled.button`
    position: absolute;
    top: 7px;
    left: 8px;
    color: #fff;
    background-color: #242424;
    border: 2px solid #fff;
    border-radius: 3px;
    cursor: pointer;
    padding: 3px;
`;


const SearchedMealCard = ({ idMeal, strMeal, strMealThumb }) => {
    const [ isFavorites, setIsFavorites ] = useState(localStorage.getItem("favMeals") || []);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        if(localStorage.getItem("favMeals")){
            setIsFavorites(JSON.parse(localStorage.getItem("favMeals")));
        }
    }, []);

    const navigate = useNavigate();

    const handleRoute = (idMeal) => {
        navigate(`/meal/${idMeal}`);
    }

    const setFavoriteMeal = async (idMeal) => {
        const newFavMealData = {
            idMeal,
            strMeal,
            strMealThumb
        }
        // console.log(isFavorites);
        await axios.post(import.meta.env.VITE_APP_URL + "/api/favMeal", newFavMealData);
        alert("Meal added to favorites");
        localStorage.setItem("favMeals", JSON.stringify([...isFavorites, idMeal]));
        setIsFavorites([...isFavorites, idMeal]);
    };

  return (
    <SearchedMealCardContainer>
        <img src={strMealThumb} alt={strMeal + "-image"} />
        <h3>{strMeal}</h3>
        <ButtonAction>
            <button onClick={() => handleRoute(idMeal)}>Show more</button>
        </ButtonAction>
        {isLoggedIn && !isFavorites.includes(idMeal) && 
            <FavButton onClick={() => setFavoriteMeal(idMeal)}>
                <AiOutlineStar size={20}/>
            </FavButton>
        }
    </SearchedMealCardContainer>
  )
}

export default SearchedMealCard;