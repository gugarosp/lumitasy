import styles from "./Display.module.scss"

interface DisplayProps {
    icon?: string
    link?: string
    children?: string
    subtitle?: string
}

export default function Display(
    {
        icon = "",
        link = undefined,
        children = "",
        subtitle = ""
    }: DisplayProps) {

    return (
        <a 
            href={link !== "" ? `${link}` : undefined} 
            className={`${
                styles.display} ${
                subtitle !== "" ? styles["display-subtitle"] : ""} ${
                icon !== "" ? styles["display-icon"] : ""}`}
            >
            <div className={styles.content}>
                <div className={styles["title-content"]}>
                    { 
                        icon !== "" ? 
                            <span className={`${styles.icon} material-symbols-rounded icon-outlined-light`}>
                                {icon}
                            </span>
                        :
                            <></>
                    }
                    <div className={styles.title}>
                        {children}
                    </div>
                </div>

                { 
                    subtitle !== "" ? 
                        <div className={styles.subtitle}>
                            {subtitle}
                        </div>
                    :
                        <></>
                }
                
            </div>
        </a>
    )
}