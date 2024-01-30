import styles from "./Movie.module.scss"

import Menu from "components/Menu";
import NotFoundContent from "components/NotFoundContent";
import { MoviesContext } from "context/movies";
import Button from "elements/Button";
import Separator from "elements/Separator";
import { useContext } from "react";


interface moviesListProps {
    id?: number
    slug?: string
    title: string
    categories?: string
    source?: string
    year?: string
    description?: string
}

interface moviesContextType {
    moviesList: moviesListProps[]
    moviesListLoaded: boolean
}

export default function Movie () {

    const movieSlug = window.location.href.split("movie/")[1];

    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    const { moviesListLoaded } = useContext(MoviesContext) as moviesContextType;

    const movieInfo = moviesList.filter(item => item.slug === movieSlug)[0];

    document.title = movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy";

    function addWatchLater() {
        console.log("Add this movie to watch later list");
    }

    return (
        <>
            <Menu />
            {
            moviesListLoaded === true && movieInfo?.title !== undefined
            ? 
                <section className={`${styles.movie} outer-content-common outer-content-full`}>

                    <div className={styles.background}>
                        <img src={`http://lumitasy.siteseguro.ws/images/movies/backgrounds/${movieInfo.slug}.jpg`} alt={movieInfo.title} />
                    </div>

                    <div className={`${styles.logo} content`}>
                        <div className={styles["logo-container"]}>
                            <img src={`http://lumitasy.siteseguro.ws/images/movies/logos/${movieInfo.slug}.png`} alt={movieInfo.title} />
                        </div>
                    </div>

                    <div className={`${styles.data} content`}>
                        
                        <div className={styles.info}>
                            <div className={styles.meta}>
                                <div className={styles.categories}>
                                    {
                                        movieInfo.categories?.split(", ").map((item, index) => {
                                            return (
                                                <span className="h7 title-alternative" key={index}>{item}</span>
                                            )
                                        })
                                    }
                                </div>
                                <Separator />
                                <span className="h7 title-alternative">{movieInfo.year}</span>
                            </div>

                            <p className={`no-margin`}>
                                {movieInfo.description}
                            </p>
                        </div>

                        <div className={styles.actions}>
                            <div>
                                <Button icon="play_arrow" size="titan" iconFill={true} strength="lower" type="icon-ring" link={`/play/${movieSlug}`}>Watch Movie</Button>
                            </div>
                            <div>
                                <Button icon="add" size="extra-large" iconFill={true} strength="lower" type="icon" action={addWatchLater}>Watch Later</Button>
                            </div>
                        </div>
                    </div>
                </section>
            : moviesListLoaded === true && movieInfo?.title === undefined ? 
                    <NotFoundContent />
            : ""
            }
        </>
    )
}