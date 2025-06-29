import type { ReactElement } from "react";
import { SideBarItems } from "./SideBarItem";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { BrainIcon } from "../../icons/BrainIcon";

export const Sidebar = (): ReactElement => {
  return (
    <div className="flex flex-col p-4">
        <div className="flex gap-3 items-center text-2xl font-bold mb-6">
            <div className="text-blue-700">
                <BrainIcon size="lg"/>
            </div>
            Brainly
        </div>     

      <nav className="flex flex-col gap-2">
        <SideBarItems icon={<TwitterIcon width="sm" height="sm" />} text="Twitter" />
        <SideBarItems icon={<YoutubeIcon width="sm" height="sm" />} text="YouTube" />
        <SideBarItems icon={<DocumentIcon width="sm" height="sm" />} text="Document" />
      </nav>
    </div>
  );
};


