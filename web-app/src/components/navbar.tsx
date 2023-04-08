import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Input
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import Router from "../Router"
import { useNavigate } from 'react-router-dom';



const Links = ['Explore','Seguindo', 'Histórico', 'Favoritos'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);


export default function Navbar() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  function handleSubmit(event) {

   // get the navigate function from the router

    event.preventDefault(); // prevent default form submission behavior
    
    const form = event.target;
    const formData = new FormData(form);
    const query = formData.get('q'); // get the value of the input field
    
     navigate(`/search?q=${query}`); // navigate to the /search page with the query as a URL parameter
    // redirect to the /search page with the query as a URL parameter
  }

  return (
    <>
      <Box bg={useColorModeValue('#206867', '#206867')} px={4}>
        
        <Flex h={12} alignItems={'center'} justifyContent={'flex-end'}>
            <Box justifySelf={'start'}>
                <Image src={require('../styles/assets/LogoMarca.png')} height="24px" alt='Podshare' />
            </Box>
            <Spacer />
            <Flex as='form' alignItems={'flex-start'} onSubmit={handleSubmit}>
              <Input
                type='text'
                name='q'
                placeholder='Search Users'
                color='white'
                bg='gray.800'
                _placeholder={{ color: 'gray.400' }}
                mr={2}
              />
              <Button colorScheme='teal' type='submit'>
                Search
              </Button>
            </Flex>
            <Spacer/>
            
            
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              
            </HStack>

            
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Action
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    ''
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Teste</MenuItem>
                <MenuDivider />
                <MenuItem>Teste</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  );
}