
import {useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  useToast
} from '@chakra-ui/react';

import { Star, StarOff } from '../../utils/StarIcons';
import { Previous,Play,Next} from '../../Icons';
import { IPodcast } from "../../models/Podcast";

export default function PodcastPage(){
  const { podcast } = useParams();
  const [favorites, setUserFavorites] = useState<IPodcast[]>()
  const props  = useLocation().state;
  const [podcastData, setPodcastData] = useState<IPodcast>({
    name: props?.podcast?.name || podcast || '',
    link: props?.podcast?.link || '',
    author: props?.podcast?.author || '',
    subject: props?.podcast?.subject || '',
    created_at: props?.podcast?.created_at || '',
    image:  props?.podcast?.image || ''
  })
  const user = localStorage.getItem('user');
  const [loggedUser, setLoggedUser] = useState(user ? user : '')
  const [loading, setLoading] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  console.log("podcastData:", podcastData);

  useEffect(() => {
    const getUserFavorites = async() => {
      try {
        const  data  = await (await fetch(`http://localhost:4000/favorites/${user}`)).json()
        setUserFavorites(data);
        if(data.find(({name}) => name == podcast) !=  null)
          setFavorite(true);
      
      } catch (error) {
        console.error(error); 
      }
    };
    const getPodcast = async () => {
      const data = await (
        await fetch(`http://localhost:4000/podcast/${podcast}`)    
      ).json()
      if(data != null) 
        setPodcastData(data);
    }
     getUserFavorites();
     getPodcast();
  }, [loggedUser, loading]);

  const requestFavorite = async () => {
    setLoading(true)
    console.log(JSON.stringify({
      podcast: podcast
    }));
    const {message} = await (
      await fetch(`http://localhost:4000/favorite/${loggedUser}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          podcast: podcast
        })
      })
    ).json()

    if(message != null ){
      if(message.includes("Favorite")){
        setFavorite(true);
        toast({
          title: 'Favoritado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      else if(message.includes("Disfavor")){
        setFavorite(false);
        toast({
          title: 'Desfavoritado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    setLoading(false)
  }

  const publishedAt = (): string => {
    if(podcastData.created_at == null)
      return "agora";
    var created_at : Date = new Date(podcastData.created_at);
    console.log( new Date().getTime(), created_at);
    var interval : number = new Date().getTime() - created_at.getTime();
    interval = Math.floor(interval/1000);
    if(interval >= 60 * 60 * 24 * 30){
      interval = Math.floor(interval / (60 * 60 * 24 * 30));
      return `${ interval } ${interval > 1 ? 'meses':'mês'} atrás`;
    }
    else if(interval >= 60 * 60 * 24){
      interval = Math.floor(interval / (60 * 60 * 24));
      return `${interval} dia${interval > 1 ? 's':''} atrás`;
    }
    else if(interval >= 60 * 60){
      interval = Math.floor(interval / (60 * 60));
      return `${interval} hora${interval > 1 ? 's':''} atrás`;
    }
    else if(interval >= 60 ){
      interval = Math.floor(interval / 60);
      return `${interval} minuto${interval > 1 ? 's':''} atrás`;
    }
    return "há pouco tempo";
  }  
  
  return (
  <Container padding={8} maxW='4xl'  centerContent>
    <Flex>
      <Image  boxSize='320px'   borderRadius='16px' alt={podcastData.name} src={podcastData.image} fallbackSrc={require('../../styles/assets/placeholderPodcastImage.png')} />
      <Box paddingLeft={2} w="560px">
        <Flex justifyContent={"space-between"}>
          <Heading>{podcastData.name}</Heading>
          <IconButton
            colorScheme='transparent'
            fontSize={36}
            size='lg'
            isActive={true}
            id="favorite-button"
            aria-label='Favorite'
            onClick={(event: any) => requestFavorite()}
            icon={isFavorite ? <Star id="star-on" color={'#DDC700'}/> :  <StarOff id="star-off"  />}
          />
        </Flex>
        <Text fontSize='xl'  mt={2} >
          <Avatar
                size={'xs'}
                marginRight={2}
          />
          {podcastData.author}
        </Text>
        <Text   mt={2} fontSize='sm' fontWeight=''>
          <Badge  borderRadius='full' variant={'subtle'} ml='1' mr='2' fontSize='1.2em' colorScheme='blue'>
          {podcastData.subject}
          </Badge>
          {publishedAt()}
        </Text>
        <Progress mt={6} value={20} size='xs' colorScheme='blue' />
        <Flex justifyContent={'space-between'}>
          <Text fontSize='xs'>00:02:25</Text>
          <Box>
            <IconButton colorScheme='transparent'
              fontSize={24}
              size='lg'
              aria-label='Previous'
              icon={<Previous/>}>
            </IconButton>
            <IconButton colorScheme='transparent'
              fontSize={36}
              size='lg'
              aria-label='Play'
              icon={<Play/>}>
            </IconButton>
            <IconButton colorScheme='transparent'
              fontSize={24}
              size='lg'
              aria-label='Next'
              icon={<Next/>}>
            </IconButton>
          </Box>
          <Text fontSize='xs'>00:10:47</Text>
        </Flex>
      </Box>
    </Flex>
  </Container>
  );
}