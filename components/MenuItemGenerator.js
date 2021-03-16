import Link from "next/link";

export function getMenuItem(style) {
    return function MenuItem({ href, title }) {
        return (
            <li>
                <Link href={href}>
                    <a className={style}>{ title }</a>
                </Link>
            </li>
        );
    };
}