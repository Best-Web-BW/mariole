import { useEffect, useState } from "react";
import Controls from "./controls/Controls";
import styles from "./Header.module.scss";
import Search from "./search/Search";
import Logout from "./logout/Logout";
import ForAdmin from "../ForAdmin";
import Menu from "./menu/Menu";
import cn from "classnames";

export default function Header({ t }) {
    const [sticky, setSticky] = useState(false);
    useEffect(() => {
        const handler = () => setSticky(window.scrollY > 0);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const [menuOpened, setMenuOpened] = useState(false);
    const [searchOpened, setSearchOpened] = useState(false);

    return (
        <div className={cn(styles.header, { [styles.sticky]: sticky })}>
            <ForAdmin>
                <Logout />
            </ForAdmin>
            <Controls
                openMenu={() => setMenuOpened(true)}
                toggleSearch={() => setSearchOpened(prev => !prev)}
            />
            <Menu opened={menuOpened} close={() => setMenuOpened(false)} t={t.menu} />
            <Search opened={searchOpened} close={() => setSearchOpened(false)} t={t.search} />
        </div>
    );
}