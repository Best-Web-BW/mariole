import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import deserializeForm from "../../utils/common/deserializeForm";
import serializeForm from "../../utils/common/serializeForm";
import { _get as getParents } from "../api/products/parents";
import { _get as getProduct } from "../api/products/[id]";
import { _get as authorize } from "../api/auth/authorize";
import { useEffect, useRef, useState } from "react";
import blocks from "../../scss/blocks.module.scss";
import styles from "./edit.module.scss";
import Select from "react-select";
import cn from "classnames";

const select = {
    theme: theme => ({
        ...theme, borderRadius: 0,
        colors: {
            ...theme.colors,
            primary: "black",
            neutral0: "transparent"
        }
    }),
    styles: {
        container: () => ({
            position: "relative",
            fontSize: "16px",
            width: "50%"
        }),
        menu: () => ({
            backgroundColor: "whitesmoke",
            width: "calc(100% - 2px)",
            border: "1px solid black",
            position: "absolute",
            zIndex: "1000"
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => ({
            ...styles,
            color: "#333333",
            backgroundColor: (
                isDisabled
                ? null
                : (
                    isSelected
                    ? "#b4b4b4"
                    : (
                        isFocused
                        ? "#cfcfcf"
                        : null
                    )
                )
            )
        })
    },
    colors: [
        {      value: "white", label: "белый"       },
        {      value: "beige", label: "бежевый"     },
        { value: "light_blue", label: "голубой"     },
        {     value: "yellow", label: "жёлтый"      },
        {      value: "green", label: "зелёный"     },
        {      value: "brown", label: "коричневый"  },
        {        value: "red", label: "красный"     },
        {  value: "red_poppy", label: "красный мак" },
        {      value: "milky", label: "молочный"    },
        {       value: "sand", label: "песочный"    },
        {       value: "grey", label: "серый"       },
        {       value: "blue", label: "синий"       },
        {      value: "taiga", label: "тайга"       },
        { value: "terracotta", label: "терракот"    },
        {      value: "black", label: "чёрный"      }
    ],
    sizes: [
        { value: "XS", label: "XS" },
        {  value: "S", label: "S"  },
        {  value: "M", label: "M"  },
        {  value: "L", label: "L"  }
    ],
    categories: [
        {
            value: "knitwear",
            label: "Трикотаж",
            subcategories: [
                {       value: "suits", label: "Костюмы"   },
                { value: "turtlenecks", label: "Водолазки" },
                {   value: "cardigans", label: "Кардиганы" }
            ]
        },
        {
            value: "accessories",
            label: "Аксессуары",
            subcategories: [
                {     value: "mittens", label: "Варежки"        },
                {      value: "gloves", label: "Перчатки"       },
                {       value: "socks", label: "Носки"          },
                { value: "headscarves", label: "Косынки"        },
                {      value: "shawls", label: "Платки"         },
                {      value: "stoles", label: "Палантины"      },
                {    value: "headwear", label: "Головные уборы" }
            ]
        },
        {
            value: "jewelry",
            label: "Украшения",
            subcategories: [
                { value: "necklaces", label: "Колье"    },
                {  value: "earrings", label: "Серьги"   },
                { value: "bracelets", label: "Браслеты" },
                {  value: "brooches", label: "Броши"    }
            ]
        }
    ]
};

export async function getServerSideProps({ locale, req: { cookies }, query: { id } }) {
    const authorization = await authorize({ uuid: cookies.uuid, accessKey: cookies.access_key });
    if(authorization.success) {
        const product = (await getProduct({ id: +id, full: true })).product ?? null;
        const parents = (await getParents()).parents.map(({ id, name }) => ({ value: id, label: name }));
        return {
            props: {
                product, parents,
                ...await serverSideTranslations(locale, [])
            }
        };
    } else return {
        redirect: {
            destination: "/admin/login",
            permanent: false
        }
    }

}

export default function Edit({ product, parents }) {
    const [parent, setParent] = useState();
    const form = useRef();
    useEffect(async () => {
        if(parent || product) {
            let data;
            if(parent) {
                const response = await fetch(`/api/products/${parent.value}?full=1`);
                data = await response.json();
            } else data = product;

            deserializeForm(form.current, {
                locales: data.locales,
                price: data.price,
                out_of_stock: !data.available,
                limited: data.limited,
                bestseller: data.bestseller
            });

            setColor(select.colors.find(({ value }) => value === data.color));
            setSizes(select.sizes.filter(({ value }) => data.sizes.includes(value)));

            const category = select.categories.find(({ value }) => value === data.category);
            const subcategory = category.subcategories.find(({ value }) => value === data.subcategory);
            changeCategory(category, subcategory);
        }
    }, [parent]);

    const [images, setImages] = useState(product?.images ?? []);

    const [language, setLanguage] = useState("RU");
    const [color, setColor] = useState();
    const [sizes, setSizes] = useState([]);
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const changeCategory = (category, subcategory = null) => {
        setCategory(category);
        setSubcategory(subcategory);
    };

    const submit = async formData => {
        formData.images = images;
        formData.sizes = sizes.map(({ label }) => label);
        formData.available = !formData.out_of_stock;
        if(parent) formData.parent = parent.value;
        delete formData.out_of_stock;
        delete formData[""];

        const url = `/api/products/${product?.id ?? "_"}`;
        const method = product ? "PATCH" : "POST";
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json;charset=utf-8" },
            method, body: JSON.stringify(formData)
        });
        const json = await response.json();
    };

    const resetSelects = () => {
        setColor(null);
        setSizes(null);
        changeCategory(null);
    };

    return (<>
        <div className={blocks.content_body}>
            <div className={styles.page}>
                <div className={styles.row}>
                    <ImageLoader
                        multiple
                        type="products"
                        images={images}
                        setImages={setImages}
                    />
                </div>
                <div className={styles.row}>
                    <h2 className={styles.title}>Параметры товара</h2>
                    <div className={styles.changeLang_container}>
                        <LanguageButton language="RU" currentLanguage={language} setLanguage={setLanguage} />
                        <LanguageButton language="EN" currentLanguage={language} setLanguage={setLanguage} />
                    </div>
                    <form ref={form} id="form" autoComplete="off" onSubmit={evt => {
                        evt.preventDefault();
                        submit(serializeForm(evt.target));
                    }}>
                        <div className={cn(styles.parameters, { [styles.active]: language === "RU" })}>
                            <label>
                                Название товара
                                <input type="text" name="locales.ru.name" required />
                            </label>
                            <label>
                                Цена товара (&#8381;)
                                <input type="number" name="price" min={1} defaultValue={0} required />
                            </label>
                            <label>
                                Описание товара
                                <textarea type="text" name="locales.ru.description" required />
                            </label>
                            <label>
                                Состав товара
                                <input type="text" name="locales.ru.composition" required />
                            </label>
                            <label>
                                Цвет
                                <Select
                                    instanceId="color_select"
                                    options={select.colors}
                                    styles={select.styles}
                                    theme={select.theme}
                                    onChange={setColor}
                                    value={color}
                                    name="color"
                                />
                            </label>
                            <label>
                                Размеры
                                <Select
                                    instanceId="sizes_select"
                                    closeMenuOnSelect={false}
                                    options={select.sizes}
                                    styles={select.styles}
                                    theme={select.theme}
                                    onChange={setSizes}
                                    value={sizes}
                                    isMulti
                                />
                            </label>
                            <label>
                                Категория
                                <Select
                                    instanceId="category_select"
                                    options={select.categories}
                                    onChange={changeCategory}
                                    styles={select.styles}
                                    theme={select.theme}
                                    value={category}
                                    name="category"
                                />
                            </label>
                            <label>
                                Тип товара
                                <Select
                                    options={category?.subcategories ?? []}
                                    onChange={setSubcategory}
                                    instanceId="type_select"
                                    styles={select.styles}
                                    theme={select.theme}
                                    value={subcategory}
                                    name="subcategory"
                                />
                            </label>
                            <label>
                                Детали и уход
                                <input type="text" name="locales.ru.details" required />
                            </label>
                            <label>
                                Родительский товар
                                <Select
                                    instanceId="parent_select"
                                    styles={select.styles}
                                    theme={select.theme}
                                    onChange={setParent}
                                    options={parents}
                                />
                            </label>
                            <label>
                                Нет в наличии
                                <input type="checkbox" name="out_of_stock" />
                            </label>
                            <label>
                                Лимитированная коллекция
                                <input type="checkbox" name="limited" />
                            </label>
                            <label>
                                Бестселлер
                                <input type="checkbox" name="bestseller" />
                            </label>
                        </div>
                        <div className={cn(styles.parameters, { [styles.active]: language === "EN" })}>
                            <label>
                                Название товара (EN)
                                <input type="text" name="locales.en.name" required />
                            </label>
                            <label>
                                Описание товара (EN)
                                <textarea type="text" name="locales.en.description" required />
                            </label>
                            <label>
                                Состав товара (EN)
                                <input type="text" name="locales.en.composition" required />
                            </label>
                            <label>
                                Детали и уход (EN)
                                <input type="text" name="locales.en.details" required />
                            </label>
                        </div>
                    </form>
                </div>
                <div className={styles.button_wrapper}>
                    <button className={styles.save} form="form" type="submit">Сохранить изменения</button>
                    <button
                        className={styles.back} form="form" type="reset"
                        onClick={resetSelects}
                    >Отменить</button>
                </div>
            </div>
        </div>
    </>);
}

function LanguageButton({ language, currentLanguage, setLanguage }) {
    return (
        <button
            className={cn(styles.changeLangBtn, styles.left, { [styles.active]: language === currentLanguage })}
            onClick={() => setLanguage(language)}
        >{ language }</button>
    );
}

function ImageLoader({ multiple, type, images, setImages }) {
    const filterImages = imagesToFilter => images.filter(image => !imagesToFilter.includes(image));
    const addImages = images => setImages(multiple ? [...filterImages(images), ...images] : images);
    const removeImage = image => setImages(filterImages([image]));

    const loadImages = async images => {
        images = Array.from(images);
        const formData = new FormData();
        for(const image of images) formData.append("images", image);

        const response = await fetch(`/api/load/images?type=${type}`, {
            method: "POST",
            body: formData
        });
        const json = await response.json();
        addImages(json.images.map(({ url }) => url));
    };

    return (<>
        <h2 className={styles.title}>Загрузите фотографии товара</h2>
        <form encType="multipart/form-data" onSubmit={e => e.preventDefault()}>
            <label>
                <input
                    className={styles.hidden} type="file" multiple accept="image/*"
                    onChange={evt => loadImages(evt.target.files)}
                />
                <div className={styles.add_photo_button}>Загрузить</div>
            </label>
        </form>
        <div className={styles.photo_wrapper}>{
            images.map(image => <ImageEntry key={image} url={image} remove={() => removeImage(image)} />)
        }</div>
    </>);
}

function ImageEntry({ url, remove }) {
    return (
        <div className={styles.photo_elem}>
            <span className={styles.delete_button} onClick={remove} />
            <img src={url} alt="" />
        </div>
    );
}