import { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchContextType {
  isSearchOpen: boolean;
  initialQuery: string;
  openSearch: (query?: string) => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  const openSearch = (query?: string) => {
    setInitialQuery(query || '');
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setInitialQuery('');
  };

  return (
    <SearchContext.Provider value={{ isSearchOpen, initialQuery, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
