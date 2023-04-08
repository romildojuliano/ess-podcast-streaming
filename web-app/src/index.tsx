import Router from './Router';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from "./components/navbar";
import CaptionCarousel from './components/carousel';

ReactDOM.render( <ChakraProvider><Navbar/><Router /></ChakraProvider>, document.getElementById('root'));