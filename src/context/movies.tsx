import { ReactElement, createContext, useEffect, useState } from "react";


export const MoviesContext:any = createContext<moviesListProps | null>(null);

interface moviesListProps {
    id: number
    slug: string
    title: string
    categories: string
    source: string
}

interface MoviesProviderProps {
    children: ReactElement
}

export const MoviesProvider = ({children}:MoviesProviderProps) =>{
    const [moviesList, setMoviesList] = useState<moviesListProps[]>([]);

    useEffect(() => {
        async function movies() {
            const response = await fetch("http://lumitasy.siteseguro.ws/api/movies/");
            const info = await response.text();
            return info;
        }
  
        movies().then(data => {
          setMoviesList(JSON.parse(data));
        });
  
    }, []);

    return (
        <MoviesContext.Provider value={{ moviesList }}>
            {children}
        </MoviesContext.Provider>
    )
}
