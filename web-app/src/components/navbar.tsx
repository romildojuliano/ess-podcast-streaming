import { ReactNode } from 'react';
import React from 'react';
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
  Icon,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from '@chakra-ui/react';
import { Favorite, MusicHistory, People } from '../Icons';

const Links = ['Seguindo', 'Histórico',  'Favoritos'];
const IconLinks = [People, MusicHistory , Favorite];
const NavBarPageButton = {
  className: "navbar_page_link",
  textAlign: "{'center'}"
}
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

  return (
    <>
      <Box bg={useColorModeValue('#206867', '#206867')} px={4}>
        
        <Flex h={12} alignItems={'center'} justifyContent={'flex-end'}>
            <Box justifySelf={'start'}>
                <Image src={require('../styles/assets/LogoMarca.png')} height="24px" alt='Podshare' />
            </Box>
            <Spacer/>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
              <NavLink {...NavBarPageButton}  key={link}>
                {React.createElement(IconLinks[index])}
                <br/>
                {link}
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