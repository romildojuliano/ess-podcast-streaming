import { UserTest, Home, PodcastPage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
      <BrowserRouter>
        <Routes>
          {/*adicionem aqui as rotas das paginas */}
          <Route path="/" element={<Home />} />
          <Route path="/userTest" element={<UserTest />} />
          <Route path="/podcast" element={<PodcastPage podcast={{name:'Git', link: "youtube.com.br", author: "mattive", subject: "Desenvolvimento", created_at: "2023-04-07T10:23:45.678-03:00", image: "https://i.ytimg.com/vi/DqTITcMq68k/mqdefault.jpg" }} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
