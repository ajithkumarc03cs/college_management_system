import { useState } from "react";

import AdminSettingsSidebar from "./AdminSettingsSidebar";
import AdminSettingsPermissions from "./AdminSettingsPermissions";
import AdminSettingsHeader from "./AdminSettingsHeader";
import AdminApplications from "./AdminApplications";


function AdminSettings() {

    const [activeTab, setActiveTab] = useState("sidebar");


    return (

        <div className="admin-settings-page">


            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage system settings and access controls.
                    </p>

                </div>

            </div>


            {/* =====================================================
                SETTINGS LAYOUT
            ===================================================== */}

            <div className="settings-layout">


                {/* =================================================
                    SETTINGS SIDEBAR
                ================================================= */}

                <aside className="settings-sidebar">


                    <div className="settings-sidebar-title">
                        Settings
                    </div>


                    {/* =================================================
                        SIDEBAR
                    ================================================= */}

                    <button
                        type="button"
                        className={
                            activeTab === "sidebar"
                                ? "settings-nav-item active"
                                : "settings-nav-item"
                        }
                        onClick={() =>
                            setActiveTab("sidebar")
                        }
                    >

                        <span className="settings-nav-icon">
                            ☰
                        </span>

                        <span>
                            Sidebar
                        </span>

                    </button>


                    {/* =================================================
                        PERMISSIONS
                    ================================================= */}

                    <button
                        type="button"
                        className={
                            activeTab === "permissions"
                                ? "settings-nav-item active"
                                : "settings-nav-item"
                        }
                        onClick={() =>
                            setActiveTab("permissions")
                        }
                    >

                        <span className="settings-nav-icon">
                            🔐
                        </span>

                        <span>
                            Permissions
                        </span>

                    </button>


                    {/* =================================================
                        WEBSITE HEADER
                    ================================================= */}

                    <button
                        type="button"
                        className={
                            activeTab === "header"
                                ? "settings-nav-item active"
                                : "settings-nav-item"
                        }
                        onClick={() =>
                            setActiveTab("header")
                        }
                    >

                        <span className="settings-nav-icon">
                            🌐
                        </span>

                        <span>
                            Website Header
                        </span>

                    </button>


                    {/* =================================================
                        APPLICATIONS
                    ================================================= */}

                    <button
                        type="button"
                        className={
                            activeTab === "applications"
                                ? "settings-nav-item active"
                                : "settings-nav-item"
                        }
                        onClick={() =>
                            setActiveTab("applications")
                        }
                    >

                        <span className="settings-nav-icon">
                            📩
                        </span>

                        <span>
                            Applications
                        </span>

                    </button>


                </aside>


                {/* =====================================================
                    SETTINGS CONTENT
                ===================================================== */}

                <section className="settings-content">


                    {/* =================================================
                        SIDEBAR CONTENT
                    ================================================= */}

                    {activeTab === "sidebar" && (

                        <div className="settings-topic">


                            <div className="settings-topic-header">

                                <div>

                                    <h2>
                                        Sidebar
                                    </h2>

                                    <p>
                                        Manage sidebar menu items,
                                        order, paths and active status.
                                    </p>

                                </div>

                            </div>


                            <div className="settings-topic-body">

                                <AdminSettingsSidebar />

                            </div>


                        </div>

                    )}


                    {/* =================================================
                        PERMISSIONS CONTENT
                    ================================================= */}

                    {activeTab === "permissions" && (

                        <div className="settings-topic">


                            <div className="settings-topic-header">

                                <div>

                                    <h2>
                                        Permissions
                                    </h2>

                                    <p>
                                        Manage role-based view,
                                        create, edit and delete
                                        permissions.
                                    </p>

                                </div>

                            </div>


                            <div className="settings-topic-body">

                                <AdminSettingsPermissions />

                            </div>


                        </div>

                    )}


                    {/* =================================================
                        WEBSITE HEADER CONTENT
                    ================================================= */}

                    {activeTab === "header" && (

                        <div className="settings-topic">


                            <div className="settings-topic-header">

                                <div>

                                    <h2>
                                        Website Header
                                    </h2>

                                    <p>
                                        Manage public website header
                                        navigation menus.
                                    </p>

                                </div>

                            </div>


                            <div className="settings-topic-body">

                                <AdminSettingsHeader />

                            </div>


                        </div>

                    )}


                    {/* =================================================
                        APPLICATIONS CONTENT
                    ================================================= */}

                    {activeTab === "applications" && (

                        <div className="settings-topic">


                            <div className="settings-topic-header">

                                <div>

                                    <h2>
                                        Course Applications
                                    </h2>

                                    <p>
                                        View applications submitted
                                        by prospective students.
                                    </p>

                                </div>

                            </div>


                            <div className="settings-topic-body">

                                <AdminApplications />

                            </div>


                        </div>

                    )}


                </section>


            </div>


        </div>

    );
}


export default AdminSettings;