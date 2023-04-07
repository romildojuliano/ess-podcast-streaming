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
  const [doIFollow, setDoIFollow] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user');
    setLoggedUser(user ? user : '');
  }, [])

  useEffect(() => {
    setDoIFollow(userData.followers.includes(loggedUser))
  }, [loggedUser, userData.followers])

  const startFollowing = () => {
    setUserData({...userData, followers: [...userData.followers, loggedUser]})
  }

  const stopFollowing = () => {
    setUserData({...userData, followers: userData.followers.filter(a => a !== loggedUser)})
  }
  
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
    </Box>
  );
}