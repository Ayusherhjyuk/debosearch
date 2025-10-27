import { useState, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import { useBookmarks } from './context/BookmarkContext';
import { Repo } from './types/repo';

const App = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { bookmarks } = useBookmarks();

  const fetchRepos = useCallback(async (query: string) => {
    if (!query) {
      setRepos([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=30`
      );
      setRepos(response.data.items);
    } catch {
      setError('⚠️ Failed to fetch repositories. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const displayedRepos = showBookmarksOnly ? bookmarks : repos;

  return (
    <div
    className="min-h-screen flex flex-col items-center py-10 px-4 
                bg-[url('/bg.jpg')] 
                bg-cover bg-center relative text-gray-100"
  >
    {/* Overlay for dimming background */}
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>
  
    <main className="relative z-10 w-full max-w-5xl text-center">
      <header className="mb-10">
        <h1
          className="text-5xl font-extrabold bg-gradient-to-r 
                     from-cyan-400 via-blue-500 to-purple-900 
                     bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
        >
          Reposcout
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Discover & bookmark your favorite GitHub repositories ⚡
        </p>
      </header>
  
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <SearchBar onSearch={fetchRepos} />
        <label
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-full 
                     border border-white/10 bg-white/10 backdrop-blur-md 
                     hover:bg-white/20 transition cursor-pointer"
        >
          <input
            type="checkbox"
            checked={showBookmarksOnly}
            onChange={() => setShowBookmarksOnly((v) => !v)}
            className="accent-cyan-400 scale-110"
          />
          Bookmarked only
        </label>
      </div>
  
      {/* Results */}
      <div className="w-full">
        <RepoList repos={displayedRepos} loading={loading} error={error} />
        {!loading && hasSearched && displayedRepos.length === 0 && (
          <p className="text-gray-500 text-sm mt-8">
            No repositories found. Try a different keyword 🔍
          </p>
        )}
      </div>
    </main>
  </div>
  
  );
};

export default App;
