import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import pfp from "../../styles/assets/nopfp.png";

interface IUser {
  email: string;
  username: string;
  password: string;
  createdAt: string;
  followers: string[];
  following: string[];
  history: string[];
}

interface IPodcast {
  name: string;
  link: string;
  subject: string;
  image: string;
}

export default function ChannelPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState<IUser>({
    email: "",
    username: "",
    password: "",
    createdAt: "",
    followers: [],
    following: [],
    history: [],
  });
  const [userPodcasts, setUserPodcasts] = useState<IPodcast[]>();
  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  //variavel para saber se o usuario logado ja segue o usuario da página
  const [doIFollow, setDoIFollow] = useState(false);

  //função para pegar dados do usuario logado no sistema do localStorage do navegador
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await (
        await fetch(`http://localhost:4000/getUser/${username}`)
      ).json();
      setUserData(data.userData);
      setUserPodcasts(data.podcasts);
    };

    const user = localStorage.getItem("user");
    setLoggedUser(user ? user : "");

    if (!loading) getUserData();
  }, [username, loading]);

  const [name, setName] = useState("Nome do Podcast");
  const [subject, setSubject] = useState("Escolha uma categoria");
  const [link, setLink] = useState("Link do Podcast");
  const [author, setAuthor] = useState("mattvie");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { subject, name, link, author };

    alert(data);
  };

  return (
    <Box bgColor="#1E1E1E" h="90vh">
      <Flex
        alignItems="flex-end"
        bgColor="#30332D"
        h="300px"
        w="100vw"
        padding="50px"
      >
        <Flex>
          <Image src={pfp} alt="pfp" w="124px" />
          <Flex
            flexDir="column"
            color="white"
            marginLeft="25px"
            alignItems="flex-start"
            justifyContent="space-evenly"
          >
            <Heading>{userData.username}</Heading>
            <Text fontSize="20px">{userData.followers.length} seguidores</Text>

            <Button
              onClick={onOpen}
              color="#1E1E1E"
              bgColor="#ABEFED"
              borderRadius="25px"
              w="132px"
            >
              UPLOAD
            </Button>

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent bgColor="#252525">
                <ModalHeader color={"white"}>Novo Podcast</ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Nome</FormLabel>
                      <Input
                        ref={initialRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="politics">Politics</option>
                        <option value="economy">Economy</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Link</FormLabel>
                      <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </FormControl>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Upload
                  </Button>
                  <Button colorScheme="blue" onClick={onClose}>
                    Fechar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDir="row" h="400px" w="100vw" padding="50px">
        {userPodcasts?.map((podcast) => (
          <Flex
            flexDir="column"
            color="white"
            w="fit-content"
            margin="0 25px"
            alignItems="flex-start"
            justifyContent="space-evenly"
          >
            <Image
              src={podcast.image}
              alt="podcast image"
              boxSize="200px"
              minHeight="200px"
              objectFit="cover"
              borderRadius="10px"
            />
            <Heading marginTop="10px" fontSize="20px">
              {podcast.name}
            </Heading>
            <Text>{podcast.subject}</Text>
            <Link href={podcast.link}>Ver podcast</Link>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
