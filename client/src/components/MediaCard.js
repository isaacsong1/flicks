import React from 'react'

const MediaCard = ({id, title, image, rating, description, handleDelete, discoverPage}) => {
    return (
        <div>
            <h3>Title: {title}</h3>
            <img src={image} alt={title} />
            <p>Rating: {rating}</p>
            <p>Description: {description}</p>
            {discoverPage ? null : <button onClick={() => handleDelete(id)}>Remove</button>}
        </div>
    )
}

export default MediaCard