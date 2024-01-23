import styles from "./Display.module.scss"

interface DisplayProps {
    icon?: string
    iconFill?: boolean
    size?: string
    link?: string
    children?: string
    subtitle?: string
}

export default function Display(
    {
        icon = "",
        link = "",
        children = "",
        subtitle = ""
    }: DisplayProps) {

    return (
        <a href={link !== "" ? `${link}` : undefined} className={styles.display}>
            <div className={styles.content}>
                <div className={styles["title-content"]}>
                    <span className={`${styles.icon} material-symbols-rounded icon-outlined-light`}>
                        {icon}
                    </span>
                    <div className={styles.title}>
                        {children}
                    </div>
                </div>
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
            </div>
        </a>
    )
}