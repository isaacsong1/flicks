import React, { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchRegister } from './userSlice';
// import * as snackbar from "snackbar";
import "../../styles/authentication.css";
import {jwtDecode} from 'jwt-decode';

function Authentication({handleNewAlert, handleAlertType}) {
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState(false);
    const user = useSelector(state => state.user.data);
    const [userGoogle, setUserGoogle] = useState({});
    const dispatch = useDispatch();
  // const history = useHistory();
    const googleAuthURL = "/googleauth";

    const CLIENT_ID = process.env.REACT_APP_G_CLIENT_ID;

    const handleClick = () => setSignUp((signUp) => !signUp);

    const handleCallbackResponse = async (response) => {
        console.log("Encoded JWT ID Token: " + response.credential);
        const userObjectG = jwtDecode(response.credential);
        console.log(userObjectG);
        const userObject = {
            "username": userObjectG.given_name,
            "email": userObjectG.email,
        }

        // setUserGoogle(userObject);
        const action = await dispatch(fetchRegister({url: googleAuthURL, values: {...userObject, id_token: response.credential}}))
        if (typeof action.payload !== 'string') {
            // setToken(action.payload.jwt_token);
            // setRefreshToken(action.payload.refresh_token);
            // navigate(`/users/${user.name}/mycollection`);
            navigate(`/users/${action.payload.id}/mycollection`)
            // dispatch(fetchAllMovies());
        } else {
            // show error (toast or snackbar)
        }
    }

    const initGoogleSignIn = () => {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleCallbackResponse,
            });
            window.google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: 'outline', size: 'large'}
            )
        } else {
            setTimeout(initGoogleSignIn, 200);
        }
    }
    useEffect(() => {
        /* global google */
        
        const loadGoogleScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://apis.google.com/js/platform.js";
                script.async = true;
                script.defer = true;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        };

        loadGoogleScript().then(() => {
            initGoogleSignIn();
        })
    }, [])

    const signUpSchema = yup.object().shape({
        username: yup.string().required("Please enter a username"),
        email: yup
            .string()
            .email("Must be a valid email")
            .required("Please enter a user email"),
        password: yup
            .string()
            .required("Please enter a user password")
            .min(12, "Password is too short - should be 12 characters minimum."),
    });

    const logInSchema = yup.object().shape({
        email: yup
            .string()
            .email("Must be a valid email")
            .required("Please enter a user email"),
        password: yup.string().required("Please enter a password"),
    });

    const url = signUp ? "/register" : "/login";

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: signUp ? signUpSchema : logInSchema,
        onSubmit: async (values) => {
            const action = await dispatch(fetchRegister({url, values}))
            if (typeof action.payload !== 'string') {
                // setToken(action.payload.jwt_token);
                // setRefreshToken(action.payload.refresh_token);
                handleNewAlert("Welcome!");
                handleAlertType("success");
                navigate(`/users/${user.id}/mycollection`);
                // dispatch(fetchAllMovies());
            } else {
                handleNewAlert(action.payload);
                handleAlertType("error");
            }
        }
    });
    return (
        <div id="account-form">
            <div id='content'>
                <h1>Flicks</h1>
                <div id="register-switch">
                    {/* {signUp ? <h2>Create your free account</h2> : <h2>Log in here</h2>} */}
                    {/* <h3>{signUp ? 'Already a member?' : 'Not a member?'}</h3>
                    <button onClick={handleClick}>{signUp ? 'Log In!' : 'Register now!'}</button> */}
                    {signUp ? <button class='signup' onClick={() => handleClick(true)} >Login</button> : <button id='underline' class='signup' >Login</button>}
                    {signUp ? <button id='underline' class='signup' >Register</button> : <button class='signup' onClick={() => handleClick(false)} >Register</button>}
                    {/* <button class='signup'>Register</button> */}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div class='inputs'>
                        <label htmlFor='email'>Email</label>
                        <input class='box' id='email' type='text' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className="error-message show">{formik.errors.email}</div> : null}
                    </div>
                    {signUp &&(
                        <div class='inputs'>
                            <label htmlFor='username'>Username</label>
                            <input class='box' type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                        </div>
                    )}
                    <div class='inputs'>
                        <label htmlFor='password'>Password</label>
                        <input class='box' type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ? <div className="error-message show">{formik.errors.password}</div> : null}
                    </div>
                    <input id='login' type='submit' value={signUp ? 'Sign Up' : 'Log In'} />
                </form>
            </div>
            <div id='signInDiv'></div>
            
        </div>
    )
}

export default Authentication;
