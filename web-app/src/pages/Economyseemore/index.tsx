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
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { stringify } from 'querystring';
//import { Link } from 'react-router-dom';
type Card = {
  title: string;
  image: string
}
let cardsEconomy:Card[] = []


async function getEconomy(){
  const response = await fetch('http://127.0.0.1:4000/podcasts/economy');
  const data = await response.json();

  for(let i in data){
    let y:number = +i

    cardsEconomy[y] = data[i]
  }
  return(data)
}

getEconomy();

  
export default function Economyseemore(){
    // As we have used custom buttons, we need a reference variable to
    // change the state
    const [slider, setSlider] = React.useState<Slider | null>(null);
  
    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
    
  return(
    <Heading>
          <Heading>Economy
            <SimpleGrid minChildWidth='120px' spacing='40px'>
              {cardsEconomy.map((card, index) => (
                <Box
                  key={index}
                  height='calc(30vh)'
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${card.image})`}
                  >
                </Box>
              ))}
            </SimpleGrid>
          </Heading>
    </Heading>
  );
}