import React from "react";
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
  Spacer
} from '@chakra-ui/react';
import { type } from "os";
import {WarningIcon} from "@chakra-ui/icons";

interface FavoritePageProps {
  user: {
    username: string
  }
}
interface FavoritesPageState {
  favorites: Array<Favorite>
}
type Favorite  = {
  name: string,
  link?: string,
  author?: string,
  created_at?: string,
  image?: string,
}

class FavoritesPage extends React.Component<FavoritePageProps, FavoritesPageState> {
  constructor(props: FavoritePageProps) {
    super(props)
		this.state = {
     favorites: [
      {
        name: "Git",
        link: "",
        author: "mattvie",
        image: "https://i.ytimg.com/vi/DqTITcMq68k/mqdefault.jpg"
      },
      // {
      //   name: "Git",
      //   link: "",
      //   author: "mattvie2",
      //   image: "https://i.ytimg.com/vi/DqTITcMq68k/mqdefault.jpg"
      // },
      // {
      //   name: "Git",
      //   link: "",
      //   author: "mattvie3",
      //   image: "https://i.ytimg.com/vi/DqTITcMq68k/mqdefault.jpg"
      // },
      ]
		};
    console.log(this.props);

	}
  render(){
    return (
    <Container padding={8} mt={6} maxW='4xl'  >
      <Heading fontWeight={'normal'} fontSize={'2xl'} mb={4} textAlign={'left'}>FAVORITOS</Heading><Spacer/>   
      
      <HStack spacing={6}>
        {
          this.state.favorites.map((favorite) => (
            <Box w={'200px'}>
              <Image  boxSize='200px' borderRadius='8px' alt={favorite.name} src={favorite.image} fallbackSrc={require('../../styles/assets/placeholderPodcastImage.png')} />
              <Text fontSize={'2xl'}>{favorite.name}</Text>
              <Text fontSize={'sm'}> <Avatar
                  size={'xs'}
                  marginRight={2}
            />{favorite.author}</Text>
            </Box>
          ))
        }
        
      </HStack>
      { this.state.favorites.length == 0 ? 
        <VStack mt={12} justifyContent={'center'}>
          <WarningIcon fontSize={'6xl'}></WarningIcon>
          <Heading fontWeight={'normal'} fontSize={'xl'}>Nada ainda em Favoritos</Heading>
        </VStack>
        : <></>
      }
    </Container>
    );
  } 
  componentDidMount(): void {
    
  }
   
}


export default FavoritesPage;
