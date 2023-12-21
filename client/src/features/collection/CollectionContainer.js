import { Button } from '@mui/material';
import '../../styles/mycollection.css';

function CollectionContainer({medias, movieMode, name, deleteMode, handleDeleteCollectionByName, onClick}) {

    return (
        <div onClick={onClick} class='mediaContainer' >
            <div class='container-content' style={{cursor: 'pointer'}}>
                <h2>{name}</h2>
                {movieMode ? (
                    <p>Movies: {medias[0].movie_id ? medias.length : 0}</p>
                ) : (
                    <p>Shows: {medias[0].show_id ? medias.length : 0}</p>
                )}
            </div>
            <div class='delete-collection'>
                {deleteMode ? (<Button variant='contained' onClick={() => handleDeleteCollectionByName(name)} >Remove</Button>) : null}
            </div>
        </div>
    )
}

export default CollectionContainer;