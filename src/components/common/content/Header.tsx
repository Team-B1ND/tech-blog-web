import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext.tsx';
import { useSearch } from '@/contexts/SearchContext.tsx';
import SearchModal from '@/components/search/SearchModal.tsx';
import SearchIcon from '@/assets/icons/search.svg?react';
import MoonIcon from '@/assets/icons/moon.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import LogoIcon from '@/assets/logo.svg?react';

const Header = () => {
  const { mode, toggleTheme } = useTheme();
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderWrapper $isScrolled={isScrolled}>
        <HeaderInner>
          <Logo to="/">
            <StyledLogo />
          </Logo>
          <Nav>
            <IconButton onClick={() => openSearch()} aria-label="검색">
              <SearchIcon />
            </IconButton>
            <IconButton onClick={toggleTheme} aria-label="테마 변경">
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
            <SubscribeButton to="/subscribe">
              구독하기
            </SubscribeButton>
          </Nav>
        </HeaderInner>
      </HeaderWrapper>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme, $isScrolled }) => $isScrolled ? theme.colors.border : 'transparent'};
  backdrop-filter: blur(8px);
`;

const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
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
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SubscribeButton = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
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
