import styles from "./Categories.module.scss"

import Menu from "components/Menu";
import { CategoriesContext } from "context/categories";
import Display from "elements/Display";
import { useContext } from "react";

interface categoriesListProps {
    id: number
    slug: string
    name: string
    icon: string
}

interface categoriesContextType {
    categoriesList: categoriesListProps[];
}

export default function Categories () {

    const { categoriesList } = useContext(CategoriesContext) as categoriesContextType;

    return (
        <>
            <Menu />
            <div className="outer-content-common">
                <div className="content content-page">
                    <h1 className="no-margin">Categories</h1>
                    <div className={styles["categories-list"]}>
                        {
                            categoriesList.map((item, index) => {
                                return (
                                    <Display key={index} icon={item.icon} link={`/category/${item.slug}`}>
                                        {item.name}
                                    </Display>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}