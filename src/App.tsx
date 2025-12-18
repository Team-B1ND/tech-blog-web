import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/api/queryClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import Article from '@/pages/article/Article.tsx';
import { Home } from '@/pages/common/Home.tsx';
import { Subscribe } from '@/pages/subscribe/Subscribe.tsx';
import { Login } from '@/pages/auth/Login.tsx';
import { Dashboard } from '@/pages/dashboard/Dashboard.tsx';
import { Write } from '@/pages/dashboard/Write.tsx';
import { ProfileEdit } from '@/pages/dashboard/ProfileEdit.tsx';
import { NotFound } from '@/pages/common/NotFound.tsx';
import { Author } from '@/pages/author/Author.tsx';
import { AuthCallback } from '@/pages/auth/AuthCallback.tsx';
import {ScrollToTop} from "@/components/common/ScrollToTop.tsx";
import {Layout} from "@/components/common/Layout.tsx";

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
