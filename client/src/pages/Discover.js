import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useOutletContext } from "react-router-dom";
import MediaCard from '../components/MediaCard';
import { Button, Select, MenuItem } from '@mui/material';
import { common } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import '../styles/discover.css';


const Discover = () => {
    const user = useSelector(state => state.user.data);
    const { handleNewAlert, handleAlertType, movieMode, setMovieMode, discoverPage, setDiscoverPage, movieCollectionNames, showCollectionNames, movies, setMovies, shows, movieCollectionByName, showCollectionByName } = useOutletContext();
    const [fetchedMovie, setFetchedMovie] = useState({});
    const [fetchedShow, setFetchedShow] = useState({});
    const [mediaInt, setMediaInt] = useState(Math.floor(Math.random() * 100) + 1);
    const [selectedCollection, setSelectedCollection] = useState('');
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

    console.log(fetchedMovie)

    // const setBackgroundImg = () => {
    //     if (fetchedMovie['image']) {
    //         const contentBox = document.getElementsByClassName('content');
    //         const imageUrl = fetchedMovie['image']
    //         debugger;
    //         contentBox.style.backgroundImage = `url('${imageUrl}')`;
    //     }
    // }

    const handleClick = (boolean) => {
        setMovieMode(boolean);
        setSelectedCollection('');
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
        if (selectedCollection !== '') {
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
        <MenuItem value={name}>{name}</MenuItem>
    ));

    const showCollectionOptions = showCollectionNames.map(name => (
        <MenuItem value={name}>{name}</MenuItem>
    ));
    
    return (
        <div class='discover'>
            <div class='content'>
                <div id='movie-switch'>
                    {movieMode ? <ButtonSwitch >Movies</ButtonSwitch> : <ButtonSwitch onClick={() => handleClick(true)} >Movies</ButtonSwitch>}
                    {movieMode ? <ButtonSwitch onClick={() => handleClick(false)} >Shows</ButtonSwitch> : <ButtonSwitch >Shows</ButtonSwitch>}
                </div>
                {movieMode ? (
                    <div class='media-cont'>
                        <MediaCard 
                            id={fetchedMovie.id} 
                            title={fetchedMovie.title} 
                            image={fetchedMovie.image} 
                            rating={fetchedMovie.rating} 
                            description={fetchedMovie.description}
                            discoverPage={discoverPage}
                        />
                        <div class='bottom-btns' >
                            <Button variant='contained' onClick={handleNewMedia}>Generate New Movie</Button>
                            <SelectColor displayEmpty inputProps={{ 'aria-label': 'Without label' }} name='movie-collection-names' id='movie-collection-names' value={selectedCollection} onChange={handleSelectChange} >
                                <MenuItem value=""><em>Select a Collection</em></MenuItem>
                                {movieCollectionOptions}
                            </SelectColor>
                            <Button variant='contained' onClick={handleAddToCollection} >Add to Collection</Button>
                        </div>
                    </div>
                ) : (
                    <div class='media-cont'>
                        <MediaCard 
                            id={fetchedShow.id} 
                            title={fetchedShow.title} 
                            image={fetchedShow.image} 
                            rating={fetchedShow.rating} 
                            description={fetchedShow.description}
                            discoverPage={discoverPage}
                        />
                        <div class='bottom-btns' >
                            <Button variant='contained' onClick={handleNewMedia}>Generate New Show</Button>
                            <SelectColor displayEmpty inputProps={{ 'aria-label': 'Without label' }} name='show-collection-names' id='show-collection-names' value={selectedCollection} onChange={handleSelectChange} >
                                <MenuItem value=""><em>Select a Collection</em></MenuItem>
                                {showCollectionOptions}
                            </SelectColor>
                            <Button variant='contained' onClick={handleAddToCollection} >Add to Collection</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const ButtonSwitch = styled(Button)({
    color: 'white',
    padding: '10px',
    boxShadow: 'none',
    textTransform: 'none',
    width: '5vw',
    margin: '10px',
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
})

const SelectColor = styled(Select)({
    width: '10vw',
    height: '4.2vh',
    color: 'white',
    borderColor: 'white',
    // border: '1px solid #ffffff',
    margin: '5px',
    '&:active': {
        border: '1px solid #ffffff',
    },
    '&:focus': {
        borderRadius: 4,
        border: '1px solid #ffffff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
})

export default Discover