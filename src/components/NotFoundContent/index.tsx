
import styles from "./NotFoundContent.module.scss"
import SuperMessage from "components/SuperMessage";

export default function NotFoundContent () {
    return (
        <>
            <section className={`${styles["not-found"]} outer-content-common outer-content-full`}>
                <div className={styles.background}></div>
                <div className={styles["outer-content"]}>   
                    <SuperMessage
                        icon="movie"
                        infoText="404 / Page not found"
                        messageTitle="Oh No! The movie is not here!"
                        messageSubtitle={["But don’t worry, just go ", <a href='/'>here</a>, " and watch fantastic movies."]}
                    />
                </div>
            </section>
        </>
    )
}