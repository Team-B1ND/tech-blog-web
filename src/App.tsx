import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/api/queryClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalStyle } from '@/styles/GlobalStyle';
import Layout from '@/components/common/Layout';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import ScrollToTop from '@/components/common/ScrollToTop';
import Article from '@/pages/Article';
import { Home } from '@/pages/Home';
import { Subscribe } from '@/pages/Subscribe';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Write } from '@/pages/Write';
import { ProfileEdit } from '@/pages/ProfileEdit';
import { NotFound } from '@/pages/NotFound';
import { Author } from '@/pages/Author';
import { AuthCallback } from '@/pages/AuthCallback';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
            <GlobalStyle />
            <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path=":category" element={<Home />} />
                <Route path="article/:id" element={<Article />} />
                <Route path="author/:id" element={<Author />} />
                <Route path="subscribe" element={<Subscribe />} />
                <Route path="login" element={<Login />} />
                <Route path="auth/callback" element={<AuthCallback />} />
                <Route path="*" element={<NotFound />} />
              </Route>
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
    </QueryClientProvider>
  );
}

export default App;
