import { ReactElement } from "react"

type Weight = "outlined-regular" | "outlined-semibold" | "filled-regular" | "filled-semibold";

interface IconProps {
    children: ReactElement | string,
    weight?: Weight[];
}

export default function Icon ({ children, weight = ["outlined-regular"] }: IconProps) {
    return (
        <span className={`material-symbols-rounded icon-${weight}`}>
            {children}
        </span>
    )
}