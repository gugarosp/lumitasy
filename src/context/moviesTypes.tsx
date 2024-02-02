export interface IMoviesList {
    id?: string
    slug?: string
    title?: string
    categories?: string
    source?: string
    year?: string
    description?: string
}

export interface moviesContextType {
    moviesList: IMoviesList[]
    moviesListLoaded: boolean
}