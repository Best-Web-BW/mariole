import blocks from "../scss/blocks.module.scss";
import styles from "./size-table.module.scss";
import lorem from "../utils/lorem";
import Select from "react-select";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export default function SizeTable() {
    return (<>
        <div className={blocks.content_body}>
            <div className={cn(blocks.content_block, styles.page)}>
                <h2 className={styles.page_title}>Таблица размеров</h2>
                <div className={styles.table_wrapper}>
                    <table>
                        <thead>
                            <tr>
                                <td className={styles.row_title}>Mario'le</td>
                                <td className={styles.col_title}>XS</td>
                                <td className={styles.col_title}>S</td>
                                <td className={styles.col_title}>M</td>
                                <td className={styles.col_title}>L</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.row_title}>Объем груди (см)</td>
                                <td>84</td>
                                <td>88</td>
                                <td>92</td>
                                <td>96</td>
                            </tr>
                            <tr>
                                <td className={styles.row_title}>Объем талии (см)</td>
                                <td>64</td>
                                <td>68</td>
                                <td>72</td>
                                <td>76</td>
                            </tr>
                            <tr>
                                <td className={styles.row_title}>Объем бедер (см)</td>
                                <td>88</td>
                                <td>92</td>
                                <td>96</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td className={styles.row_title}>Италия</td>
                                <td>38</td>
                                <td>40</td>
                                <td>42</td>
                                <td>44</td>
                            </tr>
                            <tr>
                                <td className={styles.row_title}>Франция</td>
                                <td>36</td>
                                <td>38</td>
                                <td>40</td>
                                <td>42</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}