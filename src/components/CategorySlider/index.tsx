import styles from "./CategorySlider.module.scss"

import Poster from "elements/Poster";

import { MoviesContext } from "context/movies";

interface CategorySliderProps {
    categoryName: string;
    categorySlug: string;
}

interface MovieContextProps {
    moviesList: any[];
}

export default function CategorySlider({ categoryName, categorySlug }: CategorySliderProps) {
    return (

        <MoviesContext.Consumer>
            {({moviesList}:MovieContextProps) => {
                return (
                    <div className={`content ${styles["category-slider"]}`}>
                    <h3 className="no-margin">{categoryName}</h3>

                    <div className={styles["category-slider-container"]}>
                        {
                            moviesList.filter(item => item.categories.includes(categorySlug)).map((item, index) => {
                            return (
                                <Poster key={index} src={`movie/${item.slug}`} link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                                )
                            })
                        }
                    </div>

                    </div>
                )
            }}
        </MoviesContext.Consumer>
    )
}