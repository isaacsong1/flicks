import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams, useNavigate  } from 'react-router-dom';
import { fetchCurrentUser, fetchPatchUser, fetchDeleteUser } from '../features/user/userSlice';
import { clearErrors as clearUserErrors} from '../features/user/userSlice';
import { useFormik } from "formik"
import * as yup from "yup"
import { Button } from '@mui/material';
import '../styles/profile.css';

const Profile = () => {
    const user = useSelector(state => state.user.data);
    const userErrors = useSelector(state => state.user.errors);
    const dispatch = useDispatch();
    const errors = useMemo(() => userErrors, [userErrors]);
    const clearErrorsAction = useCallback(() => {
        dispatch(clearUserErrors(''));
    }, [dispatch]);
    const {handleNewAlert, handleAlertType} = useOutletContext();
    const [editMode, setEditMode] = useState(false);
    const { id } = useParams();
    const [followerList, setFollowerList] = useState(false);
    const [followingList, setFollowingList] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (errors.length) {
            clearErrorsAction()
            }
    }, [errors, clearErrorsAction]);


    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleFollowerList = (boolean) => {
        setFollowerList(boolean);
    }

    const handleFollowingList = (boolean) => {
        setFollowingList(boolean);
    }

    const profileSchema = yup.object().shape({
        username: yup.string()
        .required("Please enter a username")
        .min(3, "Username is too short - should be 3 characters minimum")
        .max(20, "Username is too long - should be 20 characters maximum"),
        location: yup.string()
        .min(2, "Location is too short - should be 2 characters minimum")
        .max(15, "Location is too long - should be 15 characters maximum"),
        bio: yup.string()
        .min(5, "Bio is too short - should be 5 characters minimum")
        .max(100, "Bio is too long - should be 100 characters maximum")
    })
    const url = `/users/${user.id}`

    const formik = useFormik({
        initialValues: {
            username: user.username,
            location: user.location,
            bio: user.bio
        },
        validationSchema: profileSchema,
        onSubmit: async (values) => {
            const checkToken = await dispatch(fetchCurrentUser())
            if (typeof checkToken.payload !== 'string') {
                const action = await dispatch(fetchPatchUser({url, values}))
                if (typeof action.payload !== 'string') {
                    handleEditMode();
                    handleNewAlert("Profile updated!");
                    handleAlertType("success");
                } else {
                    handleNewAlert("Profile could not be updated");
                    handleAlertType("error");
                }
            } else {
                handleNewAlert("Token has expired");
                handleAlertType("error");
            }   

        }
    })
    


    const handleConfirmDelete = (boolean) => {
        setConfirmDelete(boolean);
    }

    const handleDelete = () => {
        dispatch(fetchDeleteUser(`/users/${user.id}`));
        handleNewAlert("Profile has been deleted");
        handleAlertType("success");
        navigate('/');
    }

    return (
        <div class='profile'>
            <div class='profile-content'>
                <h1>{`${user.username}'s Profile`}</h1>
                <div className="profile-container" >
                {editMode ? (
                    <div>
                        <form className="profile-info" onSubmit={formik.handleSubmit}>
                            <div class='inputs'>
                                <div class='labels' >
                                    <label htmlFor='username'>Username: </label>
                                </div>
                                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                            </div>
                            <div class='inputs'>
                                <div class='labels' >
                                    <label htmlFor='location'>Location: </label>
                                </div>
                                <input type='text' name='location' value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.location && formik.touched.location ? <div className="error-message show">{formik.errors.location}</div> : null}
                            </div>
                            <div class='inputs'>
                                <div class='labels' >
                                    <label htmlFor='bio'>Bio: </label>
                                </div>
                                <input type='text' name='bio' value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.bio && formik.touched.bio ? <div className="error-message show">{formik.errors.bio}</div> : null}
                            </div>
                            <Button variant='contained' type='submit' onClick={setEditMode}>Save Profile</Button>
                        </form>
                        {confirmDelete ? (
                            <div>
                                {'Are you sure? '}
                                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={handleDelete}>Yes</Button>
                                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={() => handleConfirmDelete(false)}>No</Button>
                            </div>
                        ) : (
                            <Button variant='contained' onClick={() => handleConfirmDelete(true)}>Delete Account</Button>
                        )}
                    </div>
                        ) : (
                    <div className="profile-info">
                        <div class='profile-header'>
                            <div className="profile-button">
                                {user.id === parseInt(id) ? (editMode ? null :  <Button variant='contained' className='edit-save-btn' onClick={handleEditMode} >Edit Profile</Button>) : null}
                            </div>
                            <div class='follow-list'>
                                {followerList ? (
                                    <div class='follow-modal'>
                                        <div class='follow-button'>
                                            <Button onClick={() => handleFollowerList(false)} >X</Button>
                                        </div>
                                        {user.followers.map(follower => (<h3>{follower['follower.username']}</h3>))}
                                    </div>
                                ) : (
                                    <div class='follower-box' onClick={() => handleFollowerList(true)} >
                                        <p>Followers</p>
                                        <p>{user.followers.length}</p>
                                    </div>
                                )}
                                {followingList ? (
                                    <div class='follow-modal'>
                                        <div class='follow-button'>
                                            <Button onClick={() => handleFollowingList(false)} >X</Button>
                                        </div>
                                        {user.followings.map(following => (<h3>{following['following.username']}</h3>))}
                                    </div>
                                ) : (
                                    <div class='following-box' onClick={() => handleFollowingList(true)} >
                                        <p>Following</p>
                                        <p>{user.followings.length}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="info-icon">
                            <div class='user-info'>
                                <p><b>Email:</b> {user.email}</p>
                                <p><b>Location:</b> {user.location}</p>
                                <p><b>Bio:</b> {user.bio}</p>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Profile