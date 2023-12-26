import styles from "./CategorySlider.module.scss"

import Poster from "elements/Poster";

import { MoviesContext } from "context/movies";
import { useContext } from "react";

interface CategorySliderProps {
    categoryName: string;
    categorySlug: string;
}

interface MovieContextProps {
    moviesList: {
        title: string,
        slug:string,
        categories: string}[];
}


export default function CategorySlider({ categoryName, categorySlug }: CategorySliderProps) {
    const { moviesList }:MovieContextProps = useContext(MoviesContext);

    return (
        
        <div className={`content ${styles["category-slider"]}`}>
        <h3 className="no-margin">{categoryName}</h3>

        <div className={styles.container}>
            {
                moviesList.filter(item => item.categories.includes(categorySlug)).map((item, index) => {
                return (
                        <Poster
                            key={index}
                            link={`movie/${item.slug}`}
                            src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
                            title={item.title}
                        />
                    )
                })
            }
        </div>

        </div>

    )
}