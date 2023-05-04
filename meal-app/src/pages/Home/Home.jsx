import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchSearchedMeal } from "../../reducers/mealSlice";
import styled from "styled-components";
import CategoryCard from "../../components/Cards/CategoryCard";
import SearchedMealCard from "../../components/Cards/SearchedMealCard";

const HomeContainer = styled.div`
  padding: 1rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
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

const CategoriesLayout = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  text-align: center;
`;

const SearchLayout = styled(CategoriesLayout)`
  gap: 5rem;
  margin-bottom: 5rem;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  input {
    padding: 0.5rem 3rem;
    outline: none;
    border-radius: 5px;
    border: solid 2px #777777;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const categories = useSelector((state) => state.meal.categories);
  const searchedMeal = useSelector((state) => state.meal.searchedMeal);
  const [favorites, setFavorites] = useState(
    user && JSON.parse(localStorage.getItem(`${user.userName}-favMeal`)) || []
  );
  const [meal, setMeal] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSearchedMeal(meal));
  }, [meal]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const setFavoriteMeal = async (idMeal) => {
    setFavorites([...favorites, idMeal]);

    localStorage.setItem(
        `${user.userName}-favMeal`,
        JSON.stringify([...favorites, idMeal])
    );
  };

  return (
    <HomeContainer>
      <TitleSection>Search Meal</TitleSection>
      <SearchSection>
        <form onSubmit={handleSubmit}>
          <label />
          <input
            type="text"
            placeholder="type meal name"
            onChange={(e) => setMeal(e.target.value)}
            value={meal}
          />
        </form>
      </SearchSection>
      <SearchLayout>
        {searchedMeal &&
          searchedMeal.map((meal) => (
            <SearchedMealCard key={meal.idMeal} {...meal} callback={setFavoriteMeal} favorites={favorites}  />
          ))}
      </SearchLayout>

      <TitleSection>Categories</TitleSection>
      <CategoriesLayout>
        {categories.length > 0 &&
          categories.map((category) => (
            <CategoryCard key={category.idCategory} {...category} />
          ))}
      </CategoriesLayout>
    </HomeContainer>
  );
};

export default Home;