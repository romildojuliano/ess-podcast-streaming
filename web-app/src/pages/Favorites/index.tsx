import React from "react";
import { useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Container,
  Heading,
  Image,
  IconButton,
  Text,
  Avatar,
  Badge, 
  Progress,
  HStack,
  VStack,
  Spacer,
  Spinner
} from '@chakra-ui/react';

import {WarningIcon} from "@chakra-ui/icons";
import { useClickable } from "@chakra-ui/clickable";
import {chakra} from "@chakra-ui/react";

const Clickable = (props: any) => {
  const clickable = useClickable(props)
  return <chakra.button display="" {...clickable} />
}

interface IUser {
  email: string;
  username: string;
  password: string;
  createdAt: string;
  followers: string[];
  following: string[];
  history: string[];
}

type Podcast  = {
  name: string,
  link?: string,
  author?: string,
  subject?: string,
  created_at?: string,
  image?: string,
}
export default function FavoritesPage(){
  const [userData, setUserData] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    createdAt: '',
    followers: [],
    following: [],
    history: []
  });
  const [favorites, setUserFavorites] = useState<Podcast[]>()
  const [loggedUser, setLoggedUser] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const user =  localStorage.getItem('user');
    
    setLoggedUser(user ? user : '')
    const getUserFavorites = async() => {
      try {
        const  data  = await (await fetch(`http://localhost:4000/favorites/${user}`)).json()
        setUserFavorites(data);
      } catch (error) {
        console.error(error); 
      }
    };
     if (!loading) getUserFavorites()
    //  setLoading(false);
  }, [loggedUser, loading]);
 
  const openPodcastPage = async (favorite : Podcast) => {
    navigate(
      `/podcast/${favorite.name}`,{
      state: {
        podcast: favorite
      } 
    })
  }
   
  return (
  <Container padding={8} mt={6} maxW='4xl'  >
    <Heading fontWeight={'normal'} fontSize={'2xl'} mb={4} textAlign={'left'}>FAVORITOS</Heading><Spacer/>   
    { loading ? 
      <VStack mt={12} justifyContent={'center'}>
        <Spinner
          thickness='6px'
          speed='0.65s'
          emptyColor='blue.200'
          color='blue.600'
          size='xl'
        /> 
      </VStack>: <></>
      }
    <HStack spacing={6} alignItems={'start'}>
      {
        favorites?.map((favorite) => (
          <Clickable as="div" onClick={(event: any) => openPodcastPage(favorite)} w={'200px'}>
            <Image  boxSize='200px' borderRadius='8px' alt={favorite.name} src={favorite.image} fallbackSrc={require('../../styles/assets/placeholderPodcastImage.png')} />
            <Text fontSize={'2xl'} mt={1}>{favorite.name}</Text>
            <Text fontSize={'sm'}> <Avatar
                size={'xs'}
                marginRight={2}
          />{favorite.author}</Text>
          </Clickable>
        ))
      }
    </HStack>
    { favorites?.length == 0 && loading == false ? 
      <VStack mt={12} justifyContent={'center'}>
        <WarningIcon fontSize={'6xl'}></WarningIcon>
        <Heading fontWeight={'normal'} fontSize={'xl'}>Nada ainda em Favoritos</Heading>
      </VStack>
      : <></>
    }
  </Container>
  );
}
