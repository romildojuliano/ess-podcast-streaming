import { UserTest, Home, Podcast, Explore, Politicsseemore, Economyseemore, Search} from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
function Router() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/*adicionem aqui as rotas das paginas */}
          <Route path="/" element={<Home />} />
          <Route path="/userTest" element={<UserTest />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/Politicsseemore" element={<Politicsseemore />} />
          <Route path="/Economyseemore" element={<Economyseemore/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
