import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children, role }) {
    return (
        <div className="app-layout">

            <Sidebar role={role} />

            <div className="main-area">

                <Header role={role} />

                <main className="page-content">
                    {children}
                </main>

                <Footer />

            </div>

        </div>
    );
}

export default Layout;