import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/student-pages.css";

function StudentAttendance() {

    const [attendance, setAttendance] = useState([]);
    const [percentage, setPercentage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    // ========================================================
    // LOAD ATTENDANCE
    // ========================================================

    useEffect(() => {
        loadAttendance();
        loadPercentage();
    }, []);

    // ========================================================
    // LOAD ATTENDANCE
    // ========================================================

    const loadAttendance = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "student/attendance/"
            );

            setAttendance(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load attendance."
            );

        } finally {

            setLoading(false);

        }
    };

    // ========================================================
    // LOAD PERCENTAGE
    // ========================================================

    const loadPercentage = async () => {

        try {

            const response = await api.get(
                "student/attendance/percentage/"
            );

            setPercentage(
                response.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load attendance percentage."
            );

        }
    };

    // ========================================================
    // SUBJECT FILTER
    // ========================================================

    const handleSubjectChange = async (e) => {

        const subjectId = e.target.value;

        setSelectedSubject(subjectId);

        try {

            setLoading(true);
            setError("");

            let url = "student/attendance/";

            if (subjectId) {
                url += `?subject=${subjectId}`;
            }

            const response = await api.get(url);

            setAttendance(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to filter attendance."
            );

        } finally {

            setLoading(false);

        }
    };

    // ========================================================
    // GET SUBJECT LIST
    // ========================================================

    const subjects = [];

    attendance.forEach((item) => {

        if (
            !subjects.find(
                (subject) =>
                    subject.id === item.subject
            )
        ) {

            subjects.push({
                id: item.subject,
                name: item.subject_name
            });

        }

    });

    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="student-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="student-page-header">

                <div>

                    <h1 className="student-page-title">
                        My Attendance
                    </h1>

                    <p className="student-page-description">
                        View your attendance records and subject-wise attendance percentage.
                    </p>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="student-alert student-alert-error">
                    {error}
                </div>

            )}


            {/* =================================================
                OVERALL ATTENDANCE
            ================================================= */}

            {percentage && percentage.overall && (

                <div className="attendance-overview">

                    <div className="attendance-overview-header">

                        <div>

                            <h2>
                                Overall Attendance
                            </h2>

                            <p>
                                Your overall attendance summary
                            </p>

                        </div>

                        <div className="attendance-percentage">

                            {percentage.overall.percentage}%

                        </div>

                    </div>


                    <div className="attendance-stat-grid">

                        <div className="attendance-stat-card">

                            <span className="attendance-stat-label">
                                Total Classes
                            </span>

                            <strong>
                                {percentage.overall.total}
                            </strong>

                        </div>


                        <div className="attendance-stat-card attendance-present">

                            <span className="attendance-stat-label">
                                Present
                            </span>

                            <strong>
                                {percentage.overall.present}
                            </strong>

                        </div>


                        <div className="attendance-stat-card attendance-absent">

                            <span className="attendance-stat-label">
                                Absent
                            </span>

                            <strong>
                                {percentage.overall.absent}
                            </strong>

                        </div>


                        <div className="attendance-stat-card attendance-rate">

                            <span className="attendance-stat-label">
                                Attendance Rate
                            </span>

                            <strong>
                                {percentage.overall.percentage}%
                            </strong>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                SUBJECT FILTER
            ================================================= */}

            <div className="student-toolbar attendance-toolbar">

                <div>

                    <label className="attendance-filter-label">
                        Filter by Subject
                    </label>

                    <select
                        className="student-select attendance-select"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                    >

                        <option value="">
                            All Subjects
                        </option>

                        {subjects.map((subject) => (

                            <option
                                key={subject.id}
                                value={subject.id}
                            >
                                {subject.name}
                            </option>

                        ))}

                    </select>

                </div>

            </div>


            {/* =================================================
                ATTENDANCE RECORDS
            ================================================= */}

            <div className="student-section-header">

                <div>

                    <h2>
                        Attendance Records
                    </h2>

                    <p>
                        Your daily attendance history
                    </p>

                </div>

                <span className="record-count">
                    {attendance.length} Records
                </span>

            </div>


            {loading ? (

                <div className="student-loading">
                    Loading attendance...
                </div>

            ) : attendance.length === 0 ? (

                <div className="student-empty">

                    <div className="student-empty-icon">
                        📅
                    </div>

                    <h3>
                        No Attendance Records
                    </h3>

                    <p>
                        No attendance records were found.
                    </p>

                </div>

            ) : (

                <div className="table-card">

                    <div className="student-table-wrapper">

                        <table className="student-table">

                            <thead>

                                <tr>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {attendance.map((item) => {

                                    const status =
                                        String(
                                            item.status || ""
                                        ).toLowerCase();

                                    return (

                                        <tr key={item.id}>

                                            <td>
                                                <strong className="table-date">
                                                    {item.date}
                                                </strong>
                                            </td>

                                            <td>
                                                {item.subject_name}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        status === "present"
                                                            ? "status-badge status-present"
                                                            : "status-badge status-absent"
                                                    }
                                                >
                                                    {item.status}
                                                </span>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}


            {/* =================================================
                SUBJECT-WISE SUMMARY
            ================================================= */}

            {percentage &&
                percentage.subjects &&
                percentage.subjects.length > 0 && (

                    <div className="attendance-summary-section">

                        <div className="student-section-header">

                            <div>

                                <h2>
                                    Subject-wise Attendance
                                </h2>

                                <p>
                                    Attendance performance for each subject
                                </p>

                            </div>

                        </div>


                        <div className="table-card">

                            <div className="student-table-wrapper">

                                <table className="student-table attendance-summary-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Subject
                                            </th>

                                            <th>
                                                Total
                                            </th>

                                            <th>
                                                Present
                                            </th>

                                            <th>
                                                Absent
                                            </th>

                                            <th>
                                                Percentage
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {percentage.subjects.map(
                                            (subject) => {

                                                const percentageValue =
                                                    Number(
                                                        subject.percentage
                                                    );

                                                return (

                                                    <tr
                                                        key={
                                                            subject.subject_id
                                                        }
                                                    >

                                                        <td>

                                                            <strong>
                                                                {
                                                                    subject.subject
                                                                }
                                                            </strong>

                                                        </td>

                                                        <td>
                                                            {
                                                                subject.total
                                                            }
                                                        </td>

                                                        <td>

                                                            <span className="number-present">
                                                                {
                                                                    subject.present
                                                                }
                                                            </span>

                                                        </td>

                                                        <td>

                                                            <span className="number-absent">
                                                                {
                                                                    subject.absent
                                                                }
                                                            </span>

                                                        </td>

                                                        <td>

                                                            <div className="percentage-cell">

                                                                <div className="percentage-bar">

                                                                    <div
                                                                        className="percentage-fill"
                                                                        style={{
                                                                            width: `${Math.min(
                                                                                Math.max(
                                                                                    percentageValue,
                                                                                    0
                                                                                ),
                                                                                100
                                                                            )}%`
                                                                        }}
                                                                    />

                                                                </div>

                                                                <strong>
                                                                    {
                                                                        subject.percentage
                                                                    }%
                                                                </strong>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                );

                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )}

        </div>

    );
}

export default StudentAttendance;