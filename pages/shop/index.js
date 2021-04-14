import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import divideArrayToSubarrays from "../../utils/arrays/divideToSubarrays";
import deleteFalsyValues from "../../utils/common/deleteFalsyValues";
import { useCallback, useEffect, useMemo, useState } from "react";
import admin from "../../scss/adminButtons.module.scss";
import ProductCard from "../../components/ProductCard";
import { joinQuery } from "../../utils/common/network";
import { _get as getProducts } from "../api/products";
import blocks from "../../scss/blocks.module.scss";
import ForAdmin from "../../components/ForAdmin";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Select from "react-select";
import Link from "next/link";
import Head from "next/head";
import cn from "classnames";

const select = {
    theme: theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            primary: "black",
            neutral0: "transparent"
        }
    }),
    styles: {
        container: () => ({
            fontSize: "16px",
            width: "100%"
        }),
        menu: () => ({
            backgroundColor: "whitesmoke",
            width: "calc(100% - 2px)",
            border: "1px solid black",
            position: "absolute",
            zIndex: "1000"
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
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
            }
        }
    },
    sorting: [
        {
            value: "price_0-1",
            label: "Цена по возрастанию",
            sort: (p1, p2) => p1.price - p2.price
        },
        {
            value: "price_1-0",
            label: "Цена по убыванию",
            sort: (p1, p2) => p2.price - p1.price
        },
        {
            value: "alphabet_A-B",
            label: "От А до Я",
            sort: (p1, p2) => p1.name > p2.name ? 1 : (p1.name < p2.name ? -1 : 0)
        },
        {
            value: "alphabet_B-A",
            label: "От Я до А",
            sort: (p1, p2) => p1.name < p2.name ? 1 : (p1.name > p2.name ? -1 : 0)
        },
        {
            value: "time_new",
            label: "Сначала новое",
            sort: (p1, p2) => p1.cdate > p2.cdate ? -1 : (p1.cdate < p2.cdate ? 1 : 0)
        },
        {
            value: "time_old",
            label: "Сначала старое",
            sort: (p1, p2) => p1.cdate < p2.cdate ? -1 : (p1.cdate > p2.cdate ? 1 : 0)
        }
    ]
}

function parseQuery({ category, subcategory, fresh, limited, bestseller, sizes, search }) {
    return {
        category: uri.decode.string(category),
        subcategory: uri.decode.string(subcategory),
        fresh: uri.decode.boolean(fresh),
        limited: uri.decode.boolean(limited),
        bestseller: uri.decode.boolean(bestseller),
        sizes: uri.decode.array(sizes),
        search: uri.decode.string(search)
    };
}

const uri = {
    decode: {
        boolean: raw => Boolean(raw),
        string: raw => raw ? decodeURIComponent(raw) : undefined,
        array: raw => raw ? decodeURIComponent(raw).split(",") : []
    },
    encode: {
        boolean: raw => raw ? +raw : undefined,
        string: raw => raw ? encodeURIComponent(raw) : undefined,
        array: raw => raw.length ? encodeURIComponent(raw.toString()) : undefined
    }
}

export async function getServerSideProps({ locale, query }) {
    const parsedQuery = { ...parseQuery(query), locale: "ru" };
    if(!parsedQuery.sizes.length) parsedQuery.sizes = undefined;
    const { products: defaultProducts } = await getProducts(parsedQuery);
    return {
        props: {
            enabledSearch: !!parsedQuery.search,
            defaultProducts: deleteFalsyValues(defaultProducts),
            locale,
            ...await serverSideTranslations(locale, [
                "page_shop",
                "component_product-card"
            ])
        }
    };
}

