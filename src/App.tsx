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
      setError('Failed to fetch repositories.');
    } finally {
      setLoading(false);
    }
  }, []);

  const displayedRepos = showBookmarksOnly ? bookmarks : repos;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <main className="relative z-10 w-full max-w-5xl text-center">
        <header className="mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-glow">
            Reposcout
          </h1>
          <p className="text-gray-400 mt-2">
            Find and bookmark awesome GitHub repositories ⚡
          </p>
        </header>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
          <SearchBar onSearch={fetchRepos} />
          <label className="flex items-center gap-2 text-sm bg-glass px-3 py-2 rounded-lg backdrop-blur-md border border-white/10 cursor-pointer hover:bg-glassDark transition">
            <input
              type="checkbox"
              checked={showBookmarksOnly}
              onChange={() => setShowBookmarksOnly((v) => !v)}
              className="accent-blue-500"
            />
            Bookmarked only
          </label>
        </div>

        <div className="w-full">
          <RepoList
            repos={displayedRepos}
            loading={loading}
            error={error}
           
          />
        </div>
      </main>
    </div>
  );
};

export default App;
