import React from 'react';
import {useSelector} from 'react-redux';
import CollectionContainer from '../features/collection/CollectionContainer';

const MyCollection = () => {
    const user = useSelector(state => state.user.data)
    debugger;

    console.log(user)
    
    return (
        <div>
            <h1>MyCollection</h1>
            {/* <CollectionContainer /> */}
        </div>
    )
}

export default MyCollection