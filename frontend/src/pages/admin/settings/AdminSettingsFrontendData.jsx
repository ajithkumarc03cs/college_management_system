import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminFrontendData() {

    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("home");


    const sections = [
        {
            id: "home",
            name: "Home",
            icon: "🏠",
            path: "/admin/frontend-data/home",
        },
        {
            id: "about",
            name: "About",
            icon: "ℹ️",
            path: "/admin/frontend-data/about",
        },
        {
            id: "courses",
            name: "Courses",
            icon: "🎓",
            path: "/admin/frontend-data/courses",
        },
        {
            id: "departments",
            name: "Departments",
            icon: "🏢",
            path: "/admin/frontend-data/departments",
        },
        {
            id: "admissions",
            name: "Admissions",
            icon: "📝",
            path: "/admin/frontend-data/admissions",
        },
        {
            id: "gallery",
            name: "Gallery",
            icon: "🖼️",
            path: "/admin/frontend-data/gallery",
        },
        {
            id: "events",
            name: "Events",
            icon: "📅",
            path: "/admin/frontend-data/events",
        },
        {
            id: "notices",
            name: "Notices",
            icon: "📢",
            path: "/admin/frontend-data/notices",
        },
        {
            id: "placements",
            name: "Placements",
            icon: "💼",
            path: "/admin/frontend-data/placements",
        },
        {
            id: "contact",
            name: "Contact",
            icon: "📞",
            path: "/admin/frontend-data/contact",
        },
    ];


    const currentSection = sections.find(
        (section) => section.id === activeSection
    );


    const handleSectionClick = (section) => {

        setActiveSection(section.id);

        navigate(section.path);

    };


    return (
        <div className="admin-settings-page">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Frontend Data
                    </h1>

                    <p>
                        Manage public website content.
                    </p>

                </div>

            </div>


            {/* ==========================================
                FRONTEND DATA LAYOUT
            ========================================== */}

            <div className="frontend-data-layout">


                {/* ======================================
                    INNER SIDEBAR
                ====================================== */}

                <div className="frontend-data-sidebar">

                    <div className="frontend-data-sidebar-header">

                        <h3>
                            FRONTEND DATA
                        </h3>

                    </div>


                    <div className="frontend-data-menu">

                        {sections.map((section) => (

                            <button
                                key={section.id}
                                type="button"
                                className={
                                    activeSection === section.id
                                        ? "frontend-data-menu-item active"
                                        : "frontend-data-menu-item"
                                }
                                onClick={() =>
                                    handleSectionClick(section)
                                }
                            >

                                <span className="frontend-data-icon">
                                    {section.icon}
                                </span>

                                <span>
                                    {section.name}
                                </span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* ======================================
                    CONTENT
                ====================================== */}

                <div className="frontend-data-content">

                    <div className="admin-settings-card">


                        <div className="settings-card-header">

                            <div>

                                <h2>
                                    {currentSection?.name}
                                </h2>

                                <p>
                                    Manage public website{" "}
                                    {currentSection?.name}
                                    {" "}data.
                                </p>

                            </div>

                        </div>


                        <div className="frontend-data-placeholder">

                            <div className="frontend-data-placeholder-icon">
                                {currentSection?.icon}
                            </div>


                            <h3>
                                {currentSection?.name}
                            </h3>


                            <p>
                                {currentSection?.name} management
                                will be available here.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminFrontendData;