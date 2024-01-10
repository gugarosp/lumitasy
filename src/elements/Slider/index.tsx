import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.scss";

interface SliderProps {
    sliderPosition?: number
    sliderVideoElement?: any
}

export default function Slider ({sliderPosition = 0, sliderVideoElement}:SliderProps) {

    /////////////
    /* GENERAL */
    /////////////

    /* NOTE */
    // sliderVideoElement is a specific prop used by VideoPlayerControls Component

    // Receives the slider position prop
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);
    
    // Sets the slider (handle and innerbar) position if sliderPosition is given/updated
    useEffect(() => {
        if (sliderMoving.current === false) {
            setCurrentSlidePosition(sliderPosition);
        }
    }, [sliderPosition]);

    // Transforms the video time into a 'h:mm:ss' format
    function timeFormat (time:number) {
        return new Date(10800000 + (time * 1000)).toString().slice(17, 24);
    }
    
    /////////
    /* BAR */
    /////////

    // Calculation for the new inner bar position when clicked in the background bar
    function barClickPosition (event:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const sliderWidth = event.currentTarget.getBoundingClientRect().width;
        const sliderBaseXPosition = event.currentTarget.getBoundingClientRect().x;
        const barClickPosition = event.clientX;
        const newBarPosition = barClickPosition - sliderBaseXPosition;
        const newBarPositionPercentage = newBarPosition / sliderWidth * 100

        // Sets the new slider position (and therefore the new inner bar position)
        setCurrentSlidePosition(newBarPositionPercentage);

        // Skips video to specific time if prop sliderVideoElement exists
        if (sliderVideoElement) {
            const videoDuration = sliderVideoElement().duration;
            const currentVideoTime = videoDuration * newBarPositionPercentage / 100
            sliderVideoElement().currentTime = currentVideoTime;
        }
    }

    /////////////
    /* HANDLE */
    /////////////

    // Ref to get handle html element
    const handle = useRef<any>();

    // Handle movement status
    const sliderMoving = useRef<boolean>(false);
    
    // Last Touch Position
    // (touchend event doesn't give the touch end position, so you need
    // to register the last touch while user is dragging the handle)
    const lastHandleTouchPosition = useRef<number>(0);
    
    // Current video time when handle is dragged (used only if sliderVideoElement exists)
    const handleCurrentVideoTime = useRef<number>(0);

    // Starts handle movement/listeners
    function startHandleMovement () {
        sliderMoving.current = true;

        setVideoHandleClass(styles["video-handle-time"]);

        window.addEventListener("mousemove", slide);
        window.addEventListener("mouseup", finishSlideHandle);

        window.addEventListener("touchmove", slide);
        window.addEventListener("touchend", finishSlideHandle);
        window.addEventListener("touchend", slide); // Touch end needs to register "slider" function because
                                                    // it doesn't get the touch end position when finishSlideHandle function is called
    }

    // Calculation for the handle to slide according mouse/touch movement
    function slide (event:MouseEvent | TouchEvent) {
        const sliderWidth = handle.current.parentElement.querySelector(":first-child").getBoundingClientRect().width;
        const sliderBaseXPosition = handle.current.parentElement.querySelector(":first-child").getBoundingClientRect().x;
        
        if (event instanceof TouchEvent) {
            lastHandleTouchPosition.current = event.touches[0].clientX;
        }
        const handlePosition = event instanceof MouseEvent && event.clientX ? event.clientX : lastHandleTouchPosition.current;
        
        const newHandlePosition = handlePosition - sliderBaseXPosition;
        let newHandlePositionPercentage = newHandlePosition / sliderWidth * 100;

        if (newHandlePositionPercentage < 0) {
            newHandlePositionPercentage = 0;
        } else if (newHandlePositionPercentage > 100) {
            newHandlePositionPercentage = 100
        }
        
        // Sets the new slider position (and therefore the new handle position)
        setCurrentSlidePosition(newHandlePositionPercentage);

        // Skips video to specific time (used only if sliderVideoElement exists)
        if (sliderVideoElement) {
            const videoDuration = sliderVideoElement().duration;
            const currentVideoTime = videoDuration * newHandlePositionPercentage / 100;
            handleCurrentVideoTime.current = currentVideoTime;
            
            if (sliderVideoElement().paused === false) {
                sliderVideoElement().pause();
            }
        }

        // Remove all event listeners
        if (sliderMoving.current === false) {
            return removeListeners();
        }
    }

    // Remove added handle listeners
    function removeListeners() {
        window.removeEventListener("mousemove", slide);
        window.removeEventListener("mouseup", finishSlideHandle);

        window.removeEventListener("touchmove", slide);
        window.removeEventListener("touchend", finishSlideHandle);
        window.removeEventListener("touchend", slide);
    }
    
    // Timeout that prevents play video when it's not already loaded (used only if sliderVideoElement exists)
    const handlePlayVideoTimeout = useRef<ReturnType<typeof setTimeout>>();
    
    // Video time handle tooltip css class status
    const [videohandleClass, setVideoHandleClass] = useState<string>("");
    
    // Changes handle movement status so "function 'slide'" can remove added handle listeners 
    function finishSlideHandle() {
        sliderMoving.current = false;

        setVideoHandleClass("");

        // Plays video when handle is released (used only if sliderVideoElement exists)
        if (sliderVideoElement) {
            sliderVideoElement().currentTime = handleCurrentVideoTime.current;
            
            clearTimeout(handlePlayVideoTimeout.current);
            handlePlayVideoTimeout.current = setTimeout(() => {
                sliderVideoElement()?.play();
            }, 1000);
        }
    }

    return (
        <div className={styles.slider}>
            <div className={styles["background"]} onClick={event => {barClickPosition(event)}} >
                <div className={styles["current-position"]} style={{width: `${currentSlidePosition}%`}}></div>
            </div>
            <div
                ref={handle}
                data-videohandletime={sliderVideoElement ? timeFormat(handleCurrentVideoTime.current) : undefined}
                className={`${styles.handle} ${sliderVideoElement ? videohandleClass : ""}`}
                style={{left: `${currentSlidePosition}%`}}
                onMouseDown={startHandleMovement}
                onTouchStart={startHandleMovement}
            ></div>
        </div>
    )
}