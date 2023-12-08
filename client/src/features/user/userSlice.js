import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { getToken, getRefreshToken } from '../../utils/main';

export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
    data: null,
    errors: [],
    loading: true
};



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({

    }),
    selectors: {
        selectUser(state) {
            return state.data
        },
        selectErrors(state) {
            return state.errors
        },
    }
});