import type { ReactElement } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { CrossIcon } from "../../icons/CrossIcon";

type IconVariants = "Youtube" | "Twitter" | "Notion";
type TagVariants =
  | "Productivity"
  | "Tech & Tools"
  | "Mindset"
  | "Learning & Skills"
  | "Workflows"
  | "Inspiration";

interface CardProps {
  title: string;
  link: string;
  icon: IconVariants;
  tag: TagVariants;
  contentId: string;
  onDelete: (contentId: string) => void;
}

const typeIcon = new Map<IconVariants, ReactElement>([
  ["Youtube", <YoutubeIcon width="sm" height="sm" />],
  ["Twitter", <TwitterIcon width="sm" height="sm" />],
  ["Notion", <DocumentIcon width="sm" height="sm" />],
]);

const extractYoutubeId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
  } catch {
    return null;
  }
  return null;
};

const getThumbnail = (icon: IconVariants, link: string): string => {
  switch (icon) {
    case "Youtube": {
      const id = extractYoutubeId(link);
      return id
        ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
        : "https://via.placeholder.com/480x270?text=No+Preview";
    }
    case "Twitter":
      return "https://cdn-icons-png.flaticon.com/512/733/733579.png";
    case "Notion":
      return "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png";
    default:
      return "https://via.placeholder.com/480x270?text=No+Preview";
  }
};

export const Card = (props: CardProps): ReactElement => {
  const { title, link, icon, tag, contentId, onDelete } = props;

  const thumbnailUrl = getThumbnail(icon, link);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      if (res.status === 200) {
        alert("Content deleted successfully.");
        onDelete(contentId);
      } else {
        alert("Failed to delete content.");
        console.error("Delete failed:", res.data.message);
      }
    } catch (err) {
      console.error("Error deleting content:", err);
      alert("Something went wrong while deleting.");
    }
  };

  const confirmDelete = () => {
    if (confirm("Are you sure you want to delete this content?")) {
      handleDelete();
    }
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 max-w-sm p-3 shadow-sm">
      {/* Title with Icon */}
      <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold mb-2 justify-between">
        <div className="flex items-center gap-2">
          {typeIcon.get(icon)}
          <span className="text-lg">{title}</span>
        </div>
        <button
          onClick={confirmDelete}
          className="text-gray-400 hover:text-red-500"
        >
          <CrossIcon size="md" />
        </button>
      </div>

      {/* Thumbnail */}
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnailUrl}
          alt={title}
          className="rounded-md w-full aspect-video object-contain bg-gray-100"
        />
      </a>

      {/* Tag */}
      <div className="mt-2">
        <span className="inline-block bg-slate-100 text-blue-600 px-3 py-1 text-xs rounded-full font-medium">
          #{tag}
        </span>
      </div>
    </div>
  );
};
