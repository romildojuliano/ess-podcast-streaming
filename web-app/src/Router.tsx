import {
  UserPage,
  FavoritesPage,
  PodcastPage,
  ChannelPage,
  Explore,
  Politicsseemore,
  Economyseemore,
  Politicsseemore2,
  LoginPage,
  Search,
  FollowingPage,
  RegisterPage
} from "./pages";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";

function Router() {
  // const user = localStorage.getItem("user");
  // console.log(user)
  // if (!user) {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/*" element={<Navigate to="/login" />} />
  //         <Route path="/login" element={<LoginPage />} />
  //         <Route path="/register" element={<RegisterPage />}/>
  //       </Routes>
  //     </BrowserRouter>
  //   )
  // }
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      localStorage.setItem("user", "test");
    }
  }, []);

  const [user, setUser] = useState("");
  
  useEffect(() => {
    var aux = localStorage.getItem('user')
    setUser(aux === null? '' : aux);
  }, [user])



  return (
    // <HashRouter basename="/">
      
    // </HashRouter>

    <BrowserRouter>
        {
          user === '' ?
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
          </Routes>
          :
        <>
          <Navbar />
          <Routes>
            {/*adicionem aqui as rotas das paginas */}
            <Route path="/*" element={<Navigate to="/explore"/> } /> 
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/podcast/:podcast" element={<PodcastPage />} />
            <Route path="/channel/:username" element={<ChannelPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Politicsseemore" element={<Politicsseemore />} />
            <Route path="/Economyseemore" element={<Economyseemore />} />
            <Route path="/Politicsseemore2" element={<Politicsseemore2 />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </>

        }
        
    </BrowserRouter>
  );
}

export default Router;
