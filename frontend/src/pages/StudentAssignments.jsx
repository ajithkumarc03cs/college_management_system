import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function StudentAssignments() {

    const navigate = useNavigate();


    const [assignments, setAssignments] = useState([]);

    const [submissions, setSubmissions] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [filter, setFilter] = useState("all");

    const [search, setSearch] = useState("");

    const [subject, setSubject] = useState("");


    // =====================================================
    // GET SUBJECTS
    // =====================================================

    const getSubjects = async () => {

        try {

            const response = await api.get(
                "student/subjects/"
            );


            console.log(
                "Student Subjects:",
                response.data
            );


            setSubjects(
                response.data.results ||
                response.data
            );


        } catch (error) {

            console.log(
                "Subject Error:",
                error.response?.data
            );

            setError(
                "Unable to load subjects."
            );

        }
    };


    // =====================================================
    // GET STUDENT SUBMISSIONS
    // =====================================================

    const getSubmissions = async () => {

        try {

            const response = await api.get(
                "assignments/submissions/"
            );


            console.log(
                "Student Submissions:",
                response.data
            );


            setSubmissions(
                response.data.results ||
                response.data
            );


        } catch (error) {

            console.log(
                "Submission Error:",
                error.response?.data
            );

            // Submission loading should not stop
            // assignment page from working.

            setSubmissions([]);

        }
    };


    // =====================================================
    // CHECK SUBMISSION
    // =====================================================

    const getSubmission = (
        assignmentId
    ) => {

        return submissions.find(
            (submission) =>
                submission.assignment === assignmentId
        );

    };


    // =====================================================
    // GET ASSIGNMENTS
    // =====================================================

    const getAssignments = async (
        selectedFilter = filter,
        selectedSearch = search,
        selectedSubject = subject
    ) => {

        try {

            setLoading(true);

            setError("");


            const params =
                new URLSearchParams();


            // ------------------------------------------------
            // TYPE
            // ------------------------------------------------

            if (
                selectedFilter !== "all"
            ) {

                params.append(
                    "type",
                    selectedFilter
                );

            }


            // ------------------------------------------------
            // SEARCH
            // ------------------------------------------------

            if (
                selectedSearch.trim()
            ) {

                params.append(
                    "search",
                    selectedSearch.trim()
                );

            }


            // ------------------------------------------------
            // SUBJECT
            // ------------------------------------------------

            if (selectedSubject) {

                params.append(
                    "subject",
                    selectedSubject
                );

            }


            // ------------------------------------------------
            // URL
            // ------------------------------------------------

            const queryString =
                params.toString();


            const url = queryString
                ? `assignments/student/?${queryString}`
                : "assignments/student/";


            const response =
                await api.get(url);


            console.log(
                "Student Assignments:",
                response.data
            );


            setAssignments(
                response.data.results ||
                response.data
            );


        } catch (error) {

            console.log(
                "Assignment Error:",
                error.response?.data
            );


            setError(
                "Unable to load assignments."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // PAGE LOAD
    // =====================================================

    useEffect(() => {

        const loadPage = async () => {

            await Promise.all([
                getSubjects(),
                getSubmissions(),
                getAssignments()
            ]);

        };


        loadPage();

    }, []);


    // =====================================================
    // FILTER
    // =====================================================

    const handleFilter = (
        selectedFilter
    ) => {

        setFilter(
            selectedFilter
        );


        getAssignments(
            selectedFilter,
            search,
            subject
        );

    };


    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = () => {

        getAssignments(
            filter,
            search,
            subject
        );

    };


    // =====================================================
    // SUBJECT CHANGE
    // =====================================================

    const handleSubjectChange = (
        value
    ) => {

        setSubject(value);


        getAssignments(
            filter,
            search,
            value
        );

    };


    // =====================================================
    // SUBMIT ASSIGNMENT
    // =====================================================

    const handleSubmitAssignment = (
        assignment
    ) => {

        navigate(
            "/student/assignments/submit",
            {
                state: {
                    assignment: assignment
                }
            }
        );

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div>

                <h2>
                    Loading assignments...
                </h2>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div>

                <h2>
                    Error
                </h2>

                <p>
                    {error}
                </p>


                <button
                    onClick={() =>
                        getAssignments()
                    }
                >
                    Retry
                </button>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="student-page">

            <div className="student-page-header">

                <div>
                    <h1 className="student-page-title">
                        My Assignments
                    </h1>

                    <p className="student-page-description">
                        View and submit your assignments
                    </p>
                </div>

            </div>


            <div className="student-toolbar">

                <div className="student-search">

                    <input
                        className="student-input"
                        type="text"
                        placeholder="Search assignment..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <button
                        className="student-btn student-btn-primary"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                </div>


                <select
                    className="student-select"
                    value={subject}
                    onChange={(e) =>
                        handleSubjectChange(e.target.value)
                    }
                >

                    <option value="">
                        All Subjects
                    </option>

                    {subjects.map((item) => (

                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>

                    ))}

                </select>

            </div>


            <div className="student-filters">

                <button
                    className={`student-filter-btn ${
                        filter === "all" ? "active" : ""
                    }`}
                    onClick={() => handleFilter("all")}
                >
                    All
                </button>

                <button
                    className={`student-filter-btn ${
                        filter === "upcoming" ? "active" : ""
                    }`}
                    onClick={() => handleFilter("upcoming")}
                >
                    Upcoming
                </button>

                <button
                    className={`student-filter-btn ${
                        filter === "overdue" ? "active" : ""
                    }`}
                    onClick={() => handleFilter("overdue")}
                >
                    Overdue
                </button>

            </div>


            <br />


            {assignments.length === 0 ? (

                <div className="student-empty">

                    <div className="student-empty-icon">
                        📚
                    </div>

                    <h3>
                        No Assignments Found
                    </h3>

                    <p>
                        There are no assignments available.
                    </p>

                </div>

            ) : (

                <div className="assignment-grid">

                    {assignments.map((item) => {

                        const submission =
                            getSubmission(item.id);

                        return (

                            <div
                                className="assignment-card"
                                key={item.id}
                            >

                                <div className="assignment-card-header">

                                    <div>

                                        <h2 className="assignment-title">
                                            {item.title}
                                        </h2>

                                        <p className="student-page-description">
                                            {item.subject_name || "-"}
                                        </p>

                                    </div>


                                    {submission && (

                                        <span
                                            className={`status-badge ${
                                                submission.status === "APPROVED"
                                                    ? "status-approved"
                                                    : submission.status === "REJECTED"
                                                    ? "status-rejected"
                                                    : "status-submitted"
                                            }`}
                                        >
                                            {submission.status === "APPROVED"
                                                ? "Approved"
                                                : submission.status === "REJECTED"
                                                ? "Rejected"
                                                : "Submitted"}
                                        </span>

                                    )}

                                </div>


                                <div className="assignment-details">

                                    <div className="assignment-detail">

                                        <span className="assignment-detail-label">
                                            Subject Code
                                        </span>

                                        <span className="assignment-detail-value">
                                            {item.subject_code || "-"}
                                        </span>

                                    </div>


                                    <div className="assignment-detail">

                                        <span className="assignment-detail-label">
                                            Course / Class
                                        </span>

                                        <span className="assignment-detail-value">
                                            {item.course_name || "-"}
                                        </span>

                                    </div>


                                    <div className="assignment-detail">

                                        <span className="assignment-detail-label">
                                            Department
                                        </span>

                                        <span className="assignment-detail-value">
                                            {item.department_name || "-"}
                                        </span>

                                    </div>


                                    <div className="assignment-detail">

                                        <span className="assignment-detail-label">
                                            Year
                                        </span>

                                        <span className="assignment-detail-value">
                                            {item.student_year || "-"}
                                        </span>

                                    </div>


                                    <div className="assignment-detail">

                                        <span className="assignment-detail-label">
                                            Exam
                                        </span>

                                        <span className="assignment-detail-value">
                                            {item.exam_name || "-"}
                                        </span>

                                    </div>


                                    <div className="assignment-detail">

                                        <span className="assignment-detail-label">
                                            Due Date
                                        </span>

                                        <span className="assignment-detail-value">
                                            {item.due_date || "-"}
                                        </span>

                                    </div>

                                </div>


                                <div className="assignment-description">

                                    <strong>
                                        Description
                                    </strong>

                                    <p>
                                        {item.description || "-"}
                                    </p>

                                </div>


                                <div className="assignment-actions">

                                    {submission?.file && (

                                        <a
                                            className="student-link"
                                            href={submission.file}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View Submitted File
                                        </a>

                                    )}


                                    {!submission ? (

                                        <button
                                            className="student-btn student-btn-primary"
                                            onClick={() =>
                                                handleSubmitAssignment(item)
                                            }
                                        >
                                            Submit Assignment
                                        </button>

                                    ) : (

                                        <span className="status-badge status-submitted">
                                            Assignment Submitted
                                        </span>

                                    )}

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

}


export default StudentAssignments;
