import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { getToken, getRefreshToken } from '../../utils/main';

// https://redux-toolkit.js.org/api/createslice
// lots of good information here
// Some actions:
// setUser, logout, addError, clearErrors, fetchCurrentUser, fetchRegister

export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
    data: null,
    errors: [],
    loading: true
};

const register = async ({url, values}, ) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const data = await resp.json()
        if (resp.ok) {
            return data;
        } else {
            throw data.message || data.msg;
        }
    } catch (error) {
        return error;
    }
}

const fetchMe = async () => {
    try {
        const resp = await fetch('/currentuser', {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        const data = await resp.json()
        if (resp.ok) {
            return {user: data, flag: 'currentuser'};
        } else {
            const resp = await fetch('refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getRefreshToken()}`
                }
            })
            const data = await resp.json()
            if (resp.ok) {
                return {...data, flag: 'refresh'};
            } else {
                throw data.message || data.msg;
            }
        }
    } catch (error) {
        return error;
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({
        setUser: create.reducer((state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.errors = [];
        }),
        logout: create.reducer((state) => {
            state.data = null;
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
        fetchRegister: create.asyncThunk(
            register,
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.errors.push(action.payload);
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    if (typeof action.payload === 'string') {
                        state.errors.push(action.payload);
                    } else {
                        state.data = action.payload.user;
                    }
                },
            }
        ),
        fetchCurrentUser: create.asyncThunk(
            fetchMe,
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
                    if (typeof action.payload === 'string') {
                        state.errors.push(action.payload);
                    } else {
                        state.data = action.payload.user
                    }
                }
            }
        ),
    }),
    selectors: {
        selectUser(state) {
            return state.data;
        },
        selectErrors(state) {
            return state.errors;
        },
    }
});

export const {setUser, logout, addError, clearErrors, fetchCurrentUser, fetchRegister} = userSlice.actions
export const {selectUser, selectErrors} = userSlice.selectors
export default userSlice.reducer