// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import api from "../../api/axios";


// function AdminCourseEdit() {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const [levels, setLevels] = useState([]);

//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         level: "",
//         duration: "",
//         description: ""
//     });

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD COURSE + LEVELS
//     // ========================================================

//     useEffect(() => {

//         const loadData = async () => {

//             try {

//                 const [courseResponse, levelsResponse] =
//                     await Promise.all([
//                         api.get(`courses/${id}/`),
//                         api.get("course-levels/")
//                     ]);


//                 const course = courseResponse.data;

//                 setFormData({
//                     name: course.name || "",
//                     code: course.code || "",
//                     level: course.level || "",
//                     duration: course.duration || "",
//                     description: course.description || ""
//                 });


//                 setLevels(
//                     levelsResponse.data.results ||
//                     levelsResponse.data
//                 );

//             } catch (err) {

//                 console.log(err);

//                 setError(
//                     "Failed to load course."
//                 );

//             } finally {

//                 setLoading(false);

//             }
//         };


//         loadData();

//     }, [id]);


//     // ========================================================
//     // INPUT CHANGE
//     // ========================================================

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });

//     };


//     // ========================================================
//     // UPDATE COURSE
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");


//         if (!formData.name.trim()) {

//             setError("Course name is required.");

//             return;
//         }


//         if (!formData.code.trim()) {

//             setError("Course code is required.");

//             return;
//         }


//         if (!formData.level) {

//             setError("Please select course level.");

//             return;
//         }


//         if (!formData.duration || Number(formData.duration) <= 0) {

//             setError(
//                 "Duration must be greater than 0."
//             );

//             return;
//         }


//         try {

//             setSaving(true);


//             await api.patch(
//                 `courses/${id}/`,
//                 {
//                     name: formData.name,
//                     code: formData.code,
//                     level: Number(formData.level),
//                     duration: Number(formData.duration),
//                     description: formData.description
//                 }
//             );


//             alert("Course updated successfully.");

//             navigate("/admin/courses");

//         } catch (err) {

//             console.log(err);

