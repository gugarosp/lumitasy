import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.scss";

interface SliderProps {
    sliderPosition?: number
    slidePlayElement?: any
}

export default function Slider ({sliderPosition = 0, slidePlayElement}:SliderProps) {

    // Receives the slider position
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);
    
    // Sets the slider position if sliderPosition is given/updated
    useEffect(() => {
        if (sliderMoving.current === false) {
            setCurrentSlidePosition(sliderPosition);
        }
    }, [sliderPosition])
    
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

        // Skips video to specific time if prop slidePlayElement exists
        if (slidePlayElement) {
            const videoDuration = slidePlayElement().duration;
            const currentVideoTime = videoDuration * newBarPositionPercentage / 100
            slidePlayElement().currentTime = currentVideoTime;
        }
    }

    /////////////
    /* HANDLER */
    /////////////

    // Ref to get handler html element
    const handler = useRef<any>();

    // Last Touch Position
    const lastTouchPosition = useRef<number>(0);

    // Calculation for the handle to slide according mouse movement
    function slide (event:MouseEvent | TouchEvent) {
        const sliderWidth = handler.current.parentElement.querySelector(":first-child").getBoundingClientRect().width;
        const sliderBaseXPosition = handler.current.parentElement.querySelector(":first-child").getBoundingClientRect().x;
        
        if (event instanceof TouchEvent) {
            lastTouchPosition.current = event.touches[0].clientX;
        }
        const handlePosition = event instanceof MouseEvent && event.clientX ? event.clientX : lastTouchPosition.current;
        
        const newHandlePosition = handlePosition - sliderBaseXPosition;
        let newHandlePositionPercentage = newHandlePosition / sliderWidth * 100;

        if (newHandlePositionPercentage < 0) {
            newHandlePositionPercentage = 0;
        } else if (newHandlePositionPercentage > 100) {
            newHandlePositionPercentage = 100
        }
        
        // Sets the new slider position (and therefore the new handle position)
        setCurrentSlidePosition(newHandlePositionPercentage);

        // Skips video to specific time if prop slidePlayElement exists
        if (slidePlayElement) {
            const videoDuration = slidePlayElement().duration;
            const currentVideoTime = videoDuration * newHandlePositionPercentage / 100
            slidePlayElement().currentTime = currentVideoTime;
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

    // Changes handle movement status so "function 'slide'" can remove added handle listeners 
    function finishSlideHandle() {
        sliderMoving.current = false;
    }

    // Starts handle movement/listeners
    function startHandleMovement () {
        sliderMoving.current = true;

        window.addEventListener("mousemove", slide);
        window.addEventListener("mouseup", finishSlideHandle);

        window.addEventListener("touchmove", slide);
        window.addEventListener("touchend", finishSlideHandle);
        window.addEventListener("touchend", slide);
    }

    // Handle movement status
    const sliderMoving = useRef<boolean>(false)

    return (
        <div className={styles.slider}>
            <div className={styles["background"]} onClick={event => {barClickPosition(event)}} >
                <div className={styles["current-position"]} style={{width: `${currentSlidePosition}%`}}></div>
            </div>
            <div ref={handler} className={styles.handler} style={{left: `${currentSlidePosition}%`}}
                onMouseDown={startHandleMovement}
                onTouchStart={startHandleMovement}
            ></div>
        </div>
    )
}