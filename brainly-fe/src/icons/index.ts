type IconSize = "sm" | "md" | "lg"

export interface IconProps {
  size?: IconSize,
  width?: IconSize,
  height?: IconSize
}

export const IconStyle = new Map<IconSize, string>([
  ["sm", "size-2"],
  ["md", "size-4"],
  ["lg", "size-8"]
])

export const WidthStyle = new Map<IconSize, string>([
  ["sm", "w-6"],
  ["md", "w-8"],
  ["lg", "w-10"]
]);

export const HeightStyle = new Map<IconSize, string>([
  ["sm", "h-6"],
  ["md", "h-8"],
  ["lg", "h-10"]
]);


