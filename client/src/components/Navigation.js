import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import '../styles/navigation.css';

const Navigation = ({setDiscoverPage}) => {
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE' })
        .then(() => {
            dispatch(logout());
            navigate('/');
        })
        .catch(error => console.log(error))
    }

    return (
        <nav class='navbar'>
            <div class='link-left' >
                <NavLink class='link' to={"/discover"} >
                    {setDiscoverPage(true)}
                    Discover
                </NavLink>
                <NavLink class='link' to={"/connect"} >
                    {setDiscoverPage(false)}
                    Connect
                </NavLink>
                <NavLink class='link' to={`/users/${user.id}/mycollection`} >
                    {setDiscoverPage(false)}
                    My Collection
                </NavLink>
            </div>
            <div class='link-right' >
                <NavLink class='link logout' to={'/'} onClick={handleLogout} >
                    {setDiscoverPage(false)}
                    Logout
                </NavLink>
                <NavLink class='link profile' to={`/users/${user.id}/profile`} >
                    {setDiscoverPage(false)}
                    View Profile
                </NavLink>
            </div>
        </nav>
    )
}

export default Navigation
