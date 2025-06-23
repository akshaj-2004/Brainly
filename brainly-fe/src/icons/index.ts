
type IconSize = "sm" | "md" | "lg"

export interface IconProps {
  size: IconSize
}

export const IconStyle = new Map<IconSize, string>([
  ["sm", "size-2"],
  ["md", "size-4"],
  ["lg", "size-6"]
])