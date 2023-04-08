import { UserPage, Home, PodcastPage, Explore, Politicsseemore, Economyseemore, Politicsseemore2, FollowingPage} from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
      <BrowserRouter>
        <Routes>
          {/*adicionem aqui as rotas das paginas */}
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/following" element={<FollowingPage />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/Politicsseemore" element={<Politicsseemore />} />
          <Route path="/Economyseemore" element={<Economyseemore/>} />
          <Route path='/Politicsseemore2' element={<Politicsseemore2/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
