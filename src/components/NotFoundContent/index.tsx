import Icon from "elements/Icon";
import styles from "./NotFoundContent.module.scss"

export default function NotFoundContent () {
    return (
        <>
            <section className={`${styles["not-found"]} outer-content-common outer-content-full`}>
                <div className={styles.background}></div>
                <div className={styles["outer-content"]}>
                    <div className={`${styles["inner-content"]} content`}>
                        <div className={styles.error}>
                            <div className={styles.icon}>
                                <Icon>movie</Icon>
                            </div>
                            <h2 className="title-alternative no-margin">
                                404 / Page not found
                            </h2>
                        </div>

                        <div className={styles.message}>
                            <h2 className="no-margin">Oh No! The movie is not here!</h2>
                            <p className="no-margin">But don’t worry, just go <a href="/">here</a> and watch fantastic movies.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}