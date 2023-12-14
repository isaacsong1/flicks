import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams, useNavigate  } from 'react-router-dom';
import { fetchPatchUser, fetchDeleteUser } from '../features/user/userSlice';
import { clearErrors as clearUserErrors} from '../features/user/userSlice';
import { useFormik, Form } from "formik"
import * as yup from "yup"

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
            // before patch
            // await dispatch(checkToken())
            // if failed, dispatch(refreshToken())
            // if success, fire dispatch below
            const action = await dispatch(fetchPatchUser({url, values}))
            if (typeof action.payload !== 'string') {
                // resp.json().then(updateUser)
                console.log('response was ok from user patch');
                handleNewAlert("Profile updated!");
                handleAlertType("success");
            } else {
                // resp.json().then(errorObj => handleNewAlert(errorObj.error))
                console.log('response was not ok from user patch');
                handleNewAlert("Profile could not be updated");
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
        <div>
            <h1>{`${user.username}'s Profile`}</h1>
            {/* <button onClick={handleEditMode} >Edit Profile</button> */}
            <div className="profile-container" >
            {editMode ? (
                <div>
                    <form className="profile-info" onSubmit={formik.handleSubmit}>
                        <div class='inputs'>
                            <label htmlFor='username'>Username: </label>
                            <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                        </div>
                        <div class='inputs'>
                            <label htmlFor='location'>Location: </label>
                            <input type='text' name='location' value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.location && formik.touched.location ? <div className="error-message show">{formik.errors.location}</div> : null}
                        </div>
                        <div class='inputs'>
                            <label htmlFor='bio'>Bio: </label>
                            <input type='text' name='bio' value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.bio && formik.touched.bio ? <div className="error-message show">{formik.errors.bio}</div> : null}
                        </div>
                        <input className='edit-save-btn' type='submit' value={'Save Profile'} onClick={setEditMode} />
                    </form>
                    {confirmDelete ? (
                        <div>
                            {'Are you sure? '}
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={() => handleConfirmDelete(false)}>No</button>
                        </div>
                    ) : (
                        <button onClick={() => handleConfirmDelete(true)}>Delete Account</button>
                    )}
                </div>
                    ) : (
                <div className="profile-info">
                    {followerList ? (
                        <div>
                            <button onClick={() => handleFollowerList(false)} >X</button>
                            {user.followers.map(follower => (<h3>{follower['follower.username']}</h3>))}
                        </div>
                    ) : (
                        <div onClick={() => handleFollowerList(true)} >
                            Followers: {user.followers.length}
                        </div>
                    )}
                    {followingList ? (
                        <div>
                            <button onClick={() => handleFollowingList(false)} >X</button>
                            {user.followings.map(following => (<h3>{following['following.username']}</h3>))}
                        </div>
                    ) : (
                        <div onClick={() => handleFollowingList(true)} >
                            Following: {user.followings.length}
                        </div>
                    )}
                    <div className="info-icon">
                        <div>
                            <p><b>Username:</b> {user.username}</p>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Location:</b> {user.location}</p>
                            <p><b>Bio:</b> {user.bio}</p>
                        </div>
                    </div>
                    <div className="profile-button">
                        {user.id === parseInt(id) ? (editMode ? null :  <button className='edit-save-btn' onClick={handleEditMode} >Edit Profile</button>) : null}
                    </div>
                </div>
            )}
        </div>
        
        
        </div>
    )
}

export default Profile