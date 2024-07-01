import styles from "./Play.module.scss"

import Button from "elements/Button";
import VideoPlayerControls from "components/VideoPlayerControls";
import NotFoundContent from "components/NotFoundContent";
import Menu from "components/Menu";
import { useContext, useRef, useState } from "react";
import { PlayMovieContext } from "context/playMovie";
import { MoviesContext } from "context/movies";
import { playMovieContextType } from "context/playMovieTypes";
import AdSense from "elements/Adsense";

interface moviesListProps {
    id?: number
    slug?: string
    title?: string
    categories?: string
    source?: string
    year?: string
    description?: string
}

interface moviesContextType {
    moviesList: moviesListProps[]
    moviesListLoaded: boolean
}

export default function Play () {

    // Movie Slug
    const movieSlug = window.location.href.split("play/")[1];
    
    // Video Element
    const { video } = useContext(PlayMovieContext) as playMovieContextType;
    const { metaDataVideo } = useContext(PlayMovieContext) as playMovieContextType;

    // Movie Reference
    const { moviesList } = useContext(MoviesContext) as moviesContextType;
    const { moviesListLoaded } = useContext(MoviesContext) as moviesContextType;
    const movieInfo = moviesList.filter(item => item.slug === movieSlug)[0];

    // Loads movie when the source from api is loaded
    const movieSourceLoaded = useRef(false)
    if (movieInfo?.source !== undefined && movieSourceLoaded.current === false) {
        video.current?.load();
        movieSourceLoaded.current = true;
    }

    // Play and pause video
    const { playPauseVideo } = useContext(PlayMovieContext) as playMovieContextType;

    // Video while playing
    const { whilePlayVideo } = useContext(PlayMovieContext) as playMovieContextType;

    // Movie load status
    const { movieLoaded } = useContext(PlayMovieContext) as playMovieContextType;

    ////////////////////////////////////////
    /* HIDE AND SHOW CONTROLS AND ACTIONS */
    ////////////////////////////////////////
    
    /* NOTE */
    // Actions: Action buttons that is on top of the page
    // Controls: Video player controls that is on bottom of the page

    // Hide controls and actions css classes
    const [hideControlsClass, setHideControlsClass] = useState("");
    const [hideActionsClass, setHideActionsClass] = useState("");

    // Cursor hide
    const [hideCursor, setHideCursor] = useState("");
    
    // Status of controls and actions hide status
    const hideControlsActions = useRef(true);

    // Timeout that hides controls and actions after mouse stops moving
    const controlsTimeout = useRef<ReturnType<typeof setTimeout>>();

    // Status of hiding timeOut, informs if it is running
    const controlsTimeoutRunning = useRef<boolean>(false);

    window.addEventListener("mousemove", () => {
        if (controlsTimeoutRunning.current === true) {
            clearTimeout(controlsTimeout.current)
            hideControlsActions.current = true;
            controlsTimeoutRunning.current = false;
        }

        if (hideControlsActions.current === true) {
            setHideControlsClass("");
            setHideActionsClass("");
            setHideCursor("");
            hideControlsActions.current = false;

            controlsTimeoutRunning.current = true;
            controlsTimeout.current = setTimeout(() => {
                    setHideControlsClass(`${styles["hide-controls"]}`);
                    setHideActionsClass(styles["hide-actions"]);
                    setHideCursor(styles["hide-cursor"]);
                    
                    hideControlsActions.current = true;
                }, 5000);
            
        }
    });

    // Play/Pause Icon
    const { setPlayPauseIcon } = useContext(PlayMovieContext) as playMovieContextType;

    // Fullscreen
    const { fullscreen } = useContext(PlayMovieContext) as playMovieContextType;


    ////////////////////////////////////////
    /* ADVERTISEMENT */
    ////////////////////////////////////////
    // Hide ad screen
    const [adClass, setAdClass] = useState("");

    // Show skip ad counter
    let adCloseSeconds = 5;
    const [skipAdCounterNumber, setSkipAdCounterNumber] = useState<number>(adCloseSeconds)
    const skipAdCounter = useRef<ReturnType<typeof setInterval>>();
    const skipAdCounterStarted = useRef<boolean>(false);
    
    const [showSkipButton, setShowSkipButton] = useState("");
    
    if (skipAdCounterStarted.current === false) {
        skipAdCounterStarted.current = true;
        
        skipAdCounter.current = setInterval(() => {
            adCloseSeconds--;
            setSkipAdCounterNumber(adCloseSeconds);
            if (adCloseSeconds === 0) {
                clearInterval(skipAdCounter.current);
                setShowSkipButton(styles["show-ad-skip-button"]);
            }
        }, 1000);
    }
    
    // Close ad
    function closeAd () {
        setAdClass(styles["ad-hide"]);

        video.current?.play(); // Plays video when ad is closed
    }

    // Page title
    document.title = movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy";

    // Meta tags
    document.querySelector("meta[name='title']")?.setAttribute("content", movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy");
    document.querySelector("meta[name='description']")?.setAttribute("content", movieInfo?.description !== undefined ? `${movieInfo.description}` : "Public domain movie");

    return (
        <>  
            {
                moviesListLoaded === true && movieInfo?.title !== undefined
                ?
                    <>
                        <div className={`${styles["ad-content"]} ${adClass}`}>
                            <AdSense />
                        </div>

                        <section className={`${styles.play} ${hideCursor}`}>

                            <div className={styles["video-container"]}>
                                <video
                                    ref={video}
                                    onLoadedMetadata={event => metaDataVideo?.(event.currentTarget)}
                                    onPlay={event => {whilePlayVideo?.(event.currentTarget); setPlayPauseIcon?.("pause");}}
                                    onPause={() => {setPlayPauseIcon?.("play_arrow");}}
                                >
                                    <source src={`https://storage.googleapis.com/lumitasy-videos/${movieInfo?.slug}.mp4`} type="video/mp4" />
                                </video>

                                <div
                                    className={styles.glass}
                                    onClick={() => {playPauseVideo?.();}}
                                    onDoubleClick={fullscreen}
                                >
                                    <div className={`${styles["loading-warning"]} ${movieLoaded === true ? styles["loading-warning-hide"] : "" }`}>

                                        <div className={styles["loading-icon"]}><div></div><div></div><div></div><div></div></div>

                                        <h6 className="title-alternative no-margin">
                                            Your movie will begin soon
                                        </h6>
                                    </div>
                                </div>

                                <div className={`${styles.ad} ${adClass}`}>
                                    <div className={styles["ad-container"]}>
                                        <div className={styles["ad-header"]}>
                                            <Button icon="arrow_back" size="giant" strength="higher" link={`/movie/${movieSlug}`} />

                                            <div className={`${styles["ad-skip"]} ${showSkipButton}`}>
                                                <div className={styles["ad-skip-message"]}>
                                                    Skip ad in {skipAdCounterNumber}
                                                </div>

                                                <div className={styles["ad-skip-button"]}>
                                                    <Button icon="skip_next" size="large" strength="lower" iconFill={true} action={closeAd}>
                                                        Skip ad
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>                                        
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
                                    <VideoPlayerControls />
                                </div>
                            </div>
                        </section>
                    </>
                : moviesListLoaded === true && movieInfo?.title === undefined ? 
                    <>
                        <Menu />
                        <NotFoundContent />
                    </>
                : ""
            }
        </>
    )
}