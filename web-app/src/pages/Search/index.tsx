import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchList from '../../components/searchList';
import Scroll from '../../components/scroll';

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
    if(users.length == 0){
      return (
        <h2 id="noResult">Nenhum resultado encontrado</h2>
      )
    }
    else{
      return (
        <Scroll>
          <SearchList filteredPersons={users} />
        </Scroll>
      );
    }
  }

  return (
    <div id="searchResults"> 
    <h1>Search Results for: {query}</h1>
    {searchList()}
    </div>
  );
}

export default Search;