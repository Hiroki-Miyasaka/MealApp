import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../reducers/mealSlice';
import styled from 'styled-components';
import CategoryCard from '../../components/Cards/CategoryCard';


const HomeContainer = styled.div`
        padding: 1rem 2rem;
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1{
            text-align: start;
        }
    `;


const TitleSection = styled.h1`
    width: 100%;
    font-size: 3rem;
    border-bottom: 1px solid #fff;
    padding-bottom: 1rem;
    margin: 1.4rem 0;
`;

const Layout = styled.div`
    display: grid;
    width: 100%;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    text-align: center;
`;

const Home = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.meal.categories);


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    

    

    

  return (
    <HomeContainer>

        <TitleSection>Categories</TitleSection>
        <Layout>
            {
                categories.length > 0 &&
                categories.map((category) => (
                    <CategoryCard
                        key={category.idCategory}
                        {...category}
                    />
                ))
            }
        </Layout>
        
    </HomeContainer>
  )
}

export default Home;