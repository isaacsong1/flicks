import {useSelector} from 'react-redux';
import CollectionCard from './CollectionCard';


function CollectionContainer({medias, movieMode, name, onClick}) {
    // const collections = useSelector(state => state.collection.data)
    const user = useSelector(state => state.user.data)

    const mediasArray = medias

    return (
        <div class='mediaContainer' onClick={onClick} style={{cursor: 'pointer'}}>
            <h2>{name}</h2>
            {movieMode ? (
                <p>Number of movies: {mediasArray.length}</p>
            ) : (
                <p>Number of shows: {mediasArray.length}</p>
            )}
        </div>
    )
}

export default CollectionContainer;