import { ReactElement, createContext, useEffect, useState } from "react";
import { ICategoriesList, categoriesContextType } from "./categoriesTypes";

export const CategoriesContext = createContext<categoriesContextType | null>(null);
CategoriesContext.displayName = 'Categories';

interface CategoriesProviderProps {
    children: ReactElement
}

export const CategoriesProvider = ({children}:CategoriesProviderProps) => {

    const [categoriesList, setCategoriesList] = useState<ICategoriesList[]>([{}]);

    const [categoriesListLoadedError, setCategoriesListLoadedError] = useState<boolean>(false);

    useEffect(() => {
        async function categories() {
            const response = await fetch("http://lumitasy.siteseguro.ws/api/categories/");
            const info = await response.text();
            return info;
        }

        categories().then(data => {
            setCategoriesList(JSON.parse(data));
        }).catch(() => {
            setCategoriesListLoadedError(true);
        });

    }, []);

    return (
        <CategoriesContext.Provider value={{ categoriesList, categoriesListLoadedError }}>
            {children}
        </CategoriesContext.Provider>
    )

}