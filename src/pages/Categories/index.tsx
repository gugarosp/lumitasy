import styles from "./Categories.module.scss"

import Menu from "components/Menu";
import Display from "elements/Display";
import { CategoriesContext } from "context/categories";
import { useContext } from "react";
import { categoriesContextType } from "context/categoriesTypes";

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
                            categoriesList.length > 1 ?
                                categoriesList.map((item, index) => {
                                    return (
                                        <Display key={index} icon={item.icon} link={`/category/${item.slug}`}>
                                            {item.name}
                                        </Display>
                                    )
                                })
                            : 
                                ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}