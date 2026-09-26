import { useEffect, useState } from "react";
import api from "../api/axios";

function StaffAttendanceHistory() {
    // ========================================================
    // DATA
    // ========================================================

    const [attendance, setAttendance] = useState([]);

    // ========================================================
    // FILTERS
    // ========================================================

    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD ATTENDANCE
    // ========================================================

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            // ------------------------------------------------
            // SEARCH
            // ------------------------------------------------

            if (search.trim()) {
                params.append(
                    "search",
                    search.trim()
                );
            }

            // ------------------------------------------------
            // SUBJECT
            // ------------------------------------------------

            if (subject) {
                params.append(
                    "subject",
                    subject
                );
            }

            // ------------------------------------------------
            // DATE
            // ------------------------------------------------

            if (date) {
                params.append(
                    "date",
                    date
                );
            }

            // ------------------------------------------------
            // STATUS
            // ------------------------------------------------

            if (status) {
                params.append(
                    "status",
                    status
                );
            }

            // ------------------------------------------------
            // PAGE SIZE
            // ------------------------------------------------

            params.append(
                "page_size",
                "100"
            );

            // ------------------------------------------------
            // URL
            // ------------------------------------------------

            const queryString =
                params.toString();

            const url =
                queryString
                    ? `attendance/?${queryString}`
                    : "attendance/?page_size=100";

            // ------------------------------------------------
            // API
            // ------------------------------------------------

            const response =
                await api.get(url);

            console.log(
                "Attendance History:",
                response.data
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            setAttendance(data);
        } catch (error) {
            console.error(
                "Attendance Error:",
                error.response?.data || error
            );

            setAttendance([]);

            setError(
                "Unable to load attendance."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // INITIAL LOAD / FILTER CHANGE
    // ========================================================

    useEffect(() => {
        loadAttendance();
    }, [
        search,
        subject,
        date,
        status
    ]);

    // ========================================================
    // CLEAR FILTERS
    // ========================================================

    const clearFilters = () => {
        setSearch("");
        setSubject("");
        setDate("");
        setStatus("");
    };

    // ========================================================
    // REFRESH
    // ========================================================

    const refreshAttendance = () => {
        loadAttendance();
    };

    // ========================================================
    // STATUS DISPLAY
    // ========================================================

    const getStatusText = (value) => {
        if (value === "PRESENT") {
            return "Present";
        }

        if (value === "ABSENT") {
            return "Absent";
        }

        return value || "-";
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
                        Attendance History
                    </h1>

                    <p>
                        View and filter attendance records
                    </p>

                </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="alert error-alert">

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={
                            refreshAttendance
                        }
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* =================================================
                FILTERS
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Filters
                        </h2>

                        <p>
                            Search attendance records
                        </p>

                    </div>

                </div>

                <div className="toolbar">

                    {/* ------------------------------------------------
                        SEARCH
                    ------------------------------------------------ */}

                    <div className="filter-group">

                        <label>
                            Student
                        </label>

                        <input
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* ------------------------------------------------
                        SUBJECT
                    ------------------------------------------------ */}

                    <div className="filter-group">

                        <label>
                            Subject ID
                        </label>

                        <input
                            type="number"
                            placeholder="Subject ID"
                            value={subject}
                            onChange={(e) =>
                                setSubject(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* ------------------------------------------------
                        DATE
                    ------------------------------------------------ */}

                    <div className="filter-group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* ------------------------------------------------
                        STATUS
                    ------------------------------------------------ */}

                    <div className="filter-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Status
                            </option>

                            <option value="PRESENT">
                                Present
                            </option>

                            <option value="ABSENT">
                                Absent
                            </option>

                        </select>

                    </div>

                    {/* ------------------------------------------------
                        ACTIONS
                    ------------------------------------------------ */}

                    <div className="filter-actions">

                        <button
                            type="button"
                            onClick={
                                clearFilters
                            }
                        >
                            Clear
                        </button>

                        <button
                            type="button"
                            onClick={
                                refreshAttendance
                            }
                            disabled={loading}
                        >
                            Refresh
                        </button>

                    </div>

                </div>

            </section>

            {/* =================================================
                ATTENDANCE RECORDS
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Attendance Records
                        </h2>

                        <p>
                            Total Records:{" "}
                            <strong>
                                {attendance.length}
                            </strong>
                        </p>

                    </div>

                </div>

                {/* ------------------------------------------------
                    LOADING
                ------------------------------------------------ */}

                {loading && (
                    <div className="loading-state">
                        Loading attendance...
                    </div>
                )}

                {/* ------------------------------------------------
                    EMPTY
                ------------------------------------------------ */}

                {!loading &&
                    attendance.length === 0 && (

                    <div className="empty-state">
                        No attendance found.
                    </div>

                )}

                {/* ------------------------------------------------
                    TABLE
                ------------------------------------------------ */}

                {!loading &&
                    attendance.length > 0 && (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
                                    </th>

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
                                        Status
                                    </th>

                                    <th>
                                        Marked By
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {attendance.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                        >

                                            {/* DATE */}

                                            <td>
                                                {
                                                    item.date ||
                                                    "-"
                                                }
                                            </td>

                                            {/* STUDENT */}

                                            <td>
                                                {
                                                    item.student_name ||
                                                    "-"
                                                }
                                            </td>

                                            {/* EMAIL */}

                                            <td>
                                                {
                                                    item.student_email ||
                                                    "-"
                                                }
                                            </td>

                                            {/* SUBJECT */}

                                            <td>
                                                {
                                                    item.subject_name ||
                                                    "-"
                                                }
                                            </td>

                                            {/* SUBJECT CODE */}

                                            <td>
                                                {
                                                    item.subject_code ||
                                                    "-"
                                                }
                                            </td>

                                            {/* COURSE */}

                                            <td>
                                                {
                                                    item.course_name ||
                                                    "-"
                                                }
                                            </td>

                                            {/* DEPARTMENT */}

                                            <td>
                                                {
                                                    item.department_name ||
                                                    "-"
                                                }
                                            </td>

                                            {/* YEAR */}

                                            <td>
                                                {
                                                    item.year ??
                                                    "-"
                                                }
                                            </td>

                                            {/* STATUS */}

                                            <td>
                                                {
                                                    getStatusText(
                                                        item.status
                                                    )
                                                }
                                            </td>

                                            {/* MARKED BY */}

                                            <td>
                                                {
                                                    item.marked_by_name ||
                                                    "-"
                                                }
                                            </td>

                                        </tr>

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

export default StaffAttendanceHistory;