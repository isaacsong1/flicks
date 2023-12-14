import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useOutletContext } from "react-router-dom";
import MediaCard from '../components/MediaCard';

const Discover = () => {
    const user = useSelector(state => state.user.data);
    const { movieMode, setMovieMode, discoverPage, setDiscoverPage, movieCollectionNames, showCollectionNames, movies, setMovies, shows, movieCollectionByName, showCollectionByName } = useOutletContext();
    const [movie, setMovie] = useState({});
    const [show, setShow] = useState({});
    const [mediaInt, setMediaInt] = useState(Math.floor(Math.random() * 100) + 1);
    const [selectedCollection, setSelectedCollection] = useState('default');
    setDiscoverPage(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const resp = await fetch(`/movies/${mediaInt}`);
                const data = await resp.json();
                setMovie(data);
            } catch (error) {
                console.log(`Error fetching movie: ${error}`)
            }
        }
        const fetchShow = async () => {
            try {
                const resp = await fetch(`/shows/${mediaInt}`);
                const data = await resp.json();
                setShow(data);
            } catch (error) {
                console.log(`Error fetching shows: ${error}`)
            }
        }
        fetchMovie();
        fetchShow();
    }, [mediaInt]);

    const handleClick = (boolean) => {
        setMovieMode(boolean);
        setSelectedCollection('default');
    }

    const handleNewMedia = () => {
        const prev_choice = mediaInt;
        let new_choice = Math.floor(Math.random() * 100) + 1;
        if (new_choice === prev_choice) {
            new_choice = Math.floor(Math.random() * 100) + 1;
        } else {
            setMediaInt(new_choice);
        }
    }

    const handleSelectChange = (e) => {
        setSelectedCollection(e.target.value)
    }

    const handleAddToCollection = () => {
        if (selectedCollection !== 'default') {
            console.log('Selected collection', selectedCollection);
            if (movieMode) {
                let movieCollToPatch = null;
                let movieToPatch = null;
                for (const movieEl of movieCollectionByName[selectedCollection]) {
                    if ((movieEl.movie_id === null) && (movieEl.name === selectedCollection)) {
                        movieCollToPatch = movie.id;
                        movieToPatch = movie;
                    } else if (movieEl.movie_id === movie.id) {
                        movieCollToPatch = 0;
                    }
                }
                if (movieCollToPatch === null) {
                    const postMovieCollById = async () => {
                        try {
                            const newMovieCollObj = {
                                name: selectedCollection,
                                user_id: user.id,
                                movie_id: movie.id
                            }
                            fetch('/movie_collections', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newMovieCollObj)
                            });
                        } catch (error) {
                            console.log(`Error fetching movies: ${error}`);
                        }
                    }
                    postMovieCollById();
                } else if (movieCollToPatch) {
                    const patchMovieCollById = async () => {
                        try {
                            movieToPatch.movie_id = movieCollToPatch;
                            movieToPatch.movie = movie
                            const resp = await fetch(`/movie_collections/${movieCollToPatch}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({...movieToPatch})
                            });
                        } catch (error) {
                            console.log(`Error fetching movies: ${error}`);
                        }
                    }
                    patchMovieCollById();
                } else {
                    console.log('That movie is already in the collection')
                }
            } else {
                let showCollToPatch = null;
                let showToPatch = null;
                for (const showEl of showCollectionByName[selectedCollection]) {
                    if ((showEl.show_id === null) && (showEl.name === selectedCollection)) {
                        showCollToPatch = show.id;
                        showToPatch = show;
                    } else if (showEl.show_id === show.id) {
                        showCollToPatch = 0;
                    }
                }
                if (showCollToPatch === null) {
                    const postShowCollById = async () => {
                        try {
                            const newShowCollObj = {
                                name: selectedCollection,
                                user_id: user.id,
                                show_id: show.id
                            }
                            fetch('/show_collections', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newShowCollObj)
                            });
                        } catch (error) {
                            console.log(`Error fetching shows: ${error}`);
                        }
                    }
                    postShowCollById();
                } else if (showCollToPatch) {
                    const patchShowCollById = async () => {
                        try {
                            showToPatch.show_id = showCollToPatch;
                            showToPatch.show = show
                            const resp = await fetch(`/show_collections/${showCollToPatch}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({...showToPatch})
                            });
                        } catch (error) {
                            console.log(`Error fetching shows: ${error}`);
                        }
                    }
                    patchShowCollById();
                } else {
                    console.log('That show is already in the collection')
                }
            }
        }
    }

    const movieCollectionOptions = movieCollectionNames.map(name => (
        <option value={name}>{name}</option>
    ));

    const showCollectionOptions = showCollectionNames.map(name => (
        <option value={name}>{name}</option>
    ));
    
    return (
        <div>
            <div id='movie-switch'>
                {movieMode ? <button id='underline' class='movie' >Movies</button> : <button class='movie' onClick={() => handleClick(true)} >Movies</button>}
                {movieMode ? <button class='movie' onClick={() => handleClick(false)} >Shows</button> : <button id='underline' class='movie' >Shows</button>}
            </div>
            {movieMode ? (
                <div>
                    <MediaCard 
                        id={movie.id} 
                        title={movie.title} 
                        image={movie.image} 
                        rating={movie.rating} 
                        description={movie.description}
                        discoverPage={discoverPage}
                    />
                    <button onClick={handleNewMedia}>Generate New Movie</button>
                    <select name='movie-collection-names' id='movie-collection-names' onChange={handleSelectChange} >
                        <option value='default'>Select a Collection</option>
                        {movieCollectionOptions}
                    </select>
                    <button onClick={handleAddToCollection} >Add to Collection</button>
                </div>
            ) : (
                <div>
                    <MediaCard 
                        id={show.id} 
                        title={show.title} 
                        image={show.image} 
                        rating={show.rating} 
                        description={show.description}
                        discoverPage={discoverPage}
                    />
                    <button onClick={handleNewMedia}>Generate New Show</button>
                    <select name='show-collection-names' id='show-collection-names' onChange={handleSelectChange} >
                        <option value='default'>Select a Collection</option>
                        {showCollectionOptions}
                    </select>
                    <button onClick={handleAddToCollection} >Add to Collection</button>
                </div>
            )}
        </div>
    )
}

export default Discover