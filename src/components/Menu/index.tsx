import LumitasyLogo from "elements/LumitasyLogo";
import MenuItem from "elements/MenuItem";

import styles from "./Menu.module.scss"

export default function Menu () {
    const menuItems = [
        {link: "/search",name: "Search"},
        {link: "/categories", name: "Categories"},
        { link: "/watch-later", name: "Watch Later"},
        { link: "/about", name: "About"}
    ]

    return (
        <section className={styles.menu}>
            <div className={ `content ${styles["menu-wrapper"]}` }>
                <div className={styles["menu-logo"]}>
                    <LumitasyLogo />
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