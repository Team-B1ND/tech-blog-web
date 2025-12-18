const baseTheme = {
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#0083F0',
    primaryHover: '#006acc',
    background: '#ffffff',
    text: '#191f28',
    textSecondary: '#4e5968',
    textTertiary: '#8b95a1',
    border: 'rgba(0, 29, 58, 0.1)',
    cardBackground: '#f9fafb',
    categoryBg: '#f2f4f6',
    categoryActiveBg: '#191f28',
    categoryActiveText: '#ffffff',
    codeBackground: '#1e1e1e',
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#0083F0',
    primaryHover: '#339af0',
    background: '#0d1117',
    text: '#e6edf3',
    textSecondary: '#8b949e',
    textTertiary: '#6e7681',
    border: 'rgba(240, 246, 252, 0.1)',
    cardBackground: '#161b22',
    categoryBg: '#21262d',
    categoryActiveBg: '#e6edf3',
    categoryActiveText: '#0d1117',
    codeBackground: '#161b22',
  },
};

export type Theme = typeof lightTheme;
