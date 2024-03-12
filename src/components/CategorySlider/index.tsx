import styles from "./CategorySlider.module.scss"

import Poster from "elements/Poster";
import { MoviesContext } from "context/movies";
import { useContext } from "react";
import { moviesContextType } from "context/moviesTypes";
import Button from "elements/Button";

interface CategorySliderProps {
    categoryName?: string
    categorySlug?: string
}

export default function CategorySlider({ categoryName = "", categorySlug = "" }: CategorySliderProps) {
    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    return (

        <div className={`content ${styles["category-slider"]}`}>
            <h3 className="no-margin">{categoryName}</h3>

            <div className={styles.container}>
                {
                    moviesList.filter(item => item.categories?.includes(categorySlug)).map((item, index) => {
                        return (
                            <Poster
                                key={index}
                                link={`movie/${item.slug}`}
                                src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
                                title={item.title !== undefined ? item.title : ""}
                            />
                        )
                    })
                }
            </div>

            <div className={styles["slide-return"]}>
                <Button icon="arrow_back_ios_new" size="extra-large" />
            </div>

            <div className={styles["slide-forward"]}>
                <Button icon="arrow_forward_ios" size="extra-large" />
            </div>

        </div>

    )
}