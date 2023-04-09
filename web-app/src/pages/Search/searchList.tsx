import React from 'react';
import UserCard from './card';
import {SimpleGrid} from '@chakra-ui/react'

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <UserCard key={person.id} person={person} />); 
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>{filtered}</SimpleGrid>
  );
}

export default SearchList;