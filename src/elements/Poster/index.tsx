interface PosterProps {
    link: string
    src: string
}

export default function Poster ({link, src}:PosterProps) {
    return (
        <a href={src}>
            <img
                src={link}
                alt="Poster" />
        </a>
    )
}