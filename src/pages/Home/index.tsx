import Banner from "components/Banner";
import CategorySlider from "components/CategorySlider";
import Menu from "components/Menu";
import { CategoriesContext } from "context/categories";
import { useContext } from "react";

interface categoriesListProps {
    categoriesList: {
        id: number
        slug: string
        name: string
        icon: string
    }[]
}

export default function Home() {

    const { categoriesList }:categoriesListProps = useContext(CategoriesContext);

    return (
        <>
            <Menu />
            <Banner />
            <section className="outer-content">
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