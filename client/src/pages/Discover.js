import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useOutletContext } from "react-router-dom";
import MediaCard from '../components/MediaCard';
import '../styles/discover.css';

const Discover = () => {
    const user = useSelector(state => state.user.data);
    const { handleNewAlert, handleAlertType, movieMode, setMovieMode, discoverPage, setDiscoverPage, movieCollectionNames, showCollectionNames, movies, setMovies, shows, movieCollectionByName, showCollectionByName } = useOutletContext();
    const [fetchedMovie, setFetchedMovie] = useState({});
    const [fetchedShow, setFetchedShow] = useState({});
    const [mediaInt, setMediaInt] = useState(Math.floor(Math.random() * 100) + 1);
    const [selectedCollection, setSelectedCollection] = useState('default');
    setDiscoverPage(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const resp = await fetch(`/movies/${mediaInt}`);
                const data = await resp.json();
                setFetchedMovie(data);
            } catch (error) {
                console.log(`Error fetching movie: ${error}`)
            }
        }
        const fetchShow = async () => {
            try {
                const resp = await fetch(`/shows/${mediaInt}`);
                const data = await resp.json();
                setFetchedShow(data);
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
            if (movieMode) {
                let movieCollToPatch = null;
                let movieToPatch = null;
                for (const movieEl of movieCollectionByName[selectedCollection]) {
                    if ((movieEl.movie_id === null) && (movieEl.name === selectedCollection)) {
                        movieCollToPatch = fetchedMovie.id;
                        movieToPatch = movieEl;
                    } else if (movieEl.movie_id === fetchedMovie.id) {
                        movieCollToPatch = 0;
                    }
                }
                if (movieCollToPatch === null) {
                    const postMovieCollById = async () => {
                        try {
                            const newMovieCollObj = {
                                name: selectedCollection,
                                user_id: user.id,
                                movie_id: fetchedMovie.id
                            }
                            fetch('/movie_collections', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newMovieCollObj)
                            })
                            .then(resp => {
                                if (resp.ok) {
                                    handleNewAlert("Movie was added successfully!");
                                    handleAlertType("success");
                                } else {
                                    handleNewAlert("Movie could not be added");
                                    handleAlertType("error");
                                }
                            })
                        } catch (error) {
                            handleNewAlert("Movie could not be added");
                            handleAlertType("error");
                        }
                    }
                    postMovieCollById();
                } else if (movieCollToPatch) {
                    const patchMovieCollById = async () => {
                        try {
                            movieToPatch.movie_id = movieCollToPatch;
                            movieToPatch.movie = fetchedMovie
                            fetch(`/movie_collections/${movieToPatch.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({...movieToPatch})
                            });
                            handleNewAlert("Movie was added successfully!");
                            handleAlertType("success");
                        } catch (error) {
                            console.log(`Error fetching movies: ${error}`);
                        }
                    }
                    patchMovieCollById();
                    // debugger;
                } else {
                    handleNewAlert("Movie is already in collection");
                    handleAlertType("error");
                }
            } else {
                let showCollToPatch = null;
                let showToPatch = null;

                for (const showEl of showCollectionByName[selectedCollection]) {
                    if ((showEl.show_id === null) && (showEl.name === selectedCollection)) {
                        showCollToPatch = fetchedShow.id;
                        showToPatch = showEl;
                    } else if (showEl.show_id === fetchedShow.id) {
                        showCollToPatch = 0;
                    }
                }
                if (showCollToPatch === null) {
                    const postShowCollById = async () => {
                        try {
                            const newShowCollObj = {
                                name: selectedCollection,
                                user_id: user.id,
                                show_id: fetchedShow.id
                            }
                            fetch('/show_collections', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newShowCollObj)
                            });
                            handleNewAlert("Show was added successfully");
                            handleAlertType("success");
                        } catch (error) {
                            console.log(`Error fetching shows: ${error}`);
                        }
                    }
                    postShowCollById();
                } else if (showCollToPatch) {
                    const patchShowCollById = async () => {
                        try {
                            showToPatch.show_id = showCollToPatch;
                            showToPatch.show = fetchedShow
                            fetch(`/show_collections/${showToPatch.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({...showToPatch})
                            });
                            handleNewAlert("Show was added successfully");
                            handleAlertType("success");
                        } catch (error) {
                            console.log(`Error fetching shows: ${error}`);
                        }
                    }
                    patchShowCollById();
                } else {
                    handleNewAlert("Show is already in your collection");
                    handleAlertType("error");
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
        <div class='discover'>
            <div class='content'>
                <div id='movie-switch'>
                    {movieMode ? <button id='underline' class='movie' >Movies</button> : <button class='movie' onClick={() => handleClick(true)} >Movies</button>}
                    {movieMode ? <button class='movie' onClick={() => handleClick(false)} >Shows</button> : <button id='underline' class='movie' >Shows</button>}
                </div>
                {movieMode ? (
                    <div>
                        <MediaCard 
                            id={fetchedMovie.id} 
                            title={fetchedMovie.title} 
                            image={fetchedMovie.image} 
                            rating={fetchedMovie.rating} 
                            description={fetchedMovie.description}
                            discoverPage={discoverPage}
                            class='mediacard'
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
                            id={fetchedShow.id} 
                            title={fetchedShow.title} 
                            image={fetchedShow.image} 
                            rating={fetchedShow.rating} 
                            description={fetchedShow.description}
                            discoverPage={discoverPage}
                            class='mediacard'
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
        </div>
    )
}

export default Discover