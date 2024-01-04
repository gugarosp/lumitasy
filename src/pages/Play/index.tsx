import styles from "./Play.module.scss"

import { SetStateAction, useContext, useRef, useState } from "react";
import Button from "elements/Button";
import VideoPlayerControls from "components/VideoPlayerControls";
import { PlayMovieContext } from "context/playMovie";

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
    movieLoaded: boolean
}

export default function Play () {

    // Movie Slug
    const movieSlug = window.location.href.split("play/")[1];

    // Video Element
    const { video }:playProps = useContext(PlayMovieContext);
    const { metaDataVideo }:playProps = useContext(PlayMovieContext);

    // Play and pause video
    const { PlayPauseVideo }:playProps = useContext(PlayMovieContext);

    // Video Infos
    const { videoCurrentTime }:playProps = useContext(PlayMovieContext);
    const { videoDuration }:playProps = useContext(PlayMovieContext);

    // Video while playing
    const { whilePlayVideo }:playProps = useContext(PlayMovieContext);

    // Video when paused
    const { whenPauseVideo }:playProps = useContext(PlayMovieContext);

    // Show controls
    const { movieLoaded }:playProps = useContext(PlayMovieContext);

    // Hide controls and actions
    const [hideControlsClass, setHideControlsClass] = useState<SetStateAction<any>>("");
    const [hideActionsClass, setHideActionsClass] = useState<SetStateAction<any>>("");

    const hideControlsActions = useRef(true);

    const movieAlreadyLoaded = useRef(false);

    if (movieLoaded === true && movieAlreadyLoaded.current === false) { // Executes only one time, even if component rerenders
        setTimeout(() => {
            setHideControlsClass(`${styles["hide-controls"]}`);
            setHideActionsClass(styles["hide-actions"]);
            
            movieAlreadyLoaded.current = true;
        }, 5000)  
         
    }

    window.addEventListener("mousemove", () => {
        if (hideControlsActions.current === true && movieAlreadyLoaded.current === true) {
            setHideControlsClass("");
            setHideActionsClass("");
            hideControlsActions.current = false;

            setTimeout(() => {
                    setHideControlsClass(`${styles["hide-controls"]}`);
                    setHideActionsClass(styles["hide-actions"]);
                    
                    hideControlsActions.current = true;
                }, 5000);
            
        }
    });

    return (
        <section className={styles.play}>

            <div className={styles["video-container"]}>
                <video ref={video} onLoadedMetadata={event => metaDataVideo(event)} onPlay={event => whilePlayVideo(event)} onPause={whenPauseVideo}>
                    <source src="https://drive.google.com/uc?id=185AJMmiPdmEjmtVAukjWO4fyr38QGlnk" type="video/mp4" />
                </video>

                <div className={styles.glass} onClick={PlayPauseVideo}>
                    <div className={`${styles["loading-warning"]} ${movieLoaded === true ? styles["loading-warning-hide"] : "" }`}>

                        <div className={styles["loading-icon"]}><div></div><div></div><div></div><div></div></div>

                        <h6 className="title-alternative no-margin">
                            Your movie will begin soon
                        </h6>
                    </div>
                </div>
            </div>


            <div className={`${
                    styles.actions} ${
                    movieLoaded === true ? ` ${
                        hideActionsClass}` : "" }`
            }>
                <Button icon="arrow_back" size="giant" strength="higher" link={`/movie/${movieSlug}`} />
            </div>

            <div
                className={`${
                    styles.controls}${
                    movieLoaded === true ? ` ${
                            styles["show-controls"]} ${
                            hideControlsClass}` : "" }`
            }>
                <VideoPlayerControls currentTime={videoCurrentTime} totalTime={videoDuration} />
            </div>
        </section>
    )
}