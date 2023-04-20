import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SearchedMealCard from '../../components/Cards/SearchedMealCard';

const CategoryContainer = styled.div`
    padding: 1rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Layout = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 6rem;
    text-align: center;
    padding: 1rem;
    margin-bottom: 10rem;
`;

const TitleSection = styled.h1`
    width: 100%;
    font-size: 3rem;
    border-bottom: 1px solid #fff;
    padding-bottom: 1rem;
    margin: 1.4rem 0;
`;


const Category = () => {
    const [ searchParams ] = useSearchParams();
    const categoryName = searchParams.get("mealcategory");

    const [meals, setMeals] = useState([]);
    
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_FILTER_BY_CATEGORY_URL + `${categoryName}`)
        .then((res) => {
            setMeals(res.data.meals);
            // console.log(res.data.meals);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [categoryName]);

  return (
    <CategoryContainer>
        <TitleSection>Meals</TitleSection>
        <Layout>
        {meals.map((meal) => (
            <SearchedMealCard
                key={meal.idMeal}
                {...meal}
            />
        ))}
        </Layout>
    </CategoryContainer>
  )
}

export default Category;