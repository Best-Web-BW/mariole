import Head from "next/head";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import blocks from "../scss/blocks.module.scss";
import styles from "./index.module.scss";
import Product from "../components/product_card";

export default function Index() {
    
    const [opened, menuOpen] = useState(false);
    const [active, addActive] = useState(false);

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
            {/* header */}
            {/* <Header/> */}
            {/* header end */}
            <div className={cn(blocks.main_block, styles.first_block)}>
                <img src="/images/blocks/FullSizeRender1.jpg" alt=""/>
                <Link href="#">
                    <a className={blocks.absolute_link}>
                        <button>НАЧАТЬ ШОПИНГ</button>
                    </a>
                </Link>
            </div>
            <div className={blocks.content_block}>
                <div className={styles.about_area}>
                    <div className={cn(blocks.row, styles.row)}>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laboriosam consequatur 
                            molestiae suscipit accusantium excepturi! Doloremque officiis ullam unde perferendis!</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laboriosam consequatur 
                            molestiae suscipit accusantium excepturi! Doloremque officiis ullam unde perferendis!</p>
                    </div>
                    <div className={cn(blocks.column, styles.column)}>
                        <img src="/images/blocks/mario_le-1684.jpg" alt=""/>
                    </div>
                    <div className={cn(blocks.column, styles.column)}>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laboriosam consequatur 
                            molestiae suscipit accusantium excepturi! Doloremque officiis ullam unde perferendis!</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laboriosam consequatur 
                            molestiae suscipit accusantium excepturi! Doloremque officiis ullam unde perferendis!</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laboriosam consequatur 
                            molestiae suscipit accusantium excepturi! Doloremque officiis ullam unde perferendis!</p>
                    </div>
                </div>
            </div>
            <div className={blocks.content_block}>
                <div className={styles.products_block}>
                    <div className={blocks.row, styles.title_row}>
                        <h2 className={blocks.block_title}>ЛИМИТИРОВАННАЯ КОЛЛЕКЦИЯ</h2>
                        <Link href="">
                            <a className={styles.showall}>Смотреть всё</a>
                        </Link>
                    </div>
                    <div className={cn(blocks.row, styles.product_row)}>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                </div>
            </div>
            <div className={cn(blocks.content_block, styles.photo_link_wrapper)}>
                <Link href="">
                    <a className={styles.photo_link}>
                        <p className={styles.photo_link_title}>ТРИКОТАЖ</p>
                        <img src="/images/blocks/FullSizeRender.jpg" alt=""/>
                    </a>
                </Link>
            </div>
            <div className={blocks.content_block}>
                <div className={styles.products_block}>
                    <div className={blocks.row, styles.title_row}>
                        <h2 className={blocks.block_title}>БЕСТСЕЛЛЕРЫ</h2>
                        <Link href="">
                            <a className={styles.showall}>Смотреть всё</a>
                        </Link>
                    </div>
                    <div className={cn(blocks.row, styles.product_row)}>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                </div>
            </div>
            <div className={blocks.content_block}>
                <div className={blocks.row, styles.title_row}>
                    <h2 className={blocks.block_title}>О НАС ПИШУТ:</h2>
                </div>
                <div className={blocks.row, styles.press}>
                    <Link href="">
                        <a className={styles.press_elem}>
                            <img src="/images/press/aeroflot.png" alt=""/>
                        </a>
                    </Link>
                    <Link href="">
                        <a className={styles.press_elem}>
                            <img src="/images/press/elle_decoration.png" alt=""/>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </>);
}