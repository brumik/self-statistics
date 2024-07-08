'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState("Loading");

  const checkConnection = async () => {
    try {
      const response = await fetch('/api/check-connection');
      const result = await response.json();
      setStatus(result.connected ? 'Connected to MongoDB' : `Failed to connect: ${result.error}`);
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred while checking the connection');
    }
  };

  return (
    <div>
      <button onClick={checkConnection}>Check MongoDB Connection</button>
      {status && <p>{status}</p>}
    </div>
  );
}

