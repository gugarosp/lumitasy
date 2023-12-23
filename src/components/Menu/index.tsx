import LumitasyLogo from "elements/LumitasyLogo";
import MenuItem from "elements/MenuItem";

import styles from "./Menu.module.scss"
import { useState } from "react";

export default function Menu () {
    const menuItems = [
        {link: "/search",name: "Search"},
        {link: "/categories", name: "Categories"},
        {link: "/watch-later", name: "Watch Later"},
        {link: "/about", name: "About"}
    ]

    const [menuScrolled, setMenuScrolled] = useState('');

    window.addEventListener("scroll", () => {
        window.scrollY > 50 ? setMenuScrolled(styles["menu-scrolled"]) : setMenuScrolled('');
    });

    return (
        <section className={`${styles.menu} ${menuScrolled}`}>
            <div className={ `content ${styles["menu-wrapper"]}` }>
                <div className={styles["menu-logo"]}>
                    <a href="/">
                        <LumitasyLogo />
                    </a>
                </div>
                <nav>
                    <ul>
                        <>
                            {menuItems.map((item, index) => <li key={index}><MenuItem link={item.link}>{item.name}</MenuItem></li>)}
                        </>
                    </ul>
                </nav>
            </div>
        </section>
    )
}