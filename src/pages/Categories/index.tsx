import Menu from "components/Menu";
import Display from "elements/Display";

export default function Categories () {
    return (
        <>
            <Menu />
            <div className="outer-content-common">
                <div className="content">
                    <Display icon="new_releases" link="#" subtitle="Subtitle">
                        Category
                    </Display>
                </div>
            </div>
        </>
    )
}