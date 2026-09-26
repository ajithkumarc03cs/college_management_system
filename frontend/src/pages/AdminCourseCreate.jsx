// import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

// import api from "../api/axios";


// function AdminCourseCreate() {

//     const navigate = useNavigate();


//     const [levels, setLevels] = useState([]);


//     const [formData, setFormData] = useState({

//         name: "",

//         code: "",

//         level: "",

//         duration: "",

//         description: ""

//     });


//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD COURSE LEVELS
//     // ========================================================

//     useEffect(() => {

//         loadLevels();

//     }, []);


//     const loadLevels = async () => {

//         try {

//             const response =
//                 await api.get(
//                     "course-levels/"
//                 );


//             const data =
//                 response.data.results ||
//                 response.data;


//             setLevels(data);

//         } catch (error) {

//             console.log(
//                 "Course Level Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load course levels."
//             );

//         }

//     };


//     // ========================================================
//     // HANDLE INPUT
//     // ========================================================

//     const handleChange = (e) => {

//         const { name, value } = e.target;


//         setFormData({

//             ...formData,

//             [name]: value

//         });

//     };


//     // ========================================================
//     // CREATE COURSE
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();


//         setError("");

//         setSuccess("");


//         if (!formData.name.trim()) {

//             setError(
//                 "Course name is required."
//             );

//             return;

//         }


//         if (!formData.code.trim()) {

//             setError(
//                 "Course code is required."
//             );

//             return;

//         }


//         if (!formData.level) {

//             setError(
//                 "Please select course level."
//             );

//             return;

//         }


//         if (!formData.duration) {

//             setError(
//                 "Course duration is required."
//             );

//             return;

//         }


//         if (
//             Number(formData.duration) <= 0
//         ) {

//             setError(
//                 "Duration must be greater than 0."
//             );

//             return;

//         }


//         try {

//             setLoading(true);


//             const response =
//                 await api.post(
//                     "courses/",
//                     {

//                         name:
//                             formData.name,

//                         code:
//                             formData.code,

//                         level:
//                             Number(
//                                 formData.level
//                             ),

//                         duration:
//                             Number(
//                                 formData.duration
//                             ),

//                         description:
//                             formData.description

//                     }
//                 );


//             console.log(
//                 "Course Created:",
//                 response.data
//             );


//             setSuccess(
//                 "Course created successfully."
//             );


//             setFormData({

//                 name: "",

//                 code: "",

//                 level: "",

//                 duration: "",

//                 description: ""

//             });


//         } catch (error) {

//             console.log(
//                 "Create Course Error:",
//                 error.response?.data
//             );


//             const data =
//                 error.response?.data;


//             if (data?.name) {

//                 setError(
//                     Array.isArray(data.name)
//                         ? data.name[0]
//                         : data.name
//                 );

//             } else if (data?.code) {

//                 setError(
//                     Array.isArray(data.code)
//                         ? data.code[0]
//                         : data.code
//                 );

//             } else if (data?.level) {

//                 setError(
//                     Array.isArray(data.level)
//                         ? data.level[0]
//                         : data.level
//                 );

//             } else if (data?.duration) {

//                 setError(
//                     Array.isArray(
//                         data.duration
//                     )
//                         ? data.duration[0]
//                         : data.duration
//                 );

//             } else {

//                 setError(
//                     "Unable to create course."
//                 );

//             }

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // BACK
//     // ========================================================

//     const handleBack = () => {

//         navigate("/admin/courses");

//     };


//     return (

//         <div>

//             <h1>
//                 Add Course
//             </h1>


//             <hr />


//             {/* ================================================= */}
//             {/* ERROR */}
//             {/* ================================================= */}

//             {error && (

//                 <p
//                     style={{
//                         color: "red"
//                     }}
//                 >
//                     {error}
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* SUCCESS */}
//             {/* ================================================= */}

//             {success && (

//                 <p
//                     style={{
//                         color: "green"
//                     }}
//                 >
//                     {success}
//                 </p>

//             )}


//             <form onSubmit={handleSubmit}>


//                 {/* ================================================= */}
//                 {/* COURSE NAME */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Course Name
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="name"
//                         value={
//                             formData.name
//                         }
//                         onChange={
//                             handleChange
//                         }
//                         placeholder="Enter course name"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* COURSE CODE */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Course Code
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="code"
//                         value={
//                             formData.code
//                         }
//                         onChange={
//                             handleChange
//                         }
//                         placeholder="Enter course code"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* COURSE LEVEL */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Course Level
//                     </label>

//                     <br />

//                     <select
//                         name="level"
//                         value={
//                             formData.level
//                         }
//                         onChange={
//                             handleChange
//                         }
//                     >

//                         <option value="">
//                             Select Level
//                         </option>


//                         {levels.map(
//                             (level) => (

//                                 <option
//                                     key={
//                                         level.id
//                                     }
//                                     value={
//                                         level.id
//                                     }
//                                 >
//                                     {
//                                         level.name
//                                     }
//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* DURATION */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Duration (Years)
//                     </label>

