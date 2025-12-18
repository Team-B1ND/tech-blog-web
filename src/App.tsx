import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SearchProvider } from './contexts/SearchContext';
import { GlobalStyle } from './styles/GlobalStyle';
import Layout from './components/common/Layout.tsx';
import ScrollToTop from './components/common/ScrollToTop.tsx';
import Article from './pages/Article';
import {Home} from "./pages/Home.tsx";
import {Subscribe} from "./pages/Subscribe.tsx";
import {Write} from "./pages/Write.tsx";
import {NotFound} from "./pages/NotFound.tsx";

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path=":category" element={<Home />} />
              <Route path="article/:id" element={<Article />} />
              <Route path="subscribe" element={<Subscribe />} />
              <Route path="write" element={<Write />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
