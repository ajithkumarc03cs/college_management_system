import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import api from "../../../api/axios";

import "./PublicHeader.css";


function PublicHeader() {

    // ============================================================
    // DATA
    // ============================================================

    const [menus, setMenus] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ============================================================
    // FETCH WEBSITE MENUS
    // ============================================================

    useEffect(() => {

        const fetchMenus = async () => {

            try {

                setLoading(true);

                setError("");


                const response = await api.get(
                    "public/website-menus/"
                );


                // ==================================================
                // ONLY ACTIVE MENUS
                // ==================================================

                const activeMenus = response.data
                    .filter(
                        (menu) => menu.is_active === true
                    )
                    .sort(
                        (a, b) =>
                            a.order - b.order
                    );


                setMenus(activeMenus);

            } catch (error) {

                console.error(
                    "Failed to load website menus:",
                    error
                );

                setError(
                    "Failed to load website menus."
                );

                setMenus([]);

            } finally {

                setLoading(false);

            }

        };


        fetchMenus();

    }, []);


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <header className="public-header">


            {/* ====================================================
                LOGO
            ==================================================== */}

            <Link
                to="/home"
                className="public-logo"
            >

                <div className="public-logo-icon">
                    🎓
                </div>


                <div className="public-logo-text">

                    <h2>
                        EduManage College
                    </h2>

                    <span>
                        Excellence in Education
                    </span>

                </div>

            </Link>


            {/* ====================================================
                WEBSITE NAVIGATION
            ==================================================== */}

            <nav className="public-nav">


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <span className="public-nav-loading">
                        Loading...
                    </span>

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading && error && (

                    <span className="public-nav-error">
                        {error}
                    </span>

                )}


                {/* =================================================
                    ACTIVE MENUS
                ================================================= */}

                {!loading &&
                    !error &&
                    menus.map((menu) => (


                        /* =========================================
                           OPEN IN NEW TAB
                        ========================================= */

                        menu.open_in_new_tab ? (

                            <a
                                key={menu.id}
                                href={menu.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="public-nav-link"
                            >

                                {menu.name}

                            </a>

                        ) : (


                            /* =====================================
                               NORMAL REACT ROUTE
                            ===================================== */

                            <NavLink
                                key={menu.id}
                                to={menu.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "public-nav-link active"
                                        : "public-nav-link"
                                }
                            >

                                {menu.name}

                            </NavLink>

                        )

                    ))}


            </nav>


            {/* ====================================================
                LOGIN BUTTON
            ==================================================== */}

            <Link
                to="/"
                className="public-login-button"
            >

                Login

            </Link>


        </header>

    );

}


export default PublicHeader;