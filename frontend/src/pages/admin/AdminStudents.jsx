import { useEffect, useState } from "react";

import api from "../../api/axios";


function AdminStudents() {

    // ========================================================
    // DATA
    // ========================================================

    const [students, setStudents] = useState([]);

    // ========================================================
    // FILTERS
    // ========================================================

    const [search, setSearch] = useState("");

    const [courseFilter, setCourseFilter] = useState("");

    const [departmentFilter, setDepartmentFilter] =
        useState("");

    const [yearFilter, setYearFilter] = useState("");


    // ========================================================
    // SELECTED STUDENT
    // ========================================================

    const [selectedStudent, setSelectedStudent] =
        useState(null);


    // ========================================================
    // UI
    // ========================================================

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD STUDENTS
    // ========================================================

    useEffect(() => {

        loadStudents();

    }, []);


    const loadStudents = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await api.get(
                "students/?page_size=100"
            );


            console.log(
                "Admin Students:",
                response.data
            );


            setStudents(
                response.data.results ||
                response.data ||
                []
            );


        } catch (error) {

            console.error(
                "Admin Students Error:",
                error.response?.data || error
            );


            setStudents([]);


            setError(
                error.response?.data?.detail ||
                "Unable to load students."
            );


        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // COURSE OPTIONS
    // ========================================================

    const courseOptions = [

        ...new Map(

            students.map(
                (item) => [

                    item.course_id ??
                    item.course,

                    item.course_name ||
                    item.course?.name ||
                    item.course ||
                    "-"

                ]
            )

        ).entries()

    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );


    // ========================================================
    // DEPARTMENT OPTIONS
    // ========================================================

    const departmentOptions = [

        ...new Map(

            students.map(
                (item) => [

                    item.department_id ??
                    item.department,

                    item.department_name ||
                    item.department?.name ||
                    item.department ||
                    "-"

                ]
            )

        ).entries()

    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );


    // ========================================================
    // YEAR OPTIONS
    // ========================================================

    const yearOptions = [

        ...new Set(

            students
                .map(
                    (item) =>
                        item.current_year ??
                        item.year
                )
                .filter(
                    (year) =>
                        year !== null &&
                        year !== undefined
                )

        )

    ].sort(
        (a, b) => a - b
    );


    // ========================================================
    // FILTER STUDENTS
    // ========================================================

    const filteredStudents =
        students.filter(
            (student) => {

                const searchValue =
                    search
                        .toLowerCase()
                        .trim();


                const name =
                    String(
                        student.name ||
                        ""
                    );


                const email =
                    String(
                        student.email ||
                        ""
                    );


                const phone =
                    String(
                        student.phone ||
                        ""
                    );


                const username =
                    String(
                        student.username ||
                        ""
                    );


                const courseName =
                    String(
                        student.course_name ||
                        student.course?.name ||
                        student.course ||
                        ""
                    );


                const departmentName =
                    String(
                        student.department_name ||
                        student.department?.name ||
                        student.department ||
                        ""
                    );


                const matchesSearch =

                    searchValue === ""

                    ||

                    name
                        .toLowerCase()
                        .includes(
                            searchValue
                        )

                    ||

                    email
                        .toLowerCase()
                        .includes(
                            searchValue
                        )

                    ||

                    phone
                        .toLowerCase()
                        .includes(
                            searchValue
                        )

                    ||

                    username
                        .toLowerCase()
                        .includes(
                            searchValue
                        )

                    ||

                    courseName
                        .toLowerCase()
                        .includes(
                            searchValue
                        )

                    ||

                    departmentName
                        .toLowerCase()
                        .includes(
                            searchValue
                        );


                const matchesCourse =

                    courseFilter === ""

                    ||

                    String(
                        student.course_id ??
                        student.course
                    ) ===
                    String(
                        courseFilter
                    );


                const matchesDepartment =

                    departmentFilter === ""

                    ||

                    String(
                        student.department_id ??
                        student.department
                    ) ===
                    String(
                        departmentFilter
                    );


                const studentYear =
                    student.current_year ??
                    student.year;


                const matchesYear =

                    yearFilter === ""

                    ||

                    String(
                        studentYear
                    ) ===
                    String(
                        yearFilter
                    );


                return (

                    matchesSearch

                    &&

                    matchesCourse

                    &&

                    matchesDepartment

                    &&

                    matchesYear

                );

            }
        );


    // ========================================================
    // VIEW DETAILS
    // ========================================================

    const handleView = (
        student
    ) => {

        setSelectedStudent(
            student
        );

    };


    // ========================================================
    // CLOSE DETAILS
    // ========================================================

    const handleClose = () => {

        setSelectedStudent(
            null
        );

    };


    // ========================================================
    // CLEAR FILTERS
    // ========================================================

    const clearFilters = () => {

        setSearch("");

        setCourseFilter("");

        setDepartmentFilter("");

        setYearFilter("");

    };


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {

        loadStudents();

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div>

                <h1>
                    Admin Students
                </h1>

                <p>
                    Loading students...
                </p>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div>

            {/* =================================================
                TITLE
            ================================================= */}

            <h1>
                Admin Students
            </h1>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div>

                    <p
                        style={{
                            color: "red"
                        }}
                    >
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={
                            handleRefresh
                        }
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* =================================================
                SEARCH
            ================================================= */}

            <div>

                <input
                    type="text"
                    placeholder="Search name / email / phone / username..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>


            <br />


            {/* =================================================
                COURSE FILTER
            ================================================= */}

            <div>

                <label>
                    Course:
                </label>

                {" "}


                <select
                    value={
                        courseFilter
                    }
                    onChange={(e) =>
                        setCourseFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Courses
                    </option>


                    {courseOptions.map(
                        ([id, name]) => (

                            <option
                                key={id}
                                value={id}
                            >
                                {name}
                            </option>

                        )
                    )}

                </select>

            </div>


            <br />


            {/* =================================================
                DEPARTMENT FILTER
            ================================================= */}

            <div>

                <label>
                    Department:
                </label>

                {" "}


                <select
                    value={
                        departmentFilter
                    }
                    onChange={(e) =>
                        setDepartmentFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Departments
                    </option>


                    {departmentOptions.map(
                        ([id, name]) => (

                            <option
                                key={id}
                                value={id}
                            >
                                {name}
                            </option>

                        )
                    )}

                </select>

            </div>


            <br />


            {/* =================================================
                YEAR FILTER
            ================================================= */}

            <div>

                <label>
                    Year:
                </label>

                {" "}


                <select
                    value={
                        yearFilter
                    }
                    onChange={(e) =>
                        setYearFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Years
                    </option>


                    {yearOptions.map(
                        (year) => (

                            <option
                                key={year}
                                value={year}
                            >
                                Year {year}
                            </option>

                        )
                    )}

                </select>

            </div>


            <br />


            {/* =================================================
                BUTTONS
            ================================================= */}

            <button
                type="button"
                onClick={
                    clearFilters
                }
            >
                Clear Filters
            </button>


            {" "}


            <button
                type="button"
                onClick={
                    handleRefresh
                }
            >
                Refresh
            </button>


            {/* =================================================
                COUNT
            ================================================= */}

            <p>

                Showing{" "}

                {
                    filteredStudents.length
                }

                {" "}
                student(s)

            </p>


            {/* =================================================
                STUDENT TABLE
            ================================================= */}

            {filteredStudents.length === 0 ? (

                <p>
                    No students found.
                </p>

            ) : (

                <table
                    border="1"
                    cellPadding="8"
                    cellSpacing="0"
                >

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Username
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

                            <th>
                                Admission Year
                            </th>

                            <th>
                                Existing Student
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStudents.map(
                            (student) => (

                                <tr
                                    key={
                                        student.id
                                    }
                                >

                                    <td>
                                        {
                                            student.id
                                        }
                                    </td>


                                    <td>
                                        {
                                            student.name ||
                                            "-"
                                        }
                                    </td>


                                    <td>
                                        {
                                            student.username ||
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
                                            student.course?.name ||
                                            student.course ||
                                            "-"
                                        }
                                    </td>


                                    <td>
                                        {
                                            student.department_name ||
                                            student.department?.name ||
                                            student.department ||
                                            "-"
                                        }
                                    </td>


                                    <td>
                                        {
                                            student.current_year ??
                                            student.year ??
                                            "-"
                                        }
                                    </td>


                                    <td>
                                        {
                                            student.admission_year ??
                                            "-"
                                        }
                                    </td>


                                    <td>
                                        {
                                            student.is_existing_student
                                                ? "Yes"
                                                : "No"
                                        }
                                    </td>


                                    <td>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleView(
                                                    student
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            )}


            {/* =================================================
                STUDENT DETAILS
            ================================================= */}

            {selectedStudent && (

                <div>

                    <hr />


                    <h2>
                        Student Details
                    </h2>


                    <p>

                        <strong>
                            ID:
                        </strong>{" "}

                        {
                            selectedStudent.id
                        }

                    </p>


                    <p>

                        <strong>
                            Name:
                        </strong>{" "}

                        {
                            selectedStudent.name ||
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Username:
                        </strong>{" "}

                        {
                            selectedStudent.username ||
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Email:
                        </strong>{" "}

                        {
                            selectedStudent.email ||
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Phone:
                        </strong>{" "}

                        {
                            selectedStudent.phone ||
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Course:
                        </strong>{" "}

                        {
                            selectedStudent.course_name ||
                            selectedStudent.course?.name ||
                            selectedStudent.course ||
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Department:
                        </strong>{" "}

                        {
                            selectedStudent.department_name ||
                            selectedStudent.department?.name ||
                            selectedStudent.department ||
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Current Year:
                        </strong>{" "}

                        {
                            selectedStudent.current_year ??
                            selectedStudent.year ??
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Admission Year:
                        </strong>{" "}

                        {
                            selectedStudent.admission_year ??
                            "-"
                        }

                    </p>


                    <p>

                        <strong>
                            Existing Student:
                        </strong>{" "}

                        {
                            selectedStudent.is_existing_student
                                ? "Yes"
                                : "No"
                        }

                    </p>


                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                    >
                        Close
                    </button>

                </div>

            )}

        </div>

    );

}


export default AdminStudents;
