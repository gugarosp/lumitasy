import styles from "./PaginationItem.module.scss"

interface PaginationItemProps {
    status?: boolean
    action?: () => void;
}

export default function PaginationItem ({ status = false, action }:PaginationItemProps) {
    return (
        <div 
            className={`${styles["pagination-item"]} ${styles[status === true ? "active" : "inactive"]}`}
            onClick={() => action?.()}>
        </div>
    )
}