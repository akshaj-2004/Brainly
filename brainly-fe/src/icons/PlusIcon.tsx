import type { ReactElement } from "react"
import { IconStyle, type IconProps } from "./index"

export const PlusIcon = (props: IconProps): ReactElement => {
  const iconstyle = IconStyle.get(props.size) || ""

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconstyle}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  )
}
