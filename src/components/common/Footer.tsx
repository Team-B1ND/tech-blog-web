import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLeft>
          <FooterLogo>
            <LogoText>B1ND</LogoText>
            <LogoSub>tech</LogoSub>
          </FooterLogo>
          <Copyright>© {new Date().getFullYear()} B1ND. All rights reserved.</Copyright>
        </FooterLeft>
        <FooterLinks>
          <FooterLink href="https://github.com/b1nd" target="_blank" rel="noopener noreferrer">
            GitHub
          </FooterLink>
        </FooterLinks>
      </FooterInner>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

const FooterInner = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const LogoSub = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FooterLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
