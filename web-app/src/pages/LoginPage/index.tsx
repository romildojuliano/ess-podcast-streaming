import { Center, Image, Input, Box, Button, FormControl, Stack, VStack, Link, FormLabel } from "@chakra-ui/react";
import podshare_logo from '../../styles/assets/podshare-logo.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models/User";

const border = "0px";
const server = "http://localhost:4000"


function LoginGroup () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleClick = async (e) => {
        localStorage.setItem("user", "romildo");
        console.log(localStorage.getItem("user"));
        window.location.reload();
    };

    return (
        <Stack spacing="2" border={border} w="15%">
            <FormControl alignContent="center" alignItems="center" alignSelf="center" marginTop="15%">
                <FormLabel fontWeight="bold">Usuário</FormLabel>            
                <Input value={username} onInput={handleUsernameChange} type="email" id="username-input" placeholder="E-mail" border={border} marginBottom="2.5%" size="sm" variant="filled" />
            </FormControl>
            
            <FormControl>
                <FormLabel fontWeight="bold">Senha</FormLabel>
                <Input type="password" value={password} onInput={handlePasswordChange} placeholder="Senha" border={border} size="sm" variant="filled"/> 
            </FormControl>

            <Button 
                colorScheme="orange"
                type="submit" 
                variant="solid" 
                marginTop="10%" 
                marginLeft="35%" 
                w="40%" 
                alignSelf="center"
                onClick={handleClick}
            >Login</Button>
        </Stack>
    );
}

export default function LoginPage() {
    return (
        <Box alignContent="center">
            <VStack>
                <Image src={podshare_logo} alt="podshare logo" border={border} marginTop="8%"/>
                <LoginGroup />
            </VStack>
            <Center>
                <Link marginTop=".75%" href="/register" color="#a3d2fe">Não possui uma conta? Clique aqui</Link>
            </Center>
        </Box>
    );
}