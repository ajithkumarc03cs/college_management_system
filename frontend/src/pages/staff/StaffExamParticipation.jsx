import { useEffect, useState } from "react";
import api from "../../api/axios";


function StaffExamParticipation() {

    const [exams, setExams] = useState([]);
    const [participations, setParticipations] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");

    const [loading, setLoading] = useState(false);
    const [savingId, setSavingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================================
    // LOAD EXAMS
    // =========================================================

    const loadExams = async () => {

        try {

            const response = await api.get("/exams/");

            const data = Array.isArray(response.data)
                ? response.data
                : response.data.results || [];

            setExams(data);

        } catch (err) {

            console.error(err);

            setError("Failed to load exams.");

        }
    };


    // =========================================================
    // LOAD PARTICIPATION
    // =========================================================

    const loadParticipation = async (examId) => {

        if (!examId) {

            setParticipations([]);

            return;
        }


        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                `/exam-participation/?exam=${examId}`
            );


            const data = Array.isArray(response.data)
                ? response.data
                : response.data.results || [];


            setParticipations(data);

        } catch (err) {

            console.error(err);

            setError(
                err?.response?.data?.detail ||
                "Failed to load students."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadExams();

    }, []);


    // =========================================================
    // EXAM CHANGE
    // =========================================================

    const handleExamChange = (event) => {

        const examId = event.target.value;

        setSelectedExam(examId);

        setSuccess("");

        setError("");

        loadParticipation(examId);
    };


    // =========================================================
    // STATUS CHANGE
    // =========================================================

    const handleStatusChange = (id, status) => {

        setParticipations((previous) =>
            previous.map((item) => {

                if (item.id !== id) {
                    return item;
                }


                return {
                    ...item,

                    status: status,

                    marks:
                        status === "PRESENT"
                            ? item.marks
                            : null,
                };

            })
        );

        setError("");

        setSuccess("");
    };


    // =========================================================
    // MARKS CHANGE
    // =========================================================

    const handleMarksChange = (id, marks) => {

        setParticipations((previous) =>
            previous.map((item) => {

                if (item.id !== id) {
                    return item;
                }


                return {
                    ...item,

                    marks:
                        marks === ""
                            ? null
                            : Number(marks),
                };

            })
        );

        setError("");

        setSuccess("");
    };


    // =========================================================
    // SAVE PARTICIPATION
    // =========================================================

    const handleSave = async (participation) => {

        try {

            setSavingId(participation.id);

            setError("");

            setSuccess("");


            const payload = {

                status: participation.status,

                marks:
                    participation.status === "PRESENT"
                        ? participation.marks
                        : null,
            };


            await api.patch(
                `/exam-participation/${participation.id}/`,
                payload
            );


            setSuccess(
                `${participation.student_name} updated successfully.`
            );


            await loadParticipation(selectedExam);

        } catch (err) {

            console.error(err);

            const data = err?.response?.data;

            if (data && typeof data === "object") {

                const messages = [];

                Object.entries(data).forEach(
                    ([field, value]) => {

                        if (Array.isArray(value)) {

                            messages.push(
                                `${field}: ${value.join(", ")}`
                            );

                        } else {

                            messages.push(
                                `${field}: ${value}`
                            );
                        }

                    }
                );


                setError(
                    messages.join(" | ") ||
                    "Failed to update."
                );

            } else {

                setError(
                    "Failed to update participation."
                );
            }

        } finally {

            setSavingId(null);
        }
    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div>

            <h1>
                Exam Participation
            </h1>


            {/* =================================================
                MESSAGES
            ================================================= */}

            {error && (
                <p>
                    {error}
                </p>
            )}


            {success && (
                <p>
                    {success}
                </p>
            )}


            {/* =================================================
                SELECT EXAM
            ================================================= */}

            <div>

                <label>
                    Select Exam
                </label>

                <select
                    value={selectedExam}
                    onChange={handleExamChange}
                >

                    <option value="">
                        Select Exam
                    </option>


                    {exams.map((exam) => (

                        <option
                            key={exam.id}
                            value={exam.id}
                        >
                            {exam.name}
                            {" - "}
                            {exam.subject_name}
                            {" - "}
                            {exam.exam_date}
                        </option>

                    ))}

                </select>

            </div>


            <hr />


            {/* =================================================
                SELECTED EXAM DETAILS
            ================================================= */}

            {selectedExam && (

                <div>

                    <h2>
                        Students
                    </h2>


                    {loading ? (

                        <p>
                            Loading students...
                        </p>

                    ) : participations.length === 0 ? (

                        <p>
                            No students found for this exam.
                        </p>

                    ) : (

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Course
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
                                        Marks
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {participations.map(
                                    (item, index) => (

                                        <tr
                                            key={item.id}
                                        >

                                            <td>
                                                {index + 1}
                                            </td>


                                            <td>
                                                {item.student_name}
                                            </td>


                                            <td>
                                                {item.student_email}
                                            </td>


                                            <td>
                                                {item.student_course_name}
                                            </td>


                                            <td>
                                                {item.student_department_name}
                                            </td>


                                            <td>
                                                {item.student_year}
                                            </td>


                                            <td>

                                                <select
                                                    value={
                                                        item.status || "PENDING"
                                                    }
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            item.id,
                                                            event.target.value
                                                        )
                                                    }
                                                >

                                                    <option value="PENDING">
                                                        Pending
                                                    </option>

                                                    <option value="PRESENT">
                                                        Present
                                                    </option>

                                                    <option value="ABSENT">
                                                        Absent
                                                    </option>

                                                </select>

                                            </td>


                                            <td>

                                                {item.status ===
                                                "PRESENT" ? (

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={
                                                            item.marks ?? ""
                                                        }
                                                        onChange={(event) =>
                                                            handleMarksChange(
                                                                item.id,
                                                                event.target.value
                                                            )
                                                        }
                                                    />

                                                ) : (

                                                    <span>
                                                        -
                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        savingId === item.id
                                                    }
                                                    onClick={() =>
                                                        handleSave(item)
                                                    }
                                                >

                                                    {savingId === item.id
                                                        ? "Saving..."
                                                        : "Save"}

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    )}

                </div>

            )}

        </div>
    );
}


export default StaffExamParticipation;