import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function Search(){
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  let users = [];

  async function getData() {
  
    const response = await fetch(`http://localhost:4000/search?q=${query}`);
    const data = await response.json()
    console.log(data);
    users = data;
    return (data);
  
  }

  getData();

  return (
    <div>
    <h2>Search Results for: {query}</h2>
      {users.map((user, index) => (
        <div  key={index}>
          <p>Username: {user}</p>
        </div>
      ))}
    </div>

  );
}


export default Search;