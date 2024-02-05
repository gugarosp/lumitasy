import styles from "./PosterList.module.scss"

import Poster from "elements/Poster"
import Button from "elements/Button";

import { IMoviesList } from "context/moviesTypes";
import { useEffect, useState } from "react";

interface PosterListProps {
    movieList: IMoviesList[];
    showDeleteButton?: boolean
}

export default function PosterList ({movieList, showDeleteButton = false}:PosterListProps) {
    const [movieListReceiver, setMovieListReceiver] = useState(movieList);
    
    useEffect(() => {
        setMovieListReceiver(movieList);
    },[movieList]);

    const showFooterClass = showDeleteButton === true ? styles["show-footer"] : "";
    
    function deleteWatchList(id:string) {
        setMovieListReceiver(movieListReceiver.filter(item => item.id !== id));

        let watchLaterList = JSON.parse(localStorage.getItem("watch-later") || "[]");
        watchLaterList.splice(watchLaterList.indexOf(id), 1);
        localStorage.setItem("watch-later", JSON.stringify(watchLaterList));
    }

    return (
        <div className={styles["poster-list"]}>
            {
                movieListReceiver.map((item, index) => {
                    return (
                        <div className={`${styles.wrapper} ${showFooterClass}`} key={index}>
                            <Poster
                                link={`/movie/${item.slug}`}
                                src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
                                title={item.title !== undefined ? item.title : ""}
                            />
                            <div className={styles.footer}>
                                <Button icon="delete" size="medium" strength="lower" type="icon-ring" action={() => deleteWatchList(item.id !== undefined ? item.id : "")}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}