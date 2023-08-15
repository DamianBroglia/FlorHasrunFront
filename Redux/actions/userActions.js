import axios from 'axios';
import {
    getAllUser,
    getUserById,
    getUserByName,
    clearUserState,
    setError
} from '../reducer/userSlice';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

export const getAllUserAction = () => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}users`);
        dispatch(getAllUser(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getUserByNameAction = (name) => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}users`);
        const filtered = response.data.filter((e) => e.name.toLowerCase().includes(name))
        dispatch(getUserByName(filtered));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getUserByIdAction = (id) => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}users/${id}`);
        dispatch(getUserById(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const clearUser = () => (dispatch) => {
    dispatch(clearUserState({}));
};

export const clearError = () => (dispatch) => {
    dispatch(setError(''));
};