import { useEffect, useState } from "react";
import api from "../api/axios";

function StudentExams() {

    const [exams, setExams] = useState([]);

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
    // GET EXAMS
    // =====================================================

    const getExams = async (
        selectedFilter = filter,
        selectedSearch = search,
        selectedSubject = subject
    ) => {

        try {

            setLoading(true);

            setError("");

            const params =
                new URLSearchParams();


            if (
                selectedFilter !== "all"
            ) {

                params.append(
                    "type",
                    selectedFilter
                );
            }


            if (
                selectedSearch.trim()
            ) {

                params.append(
                    "search",
                    selectedSearch.trim()
                );
            }


            if (selectedSubject) {

                params.append(
                    "subject",
                    selectedSubject
                );
            }


            const queryString =
                params.toString();


            const url = queryString
                ? `student/exams/?${queryString}`
                : "student/exams/";


            const response =
                await api.get(url);


            console.log(
                "Student Exams:",
                response.data
            );


            setExams(
                response.data.results ||
                response.data
            );

        } catch (error) {

            console.log(
                "Exam Error:",
                error.response?.data
            );

            setError(
                "Unable to load exams."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // PAGE LOAD
    // =====================================================

    useEffect(() => {

        getSubjects();

        getExams();

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

        getExams(
            selectedFilter,
            search,
            subject
        );
    };


    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = () => {

        getExams(
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

        getExams(
            filter,
            search,
            value
        );
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div>
                <h2>
                    Loading exams...
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
                            My Exams
                        </h1>

                        <p className="student-page-description">
                            View your upcoming, completed and absent exams
                        </p>
                    </div>
                </div>


                {/* SEARCH + SUBJECT */}

                <div className="student-toolbar">

                    <div className="student-search">

                        <input
                            className="student-input"
                            type="text"
                            placeholder="Search exam..."
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


                {/* FILTER */}

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
                            filter === "completed" ? "active" : ""
                        }`}
                        onClick={() => handleFilter("completed")}
                    >
                        Completed
                    </button>

                    <button
                        className={`student-filter-btn ${
                            filter === "absent" ? "active" : ""
                        }`}
                        onClick={() => handleFilter("absent")}
                    >
                        Absent
                    </button>

                </div>


                <br />


                {/* EXAMS */}

                {exams.length === 0 ? (

                    <div className="student-empty">

                        <div className="student-empty-icon">
                            📝
                        </div>

                        <h3>
                            No Exams Found
                        </h3>

                        <p>
                            There are no exams matching your selection.
                        </p>

                    </div>

                ) : (

                    <div className="exam-grid">

                        {exams.map((item) => (

                            <div
                                className="exam-card"
                                key={item.id}
                            >

                                <div className="exam-card-header">

                                    <h2 className="exam-card-title">
                                        {item.exam_name}
                                    </h2>

                                    <span
                                        className={`status-badge ${
                                            item.status === "upcoming"
                                                ? "status-upcoming"
                                                : item.status === "completed"
                                                ? "status-completed"
                                                : item.status === "absent"
                                                ? "status-absent"
                                                : ""
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                </div>


                                <div className="exam-info">

                                    <div className="exam-info-row">
                                        <span className="exam-info-label">
                                            Subject
                                        </span>

                                        <span className="exam-info-value">
                                            {item.subject_name}
                                        </span>
                                    </div>


                                    <div className="exam-info-row">
                                        <span className="exam-info-label">
                                            Exam Date
                                        </span>

                                        <span className="exam-info-value">
                                            {item.exam_date}
                                        </span>
                                    </div>


                                    <div className="exam-info-row">
                                        <span className="exam-info-label">
                                            Start Time
                                        </span>

                                        <span className="exam-info-value">
                                            {item.start_time}
                                        </span>
                                    </div>


                                    <div className="exam-info-row">
                                        <span className="exam-info-label">
                                            End Time
                                        </span>

                                        <span className="exam-info-value">
                                            {item.end_time}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        );
}

export default StudentExams;