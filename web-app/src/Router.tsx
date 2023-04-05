import { UserTest, Home, Podcast } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
      <BrowserRouter>
        <Routes>
          {/*adicionem aqui as rotas das paginas */}
          <Route path="/" element={<Home />} />
          <Route path="/userTest" element={<UserTest />} />
          <Route path="/podcast" element={<Podcast />} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
