
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Courses.css";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const [coursesResponse, levelsResponse] =
                    await Promise.all([
                        api.get("courses/"),
                        api.get("course-levels/"),
                    ]);

                const coursesData = coursesResponse.data;
                const levelsData = levelsResponse.data;

                setCourses(
                    Array.isArray(coursesData)
                        ? coursesData
                        : coursesData.results || []
                );

                setLevels(
                    Array.isArray(levelsData)
                        ? levelsData
                        : levelsData.results || []
                );
            } catch (err) {
                console.error("Failed to load courses:", err);

                setError(
                    err.response?.data?.detail ||
                    "Failed to load courses."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    const getLevelId = (course) => {
        if (
            course.level &&
            typeof course.level === "object"
        ) {
            return course.level.id;
        }

        return course.level_id ?? course.level;
    };

    const getLevelName = (course) => {
        if (
            course.level &&
            typeof course.level === "object"
        ) {
            return course.level.name || "Course";
        }

        const levelId = getLevelId(course);

        return (
            levels.find(
                (level) =>
                    Number(level.id) === Number(levelId)
            )?.name ||
            course.level_name ||
            "Course"
        );
    };

    if (loading) {
        return (
            <main className="public-courses">
                <section className="courses-list-section">
                    <div className="container">
                        <p>Loading courses...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="public-courses">
                <section className="courses-list-section">
                    <div className="container">
                        <h1>Our Courses</h1>
                        <p role="alert">{error}</p>
                    </div>
                </section>
            </main>
        );
    }

    const groupedCourses = levels
        .map((level) => ({
            ...level,
            courses: courses.filter(
                (course) =>
                    Number(getLevelId(course)) ===
                    Number(level.id)
            ),
        }))
        .filter((level) => level.courses.length > 0);

    return (
        <main className="public-courses">
            <section
                className="courses-list-section"
                aria-labelledby="courses-heading"
            >
                <div className="container">
                    
                    <header className="courses-heading">
                        <h1 id="courses-heading">
                            Our Courses
                        </h1>

                        <p>
                            Explore our undergraduate and
                            postgraduate programs.
                        </p>
                    </header>

                    {courses.length === 0 ? (
                        <div className="courses-empty">
                            <p>No courses available.</p>
                        </div>
                    ) : groupedCourses.length === 0 ? (
                        <div className="courses-empty">
                            <p>
                                Course levels are not available
                                for the current courses.
                            </p>
                        </div>
                    ) : (
                        groupedCourses.map((level) => (
                            <section
                                className="course-level-section"
                                key={level.id}
                                aria-labelledby={`level-${level.id}`}
                            >
                                <h2 id={`level-${level.id}`}>
                                    {level.name}
                                </h2>

                                <div className="public-course-grid">
                                    {level.courses.map((course) => (
                                        <article
                                            className="public-course-card"
                                            key={course.id}
                                        >
                                            <div className="public-course-content">
                                                <span className="course-type">
                                                    {getLevelName(course)}
                                                </span>

                                                <h3>{course.name}</h3>

                                                {course.description && (
                                                    <p>
                                                        {course.description}
                                                    </p>
                                                )}

                                                <div className="course-details">
                                                    <span>
                                                        Code: {course.code}
                                                    </span>

                                                    <span>
                                                        Duration:{" "}
                                                        {course.duration} years
                                                    </span>
                                                </div>

                                                <Link
                                                    to={`/course-application/${course.id}`}
                                                >
                                                    Apply Now →
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                    
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

export default Courses;
