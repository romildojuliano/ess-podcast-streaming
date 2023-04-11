import { Center, Image, Input, Box, Button, FormControl, Stack, Text, VStack, Link } from "@chakra-ui/react";
import podshare_logo from '../../styles/assets/podshare-logo.svg';
// import { Link } from "react-router-dom";

const border = "0px";

function RegisterGroup () {
    return (
        <Stack spacing="2" border={border} w="15%">
            {/* Usuário */}
            <Text align="center" fontWeight="bold">Usuário</Text>    
            <FormControl alignContent="center" alignItems="center" alignSelf="center" marginTop="15%">
                <Input type="text" placeholder="E-mail" border={border} size="sm" variant="filled" />
            </FormControl>
            
            {/* E-mail */}
            <Text align="center" fontWeight="bold">E-mail</Text>
            <FormControl>
                <Input type="email" placeholder="E-mail" border={border} size="sm" variant="filled" />
            </FormControl>

            {/* Senha */}
            <Text align="center" fontWeight="bold">Senha</Text>
            <FormControl>
                <Input type="password" placeholder="Senha" border={border} size="sm" variant="filled"/> 
            </FormControl>

            {/* Senha */}
            <Text align="center" fontWeight="bold">Data de nascimento</Text>
            <FormControl>
                <Input type="date" placeholder="Data de nascimento" border={border} size="sm" variant="filled"/> 
            </FormControl>

            <Button 
                colorScheme="orange"
                type="submit" 
                variant="solid" 
                marginTop="10%" 
                marginLeft="35%" 
                w="60%" 
                alignSelf="center"
            >Criar conta</Button>
        </Stack>
    );
}

export default function RegisterPage() {
    return (
        <Box alignContent="center">
            <VStack>
                <Image src={podshare_logo} alt="podshare logo" border={border} marginTop="8%"/>
                <RegisterGroup />
            </VStack>
            <Center>
                <Link marginTop=".75%" href="/l">↵ Voltar para tela de login </Link>
            </Center>
        </Box>

    //     <Center marginTop="8%">
    //     <Center>
    //         <Image src={podshare_logo} alt="podshare logo" border="2px"/>
    //     </Center>
    //     <Center 
    //         border="2px" 
    //         borderColor="red" 
    //         display='flex'
    //         bg='tomato'
    //         h='100px'
    //     >
    //         <LoginGroup /> 
    //     </Center>
    //     <Button colorScheme="orange" type="submit" variant="solid">
    //         Login
    //     </Button>
    // </Center>
    );
}