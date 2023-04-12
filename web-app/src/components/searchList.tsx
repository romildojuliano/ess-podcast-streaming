import React from 'react';
import UserCard from './userCard';
import {SimpleGrid} from '@chakra-ui/react'

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <UserCard key={person.id} person={person} />); 
  return (
    <SimpleGrid columns={4} spacing={4} >
      {filtered}
    </SimpleGrid>
  );
}

export default SearchList;