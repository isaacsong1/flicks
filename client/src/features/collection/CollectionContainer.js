import {useSelector} from 'react-redux';
import CollectionCard from './CollectionCard';
import { Button } from '@mui/material';
import '../../styles/mycollection.css';

function CollectionContainer({medias, movieMode, name, deleteMode, handleDeleteCollectionByName, onClick}) {
    // const collections = useSelector(state => state.collection.data)
    const user = useSelector(state => state.user.data)

    return (
        <div class='mediaContainer' >
            <div onClick={onClick} style={{cursor: 'pointer'}}>
                <h2>{name}</h2>
                {movieMode ? (
                    <p>Movies: {medias[0].movie_id ? medias.length : 0}</p>
                ) : (
                    <p>Shows: {medias[0].show_id ? medias.length : 0}</p>
                )}
            </div>
            {deleteMode ? (<Button variant='contained' onClick={() => handleDeleteCollectionByName(name)} >Remove</Button>) : null}
        </div>
    )
}

export default CollectionContainer;