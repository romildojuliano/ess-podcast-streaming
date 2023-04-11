import { Center, Image, Input, Box, Button, FormControl, Stack, Text, VStack } from "@chakra-ui/react";
import podshare_logo from './podshare-logo.svg';


function LoginGroup () {
    return (
        <Stack spacing="2">
            <Text align="center" fontWeight="bold">E-mail</Text>    
            
            <FormControl alignContent="center" alignItems="center" alignSelf="center" marginTop="15%">
                <Input type="email" placeholder="E-mail" border="2px" marginBottom="10%" size="sm" variant="filled" />
            </FormControl>
            
            <Text align="center" fontWeight="bold">Senha</Text>
            <FormControl>
                <Input type="password" placeholder="Senha" border="2px" size="sm" variant="filled"/> 
            </FormControl>
            <Button colorScheme="orange" type="submit" variant="solid" marginTop="5%" marginLeft="35%">Login</Button>
        </Stack>
    );
}

export default function LoginPage() {
    return (
        <Box alignContent="center">
            <VStack>
                <Image src={podshare_logo} alt="podshare logo" border="2px" marginTop="8%"/>
                <LoginGroup />
            </VStack>
            <Center>
                
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