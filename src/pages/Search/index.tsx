import styles from "./Search.module.scss"

import Menu from "components/Menu";
import { useContext, useState } from "react";
import { MoviesContext } from "context/movies";
import Poster from "elements/Poster";
import Input from "elements/Input";
import SuperMessage from "components/SuperMessage";

interface moviesListProps {
    id?: number
    slug?: string
    title?: string
    categories?: string
    source?: string
    year?: string
    description?: string
}

interface moviesContextType {
    moviesList: moviesListProps[];
}

export default function Search() {

    // Movie list
    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    // Search word
    const [searchWord, setSearchWord] = useState("");

    function typingEvent(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchWord(event.target.value);
    }

    // Search result
    const searchResult = moviesList.filter(item => item.title?.toLowerCase().includes(searchWord));

    return (
        <>
            <Menu />
            <section className={`${styles.search} outer-content-common`}>
                <div className={`${styles.input} content`} key="search-input">
                    <Input placeholder="Search" typing={(event) => typingEvent(event)} />
                </div>

                <div className="content">
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
                                                title={item.title !== undefined ? item.title : ""}
                                            />
                                        )
                                    })
                                }
                            </div>
                        : 
                            <SuperMessage 
                                icon="sentiment_sad"
                                infoText="Sorry! We didn’t find your movie"
                                messageTitle={`No result for "${searchWord}"`}
                                messageSubtitle="Try again" />
                    }
                </div>
            </section>
        </>
    )
}