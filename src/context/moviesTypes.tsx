export interface IMoviesList {
    id?: number
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