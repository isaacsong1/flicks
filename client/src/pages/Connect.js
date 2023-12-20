import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatchUser } from '../features/user/userSlice';
import { Button } from '@mui/material';
import '../styles/connect.css';

const Connect = () => {
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([]);
    const [myFollowing, setMyFollowing] = useState([]);
    const [currUserMedia, setCurrUserMedia] = useState(new Set());

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
    }, [user])

    const handleUnfollow = (userToUnfollowId) => {
        fetch(`/user/${user.id}/following/${userToUnfollowId}`, {method: "DELETE"})
    }

    const handleFollow = () => {

    }

    const handleViewProfile = (clickedUserId) => {
        const uniqueMovieImages = new Set()
        setCurrUserMedia(new Set())
        fetch(`/users/${clickedUserId}/movie_collections`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    if (data.length) {
                        for (let obj of data) {
                            uniqueMovieImages.add(obj.movie.image);
                        }
                        setCurrUserMedia(uniqueMovieImages);
                    }
                })
            }
        })
        openModal();
    }
    
    const followerArray = []
    const followingArray = []
    useEffect(() => {
        user.followings.forEach(following => {
            // console.log(following['following.username'])
            // followerArray.push(following['following.username'])
            // console.log(followerArray)
            setMyFollowing(currArray => [...currArray, following['following.username']])
        })
    }, [user])

    const openModal = () => {
        document.getElementById('user-modal').style.display = 'block';
    }

    const closeModal = () => {
        document.getElementById('user-modal').style.display = 'none';
        setCurrUserMedia(new Set());
    }

    let userMedia = []
    if (currUserMedia.size) {
        currUserMedia.forEach((value) => {
            userMedia.push(value)
        })
    } 

    const filteredUsers = allUsers.filter(individualUser => individualUser.id !== user.id)

    const mappedUsers = filteredUsers.map(individualUser => (
        <div key={individualUser.id} >
            <div class='connect-users' onClick={() => handleViewProfile(individualUser.id)} >
                <h3>{individualUser.username}</h3>
                <p>Followers: {individualUser.followers.length}</p>
                <p>Following: {individualUser.followings.length}</p>
            </div>
            {myFollowing.length ? (
                myFollowing.includes(individualUser.username) ? <button>Unfollow</button> : <button>Follow</button>
            ) : (
                null
            )}
        </div>
    ))

    return (
        <div>
            <h1>Connect with Others</h1>
            {mappedUsers}
            <div id='user-modal'>
                <Button variant='contained' id='close' onClick={() => closeModal()} >X</Button>
                {userMedia.length ? userMedia.map(image => <img src={image} alt={image} />) : <h3>No media added yet.</h3>}
            </div>
        </div>
    )
}

export default Connect