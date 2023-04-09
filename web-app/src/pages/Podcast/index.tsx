import React from "react";
import { ReactNode } from 'react';
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
  Progress
} from '@chakra-ui/react';
import { Star, StarOff } from '../../utils/StarIcons';
import { Previous,Play,Next} from '../../Icons';

interface PodcastPageProps {
  podcast?: {
    name: string,
    link?: string,
    author?: string,
    created_at?: string,
    subject?: string,
    image?: string,
  }
 
}
interface PodcastPageState {
  podcast: {
    name: string,
    link?: string,
    author?: string,
    created_at?: string,
    subject?: string,
    image?: string,
  },
   isFavorite: boolean,
}

class PodcastPage extends React.Component<PodcastPageProps, PodcastPageState> {
  constructor(props: PodcastPageProps) {
		super(props);
		this.state = {
      podcast: {
        name: "",
        link: "",
        author: "",
        created_at: "",
        subject: "",
        image: ""
      },
      isFavorite: false,
		};
    console.log(this.props);

	}
  render(){
    return (
    <Container padding={8} maxW='4xl'  centerContent>
      <Flex>
        <Image  boxSize='320px'   borderRadius='16px' alt={this.props.podcast?.name} src={this.props.podcast?.image} fallbackSrc={require('../../styles/assets/placeholderPodcastImage.png')} />
        <Box paddingLeft={2} w="560px">
          <Flex justifyContent={"space-between"}>
            <Heading>{this.props.podcast?.name}</Heading>
            <IconButton
              colorScheme='transparent'
              fontSize={36}
              size='lg'
              isActive={true}
              aria-label='Favorite'
              icon={this.state.isFavorite ? <Star color={'#DDC700'}/> :  <StarOff />}
            />
          </Flex>
          <Text fontSize='xl'  mt={2} >
            <Avatar
                  size={'xs'}
                  marginRight={2}
            />
            {this.props.podcast?.author}
          </Text>
          <Text   mt={2} fontSize='sm' fontWeight=''>
            <Badge borderRadius='full' variant={'subtle'} ml='1' mr='2' fontSize='1.2em' colorScheme='blue'>
            {this.props.podcast.subject}
            </Badge>
            {this.PublishedAt()}
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
  componentDidMount(): void {
    
  }

  PublishedAt(): string {
    if(this.props.podcast?.created_at == null)
      return "agora";
    var created_at : Date = new Date(this.props.podcast.created_at);
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

    
}


export default PodcastPage;
