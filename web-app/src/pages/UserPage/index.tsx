import {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button
} from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import pfp from '../../styles/assets/nopfp.png'

interface IUser {
  name: string;
  followers: string[];
}

export default function UserPage(){
  const { username } = useParams();
  const [userData, setUserData] = useState<IUser>({
    name: 'Breno Miranda',
    followers: []
  });
  const [loggedUser, setLoggedUser] = useState('')

  //variavel para saber se o usuario logado ja segue o usuario da página
  const [doIFollow, setDoIFollow] = useState(false)

  //função para pegar dados do usuario logado no sistema do localStorage do navegador
  useEffect(() => {
    const user = localStorage.getItem('user');
    setLoggedUser(user ? user : '');
  }, [])

  //checa se o usuario segue
  useEffect(() => {
    setDoIFollow(userData.followers.includes(loggedUser))
  }, [loggedUser, userData.followers])

  //função para começar a seguir
  //TODO transformar em função assincrona com requisição ao back
  const startFollowing = () => {
    setUserData({...userData, followers: [...userData.followers, loggedUser]})
  }

  //função para parar de seguir
  //TODO transformar em função assincrona com requisição ao back
  const stopFollowing = () => {
    setUserData({...userData, followers: userData.followers.filter(a => a !== loggedUser)})
  }
  
  //TODO adicionar os popups de confirmação
  return (
    <Box bgColor="#1E1E1E" h="90vh">
      <Flex alignItems="flex-end" bgColor="#30332D" h="300px" w="100vw" padding="50px">
        <Flex>
          <Image src={pfp} alt="pfp" w="124px"/>
          <Flex flexDir="column" color="white" marginLeft="25px" alignItems="flex-start" justifyContent="space-evenly">
            <Heading>{`${userData.name} (${username})`}</Heading>
            <Text fontSize="20px">{userData.followers.length} seguidores</Text>
            {!doIFollow && <Button color="#1E1E1E" bgColor="#ABEFED" borderRadius="25px" w="132px" onClick={startFollowing}>SEGUIR</Button>}
            {doIFollow && <Button color="#1E1E1E" bgColor="#ABEFED" borderRadius="25px" w="132px" onClick={stopFollowing}>SEGUINDO</Button>}
          </Flex>
        </Flex>
      </Flex>
      <Heading color="white">Podcasts do Autor...</Heading>
    </Box>
  );
}