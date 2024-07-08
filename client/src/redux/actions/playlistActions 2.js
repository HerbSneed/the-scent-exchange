// frontend/src/redux/actions/playlistActions.js
import axios from 'axios';

export const addTrackToPlaylist = (trackUri) => async (dispatch) => {
    try {
        const response = await axios.post('/api/playlist/add', { trackUri });
        dispatch({ type: 'ADD_TRACK_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'ADD_TRACK_FAIL', payload: error.message });
    }
};

export const upvoteTrack = (trackUri) => async (dispatch) => {
    try {
        const response = await axios.post('/api/playlist/upvote', { trackUri });
        dispatch({ type: 'UPVOTE_TRACK_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'UPVOTE_TRACK_FAIL', payload: error.message });
    }
};
