import { useEffect, useState } from "react";

import api from "../api/axios";
import usePermissions from "../hooks/usePermissions";


function Students() {

    // ========================================================
    // PERMISSIONS
    // ========================================================

    const {
        can,
        loading: permissionLoading
    } = usePermissions();


    const canView = can(
        "students",
        "can_view"
    );

    const canCreate = can(
        "students",
        "can_create"
    );

    const canEdit = can(
        "students",
        "can_edit"
    );

    const canDelete = can(
        "students",
        "can_delete"
    );


    // ========================================================
    // DATA
    // ========================================================

    const [students, setStudents] =
        useState([]);


    // ========================================================
    // FILTER
    // ========================================================

    const [search, setSearch] =
        useState("");


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ========================================================
    // LOAD STUDENTS
    // ========================================================

    useEffect(() => {

        if (
            !permissionLoading &&
            canView
        ) {

            loadStudents();

        }

    }, [
        search,
        permissionLoading,
        canView
    ]);


    const loadStudents = async () => {

        try {

            setLoading(true);
            setError("");


            let url = "students/";


            if (search.trim()) {

                url +=
                    `?search=${encodeURIComponent(search)}`;

            }


            const response =
                await api.get(url);


            console.log(
                "Students:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setStudents(data);


        } catch (error) {

            console.log(
                "Student Error:",
                error.response?.data
            );


            setError(
                "Unable to load students."
            );


        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // ADD STUDENT
    // ========================================================

    const handleAddStudent = () => {

        alert(
            "Create permission is allowed."
        );

    };


    // ========================================================
    // EDIT STUDENT
    // ========================================================

    const handleEdit = (studentId) => {

        alert(
            `Edit permission is allowed for Student ${studentId}.`
        );

    };


    // ========================================================
    // DELETE STUDENT
    // ========================================================

    const handleDelete = async (studentId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this student?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            setError("");


            await api.delete(
                `students/${studentId}/`
            );


            alert(
                "Student deleted successfully."
            );


            loadStudents();


        } catch (error) {

            console.log(
                "Delete Student Error:",
                error.response?.data
            );


            setError(
                "Unable to delete student."
            );

        }

    };


    // ========================================================
    // PERMISSION LOADING
    // ========================================================

    if (permissionLoading) {

        return (

            <div className="admin-page">

                <div className="admin-loading-state">

                    Checking permissions...

                </div>

            </div>

        );

    }


    // ========================================================
    // VIEW PERMISSION
    // ========================================================

    if (!canView) {

        return (

            <div className="admin-page">

                <div className="admin-alert admin-alert-error">

                    You don't have permission
                    to view students.

                </div>

            </div>

        );

    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-students-page">


            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Student Management
                    </h1>

                    <p>
                        Manage student accounts
                        and academic details.
                    </p>

                </div>


                {/* ================================================= */}
                {/* CREATE */}
                {/* ================================================= */}

                {canCreate && (

                    <button
                        type="button"
                        className="admin-primary-btn"
                        onClick={handleAddStudent}
                    >
                        Add Student
                    </button>

                )}

            </div>


            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label htmlFor="student-search">

                        Search Student

                    </label>


                    <input
                        id="student-search"
                        type="text"
                        placeholder="Search student..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div className="admin-alert admin-alert-error">

                    {error}

                </div>

            )}


            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {loading && (

                <div className="admin-loading-state">

                    Loading students...

                </div>

            )}


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            {!loading && (

                <div className="admin-table-card">

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Username</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Course</th>

                                    <th>Department</th>

                                    <th>Current Year</th>

                                    <th>Admission Year</th>

                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {students.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="10"
                                            className="admin-empty-cell"
                                        >
                                            No students found.
                                        </td>

                                    </tr>

                                ) : (

                                    students.map(
                                        (student) => (

                                            <tr
                                                key={student.id}
                                            >

                                                <td>
                                                    {student.id}
                                                </td>

                                                <td>
                                                    {student.username}
                                                </td>

                                                <td>
                                                    {student.name}
                                                </td>

                                                <td>
                                                    {student.email}
                                                </td>

                                                <td>
                                                    {student.phone}
                                                </td>

                                                <td>
                                                    {student.course_name}
                                                </td>

                                                <td>
                                                    {student.department_name}
                                                </td>

                                                <td>
                                                    {student.current_year}
                                                </td>

                                                <td>
                                                    {student.admission_year}
                                                </td>


                                                {/* ================================= */}
                                                {/* ACTIONS */}
                                                {/* ================================= */}

                                                <td>

                                                    <div className="admin-action-group">


                                                        {/* EDIT */}

                                                        {canEdit && (

                                                            <button
                                                                type="button"
                                                                className="admin-secondary-btn"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        student.id
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                        )}


                                                        {/* DELETE */}

                                                        {canDelete && (

                                                            <button
                                                                type="button"
                                                                className="admin-danger-btn"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        student.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        )}


                                                    </div>

                                                </td>

                                            </tr>

                                        )
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


export default Students;