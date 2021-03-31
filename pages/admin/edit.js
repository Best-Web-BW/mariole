import serializeForm from "../../utils/common/serializeForm";
import blocks from "../../scss/blocks.module.scss";
import styles from "./edit.module.scss";
import Select from "react-select";
import { useState } from "react";
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
        {      value: "white", label: "белый" },
        {      value: "beige", label: "бежевый" },
        { value: "light_blue", label: "голубой" },
        {     value: "yellow", label: "жёлтый" },
        {      value: "green", label: "зелёный" },
        {      value: "brown", label: "коричневый" },
        {        value: "red", label: "красный" },
        {  value: "red_poppy", label: "красный мак" },
        {      value: "milky", label: "молочный" },
        {       value: "sand", label: "песочный" },
        {       value: "grey", label: "серый" },
        {       value: "blue", label: "синий" },
        {      value: "taiga", label: "тайга" },
        { value: "terracotta", label: "терракот" },
        {      value: "black", label: "чёрный" }
    ],
    sizes: [
        { value: "XS", label: "XS" },
        {  value: "S", label: "S" },
        {  value: "M", label: "M" },
        {  value: "L", label: "L" }
    ],
    categories: [
        {
            value: "knitwear",
            label: "Трикотаж",
            subcategories: [
                {       value: "suit", label: "Костюмы" },
                { value: "turtleneck", label: "Водолазки" },
                {  value: "cardigans", label: "Кардиганы" }
            ]
        },
        {
            value: "accessories",
            label: "Аксессуары",
            subcategories: [
                {     value: "mittens", label: "Варежки" },
                {      value: "gloves", label: "Перчатки" },
                {       value: "socks", label: "Носки" },
                { value: "headscarves", label: "Косынки" },
                {      value: "shawls", label: "Платки" },
                {      value: "stoles", label: "Палантины" },
                {    value: "headwear", label: "Головные уборы" }
            ]
        },
        {
            value: "jewelry",
            label: "Украшения",
            subcategories: [
                { value: "necklaces", label: "Колье" },
                {  value: "earrings", label: "Серьги" },
                { value: "bracelets", label: "Браслеты" },
                {  value: "brooches", label: "Броши" }
            ]
        }
    ]
};

export default function Edit() {
    const [language, setLanguage] = useState("RU");
    const [color, setColor] = useState();
    const [sizes, setSizes] = useState();
    const [category, setCategory] = useState();
    const changeCategory = category => {
        setCategory(category);
        setSubcategory(null);
    };
    const [subcategory, setSubcategory] = useState();

    const submit = async formData => {
        formData.sizes = sizes.map(({ label }) => label);
        formData.available = !formData.out_of_stock;
        delete formData.out_of_stock;
        delete formData[""];
        console.log({ formData });
        console.log({ jsoned: JSON.stringify(formData) });

        const response = await fetch("/api/products/4", {
            method: "POST",
            // headers: { "Content-Type": "application/json;charset=utf-8" },
            // body: JSON.stringify(formData)
        });
        const json = await response.json();
        console.log({ json });
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
                    <h2 className={styles.title}>Загрузите фотографии товара</h2>
                    <label>
                        <input className={styles.hidden} type="file" multiple accept="image/*" />
                        <div className={styles.add_photo_button}>Загрузить</div>
                    </label>
                    <div className={styles.photo_wrapper}>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button} />
                            <img src="/images/products/p1.1.jpg" alt="" />
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button} />
                            <img src="/images/products/p1.2.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <h2 className={styles.title}>Параметры товара</h2>
                    <div className={styles.changeLang_container}>
                        <LanguageButton language="RU" currentLanguage={language} setLanguage={setLanguage} />
                        <LanguageButton language="EN" currentLanguage={language} setLanguage={setLanguage} />
                    </div>
                    <form id="form" autoComplete="off" onSubmit={evt => {
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
                                    options={[]} // !!!!!!
                                    styles={select.styles}
                                    theme={select.theme}
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