import Link from "next/link";

export function getMenuItem(style, onClick) {
    return function MenuItem({ href, title }) {
        return (
            <li>
                <Link href={href}>
                    <a className={style} onClick={onClick}>{ title }</a>
                </Link>
            </li>
        );
    };
}