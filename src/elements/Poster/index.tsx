interface PosterProps {
    link: string
    src: string
    title: string
}

export default function Poster ({link, src, title}:PosterProps) {
    return (
        <a href={link}>
            <img
                src={src}
                alt={title} />
        </a>
    )
}