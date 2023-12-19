import React from 'react'
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
                {discoverPage ? null : <button onClick={() => handleDelete(id)}>Remove</button>}
            </div>
        </div>
    )
}

export default MediaCard