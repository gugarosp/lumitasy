import { ReactElement } from "react"
import styles from "./MenuItem.module.scss"

interface MenuItemProps {
    link?: string
    children: ReactElement | string
}

export default function MenuItem ({link = "#", children}: MenuItemProps) {
    return (
        <a href={link} className={styles["menu-item"]}>
            {children}
        </a>
    )
}