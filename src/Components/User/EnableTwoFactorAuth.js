import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Qrcode from 'qrcode.react';
import { enable2FA } from './api';
import QRCode from 'qrcode';

function EnableTwoFactorAuth() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const User = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem("user")).accessToken;

  const handleEnable2FA = () => {
    const id = User._id
    enable2FA(id)
      .then((response) => {
        const qrCode = response.data.qrCode;
        const secret = response.data.secret;
        console.log(qrCode); 
        console.log(secret);
        setQrCodeData(qrCode);
        setSecretKey(secret);
        setShowResults(true);
      })
      .catch((error) => {
        console.log("khlet 2")
      })
  };
  
  const QR = () => (
    <div>
      <Qrcode value={qrCodeData} />
      <p>Secret Key: {secretKey}</p>
    </div>
  );
  
  return (
    <div>
      <button onClick={handleEnable2FA}>Enable Two-Factor Authentication</button>
      {showResults ? <QR /> : null}
    </div>
  );
};

export default EnableTwoFactorAuth;
