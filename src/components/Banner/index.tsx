import { Fragment, useEffect, useRef, useState } from "react"
import styles from "./Banner.module.scss"
import PaginationItem from "elements/PaginationItem";

 interface BannerList {
    movie?: string
    slug?: string
    background?: string
    logo?: string
    description?: string
    active?: boolean
}

export default function Banner () {
    const [bannerList, setBannerList] = useState<BannerList[]>([]);
    const [movieUrl, setMovieUrl] = useState(`/categories`);

    useEffect(() => {
        async function categories() {
            const response = await fetch("http://lumitasy.siteseguro.ws/api/banner/");
            const info = await response.text();
            return info;
        }

        categories().then(data => {
            setBannerList(JSON.parse(data));
            setMovieUrl(`/movie/${JSON.parse(data)[0].slug}`);
        });

    }, []);


    function pagination (index:number) {
        bannerList.map(item => item.active = false);
        bannerList[index].active = true;

        setBannerList([...bannerList]);
        setMovieUrl(`/movie/${bannerList[index].slug}`)
    }

    const startTouchPosition = useRef<number>()
    const endTouchPosition = useRef<number>();

    function startTouch (event:React.TouchEvent<HTMLAnchorElement>) {
        startTouchPosition.current = event.touches[0].clientX;
    }

    function moveTouch (event:React.TouchEvent<HTMLAnchorElement>) {
        endTouchPosition.current = event.touches[0].clientX;
    }

    function endTouch () {
       
        const currentPage = bannerList.map(e => e.active).indexOf(true);
        const lastPage = bannerList.length - 1;
        
        if (startTouchPosition?.current && endTouchPosition?.current) {
            if (currentPage !== 0 && startTouchPosition.current <= endTouchPosition.current) {
                pagination(currentPage - 1);
            }

            if ((currentPage !== lastPage) && startTouchPosition.current >= endTouchPosition.current) {
                pagination(currentPage + 1);
            }
        }
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

                <a 
                    href={movieUrl}
                    className={`${styles.container} ${styles["info-container"]}`}
                    onTouchStart={event => startTouch(event)}
                    onTouchMove={event => moveTouch(event)}
                    onTouchEnd={() => endTouch()}
                >

                    {
                        bannerList.length !== 0 ? bannerList.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={`${styles["movie-info"]} ${item.active === true ? styles["movie-info-active"] : ""}`}>
                                        <div className={styles["movie-logo"]}>
                                            <img src={item.logo} alt={item.movie} />
                                        </div>
                                        <p className="resp-subtitle">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className={`${styles["featured-image"]} ${item.active === true ? styles["featured-image-active"] : ""}`}>
                                        <img src={item.background} alt={item.movie} />
                                    </div>
                                </Fragment>
                            )
                        }) : ""
                    }
                    
                </a>
            </div>

            <div className={styles.pagination}>
                {
                    bannerList.map((item, index) => {
                        return(
                            <Fragment key={index}>
                                <PaginationItem status={item.active} action={() => pagination(index)}/>
                            </Fragment>
                        )
                    })
                }
            </div>
        </section>
    )
}