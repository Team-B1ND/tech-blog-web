import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Activation } from './Activation';
import MoonIcon from '@/assets/icons/moon.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import * as S from './DashboardLayout.style';

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

  const isPending = user?.role === 'PENDING';

  if (isPending) {
    return (
      <S.Container>
        <S.Header>
          <S.HeaderInner>
            <S.Logo to="/">
              <S.StyledLogo />
            </S.Logo>
            <S.Nav>
              <S.IconButton onClick={toggleTheme} aria-label="테마 변경">
                {mode === 'light' ? <MoonIcon /> : <SunIcon />}
              </S.IconButton>
              <S.LogoutButton
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                로그아웃
              </S.LogoutButton>
            </S.Nav>
          </S.HeaderInner>
        </S.Header>
        <Activation />
      </S.Container>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderInner>
          <S.Logo to="/">
            <S.StyledLogo />
          </S.Logo>
          <S.Nav>
            <S.IconButton onClick={toggleTheme} aria-label="테마 변경">
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </S.IconButton>
            <S.UserInfo>
              <S.UserName to={`/author/${user?.id}`}>{user?.name}</S.UserName>
              <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
            </S.UserInfo>
          </S.Nav>
        </S.HeaderInner>
      </S.Header>

      <S.Main>
        <S.Sidebar>
          <S.SidebarTitle>대시보드</S.SidebarTitle>
          <S.SidebarNav>
            <S.SidebarLink to="/dashboard" end>
              홈
            </S.SidebarLink>
            <S.SidebarLink to="/dashboard/write">글 작성</S.SidebarLink>
            <S.SidebarLink to="/dashboard/profile">내 정보 수정</S.SidebarLink>
          </S.SidebarNav>
        </S.Sidebar>
        <S.Content>
          <Outlet />
        </S.Content>
      </S.Main>
    </S.Container>
  );
};
