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







import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/axios";


function AdminCourseEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [levels, setLevels] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        level: "",
        duration: "",
        description: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    // ========================================================
    // LOAD COURSE + LEVELS
    // ========================================================

    useEffect(() => {

        const loadData = async () => {

            try {

                const [courseResponse, levelsResponse] =
                    await Promise.all([
                        api.get(`courses/${id}/`),
                        api.get("course-levels/")
                    ]);

                const course = courseResponse.data;

                setFormData({
                    name: course.name || "",
                    code: course.code || "",
                    level: course.level || "",
                    duration: course.duration || "",
                    description: course.description || ""
                });

                setLevels(
                    levelsResponse.data.results ||
                    levelsResponse.data
                );

            } catch (err) {

                console.log(err);

                setError("Failed to load course.");

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [id]);


    // ========================================================
    // INPUT CHANGE
    // ========================================================

    const handleChange = (e) => {

        setFormData((previous) => ({
            ...previous,
            [e.target.name]: e.target.value
        }));

    };


    // ========================================================
    // UPDATE COURSE
    // ========================================================

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

            setError("Please select course level.");

            return;

        }


        if (
            !formData.duration ||
            Number(formData.duration) <= 0
        ) {

            setError(
                "Duration must be greater than 0."
            );

            return;

        }


        try {

            setSaving(true);

            await api.patch(
                `courses/${id}/`,
                {
                    name: formData.name,
                    code: formData.code,
                    level: Number(formData.level),
                    duration: Number(formData.duration),
                    description: formData.description
                }
            );

            alert("Course updated successfully.");

            navigate("/admin/courses");

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data ||
                "Failed to update course."
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (
            <div className="admin-page admin-course-edit-page">

                <div className="admin-loading-state">
                    Loading course...
                </div>

            </div>
        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-course-edit-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>
                    <h1>Edit Course</h1>
                    <p>
                        Update course information
                    </p>
                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="admin-alert admin-alert-error">

                    {typeof error === "string"
                        ? error
                        : JSON.stringify(error)}

                </div>

            )}


            {/* FORM */}

            <form
                className="admin-form-card"
                onSubmit={handleSubmit}
            >

                {/* COURSE NAME */}

                <div className="admin-form-group">

                    <label>
                        Course Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter course name"
                    />

                </div>


                {/* COURSE CODE */}

                <div className="admin-form-group">

                    <label>
                        Course Code
                    </label>

                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Enter course code"
                    />

                </div>


                {/* LEVEL */}

                <div className="admin-form-group">

                    <label>
                        Level
                    </label>

                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Level
                        </option>

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


                {/* DURATION */}

                <div className="admin-form-group">

                    <label>
                        Duration
                    </label>

                    <div className="admin-input-with-suffix">

                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                        />

                        <span>Years</span>

                    </div>

                </div>


                {/* DESCRIPTION */}

                <div className="admin-form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter course description"
                        rows="4"
                    />

                </div>


                {/* BUTTONS */}

                <div className="admin-form-actions">

                    <button
                        type="submit"
                        className="admin-primary-btn"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Course"}
                    </button>


                    <button
                        type="button"
                        className="admin-secondary-btn"
                        onClick={() =>
                            navigate("/admin/courses")
                        }
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}


export default AdminCourseEdit;