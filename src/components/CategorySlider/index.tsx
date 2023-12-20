import styles from "./CategorySlider.module.scss"

import Poster from "elements/Poster";

export default function CategorySlider () {
    return (
        <div className={`content ${styles["category-slider"]}`}>
            <h3 className="no-margin">Category</h3>

            <div className={styles["category-slider-container"]}>
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
                <Poster src="#" link="http://lumitasy.siteseguro.ws/images/movies/posters/poster-1.png" />
            </div>
        </div>
    )
}