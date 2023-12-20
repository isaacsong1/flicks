import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/user/userSlice';
import { clearErrors as clearUserErrors} from './features/user/userSlice';
import Authentication from './features/user/Authentication';
import AllMedia from './pages/AllMedia';
import Alertbar from "./components/Alertbar";
import Navigation from './components/Navigation';
// import { createTheme } from '@mui/material/styles';

// import MyCollection from './pages/MyCollection';

function App() {
  const user = useSelector(state => state.user.data);
  const userErrors = useSelector(state => state.user.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useMemo(() => userErrors, [userErrors]);
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");
  const clearErrorsAction = useCallback(() => {
    dispatch(clearUserErrors(''));
  }, [dispatch]);
  // MyCollection States
  const [movieMode, setMovieMode] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieCollectionNames, setMovieCollectionNames] = useState([]);
  const [showCollectionNames, setShowCollectionNames] = useState([]);
  const [shows, setShows] = useState([]);
  const [movieCollectionByName, setMovieCollectionByName] = useState({});
  const [showCollectionByName, setShowCollectionByName] = useState({});
  const [discoverPage, setDiscoverPage] = useState(false);

  // AlertBar helpers
  const handleNewAlert = useCallback((alert) => {
    setAlert(alert);
  }, []);

  const handleAlertType = (type) => setAlertType(type);

  // MyCollection Helpers
  useEffect(() => {
    (async () => {
      if (!user) {
        const action = await dispatch(fetchCurrentUser());
        if (typeof action.payload !== 'string') {
          if (action.payload.flag === 'refresh') {
            // setToken(action.payload.jwt_token);
            console.log(action.payload);
          } else {
            setDiscoverPage(true);
            navigate(`/users/${action.payload.user.id}/mycollection`);
          }
        }
      } else {
        setDiscoverPage(true);
        navigate(`/users/${user.id}/mycollection`);
        // location/history
      }
    })()
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (errors.length) {
      clearErrorsAction()
    }
  }, [errors, clearErrorsAction]);

  
  const ctx = { discoverPage, setDiscoverPage, handleNewAlert, handleAlertType, movieMode, setMovieMode, movies, setMovies, movieCollectionNames, setMovieCollectionNames, showCollectionNames, setShowCollectionNames, shows, setShows, movieCollectionByName, setMovieCollectionByName, showCollectionByName, setShowCollectionByName }
  
  if (!user) return (
    <div id='welcome'>
      {alert && (
        <Alertbar
          alert={alert}
          handleNewAlert={handleNewAlert}
          alertType={alertType}
          handleAlertType={handleAlertType}
        />
      )}
      <Authentication handleNewAlert={handleNewAlert} handleAlertType={handleAlertType} />
    </div>
  )
  return (
    <div id='app'>
      {alert && (
        <Alertbar
          alert={alert}
          handleNewAlert={handleNewAlert}
          alertType={alertType}
          handleAlertType={handleAlertType}
        />
      )}
      <Navigation setDiscoverPage={setDiscoverPage} />
      <Outlet context={ctx} />
      {/* <MyCollection /> */}
    </div>
  )
}

export default App;
