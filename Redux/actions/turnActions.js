import axios from 'axios';
import {
    getAllTurns,
    getTurnByDay,
    getTurnById,
    getTurnByProductId,
    getTurnsByUserId,
    setError
} from '../reducer/turnSlice';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;


export const getAllTurnsAction = () => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}turns`);
        dispatch(getAllTurns(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getTurnByDayAction = (date) => async (dispatch) => {
    try {
        const response = await axios(`${API_URL}turns/byDay/${date}`);
        dispatch(getTurnByDay(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};


export const getTurnByIdAction = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}turns/byId/${id}`);
        dispatch(getTurnById(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getTurnByProductIdAction = (productId) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}turns/byProductId/${productId}`);
        dispatch(getTurnByProductId(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
}
;
export const getTurnsByUserIdAction = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}turns/byUserId/${userId}`);
        dispatch(getTurnsByUserId(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const clearError = () => (dispatch) => {
    dispatch(setError(''));
};