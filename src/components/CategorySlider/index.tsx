import styles from "./CategorySlider.module.scss"

import Poster from "elements/Poster";
import { MoviesContext } from "context/movies";
import { useContext, useState } from "react";
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

    // Current slide page
    const [currentSlidePage, setCurrentSlidePage] = useState(0);

    // Slider movement
    function slideCategory (direction:string) {
        const bodyWidth = document.querySelector("body")?.getBoundingClientRect().width;
        
        if (bodyWidth) {
            // Slider sizes
            const sidePadding = 64 * 2; // This will change when screen goes mobile
            const gapSize = 24;  // This will change when screen goes mobile

            // Content safe area (page body width - content side paddings)
            const contentSafeArea = bodyWidth - sidePadding;
            
            // Quantity of gaps between posters
            const gapQuantity = 7;  // This will change when screen goes mobile
            
            // Quantity of posters in the safe area
            const posterScreenQuantity = 8; // This will change when screen goes mobile

            // Poster width calculated
            const posterWidth = Math.ceil(((contentSafeArea - (gapQuantity * gapSize)) / posterScreenQuantity) * 10) / 10;
            
            // Quantity of posters per category 
            const moviesQuantity = moviesList.filter(item => item.categories?.includes(categorySlug)).length;
            
            // Slider width calculated
            const sliderFullWidth = (moviesQuantity * posterWidth) + ((moviesQuantity - 1) * gapSize);

            // How much the slider moves when button is clicked
            const slidePositionIncrement = Math.round(contentSafeArea * .6);

            // Max quantity of times the button can be pressed
            const totalButtonPress = Math.floor((sliderFullWidth - contentSafeArea) / slidePositionIncrement);

            // Goes forwards
            if (direction === "forward") {
                
                // Moves the slide
                if (slidePosition > -1 * (sliderFullWidth - contentSafeArea)) {
    
                    // Check the current slide page
                    if (currentSlidePage !== totalButtonPress) {
                        setSlidePosition(currentState => currentState - slidePositionIncrement);
                    } else {
                        setSlidePosition(-1 * (sliderFullWidth - contentSafeArea));
                    }
    
                    setCurrentSlidePage(currentState => currentState + 1);

                }
            
            // Goes backwards
            } else if (direction === "backward") {

                if (slidePosition < 0) {
                    
                    if (currentSlidePage !== totalButtonPress) {
                        setSlidePosition(currentState => currentState + slidePositionIncrement);
                    } else {
                        setSlidePosition(0);
                    }

                    setCurrentSlidePage(currentState => currentState - 1);

                }


            }
        }
    }

    // If page resizes
    const pageResize:EventListener = () => {
        setSlidePosition(0);
        setCurrentSlidePage(0);

        return window.removeEventListener("resize", pageResize);
    }

    window.addEventListener("resize", pageResize);

    return (

        <div className={`content ${styles["category-slider"]}`}>
            <h3 className="no-margin">{categoryName}</h3>

            <div className={styles.container} style={{left: slidePosition, transition: "left .5s"}}>
                {
                    moviesList.filter(item => item.categories?.includes(categorySlug)).map((item, index) => {
                        return (
                            <div className={styles["poster-wrapper"]} key={index}>
                                <Poster
                                    link={`movie/${item.slug}`}
                                    src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
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