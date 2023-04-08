import React from "react";
import {Link, useNavigate} from 'react-router-dom';
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
import { type } from "os";
import {WarningIcon} from "@chakra-ui/icons";
import { useClickable } from "@chakra-ui/clickable";
import {chakra} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
const Clickable = (props: any) => {
  const clickable = useClickable(props)
  return <chakra.button display="" {...clickable} />
}


interface FavoritePageProps {
  navigate: any,
  user: {
    username: string
  }
}
interface FavoritesPageState {
  loading: boolean,
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
    
      loading: false,
      favorites: [
        // {
        //   name: "Git",
        //   link: "",
        //   author: "mattvie",
        //   image: "https://i.ytimg.com/vi/DqTITcMq68k/mqdefault.jpg"
        // },
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
      { this.state.loading ? 
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
      <HStack spacing={6}>
        {
          this.state.favorites.map((favorite) => (
            <Clickable as="Box" onClick={(event: any) => this.OpenPodcastPage(favorite)} w={'200px'}>
              <Image  boxSize='200px' borderRadius='8px' alt={favorite.name} src={favorite.image} fallbackSrc={require('../../styles/assets/placeholderPodcastImage.png')} />
              <Text fontSize={'2xl'}>{favorite.name}</Text>
              <Text fontSize={'sm'}> <Avatar
                  size={'xs'}
                  marginRight={2}
            />{favorite.author}</Text>
            </Clickable>
          ))
        }
        
      </HStack>
      { this.state.favorites.length == 0 && this.state.loading == false ? 
        <VStack mt={12} justifyContent={'center'}>
          <WarningIcon fontSize={'6xl'}></WarningIcon>
          <Heading fontWeight={'normal'} fontSize={'xl'}>Nada ainda em Favoritos</Heading>
        </VStack>
        : <></>
      }
    </Container>
    );
  } 
  OpenPodcastPage(favorite : Favorite) : void{
    this.props.navigate(
      '/podcast',{
      state: {
        podcast: favorite
      } 
    })
    
  }
  componentDidMount(): void {
    this.setState({loading: true});
    fetch(`http://localhost:3001/favorites/${this.props.user.username}`)
    .then(async response => {
      var data = await response.json();
      
      console.log(data);
      var result: Array<Favorite> = (data);
      this.setState({favorites: result || [], loading: false})
    });
  }
   
}

function FavoritesWithNavigation(props: any) {
  let navigate = useNavigate();
  return <FavoritesPage {...props} navigate={navigate} />
}

export default FavoritesWithNavigation;
