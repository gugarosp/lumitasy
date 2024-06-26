import styles from "./Search.module.scss"

import Menu from "components/Menu";
import { useContext, useState } from "react";
import { MoviesContext } from "context/movies";
import Input from "elements/Input";
import SuperMessage from "components/SuperMessage";
import PosterList from "components/PosterList";
import { moviesContextType } from "context/moviesTypes";

export default function Search() {

    // Movie list
    const { moviesList } = useContext(MoviesContext) as moviesContextType;

    // Search word
    const [searchWord, setSearchWord] = useState("");

    function typingEvent(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchWord(event.target.value);
    }

    // Search result
    const searchResult = moviesList.filter(item => item.title?.includes(searchWord) || 
                                                   item.title?.toLowerCase().includes(searchWord.toLowerCase()) || 
                                                   item.title?.toUpperCase().includes(searchWord.toUpperCase()));

    // Page title
    document.title = `Search | Lumitasy`;
    
    // Meta tags
    document.querySelector("meta[name='title']")?.setAttribute("content", "Search | Lumitasy");
    document.querySelector("meta[name='description']")?.setAttribute("content", "Search for the most classic public domain movies");
    
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
                            
                            <PosterList movieList={searchResult} />

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