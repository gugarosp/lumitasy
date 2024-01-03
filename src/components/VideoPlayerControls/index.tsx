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
    videoCurrentTime: number
    PlayPauseVideo: () => void,
}

export default function VideoPlayerControls ({currentTime, totalTime}:VideoPlayerControlsProps) {
    
    // Transforms the video current time and total time into a 'h:mm' format
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

    // Change play/pause icon acording to movie status
    const [playPauseIcon, setPlayPauseIcon] = useState("play_arrow")

    function changePlayIcon () {
        playPauseIcon === "play_arrow" ? setPlayPauseIcon("pause") : setPlayPauseIcon("play_arrow");
    }
    
    return (
        <div className={styles["video-player-controls"]}>

            <Slider sliderPosition={sliderPosition}/>

            <div className={styles.controls}>
                <div className={styles.time}>
                    <h5 className="title-alternative">
                        {timeFormat(currentTime)}/{timeFormat(totalTime)}
                    </h5>
                </div>

                <div className={styles.player}>
                    <div className={styles.backward}>
                        <Button icon="replay" iconFill={true} type="icon-ring" size="giant" strength="higher" />
                        <span className="h8 title-alternative">10</span>
                    </div>
                    
                    <Button icon={playPauseIcon} iconFill={true} type="icon-ring" size="titan" strength="higher" action={() => {PlayPauseVideo(); changePlayIcon();}}/>
                    
                    <div className={styles.forward}>
                        <Button icon="replay" iconFill={true} type="icon-ring" size="giant" strength="higher" />
                        <span className="h8 title-alternative">10</span>
                    </div>
                </div>

                <div className={styles.options}>
                    <Button icon="volume_up" size="giant" strength="lower" />
                    <Button icon="fullscreen" size="giant" strength="lower" />
                </div>

            </div>

        </div>
    )
} 