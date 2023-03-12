import axios from 'axios';

export const loginSuccess = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {
      user
    }
  };
};

export const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE'
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const setQRCode = (qrCode) => {
  return {
    type: 'SET_QR_CODE',
    payload: {
      qrCode
    }
  };
};

export const verifyQRCode = () => {
  return {
    type: 'VERIFY_QR_CODE'
  };
};

export const resetQRCode = () => {
  return {
    type: 'RESET_QR_CODE'
  };
};

export const connectFacebook = (facebookData) => {
  return (dispatch) => {
    axios.post('http://localhost:3000/user/facebook', facebookData)
      .then((response) => {
        dispatch(loginSuccess(response.data.user));
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
};
