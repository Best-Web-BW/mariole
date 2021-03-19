import { getMenuItem } from "../components/MenuItemGenerator";
import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import styles from "./favorite.module.scss";
import lorem from "../utils/lorem";
import Select from "react-select";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export default function Favorite() {
    return (<>
        <Head>
            <title>Mariole</title>
            <meta name="description" content={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                In blandit turpis non tincidunt semper. Nulla ut lorem fringilla, 
                accumsan dolor non, luctus lacus. Aliquam a tempor arcu. 
                Sed auctor, ex vel interdum consectetur, justo nisl malesuada 
                mauris, at cursus tortor nulla ut mi. Suspendisse convallis, 
                diam a lobortis tempus, lectus nunc laoreet metus, vel dignissim 
                nibh arcu in ligula. Aenean ac aliquet tellus, eget vestibulum neque. 
                Mauris dui tortor, lobortis at leo eu, gravida pellentesque tellus. 
                In iaculis nunc interdum sagittis hendrerit. Etiam faucibus dui et sapien 
                dictum, nec aliquam nibh pulvinar. Donec vehicula sem dolor, a ornare dui eleifend.
            `} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={cn(blocks.main_block, styles.page)}>
                <h2 className={cn(blocks.block_title, styles.title)}>Избранное</h2>
                <div className={styles.favorite_row}>
                    <div className={styles.favorite_elem}>
                        <ProductCard/>
                        <button className={styles.delete_button}>Удалить</button>
                    </div>
                    <div className={styles.favorite_elem}>
                        <ProductCard/>
                        <button className={styles.delete_button}>Удалить</button>
                    </div>
                    <div className={styles.favorite_elem}>
                        <ProductCard/>
                        <button className={styles.delete_button}>Удалить</button>
                    </div>
                    <div className={styles.favorite_elem}>
                        <ProductCard/>
                        <button className={styles.delete_button}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}