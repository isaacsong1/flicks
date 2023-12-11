import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
    data: null,
    errors: [],
    movieMode: true,
    editMode: false,
    spotlight: null,
    loading: true
}

const fetchAll = async (url, asyncThunk) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        if (resp.ok) {
            return data;
        } else {
            throw data.message || data.msg;
        }
    } catch (error) {
        return error;
    }
}

const fetchOne = async (coll_id, url, asyncThunk) => {
    try {
        const resp = await fetch(`${url}/${coll_id}`);
        const data = await resp.json();
        if (resp.ok) {
            return data;
        } else {
            throw data.message || data.msg;
        }
    } catch (error) {
        return error;
    }
}

const collectionSlice = createSlice ({
    name: 'collection',
    initialState,
    reducers: (create) => ({
        setCollection: create.reducer((state, action) => {
            state.spotlight = action.payload;
            state.loading = false;
            state.errors = [];
        }),
        setEditMode: create.reducer((state, action) => {
            state.editMode = action.payload;
            state.loading = false;
            state.errors = [];
        }),
        setMovieMode: create.reducer((state, action) => {
            state.movieMode = action.payload;
            state.loading = false;
            state.errors = [];
        }),
        addError: create.reducer((state, action) => {
            state.errors.push(action.payload);
            state.loading = false;
        }),
        clearErrors: create.reducer((state) => {
            state.errors = [];
            state.loading = false;
        }),
        fetchAllCollections: create.asyncThunk(
            fetchAll,
            {
                pending: (state) => {
                    state.loading = true;
                    state.errors = [];
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.errors.push(action.payload);
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            }
        ),
        fetchOneCollection: create.asyncThunk(
            fetchOne,
            {
                pending: (state) => {
                    state.loading = true;
                    state.errors = [];
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.errors.push(action.payload);
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    if (!action.payload.id) {
                        state.errors.push(action.payload);
                    } else {
                        state.spotlight = action.payload;
                    }
                }
            }
        ),
    }),
    selectors: {
        selectCollections (state) {
            return state.data;
        },
        selectErrors (state) {
            return state.errors;
        },
        selectCollectionById: (state, collection_id) => {
            return state.data.find(collection => collection.id === collection_id);
        }
    }
})

export const {setCollection, setEditMode, setMovieMode, addError, clearErrors, fetchAllCollections, fetchOneCollection} = collectionSlice.actions
export const {selectCollections, selectErrors, selectCollectionById} = collectionSlice.selectors
export default collectionSlice.reducer