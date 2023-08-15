import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    viewService: [],
    allService: [],
    detail: {},
    error: '',
};

export const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        getAllService: (state, action) => {
            state.allService = action.payload;
        },
        getServiceByName: (state, action) => {
            state.viewService = action.payload;
        },
        getAllViewService: (state, action) => {
            state.viewService = action.payload;
        },
        getServiceById: (state, action) => {
            state.detail = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    getAllService,
    getServiceByName,
    getServiceById,
    getAllViewService,
    setError
} = serviceSlice.actions;

export default serviceSlice.reducer;