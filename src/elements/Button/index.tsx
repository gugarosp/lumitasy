import styles from "./Button.module.scss"

interface ButtonProps {
    icon?: string
    iconFill?: boolean
    strength?: string
    size?: string
    type?: string
    children?: string
}

export default function Button ({icon="add", iconFill=false, strength="lower", size="medium", type="outlined", children=""}:ButtonProps) {
    return (
        <a href="/" 
            className={`${
                styles.button} ${
                styles[`size-${size}`]} ${
                styles[`strength-${strength}`]} ${
                styles[`type-${type}`]} ${
                children === "" ? styles[`text-hide`] : ""}`
            }>
            <span
                className={
                    `material-symbols-outlined icon-${
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