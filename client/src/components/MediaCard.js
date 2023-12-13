import React from 'react'

const MediaCard = ({id, title, image, rating, description, handleDelete}) => {
    return (
        <div>
            <h3>Title: {title}</h3>
            <img src={image} alt={title} />
            <p>Rating: {rating}</p>
            <p>Description: {description}</p>
            <button onClick={() => handleDelete(id)}>Remove</button>
        </div>
    )
}

export default MediaCard