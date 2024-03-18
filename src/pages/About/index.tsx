import Display from "elements/Display";
import styles from "./About.module.scss"

import Menu from "components/Menu";

export default function About() {
    return (
        <>
            <Menu />
            <div className={`${styles.about} outer-content-common`}>
                <div className="content content-page">
                    <h1 className="no-margin">About</h1>
                    <p>
                        Lumitasy is a solo project by the Frontend Developer and UX Designer Gustavo Pereira. If you
                        wish to contact me, please, visit my profile on LinkedIn.
                    </p>
                    <div className={styles["about-list"]}>
                        <Display link="https://linkedin.com/in/gugarosp" target="_blank" subtitle="linkedin.com/in/gugarosp">
                            LinkedIn
                        </Display>
                    </div>
                </div>
            </div>
        </>
    )
}