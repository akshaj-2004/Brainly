import type { ReactElement } from "react"
import { HeightStyle, IconStyle, WidthStyle, type IconProps } from "./index"

export const PlusIcon = (props: IconProps): ReactElement => {
  const size = props.size ? IconStyle.get(props.size)  : "";
  const width = props.width ? WidthStyle.get(props.width) : "";
  const height = props.height ? HeightStyle.get(props.height) : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${size} ${width} ${height}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  )
}