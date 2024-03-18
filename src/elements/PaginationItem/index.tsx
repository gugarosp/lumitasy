import styles from "./PaginationItem.module.scss"

interface PaginationItemProps {
    status?: boolean
    action?: () => void;
}

export default function PaginationItem ({ status = false, action }:PaginationItemProps) {
    return (
        <button 
            className={`${styles["pagination-item"]} ${styles[status === true ? "active" : "inactive"]}`}
            onClick={() => action?.()}>
        </button>
    )
}