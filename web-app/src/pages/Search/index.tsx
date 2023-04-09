// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';




// async function waitForData(){
//   await getData();
// }

// async function getData() {
//   const response =  await fetch(`http://localhost:4000/search?q=${query}`);
//   const data =  await response.json()
//   users = data;
//   return data;
// }

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let query;
let users;

function Search(){
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function waitForData(){
      const query = new URLSearchParams(location.search).get('q');
      const response =  await fetch(`http://localhost:4000/search?q=${query}`);
      const data =  await response.json()
      setUsers(data);
    }
    waitForData(); 
  }, [location.search]);

  let jsonUsers = JSON.stringify(users)
  console.log(jsonUsers)

  return (
    <div>
    <h2>Search Results for: {query}</h2>
    <p>{jsonUsers}</p>  
    </div>
  );
}

// export default Search;


// function Search(){
//   const location = useLocation();
//   query = new URLSearchParams(location.search).get('q');

//   waitForData(); 
//   let jsonUsers = JSON.stringify(users)
//   console.log(jsonUsers)

//   return (
//     <div>
//     <h2>Search Results for: {query}</h2>
//     <p>{jsonUsers}</p>  
//     </div>
//   );
// }


export default Search;