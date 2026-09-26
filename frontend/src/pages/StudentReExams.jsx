import { useEffect, useState } from "react";

import api from "../api/axios";


function StudentReExams() {

    const [reexams, setReexams] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD MY RE-EXAMS
    // ========================================================

    const getReExams = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await api.get(
                "student/reexams/"
            );


            setReexams(
                response.data.results ||
                response.data
            );

        } catch (error) {

            console.log(
                "Student re-exam loading error:",
                error.response?.data
            );


            setError(
                "Unable to load re-exams."
            );

            setReexams([]);

        } finally {

            setLoading(false);
        }
    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        getReExams();

    }, []);


    // ========================================================
    // UI
    // ========================================================

        return (
            <div className="student-page">

                <div className="student-page-header">
                    <div>
                        <h1 className="student-page-title">
                            My Re-Exams
                        </h1>

                        <p className="student-page-description">
                            View exams assigned for re-examination
                        </p>
                    </div>
                </div>


                {loading && (
                    <div className="student-loading">
                        Loading re-exams...
                    </div>
                )}


                {error && (
                    <div className="student-alert student-alert-error">
                        {error}
                    </div>
                )}


                {!loading &&
                    !error &&
                    reexams.length === 0 && (

                        <div className="student-empty">

                            <div className="student-empty-icon">
                                🔄
                            </div>

                            <h3>
                                No Re-Exams
                            </h3>

                            <p>
                                You currently have no re-exams assigned.
                            </p>

                        </div>
                    )
                }


                {!loading &&
                    reexams.length > 0 && (

                        <div className="table-card">

                            <div className="student-table-wrapper">

                                <table className="student-table">

                                    <thead>
                                        <tr>
                                            <th>Exam</th>
                                            <th>Subject</th>
                                            <th>Re-Exam Date</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Reason</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {reexams.map((item) => (

                                            <tr key={item.id}>

                                                <td>
                                                    <strong>
                                                        {item.exam_name}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {item.subject_name}
                                                </td>

                                                <td>
                                                    {item.reexam_date}
                                                </td>

                                                <td>
                                                    {item.start_time}
                                                </td>

                                                <td>
                                                    {item.end_time}
                                                </td>

                                                <td>
                                                    {item.reason || "-"}
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )
                }

            </div>
        );
}


export default StudentReExams;