export default function Shop({ locale, enabledSearch, defaultProducts }) {
    const { t } = useTranslation("page_shop");
    const { t: productCard } = useTranslation("component_product-card");

    useEffect(() => {
        select.sorting = select.sorting.map(entry => ({ ...entry, label: t(`sorting.${entry.value}`) }));
    }, []);
    
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
    
    const [products, setProducts] = useState(defaultProducts);

    const router = useRouter();
    const [filter, setFilter] = useState(parseQuery(router.query));
    const [search, setSearch] = useState(filter.search);
    useEffect(() => setSearch(filter.search), [filter.search]);

    useEffect(async () => {
        const response = await fetch(`/api/products?locale=${locale}&${joinQuery(filter)}`);
        setProducts(await response.json());
    }, [filter]);

    const [selectedSorting, setSelectedSorting] = useState();
    useEffect(() => {
        if(selectedSorting && products) {
            setProducts([...products.sort(selectedSorting.sort)]);
        }
    }, [selectedSorting]);
    
    useEffect(() => setFilter(parseQuery(router.query)), [router.query]);

    const updateQuery = useCallback(entries => {
        const query = { ...router.query };
        for(const [name, value] of entries) value ? query[name] = value : delete query[name];
        router.push({ pathname: "/shop", query }, undefined, { shallow: true });
    }, [router.query]);

    const toggle = useMemo(() => ({
        category: name => {
            updateQuery([
                ["category", filter.category !== name ? uri.encode.string(name) : undefined],
                ["subcategory", undefined],
                ["fresh", false],
                ["limited", false],
                ["bestseller", false]
            ]);
        },
        subcategory: (categoryName, name) => {
            updateQuery([
                ["category", categoryName],
                ["subcategory", filter.subcategory !== name ? uri.encode.string(name) : undefined],
                ["fresh", false],
                ["limited", false],
                ["bestseller", false]
            ]);
        },
        fresh: state => updateQuery([
            ["category", undefined],
            ["subcategory", undefined],
            ["fresh", uri.encode.boolean(state)],
            ["limited", false],
            ["bestseller", false]
        ]),
        limited: state => updateQuery([
            ["category", undefined],
            ["subcategory", undefined],
            ["fresh", false],
            ["limited", uri.encode.boolean(state)],
            ["bestseller", false]
        ]),
        bestseller: state => updateQuery([
            ["category", undefined],
            ["subcategory", undefined],
            ["fresh", false],
            ["limited", false],
            ["bestseller", uri.encode.boolean(state)]
        ]),
        size: size => {
            const newState = !filter.sizes.includes(size);
            const sizes = filter.sizes.filter(entry => entry !== size);
            updateQuery([["sizes", uri.encode.array(newState ? [...sizes, size] : sizes)]]);
        },
        search: text => updateQuery([["search", uri.encode.string(text)]])
    }), [updateQuery, filter]);

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <MainBlock filter={filter} t={t} />
        <Search
            enabled={enabledSearch} submit={() => toggle.search(search)}
            text={search} setText={setSearch} t={t}
        />
        <div className={cn(blocks.content_block, styles.shop_page)}>
            <div className={cn(styles.menu_wrapper, { [styles.opened]: mobileMenuOpened })}>
                <div className={cn(styles.menu_cross_wrapper)}>
                    <span className={cn(styles.menu_cross)} onClick={() => setMobileMenuOpened(false)} />
                </div>
                <div className={styles.menu_container}>
                    <ul>
                        <CategoryMenu toggle={toggle} filter={filter} t={t} />
                        <SizeMenu
                            existingSizes={["L", "M", "S", "XS"]}
                            activeSizes={filter.sizes}
                            toggle={toggle.size}
                            t={t}
                        />
                    </ul>
                </div>
            </div>  
            <div className={styles.shop_wrapper}>
                <div className={cn(styles.row, styles.shop_header)}>
                    <div className={cn(styles.shop_settings, styles.mobile)}>
                        <span
                            className={styles.settings_icn}
                            onClick={() => setMobileMenuOpened(true)}
                        />
                    </div>
                    <ForAdmin>
                        <Link href="/admin/edit">
                            <a>
                                <button className={admin.button}>Создать товар</button>
                            </a>
                        </Link>
                    </ForAdmin>
                    <div className={styles.select_wrapper}>
                        <Select
                            selectedSorting={selectedSorting}
                            onChange={setSelectedSorting}
                            instanceId="sorting_select"
                            options={select.sorting}
                            styles={select.styles}
                            theme={select.theme}
                        />
                    </div>
                </div>
                <ProductList products={products} t={productCard} />
            </div>
        </div>
    </>);
}

function getMainData({ category, fresh, limited, bestseller }, t) {
    let image, titleID;
    if(category) {
        image = `category_${category}`;
        titleID = `category.${category}`;
    } else if(fresh) {
        image = "fresh";
        titleID = "new";
    } else if(limited) {
        image = "limited";
        titleID = "limited-collection";
    } else if(bestseller) {
        image = "bestseller";
        titleID = "bestsellers";
    } else {
        image = "all";
        titleID = "all-products"
    }

    image = `/images/shop/${image}`;
    return {
        desktopImage: image,
        mobileImage: `${image}_m`,
        title: t(titleID)
    };
}

function MainBlock({ filter, t }) {
    const [desktopImage, setDesktopImage] = useState("");
    const [mobileImage, setMobileImage] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const { desktopImage, mobileImage, title } = getMainData(filter, t);
        console.log({ desktopImage, mobileImage, title });

        setDesktopImage(desktopImage);
        setMobileImage(mobileImage);
        setTitle(title);
    }, [filter]);

    return (
        <div className={cn(blocks.main_block, styles.first_block)}>
            <img className={blocks.desktop} src={desktopImage} alt="" />
            <img className={blocks.mobile} src={mobileImage} alt="" width="100%" />
            <div className={blocks.page_title}>
                <p className={styles.shop_title}>{ title }</p>
            </div>
        </div>
    );
}

