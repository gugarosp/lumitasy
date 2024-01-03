import styles from "./Play.module.scss"

import { useContext } from "react";
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
    whenPauseVideo: () => void
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

    return (
        <section className={styles.play}>

            <div className={styles["video-container"]}>
                <video ref={video} onLoadedMetadata={event => metaDataVideo(event)} onPlay={event => whilePlayVideo(event)} onPause={whenPauseVideo}>
                    <source src="https://drive.google.com/uc?id=185AJMmiPdmEjmtVAukjWO4fyr38QGlnk" type="video/mp4" />
                </video>

                <div className={styles.glass} onClick={PlayPauseVideo}></div>
            </div>
                

            <div className={styles.actions}>
                <Button icon="arrow_back" size="giant" strength="higher" link={`/movie/${movieSlug}`} />
            </div>
            
            <div className={styles.controls}>
                <div style={{display: "none"}}>
                    <span>{videoCurrentTime}/{videoDuration}</span>
                </div>

                <VideoPlayerControls currentTime={videoCurrentTime} totalTime={videoDuration} />
            </div>
        </section>
    )
}