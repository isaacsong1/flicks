import React from 'react'
import { Button } from '@mui/material';
import '../styles/discover.css';

const MediaCard = ({id, title, image, rating, description, handleDelete, discoverPage}) => {
    return (
        <div class='mediacard'>
            <div class='media-media' >
                <img src={image} alt={title} class='featured-movie'/>
            </div>
            <div class='media-desc'>
                <h3>{title}</h3>
                <p class='desc'>Rating: {rating}</p>
                <p class='desc'>Description: {description}</p>
                {discoverPage ? null : <Button variant='contained' onClick={() => handleDelete(id)}>Remove</Button>}
            </div>
        </div>
    )
}

export default MediaCard