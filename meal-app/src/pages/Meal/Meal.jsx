import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const MealContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  max-width: 1100px;
  margin: 0 auto;
  h1{
    font-size: 5rem;
  }
`;

const MealImageContainer = styled.div`
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background:#fff;
  margin: 3rem 0;
`;

const InformationContainer = styled.div`
  text-align: center;
  h2{
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const InstractionContainer = styled.div`
  margin-top: 3rem;
  text-align: left;
  p{
    text-align:left;
    text-indent: 1rem;
  }
`;

const IngredientsContainer = styled.div`
  margin-top: 3rem;
  text-align: left;
  p{
    display: inline;
    margin: 0 0.5rem;
  }
`;

const SourceContainer = styled.div`
  margin-top: 7rem;
  a{
    color: #242424;
    text-decoration: none;
    background-color: #fff;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    box-shadow: 0 5px 0 rgba(0,0,0,0.3);
    &:hover{
      box-shadow: none;
      transform: translate3d(0, 5px, 0);
      transition-duration: 0.3s;
      opacity: 0.8;
    }
  }
`;


const Meal = () => {
  const [meal, setMeal] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_MEAL_URL + `${id}`,
    {
      headers:{
          "Authorization":null
      }
    }
    )
    .then((res) => {
      setMeal(res.data.meals[0]);
      // console.log(res.data.meals[0]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id]);

  const getIngredients = (data) => {
    const ingredients = [];
    for(const key in data){
      if(key.startsWith("strIngredient") && data[key] !== ""){
        // console.log(data[key]);
        ingredients.push(data[key]);
      }
    }
    // console.log("ingredients" ,ingredients);
    return ingredients;
  }

  return (
    <MealContainer>
      <h1>{meal.strMeal}</h1>
      <MealImageContainer>
        <img src={meal.strMealThumb} alt={meal.strMeal + "-image"}/>
      </MealImageContainer>
      <Line></Line>
      <InformationContainer>
        <h2>Meal Information</h2>
        <h3>Area: {meal.strArea}</h3>
        <h3>Category: {meal.strCategory}</h3>
        <InstractionContainer>
          <h3>Instraction</h3>
          <p>{meal.strInstructions}</p>
        </InstractionContainer>
        <IngredientsContainer>
          <h3>Ingredients</h3>
          {
            getIngredients(meal).map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))
          }
        </IngredientsContainer>
        <SourceContainer>
          {
            meal.strSource &&
            <a href={meal.strSource} target='_blank'><b>Source</b></a>
          }
        </SourceContainer>
      </InformationContainer>
    </MealContainer>
  )
}

export default Meal