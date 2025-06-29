import type { ReactElement } from "react";

interface SideBarItem {
    icon: ReactElement,
    text: string
}

export const SideBarItems = (props: SideBarItem): ReactElement => {
    const { icon, text } = props;
    return(
        <>
            <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <span>{icon}</span>
                <span className="text-gray-800 font-medium">{text}</span>
            </div>
        </>
    )
}