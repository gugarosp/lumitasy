import Menu from "components/Menu";
import PosterList from "components/PosterList";
import { useContext } from "react";
import { MoviesContext } from "context/movies";
import { IMoviesList, moviesContextType } from "context/moviesTypes";
import SuperMessage from "components/SuperMessage";

export default function WatchLater () {

    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    const watchLaterIds = JSON.parse(localStorage.getItem("watch-later") || "[]");

    const watchLaterList:IMoviesList[] = [];
    
    watchLaterIds.forEach((i:number, index:number) => {
        let retrievedMovieSlug = moviesList.filter(item => item.id === watchLaterIds[index])[0];
        if (retrievedMovieSlug) {
            watchLaterList.push(retrievedMovieSlug);
        }
    });

    return (
        <>
            <Menu />
            <div className="outer-content-common">
                <div className="content content-page">
                    <h1 className="no-margin">Watch Later</h1>
                    <div>
                        {
                            watchLaterIds.length > 0 
                            ?
                            <PosterList movieList={watchLaterList} showDeleteButton={true}/>
                            :
                            <SuperMessage
                                icon="theaters"
                                infoText="No Movies Added"
                                messageTitle="You didn't add any movie to your Watch Later list"
                                messageSubtitle={["It's easy! Find any movie you would like to watch and hit the Watch Later button"]}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}