import Menu from "components/Menu";
import PosterList from "components/PosterList";
import { useContext } from "react";
import { MoviesContext } from "context/movies";
import { moviesContextType } from "context/moviesTypes";
import { CategoriesContext } from "context/categories";
import { categoriesContextType } from "context/categoriesTypes";

export default function Category () {

    const categorySlug = window.location.href.split("category/")[1];

    // Categories List
    const { categoriesList } = useContext(CategoriesContext) as categoriesContextType;

    // Category Name
    const categoryName = categoriesList.length > 1 
        ? categoriesList.filter(item => item.name?.toLowerCase().includes(categorySlug))[0].name
        : ""

    // Movie list
    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    // List result
    const listResult = moviesList.filter(item => item.categories?.toLowerCase().includes(categorySlug));

    return (
        <>
            <Menu />
            <div className="outer-content-common">
                <div className="content content-page">
                    <h1 className="no-margin">{categoryName}</h1>
                    <div>
                        <PosterList movieList={listResult} />
                    </div>
                </div>
            </div>
        </>
    )
}