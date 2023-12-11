import {useSelector} from 'react-redux';
import CollectionCard from './CollectionCard';

function CollectionContainer() {
    const collections = useSelector(state => state.production.data)

    return (
        <div>
            <h1>My Collections</h1>
            <div>
            {collections && collections.map(collection => <CollectionCard key={collection.id} collection={collection} />)}
            </div>
        </div>
    )
}

export default CollectionContainer;