import styles from "./Categories.module.scss"

import Menu from "components/Menu";
import Display from "elements/Display";
import { useEffect, useState } from "react";

interface categoriesListProps {
    id: number
    slug: string
    name: string
    icon: string
}

export default function Categories () {

    const [categoriesList, setCategoriesList] = useState<categoriesListProps[]>([]);

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