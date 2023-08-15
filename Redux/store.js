import { configureStore } from '@reduxjs/toolkit';
import serviceSlide from './reducer/serviceSlide';
import userSlice from './reducer/userSlice';
import turnSlice from './reducer/turnSlice';

const store = configureStore({
    reducer: {
        services: serviceSlide,
        users: userSlice,
        turns: turnSlice
    }
});

export default store;
