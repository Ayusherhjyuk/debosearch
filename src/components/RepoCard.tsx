import { Repo } from "../types/repo";
import { useBookmarks } from "../context/BookmarkContext";

interface RepoCardProps {
  repo: Repo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    window.open(repo.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative cursor-pointer group rounded-2xl overflow-hidden border border-white/10
                 bg-gradient-to-br from-[#0f172a]/80 via-[#1e293b]/70 to-[#312e81]/60
                 backdrop-blur-xl shadow-lg p-8  mr-18 transition-all duration-300
                 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(147,197,253,0.3)]"
    >
      {/* Glow gradient behind */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-2xl transition-all duration-500"></div>

      <div className="relative flex items-center gap-3 mb-4">
        <img
          src={repo.owner.avatar_url}
          alt="avatar"
          className="w-12 h-12 rounded-full border border-white/20 shadow-inner"
        />
        <div>
          <p className="font-semibold text-lg text-blue-200 group-hover:text-white transition">
            {repo.full_name}
          </p>
          <p className="text-xs text-gray-400">{repo.language || "—"}</p>
        </div>
      </div>

      {repo.description && (
        <p className="relative text-gray-300 text-sm mb-5 line-clamp-2 leading-relaxed">
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
                ? "bg-yellow-400 text-gray-900 shadow-[0_0_10px_rgba(250,204,21,0.6)] hover:bg-yellow-300"
                : "bg-blue-500/20 text-blue-100 hover:bg-blue-500/40 hover:shadow-[0_0_10px_rgba(96,165,250,0.4)]"
            }`}
        >
          {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default RepoCard;
