import {useSelector} from 'react-redux';
import CollectionCard from './CollectionCard';

function CollectionContainer() {
    // const collections = useSelector(state => state.collection.data)
    const user = useSelector(state => state.user.data)

    console.log(`User: ${user}`);

    return (
        <div>
            <h1>My Collections</h1>
            <div>
            {/* {collections && collections.map(collection => <CollectionCard key={collection.id} collection={collection} />)} */}
            {/* {user.map(user.movie_collection.name => <CollectionCard key={collection.id} collection={collection} />)} */}
            </div>
        </div>
    )
}

export default CollectionContainer;