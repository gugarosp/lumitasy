import { ReactElement, createContext, useEffect, useState } from "react";

interface categoriesListProps {
    id?: number
    slug?: string
    name?: string
    icon?: string
}

interface categoriesContextType {
    categoriesList: categoriesListProps[];
}

export const CategoriesContext = createContext<categoriesContextType | null>(null);
CategoriesContext.displayName = 'Categories';


interface CategoriesProviderProps {
    children: ReactElement
}

export const CategoriesProvider = ({children}:CategoriesProviderProps) => {

    const [categoriesList, setCategoriesList] = useState<categoriesListProps[]>([{}]);

    useEffect(() => {
        async function categories() {
            const response = await fetch("http://lumitasy.siteseguro.ws/api/categories/");
            const info = await response.text();
            return info;
        }

        categories().then(data => {
            setCategoriesList(JSON.parse(data));
        });

    }, []);

    return (
        <CategoriesContext.Provider value={{ categoriesList }}>
            {children}
        </CategoriesContext.Provider>
    )

}