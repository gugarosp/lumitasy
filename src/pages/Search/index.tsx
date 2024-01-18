import styles from "./Search.module.scss"

import Menu from "components/Menu";
import { useContext, useState } from "react";
import { MoviesContext } from "context/movies";
import Poster from "elements/Poster";
import Input from "elements/Input";

interface MovieContextProps {
    moviesList: {
        title: string,
        slug: string,
        categories: string
        year: string
        description: string
    }[];
}

export default function Search() {

    // Movie list
    const { moviesList }: MovieContextProps = useContext(MoviesContext);

    // Search word
    const [searchWord, setSearchWord] = useState("");

    function typingEvent(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchWord(event.target.value);
    }

    // Search result
    const searchResult = moviesList.filter(item => item.title.toLowerCase().includes(searchWord));

    return (
        <>
            <Menu />
            <section className={`${styles.search} outer-content-common`}>
                <div className={`${styles.input} content`} key="search-input">
                    <Input placeholder="Search" typing={(event) => typingEvent(event)} />
                </div>

                <div className={`content`}>
                    {
                        searchWord === "" ?
                            <></>
                        : searchResult.length !== 0 ?
                            <div className={styles.result}>
                                {
                                    searchResult.map((item, index) => {
                                        return (
                                            <Poster
                                                key={index}
                                                link={`movie/${item.slug}`}
                                                src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
                                                title={item.title}
                                            />
                                        )
                                    })
                                }
                            </div>
                        : 
                            <div className={styles["no-result"]}>
                                No movie found
                            </div>
                    }
                </div>
            </section>
        </>
    )
}