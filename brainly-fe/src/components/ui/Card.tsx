import type { ReactElement } from "react";
import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
}

export const Card = (props: CardProps): ReactElement => {
  const { title, link} = props;

  const getEmbedUrl = (url: string): string => {
    return ""
  };

  return (
    <div>
      <div className="bg-white rounded-md border-slate-200 max-w-sm p-4 border">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2 items-center">
            <div className="pr-1 text-gray-400">
              <ShareIcon size="md" />
            </div>
            <div className="font-medium">{title}</div>
          </div>
          <div className="flex gap-2 items-center text-gray-400">
            <ShareIcon size="md" />
            <ShareIcon size="md" />
          </div>
        </div>

        <div>
            <iframe
            className="w-full aspect-video rounded-md"
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            ></iframe>
        </div>
      </div>
    </div>
  );
};
