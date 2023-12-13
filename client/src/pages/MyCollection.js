import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import CollectionContainer from '../features/collection/CollectionContainer';
import MediaCard from '../components/MediaCard';

const MyCollection = () => {
    const user = useSelector(state => state.user.data);
    // const [movieMode, setMovieMode] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch(`/users/${user.id}/movie_collections`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(setMovies)
            }
        })
    }, [])
    const moviesByName = {};
    // Creates an array of arrays for each unique collection name
    movies.forEach((movie) => {
        const { name } = movie;
        if (!moviesByName[name]) {
            moviesByName[name] = [];
        }
        moviesByName[name].push(movie)
    })
    const arraysByMovieName = Object.values(moviesByName);
    
    
    const handleContainerClick = (index) => {
        setSelectedCollection(arraysByMovieName[index]);
    }
    
    const handleExitCollection = () => {
        setSelectedCollection(null);
    }
    
    // const movie_collections = 
    // debugger;
    
    return (
        <div> 
            {selectedCollection ? (
            <div>
                <button onClick={handleExitCollection}>X</button>
                {selectedCollection.map((movie) => (
                    <MediaCard 
                        key={movie.movie.id} 
                        title={movie.movie.title} 
                        image={movie.movie.image} 
                        rating={movie.movie.rating} 
                        description={movie.movie.description}
                    />
                ))}
            </div>
            ) : (
            <div>
                <h1>My Collection</h1>
                <div>
                    {arraysByMovieName.map((collection, index) => (
                        <CollectionContainer 
                            key={index} 
                            movies={collection} 
                            name={collection[0].name} 
                            onClick={() => handleContainerClick(index)} 
                        />
                    ))}
                </div>
            </div>
            )}
        </div>
    )
}

export default MyCollection