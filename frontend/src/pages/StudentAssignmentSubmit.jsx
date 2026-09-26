import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import api from "../api/axios";


function StudentAssignmentSubmit() {

    const navigate = useNavigate();

    const location = useLocation();


    const [assignments, setAssignments] = useState([]);

    const [selectedAssignment, setSelectedAssignment] = useState("");

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [pageLoading, setPageLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ========================================================
    // LOAD STUDENT ASSIGNMENTS
    // ========================================================

    useEffect(() => {

        loadAssignments();

    }, []);


    const loadAssignments = async () => {

        try {

            setPageLoading(true);

            setError("");


            const response = await api.get(
                "assignments/student/?page_size=100"
            );


            console.log(
                "Student Assignments:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setAssignments(data);


            // ------------------------------------------------
            // SELECT ASSIGNMENT FROM PREVIOUS PAGE
            // ------------------------------------------------

            const selectedFromPage =
                location.state?.assignment;


            if (selectedFromPage?.id) {

                const exists = data.some(
                    (item) =>
                        item.id ===
                        selectedFromPage.id
                );


                if (exists) {

                    setSelectedAssignment(
                        String(
                            selectedFromPage.id
                        )
                    );

                }

            }


        } catch (error) {

            console.log(
                "Assignment Error:",
                error.response?.data
            );


            setError(
                "Unable to load assignments."
            );


        } finally {

            setPageLoading(false);

        }

    };


    // ========================================================
    // SELECTED ASSIGNMENT
    // ========================================================

    const getSelectedAssignment = () => {

        return assignments.find(
            (assignment) =>
                String(assignment.id) ===
                String(selectedAssignment)
        );

    };


    const selectedAssignmentData =
        getSelectedAssignment();


    // ========================================================
    // CHECK DUE DATE
    // ========================================================

    const isOverdue = (
        assignment
    ) => {

        if (!assignment?.due_date) {

            return false;

        }


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        const dueDate =
            new Date(
                assignment.due_date
            );


        dueDate.setHours(
            0,
            0,
            0,
            0
        );


        return dueDate < today;

    };


    // ========================================================
    // FILE CHANGE
    // ========================================================

    const handleFileChange = (e) => {

        const selectedFile =
            e.target.files[0];


        setFile(
            selectedFile || null
        );


        setError("");

        setSuccess("");

    };


    // ========================================================
    // SUBMIT ASSIGNMENT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        // ----------------------------------------------------
        // ASSIGNMENT VALIDATION
        // ----------------------------------------------------

        if (!selectedAssignment) {

            setError(
                "Please select an assignment."
            );

            return;

        }


        // ----------------------------------------------------
        // FILE VALIDATION
        // ----------------------------------------------------

        if (!file) {

            setError(
                "Please select a file."
            );

            return;

        }


        // ----------------------------------------------------
        // DUE DATE VALIDATION
        // ----------------------------------------------------

        if (
            selectedAssignmentData &&
            isOverdue(
                selectedAssignmentData
            )
        ) {

            setError(
                "Assignment submission deadline has passed."
            );

            return;

        }


        // ----------------------------------------------------
        // FORM DATA
        // ----------------------------------------------------

        const formData =
            new FormData();


        formData.append(
            "assignment",
            selectedAssignment
        );


        formData.append(
            "file",
            file
        );


        try {

            setLoading(true);


            const response =
                await api.post(
                    "assignments/submit/",
                    formData
                );


            console.log(
                "Submission:",
                response.data
            );


            setSuccess(
                "Assignment submitted successfully."
            );


            // ------------------------------------------------
            // RESET
            // ------------------------------------------------

            setSelectedAssignment("");

            setFile(null);


            const fileInput =
                document.getElementById(
                    "assignment-file"
                );


            if (fileInput) {

                fileInput.value = "";

            }


        } catch (error) {

            console.log(
                "Submit Error:",
                error.response?.data
            );


            const data =
                error.response?.data;


            if (data) {

                const message =
                    Object.values(data)
                        .flat()
                        .join(" ");


                setError(
                    message ||
                    "Unable to submit assignment."
                );

            } else {

                setError(
                    "Unable to submit assignment."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // PAGE LOADING
    // ========================================================

    if (pageLoading) {

        return (

            <div>

                <h2>
                    Loading assignments...
                </h2>

            </div>

        );

    }


    return (

        <div className="student-page submit-container">

            <div className="student-page-header">

                <div>
                    <h1 className="student-page-title">
                        Submit Assignment
                    </h1>

                    <p className="student-page-description">
                        Upload your assignment before the deadline
                    </p>
                </div>

            </div>


            {error && (
                <div className="student-alert student-alert-error">
                    {error}
                </div>
            )}


            {success && (
                <div className="student-alert student-alert-success">
                    {success}
                </div>
            )}


            {assignments.length === 0 ? (

                <div className="student-empty">

                    <div className="student-empty-icon">
                        📂
                    </div>

                    <h3>
                        No Assignments Available
                    </h3>

                    <button
                        className="student-btn student-btn-secondary"
                        onClick={() =>
                            navigate("/student/assignments")
                        }
                    >
                        Back to Assignments
                    </button>

                </div>

            ) : (

                <div className="submit-card">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label className="form-label">
                                Assignment
                            </label>

                            <select
                                className="form-control"
                                value={selectedAssignment}
                                onChange={(e) => {

                                    setSelectedAssignment(
                                        e.target.value
                                    );

                                    setFile(null);
                                    setError("");
                                    setSuccess("");

                                }}
                            >

                                <option value="">
                                    Select Assignment
                                </option>

                                {assignments.map(
                                    (assignment) => (

                                        <option
                                            key={assignment.id}
                                            value={assignment.id}
                                            disabled={
                                                isOverdue(assignment)
                                            }
                                        >
                                            {assignment.title}
                                            {" - "}
                                            {assignment.subject_name || "Subject"}

                                            {isOverdue(assignment)
                                                ? " (Overdue)"
                                                : ""}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {selectedAssignmentData && (

                            <div className="assignment-detail-card">

                                <h3>
                                    Assignment Details
                                </h3>


                                <div className="detail-list">

                                    <div className="detail-item">
                                        <strong>Title</strong>
                                        <span>
                                            {selectedAssignmentData.title}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Subject</strong>
                                        <span>
                                            {selectedAssignmentData.subject_name || "-"}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Subject Code</strong>
                                        <span>
                                            {selectedAssignmentData.subject_code || "-"}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Course / Class</strong>
                                        <span>
                                            {selectedAssignmentData.course_name || "-"}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Department</strong>
                                        <span>
                                            {selectedAssignmentData.department_name || "-"}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Year</strong>
                                        <span>
                                            {selectedAssignmentData.student_year || "-"}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Exam</strong>
                                        <span>
                                            {selectedAssignmentData.exam_name || "-"}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <strong>Due Date</strong>
                                        <span>
                                            {selectedAssignmentData.due_date || "-"}
                                        </span>
                                    </div>

                                </div>


                                {selectedAssignmentData.description && (

                                    <div className="assignment-description">

                                        <strong>
                                            Description
                                        </strong>

                                        <p>
                                            {selectedAssignmentData.description}
                                        </p>

                                    </div>

                                )}

                            </div>

                        )}


                        <div className="form-group">

                            <label className="form-label">
                                Upload File
                            </label>

                            <input
                                id="assignment-file"
                                className="form-control"
                                type="file"
                                onChange={handleFileChange}
                                disabled={
                                    !selectedAssignmentData ||
                                    isOverdue(selectedAssignmentData) ||
                                    loading
                                }
                            />

                        </div>


                        <div className="assignment-actions">

                            <button
                                className="student-btn student-btn-primary"
                                type="submit"
                                disabled={
                                    loading ||
                                    !selectedAssignmentData ||
                                    isOverdue(selectedAssignmentData)
                                }
                            >
                                {loading
                                    ? "Submitting..."
                                    : "Submit Assignment"}
                            </button>


                            <button
                                className="student-btn student-btn-secondary"
                                type="button"
                                onClick={() =>
                                    navigate("/student/assignments")
                                }
                            >
                                Back
                            </button>


                            <button
                                className="student-btn student-btn-secondary"
                                type="button"
                                onClick={() =>
                                    navigate("/student/submissions")
                                }
                            >
                                View My Submissions
                            </button>

                        </div>

                    </form>

                </div>

            )}

        </div>

    );

}


export default StudentAssignmentSubmit;
