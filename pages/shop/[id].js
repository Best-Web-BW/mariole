import { useCallback, useEffect, useState } from "react";
import FeedbackForm from "../../components/FeedbackForm";
import ProductCard from "../../components/ProductCard";
import blocks from "../../scss/blocks.module.scss";
import { cycle } from "../../utils/common";
import styles from "./[id].module.scss";
import lorem from "../../utils/lorem";
import Head from "next/head";
import cn from "classnames";

const images = ["/images/products/p1.1.jpg", "/images/products/p1.2.jpg"];
const colors = [
    { id: "green", name: "зелёный", image: "/images/products/p1.1.jpg", available: true },
    { id: "black", name: "чёрный", image: "/images/products/black.jpg", available: true },
    { id: "red", name: "красный", image: "/images/products/red.jpg", available: true }
];
const sizes = [
    { id: "M", available: true },
    { id: "S", available: true },
    { id: "L", available: false }
]

export default function ProductPage() {
    const [sliderOpened, setSliderOpened] = useState(false);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    return (<>
        <Head>
            <title>Mariole</title>
            <meta name="description" content={lorem(100)} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={styles.product_page}>
                <div className={styles.column}>
                    <ImagePreviewBlock
                        openSlider={() => setSliderOpened(true)}
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                        images={images}
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles.product_data}>
                        <div className={styles.data_row}>
                            <h2>НАЗВАНИЕ ТОВАРА / { selectedColor.name }</h2>
                        </div>
                        <div className={styles.data_row}>
                            <p className={styles.price}>32.000,00 &#8381;</p>
                        </div>
                        <div className={styles.data_row}>
                            <p>Количество</p>
                            <div className={styles.choose_quantity}>
                                <button>-</button>
                                <span>26</span>
                                <button>+</button>
                            </div>
                            <p>Цвет</p>
                            <ColorSelectionBlock {...{ colors, selectedColor, setSelectedColor }} />
                            <p>Размер</p>
                            <SizeSelectionBlock {...{ sizes, selectedSize, setSelectedSize }} />
                        </div>
                        <div className={styles.data_row}>
                            <button className={styles.add_to_cart}>ДОБАВИТЬ В КОРЗИНУ</button>
                            <button className={cn(styles.add_to_favorite, styles.active)}>
                                <span className={styles.favorite_icon} /> ДОБАВИТЬ В ИЗБРАННОЕ
                            </button>
                        </div>
                        <div className={cn(styles.data_row, styles.padding)}>
                            <p>Небольшое описание товара словами</p>
                        </div>
                        <div className={cn(styles.data_row, styles.padding)}>
                            <p>Цвет: Розовый</p>
                        </div>
                        <InfoBlock title="Состав">
                            Основа: 100% вискоза. Подклад: 100% вискоза.
                        </InfoBlock>
                        <InfoBlock title="Детали и уход">
                            Рост модели 173 см, размер XS (40 RUS). 
                            На модели: жакет размера S (42 RUS). 
                            Рекомендуется только сухая чистка.
                        </InfoBlock>
                        <InfoBlock title="Таблица размеров">
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
                        </InfoBlock>
                        <InfoBlock title="Задать вопрос">
                            <FeedbackForm />
                        </InfoBlock>
                    </div>
                </div>
            </div>
            <ImageSlider
                close={() => setSliderOpened(false)}
                defaultImage={selectedImage}
                opened={sliderOpened}
                images={images}
            />
            <div className={blocks.content_block}>
                <div className={styles.saw_before_title}>
                    <h2>ВЫ СМОТРЕЛИ:</h2>
                </div>
                <div className={styles.saw_before_wrapper}>
                    <div className={styles.saw_before_row}>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

function ImagePreviewBlock({ images, selectedImage, setSelectedImage, openSlider }) {
    const Preview = useCallback(({ active, image, toggle }) => (
        <div
            className={cn(styles.slider_preview_elem, { [styles.active]: active })}
            onClick={() => toggle(image)}
        >
            <img src={image} alt="" width="100%" />
        </div>
    ), []);

    return (
        <div className={styles.slider}>
            <div className={styles.slider_preview}>{images.map(image => (
                <Preview
                    active={selectedImage === image}
                    toggle={setSelectedImage}
                    image={image} key={image}
                />
            ))}</div>
            <div className={styles.slider_view} onClick={openSlider}>
                <img src={selectedImage} alt="" width="100%" />
            </div>
        </div>
    );
}

function ImageSlider({ opened, images, defaultImage, close }) {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => setActiveIndex(images.indexOf(defaultImage)), [defaultImage]);

    return (
        <div className={cn(styles.photo_modal, { [styles.opened]: opened })}>
            <div className={styles.photo_modal_content}>
                <div className={styles.img_wrapper}>
                    <img src={images[activeIndex]} alt="" width="100%" />
                </div>
                <div className={cn(styles.modal_navigation, { [styles.active]: opened })}>
                    <div
                        onClick={() => setActiveIndex(prev => cycle(prev - 1, images.length))}
                        className={cn(styles.navigation_button)}
                    >
                        <span className={styles.back} />
                    </div>
                    <div className={cn(styles.navigation_button)} onClick={close}>
                        <span className={styles.close} />
                    </div>
                    <div
                        onClick={() => setActiveIndex(prev => cycle(prev + 1, images.length))}
                        className={cn(styles.navigation_button)}
                    >
                        <span className={styles.next} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ColorBlock({ selectedColor, color: { id, name, image, available }, onClick }) {
    return (
        <div
            className={cn(styles.choose_color_elem, {
                [styles.active]: selectedColor.id === id,
                [styles.disabled]: !available
            })} onClick={onClick}
        >
            <div className={styles.img_wrapper}>
                <img src={image} alt="" width="100%" />
            </div>
            <div className={styles.popup}>{ name }</div>
        </div>
    );
}

function ColorSelectionBlock({ colors, selectedColor, setSelectedColor }) {
    return (
        <div className={styles.choose_color_wrapper}>{colors.map(color => (
            <ColorBlock
                onClick={color.available ? () => setSelectedColor(color) : null}
                selectedColor={selectedColor}
                key={color.id} color={color}
            />
        ))}</div>
    );
}

function SizeBlock({ selectedSize, size: { id, available }, onClick }) {
    return (
        <div
            className={cn(styles.choose_size_elem, {
                [styles.active]: id === selectedSize.id,
                [styles.disabled]: !available
            })} onClick={onClick}
        >{ id }</div>
    );
}

function SizeSelectionBlock({ sizes, selectedSize, setSelectedSize }) {
    return (
        <div className={styles.choose_size_wrapper}>{sizes.map(size => (
            <SizeBlock
                onClick={size.available ? () => setSelectedSize(size) : null}
                selectedSize={selectedSize}
                key={size.id} size={size}
            />
        ))}</div>
    );
}

function InfoBlock({ title, children }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={cn(styles.data_row, styles.more_info_wrapper)}>
            <button
                className={cn(styles.show_more, { [styles.active]: expanded })}
                onClick={() => setExpanded(prev => !prev)}
            >
                { title } <span className={styles.show_more_icn} />
            </button>
            <div className={cn(styles.info, { [styles.opened]: expanded })}>
                { children }
            </div>
        </div>
    );
}