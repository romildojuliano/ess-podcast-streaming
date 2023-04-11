import {
  UserPage,
  Home,
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
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/*adicionem aqui as rotas das paginas */}
        <Route path="/" element={<Home />} />
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
    </BrowserRouter>
  );
}

export default Router;
