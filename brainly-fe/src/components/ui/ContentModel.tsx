import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrossIcon } from "../../icons/CrossIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface ContentModelProps {
  open: boolean;
  onClose: () => void;
  setReloadData: () => void;
}

export function ContentModel({ open, onClose, setReloadData }: ContentModelProps) {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState("Productivity");
  const [category, setCategory] = useState("Youtube");

  const mapTags = ["Productivity", "Tech & Tools", "Mindset", "Learning & Skills", "Workflows", "Inspiration"] as const;

  const submitData = async () => {
  if (!linkRef.current || !titleRef.current) {
    alert("Form is not ready. Please try again.");
    return;
  }

  if (linkRef.current.value.trim() === "" || titleRef.current.value.trim() === "") {
    alert("Fill all the input fields");
    return;
  }

  const data = {
    link: linkRef.current.value,
    type: category,
    title: titleRef.current.value,
    tags,
  };

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      navigate("/");
      return;
    }

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      data,
      {
        headers: {
          authorization: token,
        },
      }
    );

    setReloadData();
    alert("Content added successfully");
    onClose();
  } catch (err) {
    console.error("Error while sending data:", err);
    alert("Something went wrong while adding content.");
  }
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 h-screen w-full flex justify-center items-center">
      <div onClick={onClose} className="absolute inset-0 bg-black bg-opacity-100" />
      <div className="relative z-10 w-[30vw] h-[70vh] border-2 bg-white flex flex-col items-center rounded-xl p-4">
        <div className="flex w-full justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 border-b border-blue-600 pb-1">
            Add Content
          </div>
          <div
            className="text-xl font-semibold hover:bg-slate-100 p-1 rounded cursor-pointer"
            onClick={onClose}
          >
            <CrossIcon size="lg" />
          </div>
        </div>

        <div className="mt-6">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            maxLength={20}
            className="bg-slate-200 w-[22vw] h-10 rounded-lg p-3 text-black placeholder:text-slate-500 placeholder:text-xl outline-none hover:bg-slate-300"
          />
        </div>
        <div className="mt-3">
          <input
            ref={linkRef}
            type="text"
            placeholder="Link"
            className="bg-slate-200 w-[22vw] h-10 rounded-lg p-3 text-black placeholder:text-slate-500 placeholder:text-xl outline-none hover:bg-slate-300"
          />
        </div>

        <div className="mt-5 text-lg font-semibold">Choose Tag:</div>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
          {mapTags.map((t) =>
            tags === t ? (
              <ModalTag2 key={t} tags={t} onClick={() => setTags(t)} />
            ) : (
              <ModalTag1 key={t} tags={t} onClick={() => setTags(t)} />
            )
          )}
        </div>

        <div className="mt-5 text-lg font-semibold">Choose Category:</div>
        <div className="flex gap-2 mt-2">
          {["Youtube", "Twitter", "Notion"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2 py-1 text-xl ${
                category === cat ? "bg-blue-500" : "bg-blue-300"
              } rounded-lg hover:bg-blue-400`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={submitData}
          className="bg-red-400 text-lg font-bold px-4 mt-5 py-1 rounded-lg hover:bg-red-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

interface CardProps {
  tags:
    | "Productivity"
    | "Tech & Tools"
    | "Mindset"
    | "Learning & Skills"
    | "Workflows"
    | "Inspiration";
  onClick: () => void;
}

const ModalTag1 = ({ tags, onClick }: CardProps) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 text-xl bg-blue-300 rounded-lg hover:bg-blue-400"
    >
      {tags}
    </button>
  );
};

const ModalTag2 = ({ tags, onClick }: CardProps) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 text-xl bg-blue-500 rounded-lg hover:bg-blue-400"
    >
      {tags}
    </button>
  );
};
