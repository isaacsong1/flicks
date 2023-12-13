import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const DiscoverCard = () => {
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    debugger;
    return (
        <div>DiscoverCard
            {user && 
                <div>
                    <h3>{user.username}</h3>
                </div>
            }
        </div>
    )
}

export default DiscoverCard