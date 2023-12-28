import { ReactElement } from "react"

interface IconProps {
    children: ReactElement | string
}

export default function Icon ({ children}: IconProps) {
    return (
        <span className="material-symbols-rounded">
            {children}
        </span>
    )
}