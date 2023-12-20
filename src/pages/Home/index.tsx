import Banner from "components/Banner";
import CategorySlider from "components/CategorySlider";
import Menu from "components/Menu";

export default function Home () {
    return (
        <>
            <Menu />
            <Banner />
            <section>
                <div className="content">
                    <CategorySlider />
                </div>
            </section>
        </>
    )
}