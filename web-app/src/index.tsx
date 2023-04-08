import Router from './Router';
import ReactDOM from 'react-dom';
import { ChakraProvider,  extendTheme } from '@chakra-ui/react';
import Navbar from "./components/navbar";
const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
            color: "white",
            backgroundColor: "#1A1C18"
        },
      },
    },
  });
  

ReactDOM.render( <ChakraProvider theme={theme}><Navbar/><Router /></ChakraProvider>, document.getElementById('root'));