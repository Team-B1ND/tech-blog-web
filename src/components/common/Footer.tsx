import styled from 'styled-components';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLinks>
        <FooterA href="https://b1nd.com" target="_blank" rel="noopener noreferrer">
          B1ND 소개
        </FooterA>
        <FooterA href="https://dodam.b1nd.com" target="_blank" rel="noopener noreferrer">
					도담도담
				</FooterA>
        <FooterLink to="/dashboard/write">
          아티클 작성
        </FooterLink>
        <FooterA href="https://github.com/Team-B1ND" target="_blank" rel="noopener noreferrer">
          GitHub
        </FooterA>
      </FooterLinks>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  margin-top: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FooterLinks = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
	gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterA = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
