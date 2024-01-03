import { useRef, useState } from "react";
import styles from "./Slider.module.scss";

export default function Slider () {

    // Receives the slider position
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);

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

        // Sets the new inner bar position
        setCurrentSlidePosition(newBarPositionPercentage);
    }


    /////////////
    /* HANDLER */
    /////////////

    // Ref to get handler html element
    const handler = useRef<any>();

    // Calculation for the handle to slide according mouse movement
    function slide (event:any):void {
        const sliderWidth = handler.current.parentElement.querySelector(":first-child").getBoundingClientRect().width;
        const sliderBaseXPosition = handler.current.parentElement.querySelector(":first-child").getBoundingClientRect().x;
        const handlePosition = event.clientX;
        const newHandlePosition = handlePosition - sliderBaseXPosition;
        let newHandlePositionPercentage = newHandlePosition / sliderWidth * 100;

        if (newHandlePositionPercentage < 0) {
            newHandlePositionPercentage = 0;
        } else if (newHandlePositionPercentage > 100) {
            newHandlePositionPercentage = 100
        }
        
        // Sets the new handle position
        setCurrentSlidePosition(newHandlePositionPercentage);

        if (sliderMoving.current === false) {
            return removeListeners();
        }
    }

    // Remove added handle listeners
    function removeListeners() {
        window.removeEventListener("mousemove", slide);
        window.removeEventListener("mouseup", finishSlideHandle);
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
    }

    // Handle movement status
    const sliderMoving = useRef<boolean>(false)

    return (
        <div className={styles.slider}>
            <div className={styles["background"]} onClick={event => barClickPosition(event)}>
                <div className={styles["current-position"]} style={{width: `${currentSlidePosition}%`}}></div>
            </div>
            <div ref={handler} className={styles.handler} style={{left: `${currentSlidePosition}%`}}
                onMouseDown={startHandleMovement}
            ></div>
        </div>
    )
}