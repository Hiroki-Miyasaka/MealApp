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

const Information = styled.div`
  text-align: center;
  h2{
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const Instraction = styled.div`
  margin-top: 3rem;
  text-align: left;
  p{
    text-align:left;
    text-indent: 1rem;
  }
`;


const Meal = () => {
  const [meal, setMeal] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_MEAL_URL + `${id}`)
    .then((res) => {
      setMeal(res.data.meals[0]);
      // console.log(res.data.meals);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id]);

  return (
    <MealContainer>
      <h1>{meal.strMeal}</h1>
      <MealImageContainer>
        <img src={meal.strMealThumb} alt={meal.strMeal + "-image"}/>
      </MealImageContainer>
      <Line></Line>
      <Information>
        <h2>Meal Information</h2>
        <h3>Area: {meal.strArea}</h3>
        <h3>Category: {meal.strCategory}</h3>
        <Instraction>
          <h3>Instraction</h3>
          <p>{meal.strInstructions}</p>
        </Instraction>
      </Information>
    </MealContainer>
  )
}

export default Meal