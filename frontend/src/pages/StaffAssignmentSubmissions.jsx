import { useEffect, useState } from "react";
import api from "../api/axios";

function StaffAssignmentSubmissions() {
    // ========================================================
    // DATA
    // ========================================================

    const [submissions, setSubmissions] = useState([]);

    // ========================================================
    // FILTER
    // ========================================================

    const [statusFilter, setStatusFilter] = useState("");

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD SUBMISSIONS
    // ========================================================

    const loadSubmissions = async () => {
        try {
            setLoading(true);
            setError("");

            let url =
                "assignments/submission-list/?page_size=100";

            if (statusFilter) {
                url += `&status=${statusFilter}`;
            }

            const response = await api.get(url);

            const data =
                response.data.results ||
                response.data ||
                [];

            setSubmissions(data);
        } catch (error) {
            console.error(
                "Submission Error:",
                error.response?.data || error
            );

            setSubmissions([]);

            setError(
                "Unable to load submissions."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // INITIAL LOAD / FILTER CHANGE
    // ========================================================

    useEffect(() => {
        loadSubmissions();
    }, [statusFilter]);

    // ========================================================
    // REVIEW SUBMISSION
    // ========================================================

    const reviewSubmission = async (
        submissionId,
        status
    ) => {
        try {
            setError("");

            await api.patch(
                `assignments/submissions/${submissionId}/review/`,
                {
                    status
                }
            );

            await loadSubmissions();
        } catch (error) {
            console.error(
                "Review Error:",
                error.response?.data || error
            );

            setError(
                "Unable to update submission."
            );
        }
    };

    // ========================================================
    // APPROVE
    // ========================================================

    const handleApprove = (submissionId) => {
        reviewSubmission(
            submissionId,
            "APPROVED"
        );
    };

    // ========================================================
    // REJECT
    // ========================================================

    const handleReject = (submissionId) => {
        reviewSubmission(
            submissionId,
            "REJECTED"
        );
    };

    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {
        loadSubmissions();
    };

    // ========================================================
    // STATUS TEXT
    // ========================================================

    const getStatusText = (status) => {
        if (!status) {
            return "-";
        }

        return status;
    };

    // ========================================================
    // DATE FORMAT
    // ========================================================

    const formatDateTime = (value) => {
        if (!value) {
            return "-";
        }

        return new Date(value).toLocaleString();
    };

    // ========================================================
    // RENDER ACTION
    // ========================================================

    const renderAction = (submission) => {
        if (submission.status === "SUBMITTED") {
            return (
                <div className="submission-actions">

                    <button
                        type="button"
                        onClick={() =>
                            handleApprove(
                                submission.id
                            )
                        }
                    >
                        Approve
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            handleReject(
                                submission.id
                            )
                        }
                    >
                        Reject
                    </button>

                </div>
            );
        }

        if (submission.status === "APPROVED") {
            return (
                <span>
                    Approved
                </span>
            );
        }

        if (submission.status === "REJECTED") {
            return (
                <span>
                    Rejected
                </span>
            );
        }

        return "-";
    };

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="staff-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Assignment Submissions
                    </h1>

                    <p>
                        Review and manage student assignment submissions
                    </p>

                </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="alert error-alert">
                    {error}
                </div>
            )}

            {/* =================================================
                FILTER / ACTIONS
            ================================================= */}

            <section className="page-section">

                <div className="toolbar">

                    {/* ------------------------------------------------
                        STATUS FILTER
                    ------------------------------------------------ */}

                    <div className="filter-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All
                            </option>

                            <option value="SUBMITTED">
                                Submitted
                            </option>

                            <option value="APPROVED">
                                Approved
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>

                        </select>

                    </div>

                    {/* ------------------------------------------------
                        REFRESH
                    ------------------------------------------------ */}

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        Refresh
                    </button>

                </div>

            </section>

            {/* =================================================
                SUBMISSIONS TABLE
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Student Submissions
                        </h2>

                        <p>
                            {submissions.length} submissions
                        </p>

                    </div>

                </div>

                {/* ------------------------------------------------
                    LOADING
                ------------------------------------------------ */}

                {loading && (
                    <div className="loading-state">
                        Loading submissions...
                    </div>
                )}

                {/* ------------------------------------------------
                    TABLE
                ------------------------------------------------ */}

                {!loading && (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
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
                                        Assignment
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Subject Code
                                    </th>

                                    <th>
                                        Due Date
                                    </th>

                                    <th>
                                        Submitted At
                                    </th>

                                    <th>
                                        File
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {submissions.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="13"
                                        >
                                            No submissions found.
                                        </td>

                                    </tr>

                                ) : (

                                    submissions.map(
                                        (submission) => (

                                            <tr
                                                key={
                                                    submission.id
                                                }
                                            >

                                                {/* STUDENT */}

                                                <td>
                                                    {
                                                        submission.student_name
                                                        || "-"
                                                    }
                                                </td>

                                                {/* EMAIL */}

                                                <td>
                                                    {
                                                        submission.student_email
                                                        || "-"
                                                    }
                                                </td>

                                                {/* COURSE */}

                                                <td>
                                                    {
                                                        submission.course_name
                                                        || "-"
                                                    }
                                                </td>

                                                {/* DEPARTMENT */}

                                                <td>
                                                    {
                                                        submission.department_name
                                                        || "-"
                                                    }
                                                </td>

                                                {/* YEAR */}

                                                <td>
                                                    {
                                                        submission.student_year
                                                        || "-"
                                                    }
                                                </td>

                                                {/* ASSIGNMENT */}

                                                <td>
                                                    {
                                                        submission.assignment_title
                                                        || "-"
                                                    }
                                                </td>

                                                {/* SUBJECT */}

                                                <td>
                                                    {
                                                        submission.subject_name
                                                        || "-"
                                                    }
                                                </td>

                                                {/* SUBJECT CODE */}

                                                <td>
                                                    {
                                                        submission.subject_code
                                                        || "-"
                                                    }
                                                </td>

                                                {/* DUE DATE */}

                                                <td>
                                                    {
                                                        formatDateTime(
                                                            submission.assignment_due_date
                                                        )
                                                    }
                                                </td>

                                                {/* SUBMITTED AT */}

                                                <td>
                                                    {
                                                        formatDateTime(
                                                            submission.submitted_at
                                                        )
                                                    }
                                                </td>

                                                {/* FILE */}

                                                <td>

                                                    {submission.file ? (

                                                        <a
                                                            href={
                                                                submission.file
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            View File
                                                        </a>

                                                    ) : (

                                                        "-"
                                                    )}

                                                </td>

                                                {/* STATUS */}

                                                <td>
                                                    {
                                                        getStatusText(
                                                            submission.status
                                                        )
                                                    }
                                                </td>

                                                {/* ACTION */}

                                                <td>
                                                    {
                                                        renderAction(
                                                            submission
                                                        )
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </div>
    );
}

export default StaffAssignmentSubmissions;