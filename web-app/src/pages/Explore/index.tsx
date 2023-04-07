import React from 'react';
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
//import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

async function getPolitics(){
  const response = await fetch('http://127.0.0.1:4000/podcasts/politics');
  const data = await response.json();
  console.log(data)

}

getPolitics();


export default function CaptionCarousel() {
    // As we have used custom buttons, we need a reference variable to
    // change the state
    const [slider, setSlider] = React.useState<Slider | null>(null);
  
    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    
    // This list contains all the data for carousels
    // This can be static or loaded from a server
    const cards = [
      {
        title: 'Design Projects 1',
        image:
          'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      },
      {
        title: 'Design Projects 2',
        image:
          'https://images.unsplash.com/photo-1438183972690-6d4658e3290e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2274&q=80',
      },
      {
        title: 'Design Projects 3',
        image:
          'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      },
    ];
  
    return (
      <Heading>
          <Heading>Politics <Link color='teal.500'> see more</Link>
            {/* Slider */}
            <SimpleGrid minChildWidth='120px' spacing='40px'>
              {cards.map((card, index) => (
                <Box
                  key={index}
                  height='calc(30vh)'
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${card.image})`}>
                  {/* This is the block you need to change, to customize the caption */}
                  <Container size="container.lg" height="600px" position="relative">
                    <Stack
                      spacing={6}
                      w={'full'}
                      maxW={'lg'}
                      position="absolute"
                      top="50%"
                      transform="translate(0, -50%)">
                      <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        {card.title}
                      </Heading>
                    </Stack>
                  </Container>
                </Box>
              ))}
            </SimpleGrid>
          </Heading>
          <Heading>Economy <Link color='teal.500'> see more</Link>
                <SimpleGrid>

                </SimpleGrid>
          </Heading>
              

      </Heading>
    );
  }
  