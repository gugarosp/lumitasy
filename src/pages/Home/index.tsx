import Banner from "components/Banner";
import CategorySlider from "components/CategorySlider";
import Menu from "components/Menu";
import { CategoriesContext } from "context/categories";
import { useContext } from "react";
import { categoriesContextType } from "context/categoriesTypes";

export default function Home() {

    const { categoriesList } = useContext(CategoriesContext) as categoriesContextType;

    return (
        <>
            <Menu />
            <Banner />
            <section className="outer-content">
                {
                    categoriesList.map((item, index) => {
                        return (
                            <div key={index}>
                                <CategorySlider categoryName={item.name} categorySlug={item.slug} />
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}