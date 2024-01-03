import { useRef, useState } from "react";
import styles from "./Slider.module.scss";

export default function Slider () {

    const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);

    function sliderPosition (event:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const sliderWidth = event.currentTarget.getBoundingClientRect().width;
        const sliderBasePosition = event.currentTarget.getBoundingClientRect().x;
        const sliderPosition = event.clientX;
        const currentClick = sliderPosition - sliderBasePosition;

        setCurrentSlidePosition(Math.round(currentClick / sliderWidth * 100));
    }

    const handler = useRef<any>();

    function slide (event:any) {
        const sliderWidth = event.currentTarget.parentElement.querySelector(":first-child").getBoundingClientRect().width;
        const sliderBasePosition = event.currentTarget.parentElement.querySelector(":first-child").getBoundingClientRect().x;
        const dragPosition = event.clientX;
        const handlePosition = dragPosition - sliderBasePosition;

        setCurrentSlidePosition(handlePosition / sliderWidth * 100);

        if (sliderMoving.current === false) {
            return handler.current.removeEventListener("mousemove", slide);
        }

    }

    const sliderMoving = useRef<boolean>(false)

    function sliderHandle () {
        sliderMoving.current = true;
        handler.current.addEventListener("mousemove", slide);
    }

    function removeSlideHandle() {
        sliderMoving.current = false;
        console.log(sliderMoving);
    }

    return (
        <div className={styles.slider}>
            <div className={styles["background"]} onClick={event => sliderPosition(event)}>
                <div className={styles["current-position"]} style={{width: `${currentSlidePosition}%`}}></div>
            </div>
            <div ref={handler} className={styles.handler} style={{left: `${currentSlidePosition}%`}}
                onMouseDown={sliderHandle}
                onMouseUp={removeSlideHandle}
            ></div>
        </div>
    )
}