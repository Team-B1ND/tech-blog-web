import { useEffect } from 'react';
import { Outlet, useNavigate, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/hooks/auth/useAuth.ts';
import { useTheme } from '@/contexts/ThemeContext';
import LogoIcon from '@/assets/logo.svg?react';
import MoonIcon from '@/assets/icons/moon.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login?redirect=/dashboard', { replace: true });
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <HeaderInner>
          <Logo to="/">
            <StyledLogo />
          </Logo>
          <Nav>
            <IconButton onClick={toggleTheme} aria-label="테마 변경">
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
            <UserInfo>
              <UserName to={`/author/${user?.id}`}>{user?.name}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </UserInfo>
          </Nav>
        </HeaderInner>
      </Header>

      <Main>
        <Sidebar>
          <SidebarTitle>대시보드</SidebarTitle>
          <SidebarNav>
            <SidebarLink to="/dashboard" end>홈</SidebarLink>
            <SidebarLink to="/dashboard/write">글 작성</SidebarLink>
            <SidebarLink to="/dashboard/profile">내 정보 수정</SidebarLink>
          </SidebarNav>
        </Sidebar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(LogoIcon)`
  height: 20px;
  width: auto;
  color: ${({ theme }) => theme.colors.text};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UserName = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 200px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const SidebarLink = styled(NavLink)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    color: ${({ theme }) => theme.colors.text};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;