function Search({ enabled, text, setText, submit, t }) {
    return (
        <div className={cn(styles.search_results, { [styles.hidden]: !enabled })}>
            <div className={styles.search_title}>
                <h2>{ t("search-results") }</h2>
            </div>
            <form className={styles.search_form} onSubmit={evt => {
                evt.preventDefault();
                submit();
            }}>
                <input type="text" value={text ?? ""} onChange={e => setText(e.target.value)} />
                <button type="submit" className={styles.search_button}>
                    <span className={styles.search_icn} />
                </button>
            </form>
        </div>
    );
}

function CategoryMenu({ toggle, filter, t }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li>
            <div className={styles.menu_elem} onClick={() => setExpanded(prev => !prev)}>
                <span className={cn(styles.submenu_icn, { [styles.active]: expanded })} />
                { t("category-caps") }
            </div>
            <div className={cn(styles.submenu_container, { [styles.opened]: expanded })}>
                <ul>
                    <CategoryFilter
                        toggle={toggle} name="knitwear" title={t("category.knitwear")}
                        subcategories={
                            [
                                "suits",
                                "turtlenecks",
                                "cardigans"
                            ].map(id => [id, t(`subcategory.${id}`)])
                        }
                    />
                    <CategoryFilter
                        toggle={toggle} name="accessories" title={t("category.accessories")}
                        subcategories={
                            [
                                "mittens",
                                "gloves",
                                "socks",
                                "headscarves",
                                "shawls",
                                "stoles",
                                "headwear"
                            ].map(id => [id, t(`subcategory.${id}`)])
                        }
                    />
                    <CategoryFilter
                        toggle={toggle} name="jewelry" title={t("category.jewelry")}
                        subcategories={
                            [
                                "necklaces",
                                "earrings",
                                "bracelets",
                                "brooches"
                            ].map(id => [id, t(`subcategory.${id}`)])
                        }
                    />
                    <SpecialFilter
                        title={t("limited-collection")}
                        toggle={toggle.limited}
                        active={filter.limited}
                    />
                    <SpecialFilter
                        title={t("bestsellers")}
                        toggle={toggle.bestseller}
                        active={filter.bestseller}
                    />
                    <SpecialFilter
                        title={t("new")}
                        toggle={toggle.fresh}
                        active={filter.fresh}
                    />
                </ul>
            </div>
        </li>
    );
}

function CategoryFilter({ toggle, name, title, subcategories }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li>
            <span
                className={cn(styles.submenu_icn, { [styles.active]: expanded })}
                onClick={() => setExpanded(prev => !prev)}
            />
            <span className={styles.menu_elem} onClick={() => toggle.category(name)}>{ title }</span>
            <div className={cn(styles.submenu_container, { [styles.opened]: expanded })}>
                <ul>{
                    subcategories.map(([_name, _title]) => (
                        <SubcategoryFilter
                            key={_name} name={_name} title={_title}
                            toggle={() => toggle.subcategory(name, _name)}
                        />
                    ))
                }</ul>
            </div>
        </li>
    );
}

function SubcategoryFilter({ toggle, name, title }) {
    return (
        <li onClick={() => toggle(name)}>
            <span className={styles.menu_elem}>{ title }</span>
        </li>
    );
}

function SpecialFilter({ title, toggle, active }) {
    return (
        <li onClick={() => toggle(!active)}>
            <span className={styles.menu_elem}>{ title }</span>
        </li>
    );
}

function SizeItem({ toggle, active, name }) {
    return (
        <li onClick={toggle}>
            <p className={cn(styles.menu_elem, styles.size, { [styles.active]: active })}>
                <span className={styles.size_elem} />
                { name }
            </p>
        </li>
    );
}

function SizeMenu({ activeSizes, existingSizes, toggle, t }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li>
            <div className={styles.menu_elem} onClick={() => setExpanded(prev => !prev)}>
                <span className={cn(styles.submenu_icn, { [styles.active]: expanded })} />
                { t("size-caps") }
            </div>
            <div className={cn(styles.submenu_container, { [styles.opened]: expanded })}>
                <ul>{
                    existingSizes.map(size => (
                        <SizeItem
                            key={size} name={size}
                            toggle={() => toggle(size)}
                            active={activeSizes.includes(size)}
                        />
                    ))
                }</ul>
            </div>
        </li>
    );
}

function ProductList({ products, t }) {
    const divided = useMemo(() => divideArrayToSubarrays(products, 4), [products]);
    return divided.map((sublist, index) => (
        <div key={index} className={styles.row}>{
            sublist.map((data, index) => <ProductCard key={index} data={data} t={t} />)
        }</div>
    ));
}