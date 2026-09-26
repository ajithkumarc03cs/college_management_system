import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../../api/axios";


function HODDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD HOD DASHBOARD
    // ========================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "hod/dashboard/"
            );

            console.log(
                "HOD Dashboard:",
                response.data
            );

            setDashboard(
                response.data
            );

        }

        catch (error) {

            console.error(
                "Failed to load HOD dashboard:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load HOD dashboard."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadDashboard();

    }, []);


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="hod-page hod-dashboard-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Dashboard
                        </h1>

                        <p className="hod-page-subtitle">
                            Loading dashboard...
                        </p>

                    </div>

                </div>

                <div className="hod-loading-card">
                    Loading dashboard...
                </div>

            </div>

        );

    }


    // ========================================================
    // ERROR
    // ========================================================

    if (error) {

        return (

            <div className="hod-page hod-dashboard-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Dashboard
                        </h1>

                        <p className="hod-page-subtitle">
                            Department overview
                        </p>

                    </div>

                </div>

                <div className="hod-alert hod-alert-error">

                    <p>
                        {error}
                    </p>

                    <button
                        className="hod-btn hod-btn-primary"
                        onClick={loadDashboard}
                    >
                        Retry
                    </button>

                </div>

            </div>

        );

    }


    // ========================================================
    // NO DATA
    // ========================================================

    if (!dashboard) {

        return (

            <div className="hod-page hod-dashboard-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Dashboard
                        </h1>

                    </div>

                </div>

                <div className="hod-card hod-empty-state">

                    No dashboard data available.

                </div>

            </div>

        );

    }


    return (

        <div className="hod-page hod-dashboard-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="hod-page-header">

                <div>

                    <h1 className="hod-page-title">
                        HOD Dashboard
                    </h1>

                    <p className="hod-page-subtitle">
                        Department academic and management overview
                    </p>

                </div>

                <button
                    className="hod-btn hod-btn-primary"
                    onClick={loadDashboard}
                >
                    Refresh Dashboard
                </button>

            </div>


            {/* =================================================
                DEPARTMENT
            ================================================= */}

            <div className="hod-card hod-department-card">

                <div className="hod-section-title">

                    <div>

                        <h2>
                            Department
                        </h2>

                        <p>
                            Current HOD department
                        </p>

                    </div>

                </div>


                <div className="hod-department-info">

                    <div>

                        <span>
                            Department ID
                        </span>

                        <strong>
                            {dashboard.department?.id || "-"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Department Name
                        </span>

                        <strong>
                            {dashboard.department?.name || "-"}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                USERS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Users
                        </h2>

                        <p>
                            Students and staff under your department
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    {/* STUDENTS */}

                    <Link
                        to="/hod/students"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                🎓
                            </div>

                            <span className="hod-stat-title">
                                Students
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.students ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                View Students →
                            </span>

                        </div>

                    </Link>


                    {/* STAFF */}

                    <Link
                        to="/hod/staff"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                👨‍🏫
                            </div>

                            <span className="hod-stat-title">
                                Staff
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.staff ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                View Staff →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                ACADEMICS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Academics
                        </h2>

                        <p>
                            Academic resources
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    <Link
                        to="/hod/subjects"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                📖
                            </div>

                            <span className="hod-stat-title">
                                Subjects
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.subjects ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                View Subjects →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                STAFF SUBJECT ASSIGNMENTS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Staff Subject Assignments
                        </h2>

                        <p>
                            Staff and subject allocation
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    <Link
                        to="/hod/staff/assignments"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                🔗
                            </div>

                            <span className="hod-stat-title">
                                Assigned Subjects
                            </span>

                            <strong className="hod-stat-value">
                                {
                                    dashboard.staff_subject_assignments
                                    ?? 0
                                }
                            </strong>

                            <span className="hod-stat-link">
                                Manage Assignments →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                EXAMS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Exams
                        </h2>

                        <p>
                            Examination overview
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    <Link
                        to="/hod/exams"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                📝
                            </div>

                            <span className="hod-stat-title">
                                Total Exams
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.exams ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                Manage Exams →
                            </span>

                        </div>

                    </Link>


                    <Link
                        to="/hod/exams"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                📅
                            </div>

                            <span className="hod-stat-title">
                                Upcoming Exams
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.upcoming_exams ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                View Upcoming →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                ASSIGNMENTS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Assignments
                        </h2>

                        <p>
                            Department assignments
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    <Link
                        to="/hod/assignments"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                📂
                            </div>

                            <span className="hod-stat-title">
                                Total Assignments
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.assignments ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                Manage Assignments →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                ATTENDANCE
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Attendance
                        </h2>

                        <p>
                            Department attendance records
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    <Link
                        to="/hod/attendance"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                ✓
                            </div>

                            <span className="hod-stat-title">
                                Attendance Records
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.attendance_records ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                View Attendance →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                RE-EXAMS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Re-Exams
                        </h2>

                        <p>
                            Re-examination overview
                        </p>

                    </div>

                </div>


                <div className="hod-stats-grid">

                    <Link
                        to="/hod/reexams"
                        className="hod-stat-card-link"
                    >

                        <div className="hod-stat-card">

                            <div className="hod-stat-icon">
                                🔄
                            </div>

                            <span className="hod-stat-title">
                                Total Re-Exams
                            </span>

                            <strong className="hod-stat-value">
                                {dashboard.reexams ?? 0}
                            </strong>

                            <span className="hod-stat-link">
                                Manage Re-Exams →
                            </span>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =================================================
                QUICK ACCESS
            ================================================= */}

            <div className="hod-section-block">

                <div className="hod-section-heading">

                    <div>

                        <h2>
                            Quick Access
                        </h2>

                        <p>
                            Frequently used HOD pages
                        </p>

                    </div>

                </div>


                <div className="hod-quick-grid">

                    <Link to="/hod/students" className="hod-quick-card">
                        🎓
                        <span>Students</span>
                    </Link>

                    <Link to="/hod/staff" className="hod-quick-card">
                        👨‍🏫
                        <span>Staff</span>
                    </Link>

                    <Link to="/hod/subjects" className="hod-quick-card">
                        📖
                        <span>Subjects</span>
                    </Link>

                    <Link
                        to="/hod/staff/assignments"
                        className="hod-quick-card"
                    >
                        🔗
                        <span>Staff Subject Assignments</span>
                    </Link>

                    <Link to="/hod/exams" className="hod-quick-card">
                        📝
                        <span>Exams</span>
                    </Link>

                    <Link to="/hod/assignments" className="hod-quick-card">
                        📂
                        <span>Assignments</span>
                    </Link>

                    <Link to="/hod/attendance" className="hod-quick-card">
                        ✓
                        <span>Attendance</span>
                    </Link>

                    <Link to="/hod/reexams" className="hod-quick-card">
                        🔄
                        <span>Re-Exams</span>
                    </Link>

                </div>

            </div>

        </div>

    );

}


export default HODDashboard;