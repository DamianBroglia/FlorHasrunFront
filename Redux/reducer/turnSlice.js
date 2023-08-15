import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    viewTurns: [],
    allTurns: [],
    detail: {},
    error: '',
};

export const turnsSlice = createSlice({
    name: 'turns',
    initialState,
    reducers: {
        getAllTurns: (state, action) => {
            state.allTurns = action.payload;
        },
        getTurnsByUserId: (state, action) => {
            state.viewTurns = action.payload;
        },
        getTurnById: (state, action) => {
            state.detail = action.payload;
        },
        getTurnByDay: (state, action) => {
            state.viewTurns = action.payload;
        },
        getTurnByProductId: (state, action) => {
            state.viewTurns = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    getAllTurns,
    getTurnsByUserId,
    getTurnById,
    getTurnByDay,
    getTurnByProductId,
    setError
} = turnsSlice.actions;

export default turnsSlice.reducer;