import styles from "./PosterList.module.scss"

import Poster from "elements/Poster"

interface PosterListProps {
    movieList: {
        id?: number
        slug?: string
        title?: string
        categories?: string
        source?: string
        year?: string
        description?: string
    }[]
}

export default function PosterList ({movieList}:PosterListProps) {
    return (
        <div className={styles["poster-list"]}>
            {
            movieList.map((item, index) => {
                return (
                    <Poster
                        key={index}
                        link={`/movie/${item.slug}`}
                        src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
                        title={item.title !== undefined ? item.title : ""}
                    />
                )
            })
            }
        </div>
    )
}