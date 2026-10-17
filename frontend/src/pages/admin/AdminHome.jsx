
import { useState } from "react";
import "./AdminHome.css";

import AdminHomeCourses from "./AdminHomeCourses";
import AdminFrontendHome from "./frontend/AdminFrontendHome";
function AdminHome() {
    const [activeSection, setActiveSection] = useState("hero");

    const sections = [
        { id: "hero", label: "Hero" },
        { id: "statistics", label: "Statistics" },
        { id: "about", label: "About" },
        { id: "courses", label: "Courses" },
        { id: "offers", label: "Offers" },
        { id: "departments", label: "Departments" },
        { id: "why", label: "Why Choose Us" },
        { id: "facilities", label: "Facilities" },
        { id: "events", label: "Events" },
        { id: "notices", label: "Notices" },
        { id: "placements", label: "Placements" },
        { id: "gallery", label: "Gallery" },
        { id: "testimonials", label: "Testimonials" },
        { id: "contact", label: "Contact" },
    ];

    const activeSectionData = sections.find(
        (section) => section.id === activeSection
    );

    const activeLabel = activeSectionData?.label || "Hero";

    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
    };

    const renderActiveSection = () => {
        switch (activeSection) {
           case "hero":
                return (
                    <div className="admin-home-hero-wrapper">
                        <AdminFrontendHome />
                    </div>
                );
            case "courses":
                return <AdminHomeCourses />;

            default:
                return (
                    <div className="admin-home-placeholder">
                        <div className="admin-home-placeholder-icon">
                            <span aria-hidden="true">⚙️</span>
                        </div>

                        <h3>{activeLabel} Management</h3>

                        <p>
                            Manage your website's{" "}
                            {activeLabel.toLowerCase()} section from here.
                        </p>

                        <span className="admin-home-coming-soon">
                            Management form coming soon
                        </span>
                    </div>
                );
        }
    };
    return (
        <div className="admin-home-page">
            {/* PAGE HEADER */}
            <header className="admin-home-header">
                <div>
                    <h1>Home Page Management</h1>
                    <p>
                        Manage all public website home page content.
                    </p>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="admin-home-content">
                {/* SIDEBAR */}
                <aside className="admin-home-sidebar">
                    <h3>Home Sections</h3>

                    <nav
                        className="admin-home-menu"
                        aria-label="Home page sections"
                    >
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className={
                                    activeSection === section.id
                                        ? "admin-home-menu-item active"
                                        : "admin-home-menu-item"
                                }
                                onClick={() =>
                                    handleSectionChange(section.id)
                                }
                                aria-current={
                                    activeSection === section.id
                                        ? "page"
                                        : undefined
                                }
                            >
                                <span>{section.label}</span>

                                {activeSection === section.id && (
                                    <span
                                        className="admin-home-active-indicator"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* SECTION CONTENT */}
                <main className="admin-home-main">
                    <div className="admin-home-section-header">
                        <div>
                            <span className="admin-home-breadcrumb">
                                Home Page / Management
                            </span>

                            <h2>{activeLabel}</h2>
                        </div>

                        <span className="admin-home-section-badge">
                            {sections.findIndex(
                                (section) =>
                                    section.id === activeSection
                            ) + 1}{" "}
                            / {sections.length} Sections
                        </span>
                    </div>

                    <div
                        className="admin-home-section-content"
                        key={activeSection}
                    >
                        {renderActiveSection()}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminHome;
