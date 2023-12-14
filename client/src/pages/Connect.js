import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatchUser } from '../features/user/userSlice';

const Connect = () => {
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([])
    const [myFollowing, setMyFollowing] = useState([])

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
    
    // const followerArray = []
    useEffect(() => {
        user.followings.forEach(following => setMyFollowing(myFollower => [...myFollower, following['follower.username']]))
    }, [user])
    // debugger;

    const filteredUsers = allUsers.filter(individualUser => individualUser.id !== user.id)

    const mappedUsers = filteredUsers.map(individualUser => (
        <div>
            <h3>{individualUser.username}</h3>
            <p>Followers: {individualUser.followers.length}</p>
            <p>Following: {individualUser.followings.length}</p>
            {myFollowing.includes(individualUser.username) ? (
                <button onClick={() => handleUnfollow (individualUser.id)} >Unfollow</button>
                ) : (
                <button onClick={handleFollow} >Follow</button>
            )}
        </div>
    ))

    return (
        <div>
            <h1>Connect with Others</h1>
            {mappedUsers}
        </div>
    )
}

export default Connect