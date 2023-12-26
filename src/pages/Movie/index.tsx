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

    return (
        <>
            <Menu />
            {movieInfo?.title ? 
                <div className="outer-content-common outer-content-full">
                    <div className="content">
                        {movieInfo?.title}
                    </div>
                </div>
            : 
                <NotFoundContent />
            }
        </>
    )
}