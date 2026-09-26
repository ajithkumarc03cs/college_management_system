import { useEffect, useState } from "react";
import api from "../api/axios";


function StaffStudents() {

    // ========================================================
    // STATE
    // ========================================================

    const [students, setStudents] = useState([]);

    const [courses, setCourses] = useState([]);

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [course, setCourse] = useState("");

    const [department, setDepartment] = useState("");

    const [year, setYear] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD FILTER OPTIONS
    // ========================================================

    const getFilterOptions = async () => {

        try {

            const response = await api.get(
                "staff/student-filter-options/"
            );

            setCourses(
                response.data.courses || []
            );

            setDepartments(
                response.data.departments || []
            );

        } catch (error) {

            console.log(
                "Filter options error:",
                error.response?.data
            );

        }

    };


    // ========================================================
    // LOAD STUDENTS
    // ========================================================

    const getStudents = async (
        searchValue = search,
        courseValue = course,
        departmentValue = department,
        yearValue = year
    ) => {

        setLoading(true);
        setError("");

        try {

            const params = {};

            // ------------------------------------------------
            // SEARCH
            // ------------------------------------------------

            if (
                searchValue &&
                searchValue.trim()
            ) {

                params.search =
                    searchValue.trim();

            }


            // ------------------------------------------------
            // COURSE
            // ------------------------------------------------

            if (courseValue) {

                params.course =
                    courseValue;

            }


            // ------------------------------------------------
            // DEPARTMENT
            // ------------------------------------------------

            if (departmentValue) {

                params.department =
                    departmentValue;

            }


            // ------------------------------------------------
            // CURRENT YEAR
            // ------------------------------------------------

            if (yearValue) {

                params.year =
                    yearValue;

            }


            // ------------------------------------------------
            // API REQUEST
            // ------------------------------------------------

            const response = await api.get(
                "students/",
                {
                    params: params
                }
            );


            setStudents(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.log(
                "Student loading error:",
                error.response?.data
            );

            setStudents([]);

            setError(
                "Unable to load students."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // INITIAL PAGE LOAD
    // ========================================================

    useEffect(() => {

        getFilterOptions();

        getStudents();

    }, []);


    // ========================================================
    // COURSE CHANGE
    // ========================================================

    const handleCourseChange = (e) => {

        const selectedCourse =
            e.target.value;

        setCourse(selectedCourse);

        // Reset department when course changes
        setDepartment("");

    };


    // ========================================================
    // SEARCH
    // ========================================================

    const handleSearch = () => {

        getStudents(
            search,
            course,
            department,
            year
        );

    };


    // ========================================================
    // CLEAR FILTERS
    // ========================================================

    const handleClear = () => {

        setSearch("");

        setCourse("");

        setDepartment("");

        setYear("");

        getStudents(
            "",
            "",
            "",
            ""
        );

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="staff-page">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="page-header">

                <div>

                    <h1>
                        My Students
                    </h1>

                    <p>
                        View and filter students assigned to you.
                    </p>

                </div>

            </div>


            {/* ==================================================
                FILTER SECTION
            ================================================== */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Student Filters
                        </h2>

                        <p>
                            Search students by name, course,
                            department or current year.
                        </p>

                    </div>

                </div>


                <div className="toolbar">

                    {/* SEARCH */}

                    <div className="form-group">

                        <label>
                            Search Student
                        </label>

                        <input
                            type="text"
                            placeholder="Name, email or phone"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {

                                    handleSearch();

                                }

                            }}
                        />

                    </div>


                    {/* COURSE */}

                    <div className="form-group">

                        <label>
                            Course
                        </label>

                        <select
                            value={course}
                            onChange={
                                handleCourseChange
                            }
                        >

                            <option value="">
                                All Courses
                            </option>


                            {courses.map(
                                (item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* DEPARTMENT */}

                    <div className="form-group">

                        <label>
                            Department
                        </label>

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Departments
                            </option>


                            {departments.map(
                                (item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* YEAR */}

                    <div className="form-group">

                        <label>
                            Current Year
                        </label>

                        <select
                            value={year}
                            onChange={(e) =>
                                setYear(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Years
                            </option>

                            <option value="1">
                                Year 1
                            </option>

                            <option value="2">
                                Year 2
                            </option>

                            <option value="3">
                                Year 3
                            </option>

                            <option value="4">
                                Year 4
                            </option>

                        </select>

                    </div>


                    {/* ACTION BUTTONS */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="primary-btn"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleClear}
                        >
                            Clear
                        </button>

                    </div>

                </div>

            </section>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div className="alert alert-error">

                    {error}

                </div>

            )}


            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (

                <div className="loading-state">

                    Loading students...

                </div>

            )}


            {/* ==================================================
                STUDENT LIST
            ================================================== */}

            {!loading && (

                <section className="page-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Students
                            </h2>

                            <p>
                                Students available for your
                                assigned classes.
                            </p>

                        </div>


                        <div className="section-count">

                            Total Students:{" "}

                            <strong>
                                {students.length}
                            </strong>

                        </div>

                    </div>


                    {/* ==================================================
                        TABLE
                    ================================================== */}

                    {students.length > 0 ? (

                        <div className="table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Course
                                        </th>

                                        <th>
                                            Department
                                        </th>

                                        <th>
                                            Current Year
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {students.map(
                                        (student) => (

                                            <tr
                                                key={
                                                    student.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        student.name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.email ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.phone ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.course_name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.department_name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.current_year ||
                                                        "-"
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="empty-state">

                            No students found.

                        </div>

                    )}

                </section>

            )}

        </div>

    );

}


export default StaffStudents;