import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Qrcode from 'qrcode.react';
import { enable2FA } from './api';
import QRCode from "qrcode.react";

function EnableTwoFactorAuth() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const User = JSON.parse(localStorage.getItem("user"));
  const token = User.accessToken;

  const handleEnable2FA = () => {
    const id = User._id;
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
        console.log("khlet 2");
      });
  };

  const qrStyle = {
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    backgroundColor: 'white',
  }
  

  
  const QR = () => (
    <div style={qrStyle}>
      <img src={qrCodeData} alt="QR Code" />
      <p>secretKey {secretKey}</p>
    </div>
  );

  useEffect(() => {
    if (showResults && qrCodeData) {
      console.log("qrCodeData", qrCodeData);
    }
  }, [qrCodeData, showResults]);

  return (
    <div>
      <button onClick={handleEnable2FA}>
        Enable Two-Factor Authentication
      </button>
      {showResults ? <QR /> : null}
    </div>
  );
}




export default EnableTwoFactorAuth;
