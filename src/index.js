import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { SocketProvider } from './contexts/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <SocketProvider> {/* Ini membungkus seluruh aplikasi */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </ChakraProvider>
  </React.StrictMode>
);
