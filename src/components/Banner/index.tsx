import styles from "./Banner.module.scss"

export default function Banner () {
    return (
        <section className={styles.banner}>
            <div className={styles["banner-caroussel"]}>
                <div className={styles["banner-container"]}>
                    <div className={styles["banner-background"]}>
                        <img
                            
                            src="http://lumitasy.siteseguro.ws/images/banner/background-1.png"
                            alt="background"/>
                    </div>
                </div>
            </div>
            <div className={styles["banner-shadows"]}>

            </div>
        </section>
    )
}