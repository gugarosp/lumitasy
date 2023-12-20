import Banner from "components/Banner";
import CategorySlider from "components/CategorySlider";
import Menu from "components/Menu";

export default function Home () {
    return (
        <>
            <Menu />
            <Banner />
            <section className="content-page">
                <CategorySlider />
                <CategorySlider />
            </section>
        </>
    )
}