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
  created_at: string;
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
    created_at: "",
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
  const [subject, setSubject] = useState("");
  const [link, setLink] = useState("Link do Podcast");
  const [author, setAuthor] = useState(username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { subject, name, link, author };

    //console.log(data);

    // const response = await fetch("http://localhost:4000/podcasts/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    // const jsonData = await response.json();

    // fetch("http://localhost:4000/podcasts/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json()) // converter para json
    //   .then((json) => console.log(json)) //imprimir dados no console
    //   .catch((err) => console.log(err)); // lidar com os erros por catch

    fetch("http://localhost:4000/podcasts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(function (response) {
        //console.log("ok");
        alert("ok");
      })
      .catch(function (error) {
        //console.log(error);
        alert("erro");
      });

      window.location.reload()
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
              className="UPLOAD"
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
                        ng-model="forms.name"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Escolha uma Categoria"
                      >
                        <option value="Politics" className="forms-politics">Politics</option>
                        <option value="Economy" className="forms-economy">Economy</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Link</FormLabel>
                      <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        ng-model="forms.link"
                      />
                    </FormControl>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        type="submit"
                        onClick={onClose}
                        className="submit"
                      >
                        Enviar
                      </Button>
                      <Button colorScheme="blue" onClick={onClose}>
                        Fechar
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
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
            <Heading marginTop="10px" fontSize="20px" id="podcast-name">
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
