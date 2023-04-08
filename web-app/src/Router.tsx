import { UserTest, Home, PodcastPage, Explore, Politicsseemore, Economyseemore} from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
      <BrowserRouter>
        <Routes>
          {/*adicionem aqui as rotas das paginas */}
          <Route path="/" element={<Home />} />
          <Route path="/userTest" element={<UserTest />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/Politicsseemore" element={<Politicsseemore />} />
          <Route path="/Economyseemore" element={<Economyseemore/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
