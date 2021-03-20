import blocks from "../scss/blocks.module.scss";
import styles from "./media.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function Media() {
    return (
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>О НАС ПИШУТ</h2>
            <div className={styles.row}>
                <ContentBlock image="/images/press/page_1.jpg" link="#" />
                <ContentBlock image="/images/press/_file5afd3e200b21b.jpg" link="#" />
            </div>
        </div>
    );
}

function ContentBlock({ image, link }) {
    return (
        <div className={styles.elem}>
            <div className={styles.elem_row_1}>
                <img src={image} alt="" />
            </div>
            <div className={styles.elem_row_2}>
                <Link href={link}>
                    <a className={styles.read}>Читать в источнике</a>
                </Link>
            </div>
        </div>
    );
}