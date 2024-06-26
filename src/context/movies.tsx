import { ReactElement, createContext, useEffect, useState } from "react";
import { IMoviesList, moviesContextType } from "./moviesTypes";

export const MoviesContext = createContext<moviesContextType | null>(null);
MoviesContext.displayName = 'Movies';

interface MoviesProviderProps {
    children: ReactElement
}

export const MoviesProvider = ({children}:MoviesProviderProps) =>{
    const [moviesList, setMoviesList] = useState<IMoviesList[]>([{}]);
    const [moviesListLoaded, setMoviesListLoaded] = useState<boolean>(false);

    const [moviesListLoadedError, setMoviesListLoadedError] = useState<boolean>(false);

    useEffect(() => {
        async function movies() {
            const response = await fetch("https://lumitasy-resources.vercel.app/api/movies/index.json");
            const info = await response.text();
            return info;
        }
  
        movies().then(data => {
          setMoviesList(JSON.parse(data).sort(() => Math.random() - 0.5));
          setMoviesListLoaded(true);
        }).catch(() => {
            setMoviesListLoadedError(true);
        });
  
    }, []);

    return (
        <MoviesContext.Provider value={{ moviesList, moviesListLoaded, moviesListLoadedError }}>
            {children}
        </MoviesContext.Provider>
    )
}
