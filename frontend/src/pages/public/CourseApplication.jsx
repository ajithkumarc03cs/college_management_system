import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./CourseApplication.css";

function CourseApplication() {

    // =========================================================
    // NAVIGATION
    // =========================================================

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [courses, setCourses] = useState([]);

    const [courseLevels, setCourseLevels] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [formData, setFormData] = useState({
        course_level: "",
        department: "",
        course: "",
        applicant_name: "",
        email: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================================
    // LOAD COURSES
    // =========================================================

    const loadCourses = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "public/courses/"
            );

            const activeCourses = (response.data.courses || [])
                .filter(
                    (course) => course.is_active === true
                )
                .sort(
                    (a, b) => a.order - b.order
                );

            setCourses(activeCourses);

            // =================================================
            // CREATE DYNAMIC COURSE LEVELS
            // =================================================

            const levels = [
                ...new Set(
                    activeCourses
                        .map((course) => course.course_type)
                        .filter(Boolean)
                ),
            ];

            setCourseLevels(levels);

        } catch (err) {

            console.error(
                "Failed to load courses:",
                err
            );

            setError(
                err.response?.data?.detail ||
                "Failed to load courses."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadCourses();

    }, []);


    // =========================================================
    // COURSE LEVEL CHANGE
    // =========================================================

    const handleLevelChange = (event) => {

        const level = event.target.value;

        setFormData((previous) => ({
            ...previous,
            course_level: level,
            department: "",
            course: "",
        }));

        // Get departments belonging to selected level

        const levelCourses = courses.filter(
            (course) =>
                course.course_type === level
        );

        const uniqueDepartments = [
            ...new Set(
                levelCourses
                    .map((course) => course.department)
                    .filter(Boolean)
            ),
        ];

        setDepartments(uniqueDepartments);

        setFilteredCourses([]);

    };


    // =========================================================
    // DEPARTMENT CHANGE
    // =========================================================

    const handleDepartmentChange = (event) => {

        const department = event.target.value;

        setFormData((previous) => ({
            ...previous,
            department,
            course: "",
        }));

        // Get courses belonging to selected
        // level + department

        const departmentCourses = courses.filter(
            (course) =>
                course.course_type === formData.course_level &&
                course.department === department
        );

        setFilteredCourses(departmentCourses);

    };


    // =========================================================
    // INPUT CHANGE
    // =========================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =========================================================
    // SUBMIT APPLICATION
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {

            await api.post(
                "public/course-applications/",
                {
                    course: Number(formData.course),

                    applicant_name:
                        formData.applicant_name,

                    email:
                        formData.email,

                    address:
                        formData.address,
                }
            );


            // =================================================
            // SUCCESS
            // =================================================

            setSuccess(
                "Your application has been submitted successfully."
            );


            // Clear form

            setFormData({
                course_level: "",
                department: "",
                course: "",
                applicant_name: "",
                email: "",
                address: "",
            });

            setDepartments([]);
            setFilteredCourses([]);

        } catch (err) {

            console.error(
                "Course application failed:",
                err
            );

            const backendErrors =
                err.response?.data;


            if (backendErrors) {

                if (
                    typeof backendErrors === "string"
                ) {

                    setError(
                        backendErrors
                    );

                } else if (
                    backendErrors.detail
                ) {

                    setError(
                        backendErrors.detail
                    );

                } else {

                    setError(
                        Object.values(
                            backendErrors
                        )
                            .flat()
                            .join(" ")
                    );

                }

            } else {

                setError(
                    "Failed to submit application. Please try again."
                );

            }

        } finally {

            setSubmitting(false);

        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="course-application-page">

                <div className="container">

                    <div className="application-loading">

                        <p>
                            Loading courses...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // ERROR WHILE LOADING COURSES
    // =========================================================

    if (error && courses.length === 0) {

        return (

            <div className="course-application-page">

                <div className="container">

                    <div className="application-error">

                        <span className="section-label">
                            Course Application
                        </span>

                        <h1>
                            Apply for a Course
                        </h1>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/courses")}
                        >
                            Back to Courses
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="course-application-page">

            <div className="container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="application-header">

                    <span className="section-label">
                        Course Application
                    </span>

                    <h1>
                        Apply for a Course
                    </h1>

                    <p>
                        Select your course details and
                        fill in your personal information below.
                    </p>

                </div>


                {/* =================================================
                    SUCCESS MESSAGE
                ================================================= */}

                {success && (

                    <div className="application-success">

                        <h2>
                            Application Submitted
                        </h2>

                        <p>
                            {success}
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/courses")}
                        >
                            Back to Courses
                        </button>

                    </div>

                )}


                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {error && (

                    <div className="application-form-error">

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* =================================================
                    APPLICATION FORM
                ================================================= */}

                {!success && (

                    <form
                        className="course-application-form"
                        onSubmit={handleSubmit}
                    >


                        {/* =================================================
                            COURSE LEVEL
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="course_level">
                                Course Level
                            </label>

                            <select
                                id="course_level"
                                name="course_level"
                                value={formData.course_level}
                                onChange={handleLevelChange}
                                required
                            >

                                <option value="">
                                    Select UG / PG
                                </option>

                                {courseLevels.map(
                                    (level) => (

                                        <option
                                            key={level}
                                            value={level}
                                        >
                                            {level}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =================================================
                            DEPARTMENT
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="department">
                                Department
                            </label>

                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleDepartmentChange}
                                disabled={!formData.course_level}
                                required
                            >

                                <option value="">
                                    {formData.course_level
                                        ? "Select Department"
                                        : "Select Course Level First"}
                                </option>

                                {departments.map(
                                    (department) => (

                                        <option
                                            key={department}
                                            value={department}
                                        >
                                            {department}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =================================================
                            COURSE
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="course">
                                Course
                            </label>

                            <select
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                disabled={!formData.department}
                                required
                            >

                                <option value="">
                                    {formData.department
                                        ? "Select Course"
                                        : "Select Department First"}
                                </option>

                                {filteredCourses.map(
                                    (course) => (

                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =================================================
                            NAME
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="applicant_name">
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="applicant_name"
                                name="applicant_name"
                                value={
                                    formData.applicant_name
                                }
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />

                        </div>


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />

                        </div>


                        {/* =================================================
                            ADDRESS
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="address">
                                Address
                            </label>

                            <textarea
                                id="address"
                                name="address"
                                value={
                                    formData.address
                                }
                                onChange={handleChange}
                                placeholder="Enter your address"
                                rows="5"
                                required
                            />

                        </div>


                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Submitting..."
                                : "Submit Application"
                            }

                        </button>


                    </form>

                )}

            </div>

        </div>

    );
}

export default CourseApplication;
