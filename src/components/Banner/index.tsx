import { Fragment, useState } from "react"
import styles from "./Banner.module.scss"
import robot from "./robot.png"

export default function Banner () {
    const bannerObject = [
        {
            "movie": "OMG",
            "slug": "omg",
            "background": "https://images.unsplash.com/photo-1708439218339-b423ca4965d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDQ0OTQzOA&ixlib=rb-4.0.3&q=80&w=1080",
            "logo": "http://lumitasy.siteseguro.ws/images/movies/logos/metropolis.png",
            "description": "omg",
            "active": true
        },
        {
            "movie": "Loko",
            "slug": "loko",
            "background": "https://images.unsplash.com/photo-1708533548085-4d869ab08486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDQ1MDY5MA&ixlib=rb-4.0.3&q=80&w=1080",
            "logo": "http://lumitasy.siteseguro.ws/images/movies/logos/metropolis.png",
            "description": "Loko",
            "active": false
        },
        {
            "movie": "Metropolis",
            "slug": "metropolis",
            "background": "http://lumitasy.siteseguro.ws/images/banner/background-1.png", 
            "logo": "http://lumitasy.siteseguro.ws/images/movies/logos/metropolis.png",
            "description": "In a futuristic city, a man falls in love with a woman who predicts the coming of a savior to mediate the class differences.",
            "active": false
        }
    ]
    const [bannerList, setBannerList] = useState(bannerObject);
    const [movieUrl, setMovieUrl] = useState("/");

    function pagination (index:number) {
        bannerList.map(item => item.active = false);
        bannerList[index].active = true;

        setBannerList([...bannerList]);
        setMovieUrl(`/movie/${bannerList[index].slug}`)
    }

    return (
        <section className={styles.banner}>
            <div className={styles.caroussel}>
                <div className={styles.container}>
                    <div className={styles.background}>
                    {
                        bannerList.map((item, index) => {
                            return(
                                <img
                                    key={index}
                                    className={item.active === true ? styles["background-active"] : ""}
                                    src={item.background}
                                    alt={item.movie}/>
                            )
                        })
                    }
                    </div>
                </div>

                <div className={styles.shadows}></div>

                <a href={movieUrl} className={`${styles.container} ${styles["info-container"]}`}>

                    {
                        bannerList.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={`${styles["movie-info"]} ${item.active === true ? styles["movie-info-active"] : ""}`}>
                                        <div className={styles["movie-logo"]}>
                                            <img src={item.logo} alt={item.movie} />
                                        </div>
                                        <p>
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className={`${styles["featured-image"]} ${item.active === true ? styles["featured-image-active"] : ""}`}>
                                        <img src={robot} alt={item.movie} />
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </a>
            </div>

            <div className={styles.pagination}>
                {
                    bannerList.map((item, index) => {
                        return(
                            <span key={index} onClick={() => pagination(index)}>
                                &nbsp;
                                [{index}]
                                &nbsp;
                            </span>
                        )
                    })
                }
            </div>
        </section>
    )
}