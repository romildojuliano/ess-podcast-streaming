import Router from './Router';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render( <ChakraProvider><Router /></ChakraProvider>, document.getElementById('root'));