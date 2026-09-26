import { useEffect, useState } from "react";
import api from "../../api/axios";
function AdminHomeCourses() {

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingCourse, setEditingCourse] = useState(null);

    const [formData, setFormData] = useState({
        course_type: "UG",
        name: "",
        duration: "",
        image: null,
        order: 1,
        is_active: true,
    });


    // =====================================================
    // FETCH COURSES
    // =====================================================

    const fetchCourses = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "admin/home/courses/"
            );

            setCourses(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch courses:",
                error
            );

            setError("Failed to load courses.");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchCourses();

    }, []);


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (event) => {

        const { name, value, type, checked, files } =
            event.target;

        setFormData((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value,
        }));
    };


    // =====================================================
    // ADD COURSE
    // =====================================================

    const handleAdd = () => {

        setEditingCourse(null);

        setFormData({
            course_type: "UG",
            name: "",
            duration: "",
            image: null,
            order: courses.length + 1,
            is_active: true,
        });

        setShowForm(true);
    };


    // =====================================================
    // EDIT COURSE
    // =====================================================

    const handleEdit = (course) => {

        setEditingCourse(course);

        setFormData({
            course_type: course.course_type || "UG",
            name: course.name || "",
            duration: course.duration || "",
            image: null,
            order: course.order || 1,
            is_active: course.is_active ?? true,
        });

        setShowForm(true);
    };


    // =====================================================
    // DELETE COURSE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `admin/home/courses/${id}/`
            );

            await fetchCourses();

        } catch (error) {

            console.error(
                "Failed to delete course:",
                error
            );

            alert("Failed to delete course.");

        }
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const data = new FormData();

            data.append(
                "course_type",
                formData.course_type
            );

            data.append(
                "name",
                formData.name
            );

            data.append(
                "duration",
                formData.duration
            );

            data.append(
                "order",
                formData.order
            );

            data.append(
                "is_active",
                formData.is_active
            );

            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            if (editingCourse) {

                await api.patch(
                    `admin/home/courses/${editingCourse.id}/`,
                    data
                );

            } else {

                await api.post(
                    "admin/home/courses/",
                    data
                );

            }


            setShowForm(false);

            setEditingCourse(null);

            await fetchCourses();

        } catch (error) {

            console.error(
                "Failed to save course:",
                error
            );

            console.error(
                error.response?.data
            );

            alert(
                "Failed to save course."
            );

        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        setShowForm(false);

        setEditingCourse(null);

    };


    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="admin-home-courses">

            <div className="admin-home-courses-header">

                <div>
                    <h3>Home Courses</h3>

                    <p>
                        Manage courses displayed on the
                        public home page.
                    </p>
                </div>

                <button
                    className="admin-home-add-btn"
                    onClick={handleAdd}
                >
                    + Add Course
                </button>

            </div>


            {/* FORM */}

            {showForm && (

                <form
                    className="admin-home-course-form"
                    onSubmit={handleSubmit}
                >

                    <h3>
                        {editingCourse
                            ? "Edit Course"
                            : "Add Course"}
                    </h3>


                    <div className="admin-home-form-grid">

                        <div className="admin-home-form-group">

                            <label>
                                Course Type
                            </label>

                            <select
                                name="course_type"
                                value={formData.course_type}
                                onChange={handleChange}
                            >

                                <option value="UG">
                                    Undergraduate
                                </option>

                                <option value="PG">
                                    Postgraduate
                                </option>

                            </select>

                        </div>


                        <div className="admin-home-form-group">

                            <label>
                                Course Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="B.Sc Computer Science"
                                required
                            />

                        </div>


                        <div className="admin-home-form-group">

                            <label>
                                Duration
                            </label>

                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="3 Years"
                                required
                            />

                        </div>


                        <div className="admin-home-form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                min="1"
                            />

                        </div>


                        <div className="admin-home-form-group">

                            <label>
                                Course Image
                            </label>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                            />

                        </div>


                        <div className="admin-home-form-group checkbox-group">

                            <label>

                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                />

                                Active

                            </label>

                        </div>

                    </div>


                    <div className="admin-home-form-actions">

                        <button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            {editingCourse
                                ? "Update Course"
                                : "Save Course"}
                        </button>

                    </div>

                </form>
            )}


            {/* ERROR */}

            {error && (

                <div className="admin-home-error">
                    {error}
                </div>

            )}


            {/* LOADING */}

            {loading ? (

                <div className="admin-home-loading">
                    Loading courses...
                </div>

            ) : courses.length === 0 ? (

                <div className="admin-home-empty">
                    No courses found.
                </div>

            ) : (

                <div className="admin-home-course-list">

                    {courses.map((course) => (

                        <div
                            className="admin-home-course-card"
                            key={course.id}
                        >

                            <div className="admin-home-course-image">

                                {course.image ? (

                                    <img
                                        src={course.image}
                                        alt={course.name}
                                    />

                                ) : (

                                    <span>
                                        Course Image
                                    </span>

                                )}

                            </div>


                            <div className="admin-home-course-info">

                                <span className="course-type">

                                    {course.course_type === "UG"
                                        ? "Undergraduate"
                                        : course.course_type === "PG"
                                            ? "Postgraduate"
                                            : course.course_type}

                                </span>

                                <h4>
                                    {course.name}
                                </h4>

                                <p>
                                    {course.duration}
                                </p>

                                <small>
                                    Order: {course.order}
                                </small>

                                <span
                                    className={
                                        course.is_active
                                            ? "course-status active"
                                            : "course-status inactive"
                                    }
                                >
                                    {course.is_active
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                            </div>


                            <div className="admin-home-course-actions">

                                <button
                                    onClick={() =>
                                        handleEdit(course)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(course.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminHomeCourses;