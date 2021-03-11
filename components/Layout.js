import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }) {
	return (<>
		<Header />
        <main>
            <div id="content">
                { children }
            </div>
        </main>
		<Footer />
    </>);
}