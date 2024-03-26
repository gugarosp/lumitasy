import styles from "./ScreenBlocker.module.scss"

import SuperMessage from "components/SuperMessage"

import { useContext } from "react";
import { MoviesContext } from "context/movies";
import { moviesContextType } from "context/moviesTypes";
import { categoriesContextType } from "context/categoriesTypes";
import { CategoriesContext } from "context/categories";

export default function ScreenBlocker () {
    
    const { moviesListLoadedError } = useContext(MoviesContext) as moviesContextType;

    const { categoriesListLoadedError } = useContext(CategoriesContext) as categoriesContextType;
    
    if (moviesListLoadedError === true || categoriesListLoadedError === true) {
        document.querySelector("#root")?.classList.add("screen-blocker-error");
    }

    return (
        <>
            {moviesListLoadedError === true || categoriesListLoadedError === true ?
                <div className={`${styles["screen-blocker"]} outer-content-common outer-content-full`}>
                    <SuperMessage
                        icon="thunderstorm"
                        infoText="An error occurred"
                        messageTitle="We are very sorry for this"
                        messageSubtitle="Please, reload the page and try again"
                        />
                </div>
                : ""
            }
        </>
    )
}