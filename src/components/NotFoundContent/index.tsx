import Icon from "elements/Icon";
import styles from "./NotFoundContent.module.scss"

import Menu from "components/Menu";

export default function NotFoundContent () {
    return (
        <>
            <Menu />
            <section className={`${styles["not-found"]} outer-content-common outer-content-full`}>
                <div className={styles["not-found-background"]}></div>
                <div className={styles["not-found-outer-content"]}>
                    <div className={`${styles["not-found-inner-content"]} content`}>
                        <div className={styles["not-found-error"]}>
                            <div className={styles["not-found-icon"]}>
                                <Icon>movie</Icon>
                            </div>
                            <h2 className="title-alternative no-margin">
                                404 / Page not found
                            </h2>
                        </div>

                        <div className={styles["not-found-message"]}>
                            <h2 className="no-margin">Oh No! The movie is not here!</h2>
                            <p className="no-margin">But don’t worry, just go <a href="/">here</a> and watch fantastic movies.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}