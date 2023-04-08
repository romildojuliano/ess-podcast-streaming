import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


let query;
let users;

async function getData() {
  const response =  await fetch(`http://localhost:4000/search?q=${query}`);
  const data =  await response.json()
  users = data;
  return data;
}


function Search(){
  const location = useLocation();
  query = new URLSearchParams(location.search).get('q');

  getData();
 
  let jsonUsers = JSON.stringify(users)
  console.log(jsonUsers)

  return (
    <div>
    <h2>Search Results for: {query}</h2>
    <p>{jsonUsers}</p>  
    </div>
  );
}


export default Search;