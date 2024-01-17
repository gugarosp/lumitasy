import styles from "./Input.module.scss"

interface inputProps {
    placeholder?: string 
}

export default function Input ({placeholder = ""}:inputProps) {
    return (
        <div className={styles.input}>
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}