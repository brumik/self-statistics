'use client'

import CloudIcon from '@mui/icons-material/Cloud';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { CheckHealthEndpoint } from './api/check-connection/route';

export default function ConnectionIndicatorButton() {
  const [connected, setConnected] = useState(false);

  const checkConnection = async () => {
    try {
      const response = await fetch('/api/check-connection');
      const result = await response.json() as CheckHealthEndpoint;
      setConnected(result.connected);
    } catch (error) {
      setConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, [])

  return (
    <Button color="inherit" onClick={checkConnection}>
      {connected ? <CloudIcon /> : <CloudOffIcon />}
    </Button>
  );
}
