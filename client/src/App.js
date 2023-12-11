import React, { useEffect, useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/user/userSlice';
import { clearErrors as clearUserErrors} from './features/user/userSlice';
import { setToken } from './utils/main';
import AllMedia from './pages/AllMedia';
import Naviation from './components/Navigation';

// Goal for tomorrow:
// Create userSlice and understand it
// Create some components with JSX and get close to finishing many components
// Set myself up good for Monday so I am close to MVP's before the week starts

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
  const dispatch = useDispatch()
  const errors = [...userErrors];
  const clearErrorsAction = useCallback(() => {
    dispatch(clearUserErrors(''));
  }, [dispatch, clearUserErrors]);

  // useEffect(() => {
  //   (async () => {
  //     if (!user) {
  //       const action = await dispatch(fetchCurrentUser());
  //       if (typeof action.payload !== 'string') {
  //         if (action.payload.flag === 'refresh') {
  //           setToken(action.payload.jwt_token);
  //         }
  //         // dispatch(fetchAllMovies());
  //       }
  //     }
  //   })()
  // }, [user]);

  // useEffect(() => {
  //   if (errors.length) {
  //     clearErrorsAction()
  //   }
  // }, [errors, clearErrorsAction]);

  if (!user) return (
    <>
      <Naviation />
      <AllMedia />
    </>
  )
}

export default App;
