import { useEffect, useState } from "react";

import api from "../api/axios";


function StudentSubmissions() {

    const [submissions, setSubmissions] = useState([]);

    const [statusFilter, setStatusFilter] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD SUBMISSIONS
    // ========================================================

    useEffect(() => {

        loadSubmissions();

    }, [statusFilter]);


    const loadSubmissions = async () => {

        try {

            setLoading(true);

            setError("");


            let url =
                "assignments/submissions/?page_size=100";


            // ------------------------------------------------
            // STATUS FILTER
            // ------------------------------------------------

            if (statusFilter) {

                url +=
                    `&status=${statusFilter}`;

            }


            const response =
                await api.get(url);


            console.log(
                "Student Submissions:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setSubmissions(data);


        } catch (error) {

            console.log(
                "Submission Error:",
                error.response?.data
            );


            setError(
                "Unable to load submissions."
            );


        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {

        loadSubmissions();

    };


    // ========================================================
    // STATUS DISPLAY
    // ========================================================

    const getStatusText = (
        status
    ) => {

        if (status === "SUBMITTED") {

            return "Submitted";

        }

        if (status === "APPROVED") {

            return "Approved";

        }

        if (status === "REJECTED") {

            return "Rejected";

        }

        return status || "-";

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div>

                <h2>
                    Loading submissions...
                </h2>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="student-page">

            <div className="student-page-header">

                <div>
                    <h1 className="student-page-title">
                        My Submissions
                    </h1>

                    <p className="student-page-description">
                        Track your assignment submissions and review status
                    </p>
                </div>

            </div>


            {error && (

                <div className="student-alert student-alert-error">

                    {error}

                    <br />

                    <button
                        className="student-btn student-btn-secondary"
                        onClick={handleRefresh}
                    >
                        Retry
                    </button>

                </div>

            )}


            <div className="student-toolbar">

                <select
                    className="student-select"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >

                    <option value="">
                        All Status
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


                <button
                    className="student-btn student-btn-secondary"
                    onClick={handleRefresh}
                >
                    ↻ Refresh
                </button>

            </div>


            {submissions.length === 0 ? (

                <div className="student-empty">

                    <div className="student-empty-icon">
                        📥
                    </div>

                    <h3>
                        No Submissions Found
                    </h3>

                    <p>
                        You haven't submitted any assignments yet.
                    </p>

                </div>

            ) : (

                <div className="table-card">

                    <div className="student-table-wrapper">

                        <table className="student-table">

                            <thead>

                                <tr>
                                    <th>Assignment</th>
                                    <th>Subject</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Due Date</th>
                                    <th>Submitted At</th>
                                    <th>Reviewed At</th>
                                    <th>File</th>
                                    <th>Status</th>
                                </tr>

                            </thead>


                            <tbody>

                                {submissions.map(
                                    (submission) => (

                                        <tr
                                            key={submission.id}
                                        >

                                            <td>
                                                <strong>
                                                    {submission.assignment_title || "-"}
                                                </strong>
                                            </td>

                                            <td>
                                                {submission.subject_name || "-"}
                                            </td>

                                            <td>
                                                {submission.course_name || "-"}
                                            </td>

                                            <td>
                                                {submission.department_name || "-"}
                                            </td>

                                            <td>
                                                {submission.assignment_due_date || "-"}
                                            </td>

                                            <td>
                                                {submission.submitted_at
                                                    ? new Date(
                                                        submission.submitted_at
                                                    ).toLocaleString()
                                                    : "-"}
                                            </td>

                                            <td>
                                                {submission.reviewed_at
                                                    ? new Date(
                                                        submission.reviewed_at
                                                    ).toLocaleString()
                                                    : "-"}
                                            </td>

                                            <td>

                                                {submission.file ? (

                                                    <a
                                                        className="student-link"
                                                        href={submission.file}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View File
                                                    </a>

                                                ) : (
                                                    "-"
                                                )}

                                            </td>

                                            <td>

                                                <span
                                                    className={`status-badge ${
                                                        submission.status === "APPROVED"
                                                            ? "status-approved"
                                                            : submission.status === "REJECTED"
                                                            ? "status-rejected"
                                                            : "status-submitted"
                                                    }`}
                                                >
                                                    {getStatusText(
                                                        submission.status
                                                    )}
                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>

    );

}


export default StudentSubmissions;
