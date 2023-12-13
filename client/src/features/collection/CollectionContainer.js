import {useSelector} from 'react-redux';
import CollectionCard from './CollectionCard';


function CollectionContainer({movies, name, onClick}) {
    // const collections = useSelector(state => state.collection.data)
    const user = useSelector(state => state.user.data)

    const moviesArray = movies

    return (
        <div class='mediaContainer' onClick={onClick} style={{cursor: 'pointer'}}>
            <h2>{name}</h2>
            <p>Number of movies: {moviesArray.length}</p>
        </div>
    )
}

export default CollectionContainer;