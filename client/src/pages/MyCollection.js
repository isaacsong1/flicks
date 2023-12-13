import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import CollectionContainer from '../features/collection/CollectionContainer';
import MediaCard from '../components/MediaCard';

const MyCollection = () => {
    const user = useSelector(state => state.user.data);
    const [movieMode, setMovieMode] = useState(true);
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [movieCollectionByName, setMovieCollectionByName] = useState({});
    const [showCollectionByName, setShowCollectionByName] = useState({});
    const [selectedCollection, setSelectedCollection] = useState(null);

    const handleClick = (boolean) => {
        setMovieMode(boolean);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const resp = await fetch(`/users/${user.id}/movie_collections`);
                const data = await resp.json();
                setMovies(data);
            } catch (error) {
                console.log(`Error fetching movies: ${error}`)
            }
        }
        const fetchShows = async () => {
            try {
                const resp = await fetch(`/users/${user.id}/show_collections`);
                const data = await resp.json();
                setShows(data);
            } catch (error) {
                console.log(`Error fetching shows: ${error}`)
            }
        }
        fetchMovies();
        fetchShows();
    }, [])

    useEffect(() => {
        const collectionByNameM = {};
        // Creates an array of arrays for each unique collection name for movies
        movies.forEach((movie) => {
            // console.log(movie)
            const { name } = movie;
            if (!collectionByNameM[name]) {
                collectionByNameM[name] = [];
            }
            collectionByNameM[name].push(movie)
        });
        const collectionByNameS = {};
        // Creates an array of arrays for each unique collection name for shows
        shows.forEach((show) => {
            // console.log(movie)
            const { name } = show;
            if (!collectionByNameS[name]) {
                collectionByNameS[name] = [];
            }
            collectionByNameS[name].push(show)
        });
        setMovieCollectionByName(collectionByNameM);
        setShowCollectionByName(collectionByNameS);
    }, [movies, shows])
    
    const handleContainerClick = (index) => {
        if (movieMode) {
            setSelectedCollection(Object.values(movieCollectionByName)[index]);
        } else {
            setSelectedCollection(Object.values(showCollectionByName)[index])
        }
    }
    
    const handleExitCollection = () => {
        setSelectedCollection(null);
    }

    const handleDeleteMedia = (media_id) => {
        if (movieMode) {
            console.log(`Movie deleted: ${media_id}`)
        } else {
            console.log(`Show deleted: ${media_id}`)
        }
    }
    // if (!movies || movies.length === 0) {
    //     return <p>No movies in this collection</p>
    // }

    
    return (
        <div> 
            <h1>My Collections</h1>
            
            {movieMode ? (
                selectedCollection ? (
                <div>
                    <button onClick={handleExitCollection}>X</button>
                    {selectedCollection.map((movie) => (
                        <MediaCard 
                            key={movie.movie.id} 
                            id={movie.movie.id} 
                            title={movie.movie.title} 
                            image={movie.movie.image} 
                            rating={movie.movie.rating} 
                            description={movie.movie.description}
                            handleDelete={handleDeleteMedia}
                        />
                    ))}
                </div>
                ) : (
                <div>
                    <div id='movie-switch'>
                        {movieMode ? <button id='underline' class='movie' >Movies</button> : <button class='movie' onClick={() => handleClick(true)} >Movies</button>}
                        {movieMode ? <button class='movie' onClick={() => handleClick(false)} >Shows</button> : <button id='underline' class='movie' >Shows</button>}
                    </div>
                    <div>
                        {Object.values(movieCollectionByName).map((collection, index) => (
                            <CollectionContainer 
                                key={index}
                                movieMode={movieMode} 
                                medias={collection} 
                                name={collection[0].name} 
                                onClick={() => handleContainerClick(index)} 
                                // onClick={() => console.log(`${index} clicked`)} 
                            />
                        ))}
                    </div>
                </div>
                )
            ) : (
                selectedCollection ? (
                    <div>
                        <button onClick={handleExitCollection}>X</button>
                        {selectedCollection.map((show) => (
                        <MediaCard 
                            key={show.show.id} 
                            title={show.show.title} 
                            image={show.show.image} 
                            rating={show.show.rating} 
                            description={show.show.description}
                        />
                    ))}
                    </div>
                    ) : (
                    <div>
                        <div id='movie-switch'>
                            {movieMode ? <button id='underline' class='movie' >Movies</button> : <button class='movie' onClick={() => handleClick(true)} >Movies</button>}
                            {movieMode ? <button class='movie' onClick={() => handleClick(false)} >Shows</button> : <button id='underline' class='movie' >Shows</button>}
                        </div>
                        <div>
                        {Object.values(showCollectionByName).map((collection, index) => (
                            <CollectionContainer 
                                key={index} 
                                movieMode={movieMode} 
                                medias={collection} 
                                name={collection[0].name} 
                                onClick={() => handleContainerClick(index)} 
                                // onClick={() => console.log(`${index} clicked`)} 
                            />
                        ))}
                    </div>
                    </div>
                    )
                )
            }
        </div>
    )
}

export default MyCollection