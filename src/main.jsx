import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ChakraProvider } from '@chakra-ui/react';
import { ExperienceProvider } from "./Contexts/ExperienceContext";
import { CurrentQuakeProvider } from './Contexts/CurrentQuakeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ExperienceProvider>
        <CurrentQuakeProvider>
          <App />
        </CurrentQuakeProvider>
      </ExperienceProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
