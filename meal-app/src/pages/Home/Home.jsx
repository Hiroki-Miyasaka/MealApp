import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../reducers/mealSlice';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.meal.categories);


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

  return (
    <div>
        {
            categories.length > 0 &&
            categories.map((category) => {
                // console.log(category);
            })
        }
    </div>
  )
}

export default Home;