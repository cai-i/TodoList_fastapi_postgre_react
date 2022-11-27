/*
import React from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";
  // sert de composant parent pour les autres composants 
  // utilisant Chakra UI.
  // fournit un thème à tous les composants enfants 
  // ( Header dans ce cas) via l' API Context de React.


// version 2 
/*
import Header from "./components/Header";
import Todos from "./components/Todos";
  // Import le Todos composant

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Todos />
    </ChakraProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
*/

//version 3
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
