import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

import StatCard from "../components/common/StatCard";
import PageHeader from "../components/common/PageHeader";


function StudentDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                // const response = await api.get("/student-dashboard/");
                const response = await api.get("/student/dashboard/");
                setDashboard(response.data);

            } catch (err) {

                console.error(err);

                setError(
                    err.response?.data?.detail ||
                    "Unable to load dashboard"
                );

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);


    if (loading) {

        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );

    }


    if (error) {

        return (
            <div className="error-state">

                <h3>
                    Dashboard Error
                </h3>

                <p>
                    {error}
                </p>

            </div>
        );

    }


    const student = dashboard?.student || {};
    const exams = dashboard?.exams || {};
    const assignments = dashboard?.assignments || {};
    const reexams = dashboard?.reexams || {};
    const attendance = dashboard?.attendance || {};


    return (

        <div className="dashboard-page">

            {/* PAGE HEADER */}

            <PageHeader
                title={`Welcome, ${student.name || "Student"} 👋`}
                description="Here's an overview of your academic activities."
            />


            {/* STUDENT INFO */}

            <div className="dashboard-card student-info-card">

                <div className="student-info-left">

                    <div className="student-avatar">
                        {(student.name || "S")
                            .charAt(0)
                            .toUpperCase()}
                    </div>


                    <div>

                        <h2>
                            {student.name || "Student"}
                        </h2>

                        <p>
                            {student.email || "-"}
                        </p>

                    </div>

                </div>


                <div className="student-details">

                    <div>
                        <span>Course</span>
                        <strong>
                            {student.course || "-"}
                        </strong>
                    </div>


                    <div>
                        <span>Department</span>
                        <strong>
                            {student.department || "-"}
                        </strong>
                    </div>


                    <div>
                        <span>Year</span>
                        <strong>
                            {student.current_year
                                ? `${student.current_year} Year`
                                : "-"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* STAT CARDS */}

            <div className="stats-grid">

                <StatCard
                    title="Total Exams"
                    value={exams.total}
                    icon="📝"
                    link="/student/exams"
                    description="All your exams"
                />


                <StatCard
                    title="Upcoming Exams"
                    value={exams.upcoming}
                    icon="📅"
                    link="/student/exams"
                    description="Upcoming exams"
                />


                <StatCard
                    title="Completed Exams"
                    value={exams.completed}
                    icon="✅"
                    link="/student/exams"
                    description="Completed exams"
                />


                <StatCard
                    title="Re-Exams"
                    value={reexams.total}
                    icon="🔄"
                    link="/student/reexams"
                    description="Re-exams assigned"
                />


                <StatCard
                    title="Assignments"
                    value={assignments.total}
                    icon="📂"
                    link="/student/assignments"
                    description="Total assignments"
                />


                <StatCard
                    title="Submissions"
                    value={assignments.submitted}
                    icon="📥"
                    link="/student/submissions"
                    description="Submitted assignments"
                />

            </div>


            {/* BOTTOM SECTION */}

            <div className="dashboard-two-column">


                {/* ATTENDANCE */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Attendance
                            </h3>

                            <p>
                                Your overall attendance
                            </p>

                        </div>


                        <Link
                            to="/student/attendance"
                            className="card-link"
                        >
                            View
                        </Link>

                    </div>


                    <div className="attendance-content">

                        <div className="attendance-circle">

                            <strong>
                                {attendance.percentage ?? 0}%
                            </strong>

                            <span>
                                Attendance
                            </span>

                        </div>


                        <div className="attendance-stats">

                            <div>
                                <span>Present</span>
                                <strong>
                                    {attendance.present ?? 0}
                                </strong>
                            </div>


                            <div>
                                <span>Absent</span>
                                <strong>
                                    {attendance.absent ?? 0}
                                </strong>
                            </div>


                            <div>
                                <span>Total</span>
                                <strong>
                                    {attendance.total ?? 0}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ASSIGNMENTS */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Assignments
                            </h3>

                            <p>
                                Assignment submission status
                            </p>

                        </div>


                        <Link
                            to="/student/assignments"
                            className="card-link"
                        >
                            View
                        </Link>

                    </div>


                    <div className="assignment-summary">

                        <div className="summary-item">

                            <span className="summary-icon">
                                📚
                            </span>

                            <div>

                                <span>
                                    Total
                                </span>

                                <strong>
                                    {assignments.total ?? 0}
                                </strong>

                            </div>

                        </div>


                        <div className="summary-item">

                            <span className="summary-icon">
                                ✅
                            </span>

                            <div>

                                <span>
                                    Approved
                                </span>

                                <strong>
                                    {assignments.approved ?? 0}
                                </strong>

                            </div>

                        </div>


                        <div className="summary-item">

                            <span className="summary-icon">
                                ⏳
                            </span>

                            <div>

                                <span>
                                    Pending
                                </span>

                                <strong>
                                    {(assignments.total ?? 0) -
                                    (assignments.submitted ?? 0)}
                                </strong>

                            </div>

                        </div>


                        <div className="summary-item">

                            <span className="summary-icon">
                                ❌
                            </span>

                            <div>

                                <span>
                                    Rejected
                                </span>

                                <strong>
                                    {assignments.rejected ?? 0}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="dashboard-card quick-actions-card">

                <div className="card-header">

                    <div>

                        <h3>
                            Quick Actions
                        </h3>

                        <p>
                            Quickly access your academic activities
                        </p>

                    </div>

                </div>


                <div className="quick-actions">

                    <Link
                        to="/student/exams"
                        className="quick-action"
                    >
                        <span>📝</span>
                        <strong>View Exams</strong>
                    </Link>


                    <Link
                        to="/student/reexams"
                        className="quick-action"
                    >
                        <span>🔄</span>
                        <strong>View Re-Exams</strong>
                    </Link>


                    <Link
                        to="/student/attendance"
                        className="quick-action"
                    >
                        <span>📅</span>
                        <strong>Attendance</strong>
                    </Link>


                    <Link
                        to="/student/assignments"
                        className="quick-action"
                    >
                        <span>📂</span>
                        <strong>Assignments</strong>
                    </Link>


                    <Link
                        to="/student/submissions"
                        className="quick-action"
                    >
                        <span>📥</span>
                        <strong>Submissions</strong>
                    </Link>

                </div>

            </div>

        </div>

    );

}


export default StudentDashboard;