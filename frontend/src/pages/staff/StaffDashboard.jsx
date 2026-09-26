import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";


function StaffDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ========================================================
    // LOAD STAFF DASHBOARD
    // ========================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "staff/dashboard/"
            );

            console.log(
                "Staff Dashboard:",
                response.data
            );

            setDashboard(
                response.data
            );

        } catch (error) {

            console.error(
                "Staff Dashboard Error:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load staff dashboard."
            );

        } finally {

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
            <div className="staff-page staff-dashboard-page">

                <div className="staff-state-card">

                    <div className="staff-spinner"></div>

                    <h2>
                        Staff Dashboard
                    </h2>

                    <p>
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // ========================================================
    // ERROR
    // ========================================================

    if (error) {

        return (
            <div className="staff-page staff-dashboard-page">

                <div className="staff-state-card">

                    <div className="staff-state-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to Load Dashboard
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="staff-btn staff-btn-primary"
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
            <div className="staff-page staff-dashboard-page">

                <div className="staff-state-card">

                    <div className="staff-state-icon">
                        📊
                    </div>

                    <h2>
                        No Dashboard Data
                    </h2>

                    <p>
                        No dashboard data available.
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="staff-page staff-dashboard-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="staff-page-header">

                <div>

                    <h1 className="staff-page-title">
                        Staff Dashboard
                    </h1>

                    <p className="staff-page-subtitle">
                        Welcome back. Manage your classes,
                        exams, attendance and assignments.
                    </p>

                </div>

                <button
                    className="staff-btn staff-btn-primary"
                    onClick={loadDashboard}
                >
                    ↻ Refresh
                </button>

            </div>


            {/* =================================================
                STAFF PROFILE
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            Staff Profile
                        </h2>

                        <p className="staff-section-subtitle">
                            Your account information
                        </p>

                    </div>

                </div>


                <div className="staff-detail-grid">

                    <div className="staff-detail-item">

                        <span className="staff-detail-label">
                            Username
                        </span>

                        <span className="staff-detail-value">
                            {dashboard.username || "-"}
                        </span>

                    </div>


                    <div className="staff-detail-item">

                        <span className="staff-detail-label">
                            Email
                        </span>

                        <span className="staff-detail-value">
                            {dashboard.email || "-"}
                        </span>

                    </div>


                    <div className="staff-detail-item">

                        <span className="staff-detail-label">
                            Role
                        </span>

                        <span className="staff-detail-value">
                            {dashboard.role || "-"}
                        </span>

                    </div>


                    <div className="staff-detail-item">

                        <span className="staff-detail-label">
                            Department
                        </span>

                        <span className="staff-detail-value">
                            {dashboard.department || "-"}
                        </span>

                    </div>

                </div>

            </section>


            {/* =================================================
                ASSIGNED INFORMATION
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            My Assigned Information
                        </h2>

                        <p className="staff-section-subtitle">
                            Overview of your academic responsibilities
                        </p>

                    </div>

                </div>


                <div className="staff-stat-grid">


                    {/* ASSIGNED SUBJECTS */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            📚
                        </div>

                        <span className="staff-stat-label">
                            Assigned Subjects
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.assigned_subjects ?? 0}
                        </strong>

                        <Link
                            to="/staff/exams"
                            className="staff-stat-link"
                        >
                            View My Exams →
                        </Link>

                    </div>


                    {/* ASSIGNED CLASSES */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            🏫
                        </div>

                        <span className="staff-stat-label">
                            Assigned Classes
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.assigned_classes ?? 0}
                        </strong>

                        <Link
                            to="/staff/students"
                            className="staff-stat-link"
                        >
                            View Students →
                        </Link>

                    </div>


                    {/* OVERALL STUDENTS */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            🎓
                        </div>

                        <span className="staff-stat-label">
                            Overall Students
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.overall_students ?? 0}
                        </strong>

                        <Link
                            to="/staff/students"
                            className="staff-stat-link"
                        >
                            View Students →
                        </Link>

                    </div>

                </div>

            </section>


            {/* =================================================
                ASSIGNED CLASSES
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            My Assigned Classes
                        </h2>

                        <p className="staff-section-subtitle">
                            Subjects and classes assigned to you
                        </p>

                    </div>

                    <Link
                        to="/staff/students"
                        className="staff-btn staff-btn-secondary"
                    >
                        View Students
                    </Link>

                </div>


                {dashboard.classes?.length > 0 ? (

                    <div className="staff-table-card">

                        <div className="staff-table-wrap">

                            <table className="staff-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Subject
                                        </th>

                                        <th>
                                            Subject Code
                                        </th>

                                        <th>
                                            Course / Class
                                        </th>

                                        <th>
                                            Department
                                        </th>

                                        <th>
                                            Year
                                        </th>

                                        <th>
                                            Students
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {dashboard.classes.map(
                                        (item, index) => (

                                            <tr
                                                key={
                                                    item.subject_id ||
                                                    index
                                                }
                                            >

                                                <td>
                                                    <strong>
                                                        {item.subject_name ||
                                                            "-"}
                                                    </strong>
                                                </td>


                                                <td>
                                                    <span className="staff-code">
                                                        {item.subject_code ||
                                                            "-"}
                                                    </span>
                                                </td>


                                                <td>
                                                    {item.course_name ||
                                                        "-"}
                                                </td>


                                                <td>
                                                    {item.department_name ||
                                                        "-"}
                                                </td>


                                                <td>
                                                    {item.year ?? "-"}
                                                </td>


                                                <td>

                                                    <Link
                                                        to="/staff/students"
                                                        className="staff-table-link"
                                                    >
                                                        {item.student_count ??
                                                            0}
                                                    </Link>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                ) : (

                    <div className="staff-empty">

                        <div className="staff-empty-icon">
                            📚
                        </div>

                        <p>
                            No subjects or classes assigned.
                        </p>

                    </div>

                )}

            </section>


            {/* =================================================
                EXAMS
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            Exams
                        </h2>

                        <p className="staff-section-subtitle">
                            Overview of your assigned examinations
                        </p>

                    </div>

                    <Link
                        to="/staff/exams"
                        className="staff-btn staff-btn-secondary"
                    >
                        Manage Exams
                    </Link>

                </div>


                <div className="staff-stat-grid">


                    {/* TOTAL */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            📝
                        </div>

                        <span className="staff-stat-label">
                            Total Exams
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.exams ?? 0}
                        </strong>

                        <Link
                            to="/staff/exams"
                            className="staff-stat-link"
                        >
                            View Exams →
                        </Link>

                    </div>


                    {/* UPCOMING */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            📅
                        </div>

                        <span className="staff-stat-label">
                            Upcoming Exams
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.upcoming_exams ?? 0}
                        </strong>

                        <Link
                            to="/staff/exams"
                            className="staff-stat-link"
                        >
                            View Upcoming →
                        </Link>

                    </div>


                    {/* COMPLETED */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            ✅
                        </div>

                        <span className="staff-stat-label">
                            Completed Exams
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.completed_exams ?? 0}
                        </strong>

                        <Link
                            to="/staff/exams"
                            className="staff-stat-link"
                        >
                            View Completed →
                        </Link>

                    </div>

                </div>

            </section>


            {/* =================================================
                EXAM PARTICIPATION
            ================================================= */}

            <section className="staff-section">

                <div className="staff-action-card">

                    <div className="staff-action-icon">
                        ✓
                    </div>

                    <div className="staff-action-content">

                        <h3>
                            Exam Participation
                        </h3>

                        <p>
                            Manage student exam participation
                            and marks.
                        </p>

                    </div>

                    <Link
                        to="/staff/exam-participation"
                        className="staff-btn staff-btn-primary"
                    >
                        Manage →
                    </Link>

                </div>

            </section>


            {/* =================================================
                ASSIGNMENTS
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            Assignments
                        </h2>

                        <p className="staff-section-subtitle">
                            Assignment and submission overview
                        </p>

                    </div>

                    <Link
                        to="/staff/assignments"
                        className="staff-btn staff-btn-secondary"
                    >
                        Manage Assignments
                    </Link>

                </div>


                <div className="staff-stat-grid">


                    {/* TOTAL */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            📂
                        </div>

                        <span className="staff-stat-label">
                            Total Assignments
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.assignments ?? 0}
                        </strong>

                        <Link
                            to="/staff/assignments"
                            className="staff-stat-link"
                        >
                            View Assignments →
                        </Link>

                    </div>


                    {/* PENDING */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            ⏳
                        </div>

                        <span className="staff-stat-label">
                            Pending Submissions
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.pending_submissions ?? 0}
                        </strong>

                        <Link
                            to="/staff/assignment-submissions"
                            className="staff-stat-link"
                        >
                            Review Submissions →
                        </Link>

                    </div>


                    {/* APPROVED */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            ✅
                        </div>

                        <span className="staff-stat-label">
                            Approved
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.approved_submissions ?? 0}
                        </strong>

                        <Link
                            to="/staff/assignment-submissions"
                            className="staff-stat-link"
                        >
                            View Submissions →
                        </Link>

                    </div>


                    {/* REJECTED */}

                    <div className="staff-stat-card">

                        <div className="staff-stat-icon">
                            ❌
                        </div>

                        <span className="staff-stat-label">
                            Rejected
                        </span>

                        <strong className="staff-stat-value">
                            {dashboard.rejected_submissions ?? 0}
                        </strong>

                        <Link
                            to="/staff/assignment-submissions"
                            className="staff-stat-link"
                        >
                            View Submissions →
                        </Link>

                    </div>

                </div>

            </section>


            {/* =================================================
                ATTENDANCE
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            Attendance
                        </h2>

                        <p className="staff-section-subtitle">
                            Manage and review student attendance
                        </p>

                    </div>

                </div>


                <div className="staff-action-grid">


                    {/* RECORDS */}

                    <div className="staff-action-card">

                        <div className="staff-action-icon">
                            📊
                        </div>

                        <div className="staff-action-content">

                            <h3>
                                Attendance Records
                            </h3>

                            <strong>
                                {dashboard.attendance_records ?? 0}
                            </strong>

                        </div>

                    </div>


                    {/* MANAGE */}

                    <Link
                        to="/staff/attendance"
                        className="staff-action-card staff-action-link"
                    >

                        <div className="staff-action-icon">
                            ✓
                        </div>

                        <div className="staff-action-content">

                            <h3>
                                Manage Attendance
                            </h3>

                            <p>
                                Mark student attendance
                            </p>

                        </div>

                        <span className="staff-arrow">
                            →
                        </span>

                    </Link>


                    {/* HISTORY */}

                    <Link
                        to="/staff/attendance/history"
                        className="staff-action-card staff-action-link"
                    >

                        <div className="staff-action-icon">
                            📈
                        </div>

                        <div className="staff-action-content">

                            <h3>
                                Attendance History
                            </h3>

                            <p>
                                View previous attendance
                            </p>

                        </div>

                        <span className="staff-arrow">
                            →
                        </span>

                    </Link>

                </div>

            </section>


            {/* =================================================
                RE-EXAMS
            ================================================= */}

            <section className="staff-section">

                <div className="staff-section-header">

                    <div>

                        <h2 className="staff-section-title">
                            Re-Exams
                        </h2>

                        <p className="staff-section-subtitle">
                            Manage student re-examinations
                        </p>

                    </div>

                </div>


                <div className="staff-action-grid">


                    {/* COUNT */}

                    <div className="staff-action-card">

                        <div className="staff-action-icon">
                            🔄
                        </div>

                        <div className="staff-action-content">

                            <h3>
                                Total Re-Exams
                            </h3>

                            <strong>
                                {dashboard.reexams ?? 0}
                            </strong>

                        </div>

                    </div>


                    {/* MANAGE */}

                    <Link
                        to="/staff/reexams"
                        className="staff-action-card staff-action-link"
                    >

                        <div className="staff-action-icon">
                            📝
                        </div>

                        <div className="staff-action-content">

                            <h3>
                                Manage Re-Exams
                            </h3>

                            <p>
                                View and manage re-exams
                            </p>

                        </div>

                        <span className="staff-arrow">
                            →
                        </span>

                    </Link>

                </div>

            </section>

        </div>
    );
}


export default StaffDashboard;