import React from 'react'
import '../styles/discover.css';

const MediaCard = ({id, title, image, rating, description, handleDelete, discoverPage}) => {
    return (
        <div class='mediacard'>
            <img src={image} alt={title} class='featured-movie'/>
            <h3>Title: {title}</h3>
            <p>Rating: {rating}</p>
            <p>Description: {description}</p>
            {discoverPage ? null : <button onClick={() => handleDelete(id)}>Remove</button>}
        </div>
    )
}

export default MediaCard