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

            setDashboard(response.data);

        }

        catch (error) {

            console.error(
                "Staff Dashboard Error:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load staff dashboard."
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

            <div className="staff-page staff-dashboard-page">

                <div className="staff-page-header">

                    <div>

                        <h1>
                            Staff Dashboard
                        </h1>

                        <p>
                            Loading your dashboard information...
                        </p>

                    </div>

                </div>


                <div className="staff-dashboard-loading">

                    <div className="staff-loading-spinner"></div>

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

                <div className="staff-page-header">

                    <div>

                        <h1>
                            Staff Dashboard
                        </h1>

                        <p>
                            Manage your academic activities
                        </p>

                    </div>

                </div>


                <div className="staff-alert staff-alert-error">

                    <div>

                        <strong>
                            Unable to load dashboard
                        </strong>

                        <p>
                            {error}
                        </p>

                    </div>


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

                <div className="staff-page-header">

                    <div>

                        <h1>
                            Staff Dashboard
                        </h1>

                        <p>
                            Manage your academic activities
                        </p>

                    </div>

                </div>


                <div className="staff-empty-state">

                    <div className="staff-empty-icon">
                        📊
                    </div>

                    <h3>
                        No Dashboard Data
                    </h3>

                    <p>
                        No dashboard data available.
                    </p>

                    <button
                        className="staff-btn staff-btn-primary"
                        onClick={loadDashboard}
                    >
                        Refresh
                    </button>

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

                    <h1>
                        Staff Dashboard
                    </h1>

                    <p>
                        Welcome back! Here's an overview of your
                        academic activities.
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

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            Staff Profile
                        </h2>

                        <p>
                            Your account and department information
                        </p>

                    </div>

                </div>


                <div className="staff-profile-grid">


                    {/* USERNAME */}

                    <div className="staff-profile-card">

                        <div className="staff-profile-icon">
                            👤
                        </div>

                        <div>

                            <span>
                                Username
                            </span>

                            <strong>
                                {dashboard.username || "-"}
                            </strong>

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="staff-profile-card">

                        <div className="staff-profile-icon">
                            ✉️
                        </div>

                        <div>

                            <span>
                                Email
                            </span>

                            <strong>
                                {dashboard.email || "-"}
                            </strong>

                        </div>

                    </div>


                    {/* ROLE */}

                    <div className="staff-profile-card">

                        <div className="staff-profile-icon">
                            🛡️
                        </div>

                        <div>

                            <span>
                                Role
                            </span>

                            <strong>
                                {dashboard.role || "-"}
                            </strong>

                        </div>

                    </div>


                    {/* DEPARTMENT */}

                    <div className="staff-profile-card">

                        <div className="staff-profile-icon">
                            🏢
                        </div>

                        <div>

                            <span>
                                Department
                            </span>

                            <strong>
                                {dashboard.department || "-"}
                            </strong>

                        </div>

                    </div>


                </div>

            </section>



            {/* =================================================
                ASSIGNED INFORMATION
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            My Assigned Information
                        </h2>

                        <p>
                            Overview of your assigned subjects,
                            classes and students
                        </p>

                    </div>

                </div>


                <div className="staff-dashboard-cards">


                    {/* ASSIGNED SUBJECTS */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-top">

                            <div className="staff-card-icon">
                                📚
                            </div>

                        </div>


                        <span>
                            Assigned Subjects
                        </span>


                        <strong>
                            {dashboard.assigned_subjects ?? 0}
                        </strong>


                        <Link to="/staff/exams">
                            View My Exams →
                        </Link>

                    </div>



                    {/* ASSIGNED CLASSES */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-top">

                            <div className="staff-card-icon">
                                🏫
                            </div>

                        </div>


                        <span>
                            Assigned Classes
                        </span>


                        <strong>
                            {dashboard.assigned_classes ?? 0}
                        </strong>


                        <Link to="/staff/students">
                            View Students →
                        </Link>

                    </div>



                    {/* OVERALL STUDENTS */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-top">

                            <div className="staff-card-icon">
                                🎓
                            </div>

                        </div>


                        <span>
                            Overall Students
                        </span>


                        <strong>
                            {dashboard.overall_students ?? 0}
                        </strong>


                        <Link to="/staff/students">
                            View Students →
                        </Link>

                    </div>


                </div>

            </section>



            {/* =================================================
                ASSIGNED CLASS DETAILS
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            My Assigned Classes
                        </h2>

                        <p>
                            Subjects and classes assigned to you
                        </p>

                    </div>

                </div>


                {

                    dashboard.classes?.length > 0 ? (

                        <div className="staff-table-card">

                            <div className="staff-table-wrapper">

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

                                        {

                                            dashboard.classes.map(
                                                (item, index) => (

                                                    <tr
                                                        key={
                                                            item.subject_id ||
                                                            index
                                                        }
                                                    >

                                                        <td>

                                                            <strong>
                                                                {
                                                                    item.subject_name ||
                                                                    "-"
                                                                }
                                                            </strong>

                                                        </td>


                                                        <td>

                                                            <span className="staff-code">

                                                                {
                                                                    item.subject_code ||
                                                                    "-"
                                                                }

                                                            </span>

                                                        </td>


                                                        <td>

                                                            {
                                                                item.course_name ||
                                                                "-"
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                item.department_name ||
                                                                "-"
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                item.year ??
                                                                "-"
                                                            }

                                                        </td>


                                                        <td>

                                                            <Link
                                                                className="staff-table-link"
                                                                to="/staff/students"
                                                            >

                                                                {
                                                                    item.student_count ??
                                                                    0
                                                                }

                                                            </Link>

                                                        </td>

                                                    </tr>

                                                )
                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    ) : (

                        <div className="staff-empty-state staff-empty-small">

                            <div className="staff-empty-icon">
                                📚
                            </div>

                            <h3>
                                No Assigned Classes
                            </h3>

                            <p>
                                No subjects or classes assigned.
                            </p>

                        </div>

                    )

                }

            </section>



            {/* =================================================
                EXAMS
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            Exams
                        </h2>

                        <p>
                            Overview of your examination activities
                        </p>

                    </div>

                </div>


                <div className="staff-dashboard-cards">


                    {/* TOTAL EXAMS */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            📝
                        </div>

                        <span>
                            Total Exams
                        </span>

                        <strong>
                            <Link to="/staff/exams">

                                {dashboard.exams ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/exams">
                            Manage Exams →
                        </Link>

                    </div>



                    {/* UPCOMING EXAMS */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            📅
                        </div>

                        <span>
                            Upcoming Exams
                        </span>

                        <strong>
                            <Link to="/staff/exams">

                                {dashboard.upcoming_exams ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/exams">
                            View Upcoming →
                        </Link>

                    </div>



                    {/* COMPLETED EXAMS */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            ✅
                        </div>

                        <span>
                            Completed Exams
                        </span>

                        <strong>
                            <Link to="/staff/exams">

                                {dashboard.completed_exams ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/exams">
                            View Completed →
                        </Link>

                    </div>


                </div>

            </section>



            {/* =================================================
                EXAM PARTICIPATION
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            Exam Participation
                        </h2>

                        <p>
                            Manage student participation and marks
                        </p>

                    </div>

                </div>


                <div className="staff-action-card">

                    <div className="staff-action-icon">
                        📊
                    </div>


                    <div className="staff-action-content">

                        <h3>
                            Manage Exam Participation
                        </h3>

                        <p>
                            Update student attendance status and
                            examination marks.
                        </p>

                    </div>


                    <Link
                        className="staff-btn staff-btn-primary"
                        to="/staff/exam-participation"
                    >
                        Manage →
                    </Link>

                </div>

            </section>



            {/* =================================================
                ASSIGNMENTS
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            Assignments
                        </h2>

                        <p>
                            Overview of assignments and submissions
                        </p>

                    </div>

                </div>


                <div className="staff-dashboard-cards">


                    {/* TOTAL ASSIGNMENTS */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            📂
                        </div>

                        <span>
                            Total Assignments
                        </span>

                        <strong>
                            <Link to="/staff/assignments">

                                {dashboard.assignments ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/assignments">
                            Manage Assignments →
                        </Link>

                    </div>



                    {/* PENDING */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            ⏳
                        </div>

                        <span>
                            Pending Submissions
                        </span>

                        <strong>
                            <Link to="/staff/assignment-submissions">

                                {dashboard.pending_submissions ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/assignment-submissions">
                            Review Submissions →
                        </Link>

                    </div>



                    {/* APPROVED */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            ✅
                        </div>

                        <span>
                            Approved Submissions
                        </span>

                        <strong>
                            <Link to="/staff/assignment-submissions">

                                {dashboard.approved_submissions ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/assignment-submissions">
                            View Approved →
                        </Link>

                    </div>



                    {/* REJECTED */}

                    <div className="staff-dashboard-card">

                        <div className="staff-card-icon">
                            ❌
                        </div>

                        <span>
                            Rejected Submissions
                        </span>

                        <strong>
                            <Link to="/staff/assignment-submissions">

                                {dashboard.rejected_submissions ?? 0}

                            </Link>
                        </strong>

                        <Link to="/staff/assignment-submissions">
                            View Rejected →
                        </Link>

                    </div>


                </div>

            </section>



            {/* =================================================
                ATTENDANCE
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            Attendance
                        </h2>

                        <p>
                            Manage and review student attendance
                        </p>

                    </div>

                </div>


                <div className="staff-action-card">

                    <div className="staff-action-icon">
                        📅
                    </div>


                    <div className="staff-action-content">

                        <h3>
                            Attendance Records
                        </h3>

                        <p>

                            Total attendance records:{" "}

                            <strong>
                                {dashboard.attendance_records ?? 0}
                            </strong>

                        </p>

                    </div>


                    <div className="staff-action-links">

                        <Link
                            className="staff-btn staff-btn-primary"
                            to="/staff/attendance"
                        >
                            Manage Attendance
                        </Link>


                        <Link
                            className="staff-btn staff-btn-secondary"
                            to="/staff/attendance/history"
                        >
                            View History
                        </Link>

                    </div>

                </div>

            </section>



            {/* =================================================
                RE-EXAMS
            ================================================= */}

            <section className="staff-dashboard-section">

                <div className="staff-section-header">

                    <div>

                        <h2>
                            Re-Exams
                        </h2>

                        <p>
                            Manage student re-examination schedules
                        </p>

                    </div>

                </div>


                <div className="staff-action-card">

                    <div className="staff-action-icon">
                        🔄
                    </div>


                    <div className="staff-action-content">

                        <h3>
                            Total Re-Exams
                        </h3>

                        <p>

                            Students scheduled for re-examination:{" "}

                            <strong>
                                {dashboard.reexams ?? 0}
                            </strong>

                        </p>

                    </div>


                    <Link
                        className="staff-btn staff-btn-primary"
                        to="/staff/reexams"
                    >
                        Manage Re-Exams →
                    </Link>

                </div>

            </section>


        </div>

    );

}


export default StaffDashboard;