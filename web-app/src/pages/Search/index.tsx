import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchList from './searchList';
import Scroll from './scroll';

let query;

function Search(){
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function waitForData(){
      query = new URLSearchParams(location.search).get('q');
      const response =  await fetch(`http://localhost:4000/search?q=${query}`);
      const data =  await response.json()
      setUsers(data);
    }
    waitForData(); 
  }, [location.search]);

  let jsonUsers = JSON.stringify(users)
  console.log(jsonUsers)

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredPersons={users} />
      </Scroll>
    );
  }

  return (
    <div> 
    <h2>Search Results for: {query}</h2>
    {searchList()}
    </div>
  );
}

export default Search;