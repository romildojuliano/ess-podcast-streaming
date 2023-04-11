import { ReactNode } from 'react';
import React, { useState } from 'react';
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
  Image,
  Input,
  Icon
} from '@chakra-ui/react';

import { AddIcon, LockIcon } from '@chakra-ui/icons';

import Router from "../Router"
import { useNavigate } from 'react-router-dom';

import { Favorite, MusicHistory, People } from '../Icons';
const Links = [
  {nome: 'Explore', href: "#"},
  {nome: 'Seguindo', href: "http://localhost:3000/following"},
  {nome: 'Histórico', href: "#"},
  {nome: 'Favoritos', href: "/favorites"}
];
const IconLinks = [People, People, MusicHistory , Favorite];
const NavBarPageButton = {
  className: "navbar_page_link",
  textAlign: "{'center'}"
}

type NavProps = {
  href: string,
  children: ReactNode
  id: string,
}

const NavLink = (props: NavProps) => (
  <Link
    px={2}
    py={1}
    id={props.id}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={props?.href}
  >
    {props.children}
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
              {Links.map((link, index) => (
                <NavLink {...NavBarPageButton} id={link.nome} key={link.nome} href={link.href}>
                  {React.createElement(IconLinks[index])}
                  <br/>
                  {link.nome}
                </NavLink>
              ))}
              
            </HStack>

            
          <Flex alignItems={'center'}>
            
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
                <Box>
                  
                </Box>
                <LockIcon />
                <Link textColor="black" href="/login" onClick={(e) => {localStorage.setItem("user", ""); window.location.reload()}}> Sair</Link>
              </MenuList>
              
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            {/* <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                 <NavLink key={link[1]}>
                 {link[0]}
             </NavLink>
              ))}
            </Stack> */}
            
          </Box>
        ) : null}
      </Box>

    </>
  );
}