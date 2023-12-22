import styles from "./Poster.module.scss"

interface PosterProps {
    link: string
    src: string
    title: string
}

export default function Poster ({link, src, title}:PosterProps) {
    return (
        <a className={styles.poster} href={link}>
            <img
                src={src}
                alt={title} />
        </a>
    )
}