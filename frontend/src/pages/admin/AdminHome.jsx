import { useState } from "react";
import "./AdminHome.css";

import AdminHomeCourses from "./AdminHomeCourses";

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

    const activeLabel =
        sections.find((section) => section.id === activeSection)?.label;

    return (
        <div className="admin-home-page">

            <div className="admin-home-header">
                <div>
                    <h1>Home Page Management</h1>
                    <p>Manage all public website home page content.</p>
                </div>
            </div>

            <div className="admin-home-content">

                <aside className="admin-home-sidebar">

                    <h3>Home Sections</h3>

                    <div className="admin-home-menu">

                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={
                                    activeSection === section.id
                                        ? "admin-home-menu-item active"
                                        : "admin-home-menu-item"
                                }
                                onClick={() =>
                                    setActiveSection(section.id)
                                }
                            >
                                {section.label}
                            </button>
                        ))}

                    </div>

                </aside>

                <main className="admin-home-main">

                    <div className="admin-home-section-header">
                        <h2>{activeLabel}</h2>
                        <span>Home Page</span>
                    </div>

                    {activeSection === "courses" ? (
                        <AdminHomeCourses />
                    ) : (
                        <div className="admin-home-placeholder">
                            <h3>
                                {activeLabel} Management
                            </h3>

                            <p>
                                Management form will be added here.
                            </p>
                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}








export default AdminHome;