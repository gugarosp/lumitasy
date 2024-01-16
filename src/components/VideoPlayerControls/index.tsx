import Button from "elements/Button";
import styles from "./VideoPlayerControls.module.scss"
import Slider from "elements/Slider";
import { useContext, useEffect, useState } from "react";
import { PlayMovieContext } from "context/playMovie";

interface VideoPlayerControlsProps {
    currentTime: number;
    totalTime: number;
}

interface playProps {
    video: any
    videoCurrentTime: number
    PlayPauseVideo: () => void
    playPauseIcon: string,
    fullscreenIcon: string;
    fullscreen: () => void
}

export default function VideoPlayerControls ({currentTime, totalTime}:VideoPlayerControlsProps) {
    
    // Transforms the video current time and total time into a 'h:mm:ss' format
    function timeFormat (time:number) {
        return new Date(10800000 + (time * 1000)).toString().slice(17, 24);
    }
    
    // Calculation of slider progress according to video current time and total time
    const [sliderPosition, setSliderPosition] = useState<number>()
    
    let sliderBarPositionPercentage = currentTime/totalTime * 100;
    if (isNaN(sliderBarPositionPercentage)) {
        sliderBarPositionPercentage = 0;
    }
    
    useEffect(() => {
        setSliderPosition(sliderBarPositionPercentage);
    }, [sliderBarPositionPercentage])
    
    // Play and pause video
    const { PlayPauseVideo }:playProps = useContext(PlayMovieContext);

    // Play and pause icon change
    const { playPauseIcon }:playProps = useContext(PlayMovieContext);

    // Volume
    const [volumeIcon, setVolumeIcon] = useState("volume_up");

    function volume () {
        if (volumeIcon === "volume_up") {
            setVolumeIcon("volume_off");
            video.current.volume = 0;
        } else {
            setVolumeIcon("volume_up");
            video.current.volume = 1;
        }
    }

    // Fullscreen
    const { fullscreenIcon }:playProps = useContext(PlayMovieContext);
    const { fullscreen }:playProps = useContext(PlayMovieContext);

    // Video Element
    const { video }:playProps = useContext(PlayMovieContext);

    // Passes the video html element to slider element
    function sliderVideoElement(element:HTMLVideoElement) {
        return element;
    }

    // Forward and backward 10 seconds
    function changeVideoTime (direction:string, seconds:number) {
        const videoCurrentTime = video.current.currentTime;
        const vector = direction === "forward" ? 1 : "backward" ? -1 : 0;

        video.current.currentTime = videoCurrentTime + (vector * seconds);
    }

    return (
        <div className={styles["video-player-controls"]}>

            <Slider sliderPosition={sliderPosition} sliderVideoElement={() => sliderVideoElement(video.current)}/>

            <div className={styles.controls}>
                <div className={styles.time}>
                    <h5 className="title-alternative">
                        {timeFormat(currentTime)}/{timeFormat(totalTime)}
                    </h5>
                </div>

                <div className={styles.player}>
                    <div className={styles.backward}>
                        <Button icon="replay" iconFill={true} type="icon-ring" size="giant" strength="higher" action={() => changeVideoTime("backward", 10)}/>
                        <span className="h8 title-alternative">10</span>
                    </div>
                    
                    <Button icon={playPauseIcon} iconFill={true} type="icon-ring" size="titan" strength="higher" action={() => PlayPauseVideo()}/>
                    
                    <div className={styles.forward}>
                        <Button icon="replay" iconFill={true} type="icon-ring" size="giant" strength="higher" action={() => changeVideoTime("forward", 10)} />
                        <span className="h8 title-alternative">10</span>
                    </div>
                </div>

                <div className={styles.options}>
                    <Button icon={volumeIcon} size="giant" strength="lower" action={() => volume()} />
                    <Button icon={fullscreenIcon} size="giant" strength="lower" action={() => fullscreen()} />
                </div>

            </div>

        </div>
    )
} 