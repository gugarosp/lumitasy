import styles from "./Movie.module.scss"

import Menu from "components/Menu";
import NotFoundContent from "components/NotFoundContent";
import { MoviesContext } from "context/movies";
import Button from "elements/Button";
import Separator from "elements/Separator";
import { useContext, useState } from "react";
import { moviesContextType } from "context/moviesTypes";

export default function Movie () {

    const movieSlug = window.location.href.split("movie/")[1];

    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    const { moviesListLoaded } = useContext(MoviesContext) as moviesContextType;

    const movieInfo = moviesList.filter(item => item.slug === movieSlug)[0];

    // Watch Later
    const watchLaterList = JSON.parse(localStorage.getItem("watch-later") || "[]");

    const [watchLaterIcon, setWatchLaterIcon] = useState("add");
    const [watchLaterMessage, setWatchLaterMessage] = useState("Watch Later");

    if (watchLaterList.includes(movieInfo?.id) && watchLaterIcon === "add") {
        setWatchLaterIcon("delete");
        setWatchLaterMessage("Remove from Watch Later");
    }
                
    function addRemoveWatchLater() {
                    
        if (watchLaterList.includes(movieInfo?.id)) {
            const movieWatchListIndex = watchLaterList.findIndex((id:number) => id === movieInfo.id);
            watchLaterList.splice(movieWatchListIndex, 1);
            
            setWatchLaterIcon("add");
            setWatchLaterMessage("Watch Later");
        } else {
            watchLaterList.push(movieInfo?.id);
            
            setWatchLaterIcon("delete");
            setWatchLaterMessage("Remove from Watch Later");
        }
        
        localStorage.setItem("watch-later", JSON.stringify(watchLaterList));
        
    }
    
    // Page title
    document.title = movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy";

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
                                <Button icon={watchLaterIcon} size="extra-large" iconFill={false} strength="lower" type="icon" action={addRemoveWatchLater}>{watchLaterMessage}</Button>
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