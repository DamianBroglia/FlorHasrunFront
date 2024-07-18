import axios from 'axios';
import {
    getAllService,
    getServiceByName,
    getAllViewService,
    getServiceById,
    setError
} from '../reducer/serviceSlide';

import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

export const getAllServi = () => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}products`);
        dispatch(getAllService(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getAllViewServi = () => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}products`);
        const view = response.data.filter(e => e.view === true)
        dispatch(getAllViewService(view));
    } catch (error) {
        dispatch(setError(error.message));
    }
};


export const getServiceId = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}products/${id}`);
        dispatch(getServiceById(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const clearError = () => (dispatch) => {
    dispatch(setError(''));
};
