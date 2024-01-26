import { ReactElement } from "react"
import styles from "./SuperMessage.module.scss"

import Icon from "elements/Icon"

interface SuperMessageProps {
    icon: string
    infoText: string
    messageTitle: string
    messageSubtitle: string | ReactElement | (string | ReactElement)[]
}

export default function SuperMessage({icon, infoText, messageTitle, messageSubtitle}:SuperMessageProps) {

    return (
        <div className={styles["super-message"]}>
            <div className={styles.info}>
                <div className={styles.icon}>
                    <Icon>{icon}</Icon>
                </div>
                <h2 className="title-alternative no-margin">
                    {infoText}
                </h2>
            </div>

            <div className={styles.message}>
                <h2 className="no-margin">{messageTitle}</h2>
                <p className="no-margin">{messageSubtitle}</p>
            </div>
        </div>
    )
}