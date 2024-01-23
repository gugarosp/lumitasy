import Menu from "components/Menu";
import Display from "elements/Display";

export default function Categories () {
    return (
        <>
            <Menu />
            <div className="outer-content-common">
                <div className="content">
                    <Display>
                        Category
                    </Display>

                    <Display subtitle="Subtitle">
                        Category
                    </Display>

                    <Display icon="new_releases">
                        Category
                    </Display>

                    <Display icon="new_releases" subtitle="Subtitle">
                        Category
                    </Display>
                </div>
            </div>
        </>
    )
}