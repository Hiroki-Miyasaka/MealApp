import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CategoryCardContainer = styled.div`
    img{
        border-radius: 5px;
        cursor: pointer;
    }
    p {
        text-align: left;
        text-indent: 1rem;
    }
    button{
        border: none;
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
    }
`;


const CategoryCard = ({ idCategory, strCategory, strCategoryDescription, strCategoryThumb }) => {
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();
    const handleRoute = (id) => {
        navigate(`/category/${idCategory}`);
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }
 
  return (
    <CategoryCardContainer>
        <img src={strCategoryThumb} alt={strCategory + "-image"} onClick={handleToggle} />
        <h3>{strCategory}</h3>
        {toggle && (
            <>
                <p>{strCategoryDescription}</p>
                <button onClick={() => handleRoute(idCategory)}>See more</button>
            </>
        )}
    </CategoryCardContainer>
  )
}

export default CategoryCard