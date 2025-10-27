import { useState, ChangeEvent, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  useEffect(() => {
    onSearch(debouncedQuery.trim());
  }, [debouncedQuery, onSearch]);

  return (
    <div className="flex items-center bg-glass backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-glow transition focus-within:ring-2 focus-within:ring-blue-500 w-full sm:w-96">
      <span className="text-gray-400 mr-2">🔍</span>
      <input
        type="text"
        placeholder="Search GitHub repositories..."
        value={query}
        onChange={handleChange}
        className="bg-transparent outline-none w-full text-gray-200 placeholder-gray-500"
      />
    </div>
  );
};

export default SearchBar;
