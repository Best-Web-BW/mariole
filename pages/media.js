import blocks from "../scss/blocks.module.scss";
import styles from "./media.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function Media() {
    return (
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>О НАС ПИШУТ</h2>
            <div className={styles.row}>
                <div className={styles.elem}>
                    <div className={styles.elem_row_1}>
                        <img src="/images/press/page_1.jpg" alt="" />
                    </div>
                    <div className={styles.elem_row_2}>
                        <Link href="#">
                            <a className={styles.read}>Читать в источнике</a>
                        </Link>
                    </div>
                </div>
                <div className={styles.elem}>
                    <div className={styles.elem_row_1}>
                        <img src="/images/press/_file5afd3e200b21b.jpg" alt="" />
                    </div>
                    <div className={styles.elem_row_2}>
                        <Link href="#">
                            <a className={styles.read}>Читать в источнике</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}