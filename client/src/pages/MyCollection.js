import React, {useState, useEffect, forceUpdate } from 'react';
import {useSelector} from 'react-redux';
import { useOutletContext } from "react-router-dom";
import CollectionContainer from '../features/collection/CollectionContainer';
import MediaCard from '../components/MediaCard';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/mycollection.css';

const initialValue = {
    name: ""
};

const MyCollection = () => {
    const user = useSelector(state => state.user.data);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [form, setForm] = useState(false);
    const [formData, setFormData] = useState(initialValue);
    const [deleteMode, setDeleteMode] = useState(false);
    const { handleNewAlert, handleAlertType, discoverPage, movieMode, setMovieMode, movies, setMovies, movieCollectionNames, setMovieCollectionNames, showCollectionNames, setShowCollectionNames, shows, setShows, movieCollectionByName, setMovieCollectionByName, showCollectionByName, setShowCollectionByName } = useOutletContext();
    
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
            const { name } = movie;
            if (!collectionByNameM[name]) {
                collectionByNameM[name] = [];
            }
            collectionByNameM[name].push(movie)
        });
        const collectionByNameS = {};
        // Creates an array of arrays for each unique collection name for shows
        shows.forEach((show) => {
            const { name } = show;
            if (!collectionByNameS[name]) {
                collectionByNameS[name] = [];
            }
            collectionByNameS[name].push(show)
        });
        setMovieCollectionByName(collectionByNameM);
        setShowCollectionByName(collectionByNameS);
        setMovieCollectionNames(Object.keys(collectionByNameM));
        setShowCollectionNames(Object.keys(collectionByNameS));
    }, [movies, shows])

    const handleClick = (boolean) => {
        setMovieMode(boolean);
        setForm(false);
        setDeleteMode(false);
    };

    const handleDeleteMode = () => {
        setDeleteMode(deleteMode => !deleteMode);
    }
    
    const handleContainerClick = (index, collection) => {
        if (movieMode && collection[0].movie_id) {
            setSelectedCollection(Object.values(movieCollectionByName)[index]);

        } else if (movieMode === false && collection[0].show_id) {
            setSelectedCollection(Object.values(showCollectionByName)[index]);
        }
    }
    
    const handleExitCollection = () => {
        setSelectedCollection(null);
    }

    const handleDeleteMedia = (collection_id) => {
        if (movieMode) {
            const updatedMovieCollectionByName = selectedCollection.filter((movie) => movie.id !== collection_id);
            const updatedMovies = movies.filter((movie) => movie.id !== collection_id);
            fetch(`/movie_collections/${collection_id}`, {method: "DELETE"})
            .then(() => {
                setSelectedCollection(updatedMovieCollectionByName);
                setMovies(updatedMovies);
                handleNewAlert("Movie was removed from your collection");
                handleAlertType("success");
            })
        } else {
            const updatedShowCollectionByName = selectedCollection.filter((show) => show.id !== collection_id);
            const updatedShows = shows.filter((show) => show.id !== collection_id);
            fetch(`/show_collections/${collection_id}`, {method: "DELETE"})
            .then(() => {
                setSelectedCollection(updatedShowCollectionByName);
                setShows(updatedShows);
                handleNewAlert("Show was removed from your collection");
                handleAlertType("success");
            })
        }
    }

    const handleForm = () => {
        setForm(!form);
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((movieCollectionNames.includes(formData.name) === false) && movieMode) {
            fetch('/movie_collections', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, user_id: user.id })
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then((data) => {
                        setFormData('');
                        setForm(false);
                        setMovies(movies => [...movies, data])
                        handleNewAlert("New collection has been added");
                        handleAlertType("success");
                    })
                }
            })
            .catch(error => {
                handleNewAlert("Could not create new collection");
                handleAlertType("error");
            })
        } else if ((!movieMode) && (showCollectionNames.includes(formData.name) === false)) {
            fetch('/show_collections', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, user_id: user.id })
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then((data) => {
                        setFormData('');
                        setForm(false);
                        setShows(shows => [...shows, data])
                        handleNewAlert("New collection has been added");
                        handleAlertType("success");
                    })
                }
            })
            .catch(error => {
                handleNewAlert("Could not create new collection");
                handleAlertType("error");
            })
        } else {
            setFormData(formData => formData.name = '');
            handleNewAlert("A collection with that name already exists!");
            handleAlertType("error");
        } 
    }

    const handleDeleteCollectionByName = (collection_name) => {
        if (movieMode) {
            const updatedMovies = movies.filter((movie) => movie.name !== collection_name);
            fetch(`/users/${user.id}/movie_collections/${collection_name}`, {method: 'DELETE'})
            .then(() => {
                setMovies(updatedMovies);
                handleNewAlert("Movie collection has been deleted");
                handleAlertType("success");
            })
        } else {
            const updatedShows = shows.filter((show) => show.name !== collection_name);
            fetch(`/users/${user.id}/show_collections/${collection_name}`, {method: 'DELETE'})
            .then(() => {
                setShows(updatedShows);
                handleNewAlert("Show collection has been deleted");
                handleAlertType("success")
            })
        }
    }

    const movieCollections = Object.values(movieCollectionByName).map((collection, index) => (
        <CollectionContainer 
            key={index}
            movieMode={movieMode} 
            medias={collection} 
            name={movieCollectionNames[index]} 
            deleteMode={deleteMode}
            handleDeleteCollectionByName={handleDeleteCollectionByName}
            onClick={() => handleContainerClick(index, collection)} 
        />
    ))

    const showCollections = Object.values(showCollectionByName).map((collection, index) => (
        <div class='collection-container'>
            <CollectionContainer 
                key={index} 
                movieMode={movieMode} 
                medias={collection} 
                name={showCollectionNames[index]} 
                deleteMode={deleteMode}
                handleDeleteCollectionByName={handleDeleteCollectionByName}
                onClick={() => handleContainerClick(index, collection)}  
            />
        </div>
    ))

    return (
        <div class='mycollection'> 
            <div class='collection-content'>
                {selectedCollection ? null : 
                    <div id='movie-switch'>
                        {movieMode ? <ButtonSwitch >Movies</ButtonSwitch> : <ButtonSwitch onClick={() => handleClick(true)} >Movies</ButtonSwitch>}
                        {movieMode ? <ButtonSwitch onClick={() => handleClick(false)} >Shows</ButtonSwitch> : <ButtonSwitch >Shows</ButtonSwitch>}
                    </div>
                }
                <div class='collections'>
                    {selectedCollection ? null : <h1>My Collections</h1>}
                    {movieMode ? (
                        selectedCollection ? (
                        <div class='selected' >
                            <div class='collection-button'>
                                <Button variant='contained' onClick={handleExitCollection}>X</Button>
                            </div>
                            {selectedCollection.map((movie) => (
                                <MediaCard 
                                    key={movie.movie.id} 
                                    id={movie.id} 
                                    title={movie.movie.title} 
                                    image={movie.movie.image} 
                                    rating={movie.movie.rating} 
                                    description={movie.movie.description}
                                    handleDelete={handleDeleteMedia}
                                    discoverPage={discoverPage}
                                />)
                            )}
                        </div>
                        ) : (
                        <div class='not-selected' >
                            <div class='collection-form' >
                                <Button variant='contained' sx={{marginRight: '10px'}} onClick={handleForm} >Create New</Button>
                                <Button variant='contained' onClick={handleDeleteMode} >Edit Collections</Button>
                            </div>
                            {form && (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor='name'>New Collection Name: </label>
                                    <input id='new-coll-form' type='text' name='name' value={formData.name} onChange={handleChange}/>
                                </form>
                            )}
                            <div class='collection-box' >
                                {movieCollections}
                            </div>
                        </div>
                        )
                    ) : (
                        selectedCollection ? (
                            <div class='selected' >
                                <div class='collection-button'>
                                    <Button variant='contained' onClick={handleExitCollection}>X</Button>
                                </div>
                                {selectedCollection.map((show) => (
                                <MediaCard 
                                    key={show.show.id} 
                                    id={show.id} 
                                    title={show.show.title} 
                                    image={show.show.image} 
                                    rating={show.show.rating} 
                                    description={show.show.description}
                                    handleDelete={handleDeleteMedia}
                                    discoverPage={discoverPage}
                                />
                            ))}
                            </div>
                            ) : (
                            <div class='not-selected' >
                                <div class='collection-form' >
                                    <Button variant='contained' sx={{marginRight: '10px'}} onClick={handleForm} >Create New</Button>
                                    <Button variant='contained' onClick={handleDeleteMode} >Edit Collections</Button>
                                </div>
                                {form && (
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor='name'>New Collection Name: </label>
                                        <input id='new-coll-form' type='text' name='name' value={formData.name} onChange={handleChange}/>
                                    </form>
                                )}
                                <div class='collection-box' >
                                    {showCollections}
                                </div>
                            </div>
                            )
                        )
                    }
                </div>
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


export default MyCollection