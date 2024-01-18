import styles from "./Play.module.scss"

import { useContext, useRef, useState } from "react";
import Button from "elements/Button";
import VideoPlayerControls from "components/VideoPlayerControls";
import { PlayMovieContext } from "context/playMovie";
import { MoviesContext } from "context/movies";
import NotFoundContent from "components/NotFoundContent";
import Menu from "components/Menu";

interface playProps {
    video: any,
    metaDataVideo: any
    getVideoInfo: string
    videoDuration: number
    PlayPauseVideo: () => void,
    videoInfo: () => void,
    whilePlayVideo: any,
    movieLoaded: boolean,
    setPlayPauseIcon: React.Dispatch<React.SetStateAction<string>>,
    fullscreen: () => void,
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

    // Video while playing
    const { whilePlayVideo }:playProps = useContext(PlayMovieContext);

    // Movie load status
    const { movieLoaded }:playProps = useContext(PlayMovieContext);

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
    const { setPlayPauseIcon }:playProps = useContext(PlayMovieContext);

    // Fullscreen
    const { fullscreen }:playProps = useContext(PlayMovieContext);


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

        video.current.play(); // Plays video when ad is closed
    }

    // Page title
    document.title = movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy";

    return (
        <>  
            {
                movieInfo?.title !== undefined
                ?
                    <section className={`${styles.play} ${hideCursor}`}>

                        <div className={styles["video-container"]}>
                            <video
                                ref={video}
                                onLoadedMetadata={event => metaDataVideo(event)}
                                onPlay={event => {whilePlayVideo(event.target); setPlayPauseIcon("pause");}}
                                onPause={() => {setPlayPauseIcon("play_arrow");}}
                            >
                                <source src={movieInfo?.source} type="video/mp4" />
                            </video>

                            <div
                                className={styles.glass}
                                onClick={() => {PlayPauseVideo();}}
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

                                    <div className={styles["ad-content"]}>
                                        <img src="/ad.png" alt="Advertisement" />
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
                : moviesList[0] !== undefined && movieInfo?.title === undefined ? 
                    <>
                        <Menu />
                        <NotFoundContent />
                    </>
                : ""
            }
        </>
    )
}