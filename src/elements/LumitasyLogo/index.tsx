import logo from "./lumitasy.svg"

import styles from "./LumitasyLogo.module.scss"

export default function LumitasyLogo () {
    return (
        <img className={styles.logo} src={logo} alt="Lumitasy" />
    )
}