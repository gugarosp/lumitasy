import Banner from "components/Banner";
import CategorySlider from "components/CategorySlider";
import Menu from "components/Menu";
import { useEffect, useState } from "react";

export default function Home() {

    const [categoriesList, setCategoriesList] = useState<any[]>([]);

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
            <Banner />
            <section className="content-page">
                {
                    categoriesList.map((item, index) => {
                        return (
                            <CategorySlider key={index} categoryName={item.name} categorySlug={item.slug} />
                        )
                    })
                }
            </section>
        </>
    )
}