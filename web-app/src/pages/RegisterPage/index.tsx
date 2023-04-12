import { Center, Image, Input, Box, Button, FormControl, Stack, VStack, Link, FormLabel } from "@chakra-ui/react";
import podshare_logo from '../../styles/assets/podshare-logo.svg';
// import { Link } from "react-router-dom";

const border = "0px";

function RegisterGroup () {
    return (
        <Stack spacing="3" border={border} w="15%">
            {/* Usuário */}
            <FormControl alignContent="center" alignItems="center" alignSelf="center" marginTop="15%" isRequired>
            <FormLabel fontWeight="bold">Usuário</FormLabel>    
                <Input type="text" placeholder="Nome de usuário" border={border} size="sm" variant="filled" />
            </FormControl>
            
            {/* E-mail */}
            <FormControl isRequired>
            <FormLabel fontWeight="bold">E-mail</FormLabel>
                <Input type="email" placeholder="E-mail" border={border} size="sm" variant="filled" />
            </FormControl>

            {/* Senha */}
            <FormControl isRequired>
            <FormLabel fontWeight="bold">Senha</FormLabel>
                <Input type="password" placeholder="Senha" border={border} size="sm" variant="filled"/> 
            </FormControl>

            {/* Senha */}
            <FormControl isRequired>
            <FormLabel fontWeight="bold">Data de nascimento</FormLabel>
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
            ><Link href="/login">Criar conta</Link></Button>
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
                <Link marginTop=".75%" href="/login" color="#a3d2fe">↵ Voltar para tela de login </Link>
            </Center>
        </Box>
    );
}