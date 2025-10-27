import { Repo } from '../types/repo';
import RepoCard from './RepoCard';

interface RepoListProps {
  repos: Repo[];
  loading: boolean;
  error: string | null;
}

const RepoList = ({ repos, loading, error }: RepoListProps) => {
  if (loading) return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (repos.length === 0)
    return <p className="text-center text-gray-500 mt-6">Search for repositories</p>;

  return (
    <div className="grid gap-10 p-4 md:grid-cols-2 lg:grid-cols-3 cotent-fit">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
