export interface ICategoriesList {
    id?: number
    slug?: string
    name?: string
    icon?: string
}

export interface categoriesContextType {
    categoriesList: ICategoriesList[];
    categoriesListLoadedError: boolean
}