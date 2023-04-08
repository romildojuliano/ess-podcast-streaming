import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';

const Home: React.ElementType = () => (
  <div>
    <h1>Podshare routes:</h1>
    <nav>
      <li ><a className="userTest" href="/userTest">UserTest</a></li>
      <li ><a className="Explore" href="/explore">Explore</a></li>
    </nav>
  </div>

);

export default Home;
