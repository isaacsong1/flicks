import React from 'react';
import { NavLink, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';

const Navigation = () => {
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
            <div>
                <NavLink class='link' to={"/discover"} >
                    Discover
                </NavLink>
                <NavLink class='link' to={"/connect"} >
                    Connect
                </NavLink>
                <NavLink class='link' to={`/users/${user.id}/mycollection`} >
                    My Collection
                </NavLink>
            </div>
            <div>
                <NavLink class='link logout' to={'/'} onClick={handleLogout} >
                    Logout
                </NavLink>
                <NavLink class='link profile' to={`/users/${user.id}/profile`} >
                    View Profile
                </NavLink>
            </div>
        </nav>
    )
}

export default Navigation
// {/* to={'/discover'} */}
// {/* to={'/connect'} */}
// {/* to={'/users/${user.id}/mycollection'} */}
// {/* to={'/users/${user.id}/profile'} */}