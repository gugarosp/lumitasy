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

    useEffect(() => {
        async function movies() {
            const response = await fetch("http://lumitasy.siteseguro.ws/api/movies/");
            const info = await response.text();
            return info;
        }
  
        movies().then(data => {
          setMoviesList(JSON.parse(data));
          setMoviesListLoaded(true);
        });
  
    }, []);

    return (
        <MoviesContext.Provider value={{ moviesList, moviesListLoaded }}>
            {children}
        </MoviesContext.Provider>
    )
}
