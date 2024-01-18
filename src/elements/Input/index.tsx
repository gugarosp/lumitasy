import styles from "./Input.module.scss"

interface inputProps {
    placeholder?: string,
    value?: string,
    typing?: (event:React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input ({placeholder = undefined, value = undefined, typing}:inputProps) {
    return (
        <div className={styles.input}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={typing}
                maxLength={256}
                spellCheck="false"/>
        </div>
    )
}