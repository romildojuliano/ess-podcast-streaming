import { Card, CardHeader, CardBody, Heading, Image, Text } from '@chakra-ui/react'

function UserCard({person}) {
  return(
    // <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
    //   <img className="br-100 h3 w3 dib" alt={person.username} src="" />
    //   <div>
    //     <h2>{person.username}</h2>
    //     <p>{person.email}</p>
    //   </div>
    // </div>
    <Card maxW='sm' align='center'>
        <Image 
        src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"alt={person.username}/>
        <CardHeader>
            <Heading size='md' >{person.username}</Heading>
        </CardHeader> 
        <CardBody>
            <Text>{person.email}</Text>
        </CardBody>
    </Card>
  );
}

export default UserCard;