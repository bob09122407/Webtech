import axios from 'axios';
import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAILURE
} from '../constants/contactConstant';
import { BASE_URL } from "./../apiConfig";


// Action creator for handling the contact form submission
export const createContact = (contactData) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_REQUEST });

    // const response = await axios.post(`/api/v1/contact`, contactData);
    const response = await axios.post(`${BASE_URL}/api/v1/contact`, contactData);

    dispatch({ type: CONTACT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CONTACT_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};
