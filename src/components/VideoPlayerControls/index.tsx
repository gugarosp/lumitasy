import Button from "elements/Button";
import styles from "./VideoPlayerControls.module.scss"
import Slider from "elements/Slider";
import { useContext, useEffect, useState } from "react";
import { PlayMovieContext } from "context/playMovie";
import { playMovieContextType } from "context/playMovieTypes";

export default function VideoPlayerControls () {
    // Video Element
    const { video } = useContext(PlayMovieContext) as playMovieContextType;
    
    // Video current time and duration
    const { videoCurrentTime } = useContext(PlayMovieContext) as playMovieContextType;
    const { videoDuration } = useContext(PlayMovieContext) as playMovieContextType;
    
    // Transforms the video current time and total time into a 'h:mm:ss' format
    function timeFormat (time:number) {
        return new Date(10800000 + (time * 1000)).toString().slice(17, 24);
    }
    
    // Calculation of slider progress according to video current time and total time
    const [sliderPosition, setSliderPosition] = useState<number>()
    
    let sliderBarPositionPercentage = videoCurrentTime/videoDuration * 100;
    if (isNaN(sliderBarPositionPercentage)) {
        sliderBarPositionPercentage = 0;
    }
    
    useEffect(() => {
        setSliderPosition(sliderBarPositionPercentage);
    }, [sliderBarPositionPercentage])
    
    // Play and pause video
    const { playPauseVideo } = useContext(PlayMovieContext) as playMovieContextType;

    // Play and pause icon change
    const { playPauseIcon } = useContext(PlayMovieContext) as playMovieContextType;

    // Volume
    const [volumeIcon, setVolumeIcon] = useState("volume_up");

    function volume () {
        if (video.current !== null) {
            if (volumeIcon === "volume_up") {
                setVolumeIcon("volume_off");
                video.current.volume = 0;
            } else {
                setVolumeIcon("volume_up");
                video.current.volume = 1;
            }
        }
    }

    // Fullscreen
    const { fullscreenIcon } = useContext(PlayMovieContext) as playMovieContextType;
    const { fullscreen } = useContext(PlayMovieContext) as playMovieContextType;


    // Passes the video html element to slider element
    function sliderVideoElement(element:HTMLVideoElement) {
        return element;
    }

    // Forward and backward 10 seconds
    function changeVideoTime (direction:string, seconds:number) {
        const vector = direction === "forward" ? 1 : "backward" ? -1 : 0;

        if (video.current !== null) {
            video.current.currentTime = videoCurrentTime + (vector * seconds);
        }
    }

    // Keyboard player controls
    function keyboardControls (event:KeyboardEvent) {
        switch (event.code) {
            case 'Space': playPauseVideo?.(); break;
            case 'ArrowLeft': changeVideoTime("backward", 10); break;
            case 'ArrowRight': changeVideoTime("forward", 10);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyboardControls);
        return () => document.removeEventListener("keydown", keyboardControls);
    });

    return (
        <div className={styles["video-player-controls"]}>

            <Slider sliderPosition={sliderPosition} sliderVideoElement={() => sliderVideoElement(video.current !== null ? video.current : document.createElement("video"))}/>

            <div className={styles.controls}>
                <div className={styles.time}>
                    <h5 className="title-alternative resp-h7 no-margin">
                        {timeFormat(videoCurrentTime)}/{timeFormat(videoDuration)}
                    </h5>
                </div>

                <div className={styles.player}>
                    <div className={styles.backward}>
                        <Button icon="replay" iconFill={true} type="icon-ring" size="giant" respSize="large" strength="higher" action={() => changeVideoTime("backward", 10)}/>
                        <span className="h8 title-alternative resp-h9">10</span>
                    </div>
                    
                    <Button icon={playPauseIcon} iconFill={true} type="icon-ring" size="titan" respSize="extra-large" strength="higher" action={() => playPauseVideo?.()}/>
                    
                    <div className={styles.forward}>
                        <Button icon="replay" iconFill={true} type="icon-ring" size="giant" respSize="large" strength="higher" action={() => changeVideoTime("forward", 10)} />
                        <span className="h8 title-alternative resp-h9">10</span>
                    </div>
                </div>

                <div className={styles.options}>
                    <Button icon={volumeIcon} size="large" respSize="medium" strength="lower" action={() => volume()} />
                    <Button icon={fullscreenIcon} size="large" respSize="medium" strength="lower" action={() => fullscreen?.()} />
                </div>

            </div>

        </div>
    )
} 