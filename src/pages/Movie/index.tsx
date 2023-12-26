import Menu from "components/Menu";
import NotFoundContent from "components/NotFoundContent";
import { MoviesContext } from "context/movies";
import { useContext } from "react";

interface MovieContextProps {
    moviesList: {
        title: string,
        slug:string,
        categories: string}[];
}

export default function Movie () {

    const movieSlug = window.location.href.split("movie/")[1];

    const { moviesList }:MovieContextProps = useContext(MoviesContext);

    const movieInfo = moviesList.filter(item => item.slug === movieSlug)[0];

    document.title = movieInfo?.title !== undefined ? `${movieInfo.title} | Lumitasy` : "Lumitasy";

    return (
        <>
            <Menu />
            {
            movieInfo?.title !== undefined
            ? 
                <div className="outer-content-common outer-content-full">
                    <div className="content">
                        {movieInfo?.title}
                    </div>
                </div>
            : moviesList[0] !== undefined && movieInfo?.title === undefined ? 
                <NotFoundContent />

            : ""
            }
        </>
    )
}