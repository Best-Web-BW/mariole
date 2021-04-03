import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import { useTranslation } from "react-i18next";
import lorem from "../utils/common/lorem";
import styles from "./index.module.scss";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_index"]) }
})

export default function Index() {
    const { t } = useTranslation("page_index");

    return (<>
        <Head>
            <title>{ t("title") }</title>
            <meta name="description" content={lorem(100)} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={cn(blocks.main_block, styles.first_block)}>
                <img className={blocks.desktop} src="/images/blocks/FullSizeRender1.jpg" alt="" />
                <img className={blocks.mobile} src="/images/blocks/mario_le-1817.jpg" alt="" width="100%" />
                <Link href="/shop">
                    <a className={blocks.absolute_link}>
                        <button>НАЧАТЬ ШОПИНГ</button>
                    </a>
                </Link>
            </div>
            <div className={blocks.content_block}>
                <div className={styles.about_area}>
                    <div className={cn(blocks.row, styles.row)}>
                        <p>
                            Ремесло, история которого в России насчитывает более 250 лет, 
                            с помощью современных технологий, обретает новую жизнь.
                        </p>
                    </div>
                    <div className={cn(blocks.column, styles.column)}>
                        <img src="/images/blocks/mario_le-1684.jpg" alt="" />
                    </div>
                    <div className={cn(blocks.column, styles.column)}>
                        <p>
                            Mario’le - это эксклюзивная вязаная одежда и аксессуары 
                            ручной работы из пуха знаменитых Оренбургских коз.
                            <br />
                            <br />
                            Секрет Mario’le - уникальные свойства используемого сырья. 
                            На своих фермах в Оренбургской области мы разводим коз 
                            реликтовой породы, пух которых удивительно тонок и эластичен.
                            <br />
                            <br />
                            Именно его неповторимые  свойства, позволяют нам 
                            изготавливать превосходную пряжу ручного прядения, 
                            лёгкую и невесомую  словно кружево.
                            <br />
                            <br />⠀
                            Опираясь на вековые традиции и следуя тенденциям 
                            современного дизайна, мы гарантируем исключительно 
                            высокое качество наших изделий.
                        </p>
                    </div>
                </div>
            </div>
            <div className={blocks.content_block}>
                <div className={cn(blocks.row, styles.title_row)}>
                    <h2 className={blocks.block_title}>ЛИМИТИРОВАННАЯ КОЛЛЕКЦИЯ</h2>
                    <Link href="/shop">
                        <a className={styles.showall}>Смотреть всё</a>
                    </Link>
                </div>
                <div className={styles.products_block}>
                    <div className={cn(blocks.row, styles.product_row)}>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
            <div className={cn(blocks.content_block, styles.photo_link_wrapper)}>
                <Link href="/shop">
                    <a className={styles.photo_link}>
                        <p className={styles.photo_link_title}>ТРИКОТАЖ</p>
                        <img className={styles.desktop} src="/images/blocks/FullSizeRender.jpg" alt="" />
                        <img className={styles.mobile} src="/images/blocks/mario_le-1684.jpg" alt="" />
                    </a>
                </Link>
            </div>
            <div className={blocks.content_block}>
                <div className={cn(blocks.row, styles.title_row)}>
                    <h2 className={blocks.block_title}>БЕСТСЕЛЛЕРЫ</h2>
                    <Link href="/shop">
                        <a className={styles.showall}>Смотреть всё</a>
                    </Link>
                </div>
                <div className={styles.products_block}>
                    <div className={cn(blocks.row, styles.product_row)}>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
            <div className={blocks.content_block}>
                <div className={cn(blocks.row, styles.title_row)}>
                    <h2 className={blocks.block_title}>О НАС ПИШУТ:</h2>
                </div>
                <div className={cn(blocks.row, styles.press)}>
                    <Link href="#">
                        <a className={styles.press_elem}>
                            <img src="/images/press/aeroflot.png" alt="" />
                        </a>
                    </Link>
                    <Link href="#">
                        <a className={styles.press_elem}>
                            <img src="/images/press/elle_decoration.png" alt="" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </>);
}