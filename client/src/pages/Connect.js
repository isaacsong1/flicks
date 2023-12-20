import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate, useHistory } from "react-router-dom";
import { setUser } from '../features/user/userSlice';
import '../styles/connect.css';

const Connect = () => {
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([]);
    const [myFollowing, setMyFollowing] = useState([]);
    const [currUserMedia, setCurrUserMedia] = useState(new Set());
    const [dummyState, setDummyState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/users')
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(setAllUsers)
            } else {
                console.log('fetch all users error')
            }
        })
    }, [user, dummyState])

    const handleViewProfile = (clickedUserId) => {
        const uniqueMovieImages = new Set()
        const uniqueShowImages = new Set()
        setCurrUserMedia(new Set())
        fetch(`/users/${clickedUserId}/movie_collections`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    if (data.length) {
                        for (let obj of data) {
                            if (obj.movie) {
                                uniqueMovieImages.add(obj.movie['image']);
                            }
                        }
                        setCurrUserMedia(uniqueMovieImages);
                    }
                })
            }
        })
        fetch(`/users/${clickedUserId}/show_collections`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    if (data.length) {
                        for (let obj of data) {
                            if (obj.show) {
                                uniqueShowImages.add(obj.show['image']);
                            }
                        }
                        setCurrUserMedia(new Set([...uniqueMovieImages, ...uniqueShowImages]));
                    }
                })
            }
        })
        openModal();
    }
    
    useEffect(() => {
        // const followingSet = new Set()
        user.followings.forEach(following => {
            setMyFollowing(currFollowing => [...currFollowing, following['following.username']])
        })
        // setMyFollowing([followingSet])
    }, [user])

    const openModal = () => {
        document.getElementById('user-modal').style.display = 'block';
    }

    const closeModal = () => {
        document.getElementById('user-modal').style.display = 'none';
        setCurrUserMedia(new Set());
    }

    const handleUnfollow = (unfollowId, unfollowUsername) => {
        fetch(`/user/${user.id}/following/${unfollowId}`, {method: "DELETE"})
        .then(() => {
            setMyFollowing(currFollowing => currFollowing.filter(username => username !== unfollowUsername))
            // setDummyState(currState => !currState);
            fetch(`/users/${user.id}`)
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(data => dispatch(setUser({...data})))
                    navigate('/connect')
                }
            })
        })
    }

    const handleFollow = (followId, followUsername) => {
        fetch(`/user/${user.id}/following/${followId}`, {method: "POST"})
        .then(() => {
            setMyFollowing(currFollowing => [...currFollowing, followUsername])
            // setDummyState(currState => !currState);
            fetch(`/users/${user.id}`)
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(data => dispatch(setUser({...data})))
                    navigate('/connect')
                }
            })
        })
    }
    console.log(myFollowing)

    let userMedia = []
    if (currUserMedia.size) {
        currUserMedia.forEach((value) => {
            userMedia.push(value)
        })
    } 

    const filteredUsers = allUsers.filter(individualUser => individualUser.id !== user.id)

    const mappedUsers = filteredUsers.map(individualUser => (
        <div key={individualUser.id} class='user-box'>
            <div class='connect-users'  onClick={() => handleViewProfile(individualUser.id)}>
                <h3>{individualUser.username}</h3>
                <p>Followers: {individualUser.followers.length}</p>
                <p>Following: {individualUser.followings.length}</p>
            </div>
            <div class='follow-btns'>
                {myFollowing.length ? (
                    myFollowing.includes(individualUser.username) ? <Button variant='contained' onClick={() => handleUnfollow(individualUser.id, individualUser.username)} >Unfollow</Button> : <Button variant='contained' onClick={() => handleFollow(individualUser.id, individualUser.username)} >Follow</Button>
                ) : (
                    <Button variant='contained' onClick={() => handleFollow(individualUser.id, individualUser.username)} >Follow</Button>
                )}
            </div>
        </div>
    ))

    return (
        <div class='connect'>
            <div class='connect-content'>
                <h1>Connect with Others</h1>
                {mappedUsers}
                <div id='user-modal'>
                    <div class='modal-size'>
                        <div class='modal-btn'>
                            <Button variant='contained' id='close' onClick={() => closeModal()} >X</Button>
                        </div>
                        <h1 class='modal-title'>Added Media</h1>
                        <div class='modal-img'>
                            {userMedia.length ? userMedia.map(image => <img src={image} alt={image} />) : <h3>No media added yet.</h3>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Connect