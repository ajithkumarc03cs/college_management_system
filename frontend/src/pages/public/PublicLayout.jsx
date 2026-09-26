import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";

import "./PublicLayout.css";


function PublicLayout({ children }) {

    return (

        <div className="public-layout">

            {/* ==================================================
                PUBLIC HEADER
            ================================================== */}

            <PublicHeader />


            {/* ==================================================
                PUBLIC PAGE CONTENT
            ================================================== */}

            <main className="public-main">

                {children}

            </main>


            {/* ==================================================
                PUBLIC FOOTER
            ================================================== */}

            <PublicFooter />

        </div>

    );

}


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default PublicLayout;