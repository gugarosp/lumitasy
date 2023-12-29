import styles from "./Play.module.scss"

import { SyntheticEvent, useState } from "react";
import Button from "elements/Button";
import VideoPlayerControls from "components/VideoPlayerControls";

export default function Play () {

    const movieSlug = window.location.href.split("play/")[1];

    // Video Element
    const [videoElement, setVideoElement] = useState<any>("");
    
    function metaDataVideo (event:SyntheticEvent<HTMLVideoElement>) {
        console.log("video is loaded");
        setVideoElement(event.target)
    }
    
    // Play and pause video
    const [videoStatus, setVideoStatus] = useState("paused");

    function PlayPauseVideo () {
        if (videoStatus === "paused") {
            videoElement.play();
            setVideoStatus("playing");
        } else if (videoStatus === "playing") {
            videoElement.pause();
            setVideoStatus("paused");
        }
    }

    // Video Infos
    const [getVideoInfo, setGetInfoVideo] = useState('');
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    function videoInfo(element:any) {
        setVideoCurrentTime(Math.floor(element.currentTime));
        setVideoDuration(Math.ceil(element.duration));
    }
    
    // Video while playing
    function whilePlayVideo(event:SyntheticEvent<HTMLVideoElement>) {
        const intervalVideo:any = window.setInterval(() => {
            videoInfo(event.target);
        }, 1);
        setGetInfoVideo(intervalVideo);
    }

    // Video when paused
    function whenPauseVideo () {
        clearInterval(getVideoInfo);
    }

    return (
        <section className={styles.play}>

            <div className={styles["video-container"]}>
                <video onLoadedMetadata={(event) => {metaDataVideo(event)}} onPlay={(event) => whilePlayVideo(event)} onPause={whenPauseVideo}>
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
                    <br />
                    <input style={{width: "100%", margin: 0}} type="range" min="0" max={videoDuration} step="1" defaultValue={videoCurrentTime} />
                </div>

                <VideoPlayerControls currentTime={videoCurrentTime} totalTime={videoDuration} playVideo={PlayPauseVideo} />
            </div>
        </section>
    )
}