// frontend/src/redux/actions/userActions.js
import axios from 'axios';

export const uploadProfilePicture = (formData) => async (dispatch) => {
    try {
        const response = await axios.post('/api/user/uploadProfilePicture', formData);
        dispatch({ type: 'UPLOAD_PROFILE_PICTURE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'UPLOAD_PROFILE_PICTURE_FAIL', payload: error.message });
    }
};

export const updateUserProfile = (userId, profileData) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/user/${userId}`, profileData);
        dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'UPDATE_PROFILE_FAIL', payload: error.message });
    }
};
