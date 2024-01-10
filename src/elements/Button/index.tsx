import styles from "./Button.module.scss"

interface ButtonProps {
    icon?: string
    iconFill?: boolean
    strength?: string
    size?: string
    type?: string
    link?: string
    action?: () => void
    children?: string
}

export default function Button (
    {
        icon = "add", 
        iconFill = false, 
        strength = "lower", 
        size = "medium", 
        type = "icon", 
        link = "",
        action,
        children=""
    }:ButtonProps) {
    
    function buttonBehavior (event:React.MouseEvent<HTMLElement>) {
        if (!event.currentTarget.hasAttribute("href")) {
            event.preventDefault();
            action?.();
        }
    }

    return (
        <a
            onClick={event => buttonBehavior(event)}
            href={link !== "" ? `${link}` : undefined} 
            className={`${
                styles.button} ${
                styles[`size-${size}`]} ${
                styles[`strength-${strength}`]} ${
                styles[`type-${type}`]} ${
                children === "" ? styles[`text-hide`] : ""}`
            }>
            <span
                className={
                    `material-symbols-rounded icon-${
                    iconFill === true ? "filled" : iconFill === false ? "outlined" : ""}-${
                    strength === "lower" ? "regular" : strength === "higher" ? "semibold" : ""} ${
                    styles.icon}`
                }>
                {icon}
            </span>
            <span className={styles.text}>{children}</span>
        </a>
    )
}