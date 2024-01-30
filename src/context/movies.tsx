import { ReactElement, createContext, useEffect, useState } from "react";

interface moviesListProps {
    id?: number
    slug?: string
    title?: string
    categories?: string
    source?: string
    year?: string
    description?: string
}

interface moviesContextType {
    moviesList: moviesListProps[]
    moviesListLoaded: boolean
}

export const MoviesContext = createContext<moviesContextType | null>(null);
MoviesContext.displayName = 'Movies';

interface MoviesProviderProps {
    children: ReactElement
}

export const MoviesProvider = ({children}:MoviesProviderProps) =>{
    const [moviesList, setMoviesList] = useState<moviesListProps[]>([{}]);
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
