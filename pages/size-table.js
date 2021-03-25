import StylableSizeTable from "../components/StylableSizeTable";
import { content_block } from "../scss/blocks.module.scss";
import styles from "./size-table.module.scss";
import cn from "classnames";

export default function SizeTable() {
    return (
        <div className={cn(content_block, styles.page)}>
            <h2 className={styles.page_title}>Таблица размеров</h2>
            <div className={styles.table_wrapper}>
                <StylableSizeTable styles={styles} />
            </div>
        </div>
    );
}