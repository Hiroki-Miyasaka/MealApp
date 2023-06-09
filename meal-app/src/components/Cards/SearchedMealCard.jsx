import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addNewFavorite, removeFavorite } from "../../reducers/favoriteSlice.js";
import axios from "axios";

const SearchedMealCardContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const ButtonAction = styled.div`
  position: absolute;
  top: 7px;
  right: 8px;
  button {
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
//   const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const favorites = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoute = (idMeal) => {
    navigate(`/meal/${idMeal}`);
  };

//   const setFavoriteMeal = async (idMeal) => {
//     console.log("call setFavoriteMeal");
//     const newFavMealData = {
//       idMeal,
//       strMeal,
//       strMealThumb,
//     };

//     callback(idMeal);

//     await axios.post(
//       import.meta.env.VITE_APP_URL + "/api/favMeal", newFavMealData);
//   };

  const addFavoriteMeal = () => {
    console.log("call addFavoriteMeal");
    const newFavMealData = {
        idMeal,
        strMeal,
        strMealThumb
    };
    dispatch(addNewFavorite(newFavMealData));
  };
  
  const deleteFavoriteMeal = (idMeal) => {
    console.log("call deleteFavoriteMeal", idMeal);
    dispatch(removeFavorite(idMeal));
  }

//   const deleteFavoriteMeal = async (idMeal) => {
//     console.log("call deleteFavoriteMeal", idMeal);
//     onDelete(idMeal);
//     console.log({idMeal});
//     await axios.delete(import.meta.env.VITE_APP_URL + "/api/favMeal", { data: { idMeal } });
//   }

  return (
    <SearchedMealCardContainer>
      <img src={strMealThumb} alt={strMeal + "-image"} />
      <h3>{strMeal}</h3>
      <ButtonAction>
        <button onClick={() => handleRoute(idMeal)}>Show more</button>
      </ButtonAction>
      {(isLoggedIn && !favorites.map((favorite) => favorite.idMeal).includes(idMeal)) ? (
        <FavButton onClick={addFavoriteMeal}>
          <AiOutlineStar size={20} />
        </FavButton>
      ) : 
        <FavButton onClick={() => deleteFavoriteMeal(idMeal)}>
            <AiFillStar size={20}/>
        </FavButton>
      }
    </SearchedMealCardContainer>
  );
};

export default SearchedMealCard;