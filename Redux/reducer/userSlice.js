import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allUsers: [],
    user: {},
    error: '',
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAllUser: (state, action) => {
            state.allUsers = action.payload;
        },
        getUserById: (state, action) => {
            state.user = action.payload;
        },
        getUserByName: (state, action) => {
            state.allUsers = action.payload;
        },
        clearUserState: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    getAllUser,
    getUserById,
    getUserByName,
    clearUserState,
    setError
} = usersSlice.actions;

export default usersSlice.reducer;