//             setError(
//                 err.response?.data ||
//                 "Failed to update course."
//             );

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (
//             <div>
//                 Loading course...
//             </div>
//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             <h2>Edit Course</h2>


//             {error && (

//                 <p>
//                     {typeof error === "string"
//                         ? error
//                         : JSON.stringify(error)}
//                 </p>

//             )}


//             <form onSubmit={handleSubmit}>


//                 {/* COURSE NAME */}

//                 <div>

//                     <label>
//                         Course Name
//                     </label>

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 {/* COURSE CODE */}

//                 <div>

//                     <label>
//                         Course Code
//                     </label>

//                     <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 {/* LEVEL */}

//                 <div>

//                     <label>
//                         Level
//                     </label>

//                     <select
//                         name="level"
//                         value={formData.level}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Level
//                         </option>

//                         {levels.map((level) => (

//                             <option
//                                 key={level.id}
//                                 value={level.id}
//                             >
//                                 {level.name}
//                             </option>

//                         ))}

//                     </select>

//                 </div>


//                 {/* DURATION */}

//                 <div>

//                     <label>
//                         Duration
//                     </label>

//                     <input
//                         type="number"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                         min="1"
//                     />

//                     <span> Years</span>

//                 </div>


//                 {/* DESCRIPTION */}

//                 <div>

//                     <label>
//                         Description
//                     </label>

//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 {/* BUTTONS */}

//                 <button
//                     type="submit"
//                     disabled={saving}
//                 >

//                     {saving
//                         ? "Updating..."
//                         : "Update Course"}

//                 </button>


//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate("/admin/courses")
//                     }
//                 >

//                     Cancel

//                 </button>


//             </form>

//         </div>

//     );

// }


// export default AdminCourseEdit;







// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import api from "../../api/axios";


// function AdminCourseEdit() {

//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [levels, setLevels] = useState([]);

//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         level: "",
//         duration: "",
//         description: ""
//     });

//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD COURSE + LEVELS
//     // ========================================================

//     useEffect(() => {

//         const loadData = async () => {

//             try {

//                 const [courseResponse, levelsResponse] =
//                     await Promise.all([
//                         api.get(`courses/${id}/`),
//                         api.get("course-levels/")
//                     ]);

//                 const course = courseResponse.data;

//                 setFormData({
//                     name: course.name || "",
//                     code: course.code || "",
//                     level: course.level || "",
//                     duration: course.duration || "",
//                     description: course.description || ""
//                 });

//                 setLevels(
//                     levelsResponse.data.results ||
//                     levelsResponse.data
//                 );

//             } catch (err) {

//                 console.log(err);

//                 setError("Failed to load course.");

//             } finally {

//                 setLoading(false);

//             }

//         };

//         loadData();

//     }, [id]);


//     // ========================================================
//     // INPUT CHANGE
//     // ========================================================

//     const handleChange = (e) => {

//         setFormData((previous) => ({
//             ...previous,
//             [e.target.name]: e.target.value
//         }));

//     };


//     // ========================================================
//     // UPDATE COURSE
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");


//         if (!formData.name.trim()) {

//             setError("Course name is required.");

//             return;

//         }


//         if (!formData.code.trim()) {

//             setError("Course code is required.");

//             return;

//         }


//         if (!formData.level) {

//             setError("Please select course level.");

//             return;

//         }


//         if (
//             !formData.duration ||
//             Number(formData.duration) <= 0
//         ) {

//             setError(
//                 "Duration must be greater than 0."
//             );

//             return;

//         }


//         try {

//             setSaving(true);

//             await api.patch(
//                 `courses/${id}/`,
//                 {
//                     name: formData.name,
//                     code: formData.code,
//                     level: Number(formData.level),
//                     duration: Number(formData.duration),
//                     description: formData.description
//                 }
//             );

//             alert("Course updated successfully.");

//             navigate("/admin/courses");

//         } catch (err) {

//             console.log(err);

//             setError(
//                 err.response?.data ||
//                 "Failed to update course."
//             );

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (
//             <div className="admin-page admin-course-edit-page">

//                 <div className="admin-loading-state">
//                     Loading course...
//                 </div>

//             </div>
//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div className="admin-page admin-course-edit-page">

//             {/* PAGE HEADER */}

//             <div className="admin-page-header">

//                 <div>
//                     <h1>Edit Course</h1>
//                     <p>
//                         Update course information
//                     </p>
//                 </div>

//             </div>


//             {/* ERROR */}

//             {error && (

//                 <div className="admin-alert admin-alert-error">

//                     {typeof error === "string"
//                         ? error
//                         : JSON.stringify(error)}

//                 </div>

//             )}


//             {/* FORM */}

//             <form
//                 className="admin-form-card"
//                 onSubmit={handleSubmit}
//             >

//                 {/* COURSE NAME */}

//                 <div className="admin-form-group">

//                     <label>
//                         Course Name
//                     </label>

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Enter course name"
//                     />

//                 </div>


//                 {/* COURSE CODE */}

//                 <div className="admin-form-group">

//                     <label>
//                         Course Code
//                     </label>

//                     <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                         placeholder="Enter course code"
//                     />

//                 </div>


//                 {/* LEVEL */}

//                 <div className="admin-form-group">

//                     <label>
//                         Level
//                     </label>

//                     <select
//                         name="level"
//                         value={formData.level}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Level
//                         </option>

//                         {levels.map((level) => (

//                             <option
//                                 key={level.id}
//                                 value={level.id}
//                             >
//                                 {level.name}
//                             </option>

//                         ))}

//                     </select>

//                 </div>


//                 {/* DURATION */}

//                 <div className="admin-form-group">

//                     <label>
//                         Duration
//                     </label>

//                     <div className="admin-input-with-suffix">

//                         <input
//                             type="number"
//                             name="duration"
//                             value={formData.duration}
//                             onChange={handleChange}
//                             min="1"
//                         />

//                         <span>Years</span>

//                     </div>

//                 </div>


//                 {/* DESCRIPTION */}

//                 <div className="admin-form-group">

//                     <label>
//                         Description
//                     </label>

//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         placeholder="Enter course description"
//                         rows="4"
//                     />

//                 </div>


//                 {/* BUTTONS */}

//                 <div className="admin-form-actions">

//                     <button
//                         type="submit"
//                         className="admin-primary-btn"
//                         disabled={saving}
//                     >
//                         {saving
//                             ? "Updating..."
//                             : "Update Course"}
//                     </button>


//                     <button
//                         type="button"
//                         className="admin-secondary-btn"
//                         onClick={() =>
//                             navigate("/admin/courses")
//                         }
//                     >
//                         Cancel
//                     </button>

//                 </div>

//             </form>

//         </div>

//     );

// }


// export default AdminCourseEdit;




import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminCourseEdit.css";
import api from "../../api/axios";


function AdminCourseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [levels, setLevels] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        level: "",
        department: "",
        duration: "",
        description: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load course details, levels and departments
    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    courseResponse,
                    levelsResponse,
                    departmentsResponse
                ] = await Promise.all([
                    api.get(`courses/${id}/`),
                    api.get("course-levels/"),
                    api.get("departments/")
                ]);

                const course = courseResponse.data;

                setFormData({
                    name: course.name || "",
                    code: course.code || "",
                    level: course.level ?? "",
                    department: course.department ?? "",
                    duration: course.duration ?? "",
                    description: course.description || ""
                });

                setLevels(
                    levelsResponse.data.results ||
                    levelsResponse.data
                );

                setDepartments(
                    departmentsResponse.data.results ||
                    departmentsResponse.data
                );
            } catch (err) {
                console.error(
                    "Load course error:",
                    err.response?.data || err.message
                );

                setError("Failed to load course details or dropdown options.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // Update course
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) {
            setError("Course name is required.");
            return;
        }

        if (!formData.code.trim()) {
            setError("Course code is required.");
            return;
        }

        if (!formData.level) {
            setError("Please select course type / level.");
            return;
        }

        if (!formData.department) {
            setError("Please select department.");
            return;
        }

        if (
            !formData.duration ||
            Number(formData.duration) < 1
        ) {
            setError("Duration must be at least 1 year.");
            return;
        }

        try {
            setSaving(true);

            await api.patch(`courses/${id}/`, {
                name: formData.name.trim(),
                code: formData.code.trim(),
                level: Number(formData.level),
                department: Number(formData.department),
                duration: Number(formData.duration),
                description: formData.description.trim()
            });

            alert("Course updated successfully.");
            navigate("/admin/courses");
        } catch (err) {
            console.error(
                "Update course error:",
                err.response?.data || err.message
            );

            const data = err.response?.data;

            if (data && typeof data === "object") {
                const firstError = Object.values(data)
                    .flat(Infinity)
                    .find((item) => typeof item === "string");

                setError(firstError || "Failed to update course.");
            } else {
                setError("Failed to update course.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-page admin-course-edit-page">
                <div className="admin-loading-state">
                    Loading course...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page admin-course-edit-page">
            <div className="admin-page-header">
                <div>
                    <h1>Edit Course</h1>
                    <p>Update course information</p>
                </div>
            </div>

            {error && (
                <div className="admin-alert admin-alert-error">
                    {error}
                </div>
            )}

            <form
                className="admin-form-card"
                onSubmit={handleSubmit}
            >
                <div className="admin-form-group">
                    <label htmlFor="course-name">
                        Course Name
                    </label>
                    <input
                        id="course-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter course name"
                        required
                    />
                </div>

                <div className="admin-form-group">
                    <label htmlFor="course-code">
                        Course Code
                    </label>
                    <input
                        id="course-code"
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Enter course code"
                        required
                    />
                </div>

                <div className="admin-form-group">
                    <label htmlFor="course-level">
                        Course Type / Level
                    </label>
                    <select
                        id="course-level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course Type</option>

                        {levels.map((level) => (
                            <option
                                key={level.id}
                                value={level.id}
                            >
                                {level.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="admin-form-group">
                    <label htmlFor="course-department">
                        Department
                    </label>
                    <select
                        id="course-department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="admin-form-group">
                    <label htmlFor="course-duration">
                        Duration (Years)
                    </label>

                    <div className="admin-input-with-suffix">
                        <input
                            id="course-duration"
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                        <span>Years</span>
                    </div>
                </div>

                <div className="admin-form-group">
                    <label htmlFor="course-description">
                        Description
                    </label>
                    <textarea
                        id="course-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter course description"
                        rows="4"
                    />
                </div>

                <div className="admin-form-actions">
                    <button
                        type="submit"
                        className="admin-primary-btn"
                        disabled={saving}
                    >
                        {saving ? "Updating..." : "Update Course"}
                    </button>

                    <button
                        type="button"
                        className="admin-secondary-btn"
                        onClick={() => navigate("/admin/courses")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminCourseEdit;
