import React, { useState, useEffect } from 'react'
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

const SearchSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        padding: 0.5rem 3rem;
        outline: none;
        border-radius: 5px;
    }
`;

const Home = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.meal.categories);

    const [ meal, setMeal ] = useState("");

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    

    

    

  return (
    <HomeContainer>
        <TitleSection>Search Meal</TitleSection>
        <SearchSection>
            <form>
                <label/>
                <input type='text' placeholder='type meal name' onChange={(e) => setMeal(e.target.value)} value={meal}/>
            </form>
        </SearchSection>

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