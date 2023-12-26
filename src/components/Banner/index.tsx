import styles from "./Banner.module.scss"

export default function Banner () {
    return (
        <section className={styles.banner}>
            <div className={styles.caroussel}>
                <div className={styles.container}>
                    <div className={styles.background}>
                        <img
                            
                            src="http://lumitasy.siteseguro.ws/images/banner/background-1.png"
                            alt="background"/>
                    </div>
                </div>
            </div>
            <div className={styles.shadows}>

            </div>
        </section>
    )
}