// frontend/src/redux/actions/paymentActions.js
import axios from 'axios';

export const processPayment = (paymentInfo) => async (dispatch) => {
    try {
        const response = await axios.post('/api/payment', paymentInfo);
        dispatch({ type: 'PROCESS_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'PROCESS_PAYMENT_FAIL', payload: error.message });
    }
};
