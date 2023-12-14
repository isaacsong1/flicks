import {useSelector} from 'react-redux';
import CollectionCard from './CollectionCard';


function CollectionContainer({medias, movieMode, name, deleteMode, handleDeleteCollectionByName, onClick}) {
    // const collections = useSelector(state => state.collection.data)
    const user = useSelector(state => state.user.data)

    return (
        <div class='mediaContainer' >
            <div onClick={onClick} style={{cursor: 'pointer'}}>
                <h2>{name}</h2>
                {movieMode ? (
                    <p>Number of movies: {medias[0].movie_id ? medias.length : 0}</p>
                ) : (
                    <p>Number of shows: {medias[0].show_id ? medias.length : 0}</p>
                )}
            </div>
            {deleteMode ? (<button onClick={() => handleDeleteCollectionByName(name)} >Remove</button>) : null}
        </div>
    )
}

export default CollectionContainer;