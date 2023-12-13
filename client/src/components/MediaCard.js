import React from 'react'

const MediaCard = ({title, image, rating, description}) => {
    return (
        <div>
            <h3>Title: {title}</h3>
            <img src={image} alt={title} />
            <p>Rating: {rating}</p>
            <p>Description: {description}</p>
        </div>
    )
}

export default MediaCard