import logo from "./logo.svg"

import styles from "./MainLogo.module.scss"

export default function MainLogo () {
    return (
        <img className={styles.logo} src={logo} alt="Lumitasy" />
    )
}