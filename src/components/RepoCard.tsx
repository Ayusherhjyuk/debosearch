import { Repo } from "../types/repo";
import { useBookmarks } from "../context/BookmarkContext";

interface RepoCardProps {
  repo: Repo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking the bookmark button
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    window.open(repo.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer group relative bg-gradient-to-br from-white/10 to-white/5 
                 border border-white/10 rounded-2xl p-5 backdrop-blur-md
                 transition-all duration-300 ease-out 
                 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] 
                 hover:scale-[1.03] hover:border-blue-400/40"
    >
      {/* Glow effect behind card */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-blue-500/20 transition duration-500 rounded-2xl"></div>

      <div className="relative flex items-center gap-3 mb-3">
        <img
          src={repo.owner.avatar_url}
          alt="avatar"
          className="w-12 h-12 rounded-full border border-white/20 shadow-innerGlow"
        />
        <div>
          <p className="font-semibold text-lg text-blue-300 group-hover:text-blue-200 transition-all duration-200">
            {repo.full_name}
          </p>
          <p className="text-xs text-gray-400">{repo.language || "—"}</p>
        </div>
      </div>

      {repo.description && (
        <p className="relative text-gray-300 text-sm mb-4 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="relative flex justify-between items-center text-sm mt-auto">
        <span className="text-gray-400 flex items-center gap-1">
          ⭐ {repo.stargazers_count.toLocaleString()}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(repo);
          }}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${
              bookmarked
                ? "bg-yellow-400/90 text-gray-900 shadow-glow hover:bg-yellow-300"
                : "bg-white/10 text-gray-200 hover:bg-white/20 hover:shadow-innerGlow"
            }`}
        >
          {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default RepoCard;
