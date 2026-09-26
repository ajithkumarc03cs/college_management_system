import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";
import "./PublicLayout.css";

function PublicLayout({ children }) {

    return (
        <div className="public-layout">

            <PublicHeader />

            <main className="public-main">
                {children}
            </main>

            <PublicFooter />

        </div>
    );
}

export default PublicLayout;