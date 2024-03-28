import styles from "./CategorySlider.module.scss"

import Poster from "elements/Poster";
import { MoviesContext } from "context/movies";
import { useContext, useRef, useState } from "react";
import { moviesContextType } from "context/moviesTypes";
import Button from "elements/Button";

interface CategorySliderProps {
    categoryName?: string
    categorySlug?: string
}

export default function CategorySlider({ categoryName = "", categorySlug = "" }: CategorySliderProps) {
    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    // Slide position
    const [slidePosition, setSlidePosition] = useState(0);

    // Current slide page (0 is the first page)
    const [currentSlidePage, setCurrentSlidePage] = useState(0);

    // Current slide page indicator (for css purposes)
    const [currentSlidePageIndicator, setCurrentSlidePageIndicator] = useState("first");

    // Window width reference
    const windowWidthReference = useRef<number>(window.innerWidth);
    
    // Slider movement
    function slideCategory (direction:string) {
        windowWidthReference.current = window.innerWidth;

        const windowWidth = windowWidthReference.current; 
        const bodyWidth = document.querySelector("body")?.getBoundingClientRect().width;

        if (windowWidth && bodyWidth) {
            
            // Scroll Size;
            const scrollWidth = windowWidth - bodyWidth;

            // Quantity of posters in the safe area
            const posterScreenQuantity = windowWidth <= 576 ?  3 :
                                         windowWidth <= 768 ?  4 :
                                         windowWidth <= 992 ?  6 :
                                         8

            // Quantity of gaps between posters
            const gapQuantity = posterScreenQuantity - 1;
            
            // Gap between posters
            const gapSize = windowWidth <= 992 ? 16 : 24;
                
            // Body content sizes
            const sidePadding = windowWidth <= 768 ? 24 * 2 : 64 * 2;

            // Content safe area (page body width - content side paddings - scroll width)
            const contentSafeArea = windowWidth - sidePadding - scrollWidth;

            // Poster width calculated
            const posterWidth = Math.ceil(((contentSafeArea - (gapQuantity * gapSize)) / posterScreenQuantity) * 10) / 10;
            
            // Quantity of posters per category 
            const moviesQuantity = moviesList.filter(item => item.categories?.includes(categorySlug)).length;
            
            // Slider width calculated
            const sliderFullWidth = (moviesQuantity * posterWidth) + ((moviesQuantity - 1) * gapSize);

            // How much the slider moves when button is clicked
            const slidePositionIncrement = Math.round(contentSafeArea * .6);

            // Max page that slider can go
            const maxPage = Math.ceil((sliderFullWidth - contentSafeArea) / slidePositionIncrement);

            // Goes forwards
            if (direction === "forward") {
                
                // Moves the slide
                if (slidePosition > -1 * (sliderFullWidth - contentSafeArea)) {
                    
                    // Check the current slide page
                    if (currentSlidePage !== maxPage - 1) {
                        setSlidePosition(currentState => currentState - slidePositionIncrement);
                        setCurrentSlidePageIndicator("middle");        
                    } else {
                        setSlidePosition(-1 * (sliderFullWidth - contentSafeArea));
                        setCurrentSlidePageIndicator("last");
                    }

                    setCurrentSlidePage(currentState => currentState + 1);
    
                }
            
            // Goes backwards
            } else if (direction === "backward") {

                if (slidePosition <= 0) {
                    
                    if (currentSlidePage > 1) {
                        setSlidePosition(currentState => currentState + slidePositionIncrement);
                        setCurrentSlidePageIndicator("middle");
                    } else {
                        setSlidePosition(0);
                        setCurrentSlidePageIndicator("first");
                    }

                    setCurrentSlidePage(currentState => currentState - 1);

                }

            }

        }
    }

    // Swipe
    const startTouchPosition = useRef<number>()
    const endTouchPosition = useRef<number>();

    function startTouch (event:React.TouchEvent<HTMLDivElement>) {
        startTouchPosition.current = event.touches[0].clientX;
    }

    function moveTouch (event:React.TouchEvent<HTMLDivElement>) {
        endTouchPosition.current = event.touches[0].clientX;
    }

    function endTouch () {
        const swipeDistance = 80;

        if (startTouchPosition?.current && endTouchPosition?.current) {
            if (startTouchPosition.current <= endTouchPosition.current - swipeDistance) {
                slideCategory("backward");
            }
            
            if (startTouchPosition.current >= endTouchPosition.current + swipeDistance) {
                slideCategory("forward");
            }
        }
    }

    // If page resizes
    const pageResize:EventListener = () => {
        // Only if resize window width
        if (windowWidthReference.current !== window.innerWidth) {
            windowWidthReference.current = window.innerWidth;

            setSlidePosition(0);
            setCurrentSlidePage(0);
            setCurrentSlidePageIndicator("first");
        }
        
        window.removeEventListener("resize", pageResize)

        return window.addEventListener("resize", pageResize);
    }

    window.addEventListener("resize", pageResize);

    return (

        <div className={`content ${styles["category-slider"]}`}>
            <h3 className="resp-h4 no-margin">{categoryName}</h3>

            <div 
                className={styles.container}
                style={{left: slidePosition, transition: "left .5s"}}
                data-current-page={currentSlidePageIndicator}
                onTouchStart={event => startTouch(event)}
                onTouchMove={event => moveTouch(event)}
                onTouchEnd={() => endTouch()}
            >
                {
                    moviesList.filter(item => item.categories?.includes(categorySlug)).map((item, index) => {
                        return (
                            <div className={styles["poster-wrapper"]} key={index}>
                                <Poster
                                    link={`movie/${item.slug}`}
                                    src={`https://lumitasy-resources.vercel.app/images/movies/posters/${item.slug}.png`}
                                    title={item.title !== undefined ? item.title : ""}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className={styles["slide-backward"]}>
                <Button icon="arrow_back_ios_new" size="extra-large" action={() => slideCategory("backward")} />
            </div>

            <div className={styles["slide-forward"]}>
                <Button icon="arrow_forward_ios" size="extra-large" action={() => slideCategory("forward")} />
            </div>

        </div>

    )
}