//                     <br />

//                     <input
//                         type="number"
//                         name="duration"
//                         value={
//                             formData.duration
//                         }
//                         onChange={
//                             handleChange
//                         }
//                         min="1"
//                         placeholder="Example: 3"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* DESCRIPTION */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Description
//                     </label>

//                     <br />

//                     <textarea
//                         name="description"
//                         value={
//                             formData.description
//                         }
//                         onChange={
//                             handleChange
//                         }
//                         placeholder="Enter course description"
//                         rows="4"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* BUTTONS */}
//                 {/* ================================================= */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >
//                     {loading
//                         ? "Creating..."
//                         : "Create Course"}
//                 </button>


//                 {" "}


//                 <button
//                     type="button"
//                     onClick={handleBack}
//                 >
//                     Back
//                 </button>


//             </form>

//         </div>

//     );

// }


// export default AdminCourseCreate;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function AdminCourseCreate() {

    const navigate = useNavigate();


    // ========================================================
    // OPTIONS
    // ========================================================

    const [levels, setLevels] = useState([]);


    // ========================================================
    // FORM DATA
    // ========================================================

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        level: "",
        duration: "",
        description: ""
    });


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================================
    // LOAD COURSE LEVELS
    // ========================================================

    useEffect(() => {

        loadLevels();

    }, []);


    const loadLevels = async () => {

        try {

            const response =
                await api.get("course-levels/");


            const data =
                response.data.results ||
                response.data;


            setLevels(data);

        } catch (error) {

            console.log(
                "Course Level Error:",
                error.response?.data
            );

            setError(
                "Unable to load course levels."
            );

        }
    };


    // ========================================================
    // HANDLE INPUT
    // ========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ========================================================
    // CREATE COURSE
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ====================================================
        // VALIDATION
        // ====================================================

        if (!formData.name.trim()) {

            setError(
                "Course name is required."
            );

            return;
        }


        if (!formData.code.trim()) {

            setError(
                "Course code is required."
            );

            return;
        }


        if (!formData.level) {

            setError(
                "Please select course level."
            );

            return;
        }


        if (!formData.duration) {

            setError(
                "Course duration is required."
            );

            return;
        }


        if (Number(formData.duration) <= 0) {

            setError(
                "Duration must be greater than 0."
            );

            return;
        }


        // ====================================================
        // API REQUEST
        // ====================================================

        try {

            setLoading(true);


            const response =
                await api.post(
                    "courses/",
                    {
                        name:
                            formData.name,

                        code:
                            formData.code,

                        level:
                            Number(
                                formData.level
                            ),

                        duration:
                            Number(
                                formData.duration
                            ),

                        description:
                            formData.description
                    }
                );


            console.log(
                "Course Created:",
                response.data
            );


            setSuccess(
                "Course created successfully."
            );


            // =================================================
            // RESET FORM
            // =================================================

            setFormData({
                name: "",
                code: "",
                level: "",
                duration: "",
                description: ""
            });

        } catch (error) {

            console.log(
                "Create Course Error:",
                error.response?.data
            );


            const data =
                error.response?.data;


            if (data?.name) {

                setError(
                    Array.isArray(data.name)
                        ? data.name[0]
                        : data.name
                );

            } else if (data?.code) {

                setError(
                    Array.isArray(data.code)
                        ? data.code[0]
                        : data.code
                );

            } else if (data?.level) {

                setError(
                    Array.isArray(data.level)
                        ? data.level[0]
                        : data.level
                );

            } else if (data?.duration) {

                setError(
                    Array.isArray(data.duration)
                        ? data.duration[0]
                        : data.duration
                );

            } else {

                setError(
                    "Unable to create course."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // BACK
    // ========================================================

    const handleBack = () => {

        navigate("/admin/courses");

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-course-create-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Add Course
                    </h1>

                    <p>
                        Create a new course.
                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* ALERTS */}
            {/* ================================================= */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {success && (

                <div className="admin-alert admin-alert-success">
                    {success}
                </div>

            )}


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <section className="admin-form-card">

                <form onSubmit={handleSubmit}>

                    {/* ========================================= */}
                    {/* COURSE NAME */}
                    {/* ========================================= */}

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
                        />

                    </div>


                    {/* ========================================= */}
                    {/* COURSE CODE */}
                    {/* ========================================= */}

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
                        />

                    </div>


                    {/* ========================================= */}
                    {/* COURSE LEVEL */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="course-level">
                            Course Level
                        </label>

                        <select
                            id="course-level"
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


                    {/* ========================================= */}
                    {/* DURATION */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="course-duration">
                            Duration (Years)
                        </label>

                        <input
                            id="course-duration"
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                            placeholder="Example: 3"
                        />

                    </div>


                    {/* ========================================= */}
                    {/* DESCRIPTION */}
                    {/* ========================================= */}

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


                    {/* ========================================= */}
                    {/* ACTIONS */}
                    {/* ========================================= */}

                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Course"}
                        </button>


                        <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={handleBack}
                        >
                            Back
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}


export default AdminCourseCreate;