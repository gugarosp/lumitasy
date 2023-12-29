import Button from "elements/Button";
import styles from "./VideoPlayerControls.module.scss"

interface VideoPlayerControlsProps {
    currentTime: number;
    totalTime: number;
    playVideo: () => void;
}

export default function VideoPlayerControls ({currentTime, totalTime, playVideo}:VideoPlayerControlsProps) {

    const currentTimeBarPosition = currentTime/totalTime * 100;

    function timeFormat (time:number) {
        return new Date(10800000 + (time * 1000)).toString().slice(17, 24);
    }

    return (
        <div className={styles["video-player-controls"]}>

            <div className={styles["time-bar"]}>
                <div className={styles["time-bar-background"]}>
                    <div className={styles["time-bar-current-time"]} style={{width: `${currentTimeBarPosition}%`}}>
                    
                    </div>
                </div>
            </div>

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
                    
                    <Button icon="play_arrow" iconFill={true} type="icon-ring" size="titan" strength="higher" action={playVideo}/>
                    
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