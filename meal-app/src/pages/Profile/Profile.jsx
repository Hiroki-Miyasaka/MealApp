import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../reducers/userSlice.js';
import axios from 'axios';

const ProfileContainer = styled.div`
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

const FavoriteMealsLayout = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  text-align: center;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn){
      dispatch(getMe());
    }

    console.log(user);
  }, [dispatch]);

  


  return (
    <ProfileContainer>
      {console.log("Profile",isLoggedIn)}
      <h1>{user && user.userName}</h1>
      
      
    </ProfileContainer>
  )
}

export default Profile