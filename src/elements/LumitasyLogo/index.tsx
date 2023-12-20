import logo from "./lumitasy.svg"

import styles from "./LumitasyLogo.module.scss"

export default function LumitasyLogo () {
    return (
        <a href="/" className={styles.logo}>
            <img src={logo} />
        </a>
    )
}