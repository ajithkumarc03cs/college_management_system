import { useState } from "react";

import AdminFrontendHome from "./frontend/AdminFrontendHome";
import AdminFrontendAbout from "./frontend/AdminFrontendAbout";
import AdminCourses from "./AdminCourses";
import AdminFrontendDepartments from "./frontend/AdminFrontendDepartments";
import AdminFrontendAdmissions from "./frontend/AdminFrontendAdmissions";
import AdminFrontendEvents from "./frontend/AdminFrontendEvents";
import AdminFrontendGallery from "./frontend/AdminFrontendGallery";
import AdminFrontendContact from "./frontend/AdminFrontendContact";
import AdminFrontendNotices from "./frontend/AdminFrontendNotices";
import AdminFrontendPlacements from "./frontend/AdminFrontendPlacements";


function AdminFrontendData() {

    const [activeSection, setActiveSection] = useState("home");


    const sections = [
        {
            id: "home",
            name: "Home",
            icon: "🏠",
        },
        {
            id: "about",
            name: "About",
            icon: "ℹ️",
        },
        {
            id: "courses",
            name: "Courses",
            icon: "🎓",
        },
        {
            id: "departments",
            name: "Departments",
            icon: "🏢",
        },
        {
            id: "admissions",
            name: "Admissions",
            icon: "📝",
        },
        {
            id: "gallery",
            name: "Gallery",
            icon: "🖼️",
        },
        {
            id: "events",
            name: "Events",
            icon: "📅",
        },
        {
            id: "notices",
            name: "Notices",
            icon: "📢",
        },
        {
            id: "placements",
            name: "Placements",
            icon: "💼",
        },
        {
            id: "contact",
            name: "Contact",
            icon: "📞",
        },
    ];


    return (
        <div className="admin-settings-page">


            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

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


            {/* =====================================================
                MAIN LAYOUT
            ===================================================== */}

            <div className="frontend-data-layout">


                {/* =================================================
                    INNER SIDEBAR
                ================================================= */}

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
                                    setActiveSection(section.id)
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


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="frontend-data-content">


                    {/* =================================================
                        HOME
                    ================================================= */}

                    {activeSection === "home" && (
                        <AdminFrontendHome />
                    )}


                    {/* =================================================
                        ABOUT
                    ================================================= */}

                    {activeSection === "about" && (
                        <AdminFrontendAbout />
                    )}


                    {/* =================================================
                        COURSES
                    ================================================= */}

                    {activeSection === "courses" && (
                        <AdminCourses />
                    )}


                    {/* =================================================
                        DEPARTMENTS
                    ================================================= */}

                    {activeSection === "departments" && (
                        <AdminFrontendDepartments />
                    )}


                    {/* =================================================
                        ADMISSIONS
                    ================================================= */}

                    {activeSection === "admissions" && (
                        <AdminFrontendAdmissions />
                    )}


                    {/* =================================================
                        EVENTS
                    ================================================= */}

                    {activeSection === "events" && (
                        <AdminFrontendEvents />
                    )}


                    {/* =================================================
                        GALLERY
                    ================================================= */}

                    {activeSection === "gallery" && (
                        <AdminFrontendGallery />
                    )}


                    {/* =================================================
                        NOTICES
                    ================================================= */}

                    {activeSection === "notices" && (
                        <AdminFrontendNotices />
                    )}


                    {/* =================================================
                        PLACEMENTS
                    ================================================= */}

                    {activeSection === "placements" && (
                        <AdminFrontendPlacements />
                    )}


                    {/* =================================================
                        CONTACT
                    ================================================= */}

                    {activeSection === "contact" && (
                        <AdminFrontendContact />
                    )}

                </div>

            </div>

        </div>
    );
}


export default AdminFrontendData;