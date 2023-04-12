import {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Link,
} from '@chakra-ui/react';
import pfp from '../../styles/assets/nopfp.png'
import { FollowingUser } from "../../models/FollowingUser";


export default function UserPage(){
  const [userData, setUserData] = useState<FollowingUser>({
    following: []
  });
  const [loggedUser, setLoggedUser] = useState('')

  //função para pegar a lista de seguidores do usuario logado
  useEffect(() => {
    const getUserData = async() => {
      const { data } = await (await fetch(`http://localhost:4000/getUser/${loggedUser}`)).json()
      setUserData(data.userData)
    };

    getUserData()
  }, [loggedUser]);

  //função para pegar dados do usuario logado no sistema do localStorage do navegador
  useEffect(() => {
    const user = localStorage.getItem('user');
    setLoggedUser(user ? user : '')
  }, [])
  
  return (
    <Box bgColor="#1E1E1E" h="90vh">
      <Flex flexDir="column" h="100%" w="100vw" padding="50px">
        <Heading marginBottom="15px"><b>USUÁRIOS SEGUIDOS</b></Heading>
        {userData.following?.map(user => 
          <Flex justifyContent="space-between" alignItems="center" flexDir="row" color="white" w="50vw" margin="15px" padding="10px 20px" borderRadius="20px" bgColor="#30332D">
            <Flex w="fit-content">
              <Image src={pfp} alt="profile pic" boxSize="36px" objectFit="cover"/>
              <Heading className="users" marginLeft="10px" >{user}</Heading>
            </Flex>
            <Link href={`http://localhost:3000/user/${user}`}>Ver usuario</Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}