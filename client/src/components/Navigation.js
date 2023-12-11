import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className='navbar'>
            <div>
                <NavLink className='link' to={'/'}>
                    Home
                </NavLink>
                {/* <NavLink className='link' >
                    Discover
                </NavLink>
                <NavLink className='link' >
                    Connect
                </NavLink>
                <NavLink className='link' >
                    My Collection
                </NavLink> */}
            </div>
            {/* <div>
                <NavLink className='link logout' to={'/'}>
                    Logout
                </NavLink>
                <NavLink className='link profile' >
                    View Profile
                </NavLink>
            </div> */}
        </nav>
    )
}

export default Navigation
// {/* to={'/discover'} */}
// {/* to={'/connect'} */}
// {/* to={'/users/${user.id}/mycollection'} */}
// {/* to={'/users/${user.id}/profile'} */}