import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Courses.css";

function Courses() {
    // =========================================================
    // STATE
    // =========================================================

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================================
    // LOAD COURSES PAGE
    // =========================================================

    const loadCourses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("public/courses/");

            setPage(response.data);
        } catch (err) {
            console.error("Failed to load courses page:", err);

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
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="public-courses">
                <section className="courses-page-hero">
                    <div className="container">
                        <span className="section-label">
                            Academic Programs
                        </span>

                        <h1>Our Courses</h1>

                        <p>
                            Loading courses...
                        </p>
                    </div>
                </section>
            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {
        return (
            <div className="public-courses">
                <section className="courses-page-hero">
                    <div className="container">
                        <span className="section-label">
                            Academic Programs
                        </span>

                        <h1>Our Courses</h1>

                        <p>
                            {error}
                        </p>
                    </div>
                </section>
            </div>
        );
    }


    // =========================================================
    // NO DATA
    // =========================================================

    if (!page) {
        return (
            <div className="public-courses">
                <section className="courses-page-hero">
                    <div className="container">
                        <span className="section-label">
                            Academic Programs
                        </span>

                        <h1>Our Courses</h1>

                        <p>
                            Courses data not available.
                        </p>
                    </div>
                </section>
            </div>
        );
    }


    // =========================================================
    // COURSES
    // =========================================================

    const courses = (page.courses || [])
        .filter((course) => course.is_active === true)
        .sort((a, b) => a.order - b.order);


    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="public-courses">

            {/* =================================================
                HERO
            ================================================= */}

            <section className="courses-page-hero">
                <div className="container">

                    <span className="section-label">
                        {page.hero_label}
                    </span>

                    <h1>
                        {page.hero_title}
                    </h1>

                    <p>
                        {page.hero_description}
                    </p>

                </div>
            </section>


            {/* =================================================
                INTRO
            ================================================= */}

            <section className="courses-intro-section">
                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {page.intro_label}
                        </span>

                        <h2>
                            {page.intro_title}
                        </h2>

                        <p>
                            {page.intro_description}
                        </p>

                    </div>

                </div>
            </section>


            {/* =================================================
                COURSES LIST
            ================================================= */}

            <section className="courses-list-section">
                <div className="container">

                    {courses.length === 0 ? (

                        <div className="courses-empty">
                            <p>
                                No courses available.
                            </p>
                        </div>

                    ) : (

                        <div className="public-course-grid">

                            {courses.map((course) => (

                                <div
                                    className="public-course-card"
                                    key={course.id}
                                >

                                    {/* COURSE IMAGE */}

                                    <div className="public-course-image">

                                        {course.image ? (

                                           <img
                                                src={`http://127.0.0.1:8000${course.image}`}
                                                alt={course.name}
                                            />

                                        ) : (

                                            <span>
                                                Course Image
                                            </span>

                                        )}

                                    </div>


                                    {/* COURSE CONTENT */}

                                    <div className="public-course-content">

                                        <span className="course-type">
                                            {course.course_type}
                                        </span>


                                        <h3>
                                            {course.name}
                                        </h3>


                                        <p>
                                            {course.description}
                                        </p>


                                        {/* COURSE DETAILS */}

                                        <div className="course-details">

                                            <span>
                                                📚 {course.department}
                                            </span>

                                            <span>
                                                ⏱ {course.duration}
                                            </span>

                                        </div>


                                        {/* ENQUIRE */}

                                    <Link to={`/course-application/${course.id}`}>
                                        Apply Now →
                                    </Link>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>
            </section>


            {/* =================================================
                CTA
            ================================================= */}

            <section className="courses-cta-section">
                <div className="container">

                    <div className="courses-cta">

                        <div>

                            <h2>
                                {page.cta_title}
                            </h2>

                            <p>
                                {page.cta_description}
                            </p>

                        </div>


                        <Link
                            to={page.cta_button_link}
                            className="primary-btn"
                        >
                            {page.cta_button_text}
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    );
}

export default Courses;