import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/user/userSlice';
import { clearErrors as clearUserErrors} from './features/user/userSlice';
import Authentication from './features/user/Authentication';
import AllMedia from './pages/AllMedia';
import Navigation from './components/Navigation';
// import MyCollection from './pages/MyCollection';

// Ideas for non-logged in user:
// View all movies and shows that are in the database (no fetch calls)
// Be able to generate random movie/show title to see if they wanna watch it
// No profile page
// No collection page
// No connect page

// For logged in user:
// View all movies and shows that are in the database (no fetch calls) with option to add to collection
// Be able to generate random movie/show title to see if they wanna watch it with option to add to collection
// Profile page, shows user information
// Collection page, shows collections with option to click into one and edit
// Connect page with option to follow

function App() {
  const user = useSelector(state => state.user.data);
  const userErrors = useSelector(state => state.user.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const errors = [...userErrors];
  const errors = useMemo(() => userErrors, [userErrors]);
  const clearErrorsAction = useCallback(() => {
    dispatch(clearUserErrors(''));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!user) {
        const action = await dispatch(fetchCurrentUser());
        if (typeof action.payload !== 'string') {
          if (action.payload.flag === 'refresh') {
            // setToken(action.payload.jwt_token);
            console.log(action.payload);
          }
          // dispatch(fetchAllMovies());
        }
      } else {
        navigate('/discover');
      }
    })()
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (errors.length) {
      clearErrorsAction()
    }
  }, [errors, clearErrorsAction]);


  if (!user) return (
    <div id='welcome'>
      
      <Authentication />
    </div>
  )
  return (
    <div id='app'>
      <Navigation />
      <Outlet />
      {/* <MyCollection /> */}
    </div>
  )
}

export default App;
