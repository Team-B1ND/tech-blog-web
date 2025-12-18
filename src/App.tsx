import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';
import { GlobalStyle } from './styles/GlobalStyle';
import Layout from './components/common/Layout.tsx';
import { DashboardLayout } from './components/dashboard/DashboardLayout.tsx';
import ScrollToTop from './components/common/ScrollToTop.tsx';
import Article from './pages/Article';
import { Home } from './pages/Home.tsx';
import { Subscribe } from './pages/Subscribe.tsx';
import { Login } from './pages/Login.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { Write } from './pages/Write.tsx';
import { ProfileEdit } from './pages/ProfileEdit.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Author } from './pages/Author.tsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <GlobalStyle />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* 일반 페이지 - 구독하기 버튼 */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path=":category" element={<Home />} />
                <Route path="article/:id" element={<Article />} />
                <Route path="author/:id" element={<Author />} />
                <Route path="subscribe" element={<Subscribe />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* 대시보드 - 로그인 필요 */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="write" element={<Write />} />
                <Route path="profile" element={<ProfileEdit />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
