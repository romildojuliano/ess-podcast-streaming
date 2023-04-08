import { UserPage, Home, PodcastPage, Explore, Politicsseemore, Economyseemore, Politicsseemore2, Search, FollowingPage} from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
function Router() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/*adicionem aqui as rotas das paginas */}
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/following" element={<FollowingPage />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/Politicsseemore" element={<Politicsseemore />} />
          <Route path="/Economyseemore" element={<Economyseemore/>} />
          <Route path='/Politicsseemore2' element={<Politicsseemore2/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
