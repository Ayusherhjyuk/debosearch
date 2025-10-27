import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Repo } from '../types/repo';

interface BookmarkContextType {
  bookmarks: Repo[];
  toggleBookmark: (repo: Repo) => void;
  isBookmarked: (id: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Repo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const toggleBookmark = (repo: Repo) => {
    setBookmarks((prev) => {
      const exists = prev.find((r) => r.id === repo.id);
      const updated = exists ? prev.filter((r) => r.id !== repo.id) : [...prev, repo];
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (id: number) => bookmarks.some((r) => r.id === id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
};
