import styles from "./Search.module.scss"

import Menu from "components/Menu";
import { useContext } from "react";
import { MoviesContext } from "context/movies";
import Poster from "elements/Poster";
import Input from "elements/Input";

interface MovieContextProps {
    moviesList: {
        title: string,
        slug:string,
        categories: string
        year: string
        description: string
    }[];
}

export default function Search () {

    const { moviesList }:MovieContextProps = useContext(MoviesContext);

    return (
        <>
            <Menu />
            <section className={`${styles.search} outer-content-common`}>
                <div className="content">
                    <Input />
                </div>
                
                <div className={`${styles.content} content`}>
                    
                    {
                        moviesList.map((item, index) => {
                            return (
                                <>
                                    <Poster
                                        key={index}
                                        link={`movie/${item.slug}`}
                                        src={`http://lumitasy.siteseguro.ws/images/movies/posters/${item.slug}.png`}
                                        title={item.title}
                                    />
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}