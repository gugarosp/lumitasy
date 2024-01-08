import styles from "./Play.module.scss"

import { SetStateAction, useContext, useRef, useState } from "react";
import Button from "elements/Button";
import VideoPlayerControls from "components/VideoPlayerControls";
import { PlayMovieContext } from "context/playMovie";
import { MoviesContext } from "context/movies";

interface playProps {
    video: any,
    metaDataVideo: any
    getVideoInfo: string
    setGetInfoVideo: React.Dispatch<React.SetStateAction<string>>
    videoCurrentTime: number
    setVideoCurrentTime: React.Dispatch<React.SetStateAction<number>>
    videoDuration: number
    setVideoDuration: React.Dispatch<React.SetStateAction<number>>
    PlayPauseVideo: () => void,
    videoInfo: () => void,
    whilePlayVideo: any,
    whenPauseVideo: () => void,
    movieLoaded: boolean,
    changePlayIcon: () => void
}

interface MovieContextProps {
    moviesList: {
        title: string,
        slug:string,
        source: string
    }[];
}

export default function Play () {

    // Movie Slug
    const movieSlug = window.location.href.split("play/")[1];
    
    // Video Element
    const { video }:playProps = useContext(PlayMovieContext);
    const { metaDataVideo }:playProps = useContext(PlayMovieContext);

    // Movie Reference
    const { moviesList }:MovieContextProps = useContext(MoviesContext);
    const movieInfo = moviesList.filter(item => item.slug === movieSlug)[0];

    // Loads movie when the source from api is loaded
    const movieSourceLoaded = useRef(false)
    if (movieInfo?.source !== undefined && movieSourceLoaded.current === false) {
        video.current?.load();
        movieSourceLoaded.current = true;
    }

    // Play and pause video
    const { PlayPauseVideo }:playProps = useContext(PlayMovieContext);

    // Play and pause icon change
    const { changePlayIcon }:playProps = useContext(PlayMovieContext);

    // Video Infos
    const { videoCurrentTime }:playProps = useContext(PlayMovieContext);
    const { videoDuration }:playProps = useContext(PlayMovieContext);

    // Video while playing
    const { whilePlayVideo }:playProps = useContext(PlayMovieContext);

    // Video when paused
    const { whenPauseVideo }:playProps = useContext(PlayMovieContext);

    // Movie load status
    const { movieLoaded }:playProps = useContext(PlayMovieContext);


    ////////////////////////////////////////
    /* HIDE AND SHOW CONTROLS AND ACTIONS */
    ////////////////////////////////////////
    
    /* NOTE */
    // Actions: Action buttons that is on top of the page
    // Controls: Video player controls that is on bottom of the page

    // Hide controls and actions css classes
    const [hideControlsClass, setHideControlsClass] = useState<SetStateAction<string>>("");
    const [hideActionsClass, setHideActionsClass] = useState<SetStateAction<string>>("");

    // Status of controls and actions hide status
    const hideControlsActions = useRef(true);

    // Confirmation that the movie already loaded so the initial setTimeout (below) won't run infinitely
    const movieAlreadyLoaded = useRef(false);

    if (movieLoaded === true && movieAlreadyLoaded.current === false) { // Executes only one time, even if component rerenders
        setTimeout(() => {
            setHideControlsClass(`${styles["hide-controls"]}`);
            setHideActionsClass(styles["hide-actions"]);
            
            movieAlreadyLoaded.current = true;
        }, 5000)  
         
    }

    // Timeout that hides controls and actions after mouse stops moving
    const controlsTimeout = useRef<ReturnType<typeof setTimeout>>();

    // Status of hiding timeOut, informs that if it is running (waiting until execution)
    const controlsTimeoutRunning = useRef<boolean>(false);

    window.addEventListener("mousemove", () => {
        if (controlsTimeoutRunning.current === true) {
            clearInterval(controlsTimeout.current)
            hideControlsActions.current = true;
            controlsTimeoutRunning.current = false;
        }

        if (hideControlsActions.current === true && movieAlreadyLoaded.current === true) {
            setHideControlsClass("");
            setHideActionsClass("");
            hideControlsActions.current = false;

            controlsTimeoutRunning.current = true;
            controlsTimeout.current = setTimeout(() => {
                    setHideControlsClass(`${styles["hide-controls"]}`);
                    setHideActionsClass(styles["hide-actions"]);
                    
                    hideControlsActions.current = true;
                }, 5000);
            
        }
    });

    // Page title
    document.title = movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy";

    return (
        <section className={styles.play}>

            <div className={styles["video-container"]}>
                <video ref={video} onLoadedMetadata={event => metaDataVideo(event)} onPlay={event => whilePlayVideo(event)} onPause={whenPauseVideo}>
                    <source src={movieInfo?.source} type="video/mp4" />
                </video>

                <div className={styles.glass} onClick={() => {PlayPauseVideo(); changePlayIcon();}}>
                    <div className={`${styles["loading-warning"]} ${movieLoaded === true ? styles["loading-warning-hide"] : "" }`}>

                        <div className={styles["loading-icon"]}><div></div><div></div><div></div><div></div></div>

                        <h6 className="title-alternative no-margin">
                            Your movie will begin soon
                        </h6>
                    </div>
                </div>
            </div>


            <div className={styles.actions}>
                <div className={`${
                    styles["actions-wrapper"]} ${
                    movieLoaded === true ? ` ${
                        hideActionsClass}` : "" }`
                }>
                    <Button icon="arrow_back" size="giant" strength="higher" link={`/movie/${movieSlug}`} />
                </div>
            </div>

            <div className={styles.controls}>
                <div className={`${
                    styles["controls-wrapper"]}${
                    movieLoaded === true ? ` ${
                            styles["show-controls"]} ${
                            hideControlsClass}` : "" }`
                }>
                    <VideoPlayerControls currentTime={videoCurrentTime} totalTime={videoDuration} />
                </div>
            </div>
        </section>
    )
}