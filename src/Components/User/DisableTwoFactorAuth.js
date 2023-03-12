import React from 'react';
import axios from 'axios';
import { disable2FA } from './api';

function DisableTwoFactorAuth() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDisable2FA = async () => {
    try {
      const id = user._id; // get the id of the user you want to disable 2FA for
      const response = await disable2FA(id);
      console.log('Two-Factor Authentication has been disabled');
      console.log('Response:', response.data);
      // or update the state of your component to reflect the change
    } catch (error) {
      console.log('Error disabling Two-Factor Authentication:', error);
      // or display an error message to the user
    }
  };

  return (
    <div>
      <button onClick={handleDisable2FA}>Disable Two-Factor Authentication</button>
    </div>
  );
};

export default DisableTwoFactorAuth;
