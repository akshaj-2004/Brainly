import type { ReactElement } from "react"
import { HeightStyle, IconStyle, WidthStyle, type IconProps } from "."

export const CrossIcon = (props: IconProps) : ReactElement => {
    const size = props.size ? IconStyle.get(props.size)  : "";
    const width = props.width ? WidthStyle.get(props.width) : "";
    const height = props.height ? HeightStyle.get(props.height) : "";
    return(
        <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${size} ${width} ${height}`}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </>
    )
}


