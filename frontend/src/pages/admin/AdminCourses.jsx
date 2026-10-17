// import {
//     useEffect,
//     useState
// } from "react";

// import api from "../../api/axios";
// import "./AdminCourses.css";

// // ============================================================
// // INITIAL PAGE DATA
// // ============================================================

// const initialPageData = {

//     hero_label: "",
//     hero_title: "",
//     hero_description: "",

//     intro_label: "",
//     intro_title: "",
//     intro_description: "",

//     cta_title: "",
//     cta_description: "",
//     cta_button_text: "",
//     cta_button_link: "",

// };


// // ============================================================
// // INITIAL COURSE DATA
// // ============================================================

// const initialCourseData = {

//     course_type: "",
//     name: "",
//     department: "",
//     duration: "",
//     description: "",
//     image: null,
//     order: 0,
//     is_active: true,

// };


// // ============================================================
// // IMAGE URL HELPER
// // ============================================================

// const getImageUrl = (image) => {

//     if (!image) {
//         return "";
//     }

//     if (
//         image.startsWith("http://") ||
//         image.startsWith("https://")
//     ) {
//         return image;
//     }

//     return `http://127.0.0.1:8000${image}`;

// };


// // ============================================================
// // COMPONENT
// // ============================================================

// function AdminCourses() {

//     // ========================================================
//     // PAGE DATA
//     // ========================================================

//     const [pageData, setPageData] =
//         useState(initialPageData);


//     // ========================================================
//     // COURSE ITEMS
//     // ========================================================

//     const [courses, setCourses] =
//         useState([]);


//     // ========================================================
//     // COURSE FORM
//     // ========================================================

//     const [courseForm, setCourseForm] =
//         useState(initialCourseData);


//     // ========================================================
//     // EDITING COURSE
//     // ========================================================

//     const [editingId, setEditingId] =
//         useState(null);


//     // ========================================================
//     // LOADING
//     // ========================================================

//     const [loading, setLoading] =
//         useState(true);

//     const [savingPage, setSavingPage] =
//         useState(false);

//     const [savingCourse, setSavingCourse] =
//         useState(false);


//     // ========================================================
//     // MESSAGE
//     // ========================================================

//     const [message, setMessage] =
//         useState("");

//     const [error, setError] =
//         useState("");


//     // ========================================================
//     // LOAD EVERYTHING
//     // ========================================================

//     useEffect(() => {

//         loadCoursesPage();

//     }, []);


//     // ========================================================
//     // LOAD COURSES PAGE
//     // ========================================================

//     const loadCoursesPage = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             // Existing page content API — unchanged
//             const pageResponse = await api.get("admin/courses/");

//             // Academic courses API — academics_course table
//             const coursesResponse = await api.get("courses/");

//             // Keep existing page content
//             setPageData({
//                 ...initialPageData,
//                 ...(pageResponse.data || {}),
//             });

//             // Handle normal array and paginated responses
//             const academicCourses = Array.isArray(coursesResponse.data)
//                 ? coursesResponse.data
//                 : coursesResponse.data?.results || [];

//             setCourses(academicCourses);

//         } catch (err) {
//             console.error("Failed to load courses:", err);

//             setError(
//                 err.response?.data?.detail ||
//                 "Failed to load courses."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ========================================================
//     // PAGE INPUT CHANGE
//     // ========================================================

//     const handlePageChange = (event) => {

//         const {
//             name,
//             value
//         } = event.target;

//         setPageData(
//             (previous) => ({

//                 ...previous,

//                 [name]: value,

//             })
//         );

//     };


//     // ========================================================
//     // SAVE COURSE PAGE
//     // ========================================================

//     const handleSavePage = async (event) => {

//         event.preventDefault();

//         try {

//             setSavingPage(true);

//             setMessage("");

//             setError("");


//             const response =
//                 await api.patch(
//                     "admin/courses/",
//                     pageData
//                 );


//             setPageData({

//                 ...initialPageData,

//                 ...(response.data || {}),

//             });


//             setMessage(
//                 "Course page updated successfully."
//             );


//         } catch (err) {

//             console.error(
//                 "Failed to update course page:",
//                 err
//             );

//             setError(
//                 err.response?.data?.detail ||
//                 "Failed to update course page."
//             );

//         } finally {

//             setSavingPage(false);

//         }

//     };


//     // ========================================================
//     // COURSE INPUT CHANGE
//     // ========================================================

//     const handleCourseChange = (event) => {

//         const {
//             name,
//             value,
//             type,
//             checked,
//             files
//         } = event.target;


//         // ==================================================
//         // IMAGE
//         // ==================================================

//         if (type === "file") {

//             setCourseForm(
//                 (previous) => ({

//                     ...previous,

//                     image:
//                         files && files.length > 0
//                             ? files[0]
//                             : null,

//                 })
//             );

//             return;

//         }


//         // ==================================================
//         // CHECKBOX
//         // ==================================================

//         if (type === "checkbox") {

//             setCourseForm(
//                 (previous) => ({

//                     ...previous,

//                     [name]: checked,

//                 })
//             );

//             return;

//         }


//         // ==================================================
//         // NORMAL INPUT
//         // ==================================================

//         setCourseForm(
//             (previous) => ({

//                 ...previous,

//                 [name]: value,

//             })
//         );

//     };


//     // ========================================================
//     // RESET COURSE FORM
//     // ========================================================

//     const resetCourseForm = () => {

//         setCourseForm(
//             initialCourseData
//         );

//         setEditingId(null);

//     };


//     // ========================================================
//     // ADD / UPDATE COURSE
//     // ========================================================

//     const handleCourseSubmit = async (event) => {

//         event.preventDefault();

//         try {

//             setSavingCourse(true);

//             setMessage("");

//             setError("");


//             // ==================================================
//             // VALIDATION
//             // ==================================================

//             if (!courseForm.course_type.trim()) {

//                 setError(
//                     "Course type is required."
//                 );

//                 return;

//             }


//             if (!courseForm.name.trim()) {

//                 setError(
//                     "Course name is required."
//                 );

//                 return;

//             }


//             if (!courseForm.department.trim()) {

//                 setError(
//                     "Department is required."
//                 );

//                 return;

//             }


//             if (!courseForm.duration.trim()) {

//                 setError(
//                     "Duration is required."
//                 );

//                 return;

//             }


//             // ==================================================
//             // FORM DATA
//             // ==================================================

//             const formData =
//                 new FormData();


//             formData.append(
//                 "course_type",
//                 courseForm.course_type
//             );

//             formData.append(
//                 "name",
//                 courseForm.name
//             );

//             formData.append(
//                 "department",
//                 courseForm.department
//             );

//             formData.append(
//                 "duration",
//                 courseForm.duration
//             );

//             formData.append(
//                 "description",
//                 courseForm.description || ""
//             );

//             formData.append(
//                 "order",
//                 Number(courseForm.order) || 0
//             );

//             formData.append(
//                 "is_active",
//                 courseForm.is_active ? "true" : "false"
//             );


//             // ==================================================
//             // IMAGE
//             // ==================================================

//             if (courseForm.image instanceof File) {

//                 formData.append(
//                     "image",
//                     courseForm.image
//                 );

//             }


//             // ==================================================
//             // UPDATE
//             // ==================================================

//             if (editingId) {

//                 await api.patch(

//                     `admin/courses/items/${editingId}/`,

//                     formData

//                 );


//                 setMessage(
//                     "Course updated successfully."
//                 );

//             }


//             // ==================================================
//             // CREATE
//             // ==================================================

//             else {

//                 await api.post(

//                     "admin/courses/items/",

//                     formData

//                 );


//                 setMessage(
//                     "Course added successfully."
//                 );

//             }


//             // ==================================================
//             // RESET
//             // ==================================================

//             resetCourseForm();


//             // ==================================================
//             // RELOAD
//             // ==================================================

//             await loadCoursesPage();


//         } catch (err) {

//             console.error(
//                 "Course save error:",
//                 err
//             );


//             // ==================================================
//             // DJANGO VALIDATION ERROR
//             // ==================================================

//             const responseData =
//                 err.response?.data;


//             if (
//                 responseData &&
//                 typeof responseData === "object"
//             ) {

//                 const validationMessages =
//                     Object.entries(
//                         responseData
//                     )
//                         .map(
//                             ([field, value]) => {

//                                 if (
//                                     Array.isArray(value)
//                                 ) {

//                                     return `${field}: ${value.join(", ")}`;

//                                 }

//                                 return `${field}: ${value}`;

//                             }
//                         )
//                         .join(" | ");


//                 setError(
//                     validationMessages ||
//                     "Failed to save course."
//                 );

//             } else {

//                 setError(
//                     "Failed to save course."
//                 );

//             }

//         } finally {

//             setSavingCourse(false);

//         }

//     };


//     // ========================================================
//     // EDIT COURSE
//     // ========================================================

//     const handleEdit = (course) => {

//         setEditingId(
//             course.id
//         );


//         setCourseForm({

//             course_type:
//                 course.course_type || "",

//             name:
//                 course.name || "",

//             department:
//                 course.department || "",

//             duration:
//                 course.duration || "",

//             description:
//                 course.description || "",

//             image:
//                 null,

//             order:
//                 course.order ?? 0,

//             is_active:
//                 course.is_active ?? true,

//         });


//         setMessage("");

//         setError("");


//         // ==================================================
//         // SCROLL TO FORM
//         // ==================================================

//         window.scrollTo({

//             top: 0,

//             behavior: "smooth",

//         });

//     };


//     // ========================================================
//     // DELETE COURSE
//     // ========================================================

//     const handleDelete = async (id) => {

//         const confirmed =
//             window.confirm(
//                 "Are you sure you want to delete this course?"
//             );


//         if (!confirmed) {

//             return;

//         }


//         try {

//             setMessage("");

//             setError("");


//             await api.delete(
//                 `admin/courses/items/${id}/`
//             );


//             setMessage(
//                 "Course deleted successfully."
//             );


//             await loadCoursesPage();


//         } catch (err) {

//             console.error(
//                 "Failed to delete course:",
//                 err
//             );


//             setError(
//                 err.response?.data?.detail ||
//                 "Failed to delete course."
//             );

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div className="admin-courses-page">

//                 <div className="admin-page-header">

//                     <div>

//                         <h1>
//                             Courses
//                         </h1>

//                         <p>
//                             Manage the Courses page and academic programs.
//                         </p>

//                     </div>

//                 </div>


//                 <div className="admin-courses-loading">

//                     Loading courses...

//                 </div>

//             </div>

//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div className="admin-courses-page">


//             {/* ==================================================
//                 HEADER
//             ================================================== */}

//             <div className="admin-page-header">

//                 <div>

//                     <h1>
//                         Courses
//                     </h1>

//                     <p>
//                         Manage the public Courses page and academic programs.
//                     </p>

//                 </div>

//             </div>


//             {/* ==================================================
//                 MESSAGE
//             ================================================== */}

//             {message && (

//                 <div className="settings-success">

//                     {message}

//                 </div>

//             )}


//             {error && (

//                 <div className="settings-error">

//                     {error}

//                 </div>

//             )}


//             {/* ==================================================
//                 PAGE CONTENT
//             ================================================== */}

//             <form
//                 onSubmit={handleSavePage}
//                 className="admin-settings-card"
//             >

//                 <div className="settings-card-header">

//                     <div>

//                         <h2>
//                             Courses Page Content
//                         </h2>

//                         <p>
//                             Manage the public Courses page text.
//                         </p>

//                     </div>

//                 </div>


//                 {/* ==================================================
//                     HERO
//                 ================================================== */}

//                 <div className="settings-section">

//                     <h3>
//                         Hero Section
//                     </h3>


//                     <div className="settings-form-grid">


//                         {/* HERO LABEL */}

//                         <div className="settings-field">

//                             <label>
//                                 Hero Label
//                             </label>

//                             <input
//                                 type="text"
//                                 name="hero_label"
//                                 value={
//                                     pageData.hero_label
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* HERO TITLE */}

//                         <div className="settings-field">

//                             <label>
//                                 Hero Title
//                             </label>

//                             <input
//                                 type="text"
//                                 name="hero_title"
//                                 value={
//                                     pageData.hero_title
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* HERO DESCRIPTION */}

//                         <div className="settings-field settings-field-full">

//                             <label>
//                                 Hero Description
//                             </label>

//                             <textarea
//                                 name="hero_description"
//                                 value={
//                                     pageData.hero_description
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                                 rows="4"
//                             />

//                         </div>


//                     </div>

//                 </div>


//                 {/* ==================================================
//                     INTRO
//                 ================================================== */}

//                 <div className="settings-section">

//                     <h3>
//                         Introduction Section
//                     </h3>


//                     <div className="settings-form-grid">


//                         {/* INTRO LABEL */}

//                         <div className="settings-field">

//                             <label>
//                                 Intro Label
//                             </label>

//                             <input
//                                 type="text"
//                                 name="intro_label"
//                                 value={
//                                     pageData.intro_label
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* INTRO TITLE */}

//                         <div className="settings-field">

//                             <label>
//                                 Intro Title
//                             </label>

//                             <input
//                                 type="text"
//                                 name="intro_title"
//                                 value={
//                                     pageData.intro_title
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* INTRO DESCRIPTION */}

//                         <div className="settings-field settings-field-full">

//                             <label>
//                                 Intro Description
//                             </label>

//                             <textarea
//                                 name="intro_description"
//                                 value={
//                                     pageData.intro_description
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                                 rows="5"
//                             />

//                         </div>


//                     </div>

//                 </div>


//                 {/* ==================================================
//                     CTA
//                 ================================================== */}

//                 <div className="settings-section">

//                     <h3>
//                         Call To Action
//                     </h3>


//                     <div className="settings-form-grid">


//                         {/* CTA TITLE */}

//                         <div className="settings-field">

//                             <label>
//                                 CTA Title
//                             </label>

//                             <input
//                                 type="text"
//                                 name="cta_title"
//                                 value={
//                                     pageData.cta_title
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* CTA BUTTON TEXT */}

//                         <div className="settings-field">

//                             <label>
//                                 Button Text
//                             </label>

//                             <input
//                                 type="text"
//                                 name="cta_button_text"
//                                 value={
//                                     pageData.cta_button_text
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* CTA BUTTON LINK */}

//                         <div className="settings-field">

//                             <label>
//                                 Button Link
//                             </label>

//                             <input
//                                 type="text"
//                                 name="cta_button_link"
//                                 value={
//                                     pageData.cta_button_link
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                             />

//                         </div>


//                         {/* CTA DESCRIPTION */}

//                         <div className="settings-field settings-field-full">

//                             <label>
//                                 CTA Description
//                             </label>

//                             <textarea
//                                 name="cta_description"
//                                 value={
//                                     pageData.cta_description
//                                 }
//                                 onChange={
//                                     handlePageChange
//                                 }
//                                 rows="4"
//                             />

//                         </div>


//                     </div>

//                 </div>


//                 {/* ==================================================
//                     SAVE PAGE
//                 ================================================== */}

//                 <div className="settings-form-actions">

//                     <button
//                         type="submit"
//                         className="settings-save-btn"
//                         disabled={savingPage}
//                     >

//                         {savingPage
//                             ? "Saving..."
//                             : "Save Page Content"
//                         }

//                     </button>

//                 </div>

//             </form>


//             {/* ==================================================
//                 COURSE MANAGEMENT
//             ================================================== */}

//             <div className="admin-settings-card">


//                 <div className="settings-card-header">

//                     <div>

//                         <h2>
//                             Course Programs
//                         </h2>

//                         <p>
//                             Add, edit and remove courses displayed on the public website.
//                         </p>

//                     </div>

//                 </div>


//                 {/* ==================================================
//                     COURSE FORM
//                 ================================================== */}

//                 <form
//                     onSubmit={handleCourseSubmit}
//                 >

//                     <div className="settings-section">

//                         <h3>

//                             {editingId
//                                 ? "Edit Course"
//                                 : "Add New Course"
//                             }

//                         </h3>


//                         <div className="settings-form-grid">


//                             {/* COURSE TYPE */}

//                             <div className="settings-field">

//                                 <label>
//                                     Course Type
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="course_type"
//                                     placeholder="UG / PG / Diploma"
//                                     value={
//                                         courseForm.course_type
//                                     }
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* COURSE NAME */}

//                             <div className="settings-field">

//                                 <label>
//                                     Course Name
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="BSc Computer Science"
//                                     value={
//                                         courseForm.name
//                                     }
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* DEPARTMENT */}

//                             <div className="settings-field">

//                                 <label>
//                                     Department
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="department"
//                                     placeholder="Computer Science"
//                                     value={
//                                         courseForm.department
//                                     }
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* DURATION */}

//                             <div className="settings-field">

//                                 <label>
//                                     Duration
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="duration"
//                                     placeholder="3 Years"
//                                     value={
//                                         courseForm.duration
//                                     }
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* ORDER */}

//                             <div className="settings-field">

//                                 <label>
//                                     Display Order
//                                 </label>

//                                 <input
//                                     type="number"
//                                     name="order"
//                                     min="0"
//                                     value={
//                                         courseForm.order
//                                     }
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                 />

//                             </div>


//                             {/* IMAGE */}

//                             <div className="settings-field">

//                                 <label>
//                                     Course Image
//                                 </label>

//                                 <input
//                                     type="file"
//                                     name="image"
//                                     accept="image/*"
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                 />

//                             </div>


//                             {/* DESCRIPTION */}

//                             <div className="settings-field settings-field-full">

//                                 <label>
//                                     Description
//                                 </label>

//                                 <textarea
//                                     name="description"
//                                     placeholder="Enter course description..."
//                                     value={
//                                         courseForm.description
//                                     }
//                                     onChange={
//                                         handleCourseChange
//                                     }
//                                     rows="5"
//                                 />

//                             </div>


//                             {/* ACTIVE */}

//                             <div className="settings-field settings-checkbox-field">

//                                 <label>

//                                     <input
//                                         type="checkbox"
//                                         name="is_active"
//                                         checked={
//                                             courseForm.is_active
//                                         }
//                                         onChange={
//                                             handleCourseChange
//                                         }
//                                     />

//                                     <span>
//                                         Active
//                                     </span>

//                                 </label>

//                             </div>


//                         </div>


//                         {/* ==================================================
//                             FORM BUTTONS
//                         ================================================== */}

//                         <div className="settings-form-actions">


//                             <button
//                                 type="submit"
//                                 className="settings-save-btn"
//                                 disabled={savingCourse}
//                             >

//                                 {savingCourse

//                                     ? "Saving..."

//                                     : editingId
//                                         ? "Update Course"
//                                         : "Add Course"

//                                 }

//                             </button>


//                             {editingId && (

//                                 <button
//                                     type="button"
//                                     className="settings-cancel-btn"
//                                     onClick={
//                                         resetCourseForm
//                                     }
//                                     disabled={savingCourse}
//                                 >

//                                     Cancel

//                                 </button>

//                             )}


//                         </div>

//                     </div>

//                 </form>

//             <div className="settings-section">
//                 <div className="settings-list-header">
//                     <div>
//                         <h3>Existing Academic Courses</h3>
//                         <p>
//                             {courses.length} course
//                             {courses.length !== 1 ? "s" : ""}
//                         </p>
//                     </div>
//                 </div>

//                 {courses.length === 0 ? (
//                     <div className="settings-empty">
//                         No academic courses found.
//                     </div>
//                 ) : (
//                     <div className="admin-course-list">
//                         {courses.map((course) => {
//                             const levelName =
//                                 typeof course.level === "object"
//                                     ? course.level?.name
//                                     : course.level_name;

//                             return (
//                                 <div
//                                     key={course.id}
//                                     className="admin-course-item"
//                                 >
//                                     <div className="admin-course-image">
//                                         <div className="admin-course-image-placeholder">
//                                             📚
//                                         </div>
//                                     </div>

//                                     <div className="admin-course-content">
//                                         <div className="admin-course-top">
//                                             <div>
//                                                 <span className="admin-course-type">
//                                                     {levelName || "Course"}
//                                                 </span>

//                                                 <h4>{course.name}</h4>
//                                             </div>
//                                         </div>

//                                         <div className="admin-course-meta">
//                                             <span>
//                                                 Code: {course.code || "-"}
//                                             </span>

//                                             <span>
//                                                 Duration: {course.duration} Years
//                                             </span>
//                                         </div>

//                                         {course.description && (
//                                             <p className="admin-course-description">
//                                                 {course.description}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//             </div>


//         </div>

//     );

// }


// export default AdminCourses;



import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminCourses.css";

const initialPageData = {
  hero_label: "",
  hero_title: "",
  hero_description: "",
  intro_label: "",
  intro_title: "",
  intro_description: "",
  cta_title: "",
  cta_description: "",
  cta_button_text: "",
  cta_button_link: "",
};

const initialCourseData = {
  course_type: "",
  name: "",
  code: "",
  department: "",
  duration: "",
  description: "",
};

function getList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

function getErrorMessage(error) {
  const data = error?.response?.data;

  if (!data) {
    return "Something went wrong. Please try again.";
  }

  if (typeof data === "string") {
    return data;
  }

  return Object.entries(data)
    .map(([field, messages]) => {
      const message = Array.isArray(messages)
        ? messages.join(", ")
        : typeof messages === "string"
          ? messages
          : JSON.stringify(messages);

      return `${field}: ${message}`;
    })
    .join("\n");
}

export default function AdminCourses() {
  const [pageData, setPageData] = useState(initialPageData);

  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [courseForm, setCourseForm] = useState(initialCourseData);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);
  const [savingCourse, setSavingCourse] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load website page content and academic course data.
  async function loadCoursesPage() {
    setLoading(true);
    setError("");

    try {
      const [
        pageResponse,
        coursesResponse,
        levelsResponse,
        departmentsResponse,
      ] = await Promise.all([
        api.get("admin/courses/"),
        api.get("courses/"),
        api.get("course-levels/"),
        api.get("departments/"),
      ]);

      setPageData({
        ...initialPageData,
        ...(pageResponse.data || {}),
      });

      setCourses(getList(coursesResponse.data));
      setLevels(getList(levelsResponse.data));
      setDepartments(getList(departmentsResponse.data));
    } catch (err) {
      console.error("Failed to load course data:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoursesPage();
  }, []);

  // Website Course Page content fields.
  function handlePageChange(event) {
    const { name, value } = event.target;

    setPageData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Save website Course Page content.
  async function handlePageSubmit(event) {
    event.preventDefault();

    setSavingPage(true);
    setMessage("");
    setError("");

    try {
      const response = await api.patch("admin/courses/", pageData);

      if (response.data && typeof response.data === "object") {
        setPageData((previous) => ({
          ...previous,
          ...response.data,
        }));
      }

      setMessage("Course Page content saved successfully.");
    } catch (err) {
      console.error("Failed to save Course Page content:", err);
      setError(getErrorMessage(err));
    } finally {
      setSavingPage(false);
    }
  }

  // Academic course form fields.
  function handleCourseChange(event) {
    const { name, value } = event.target;

    setCourseForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Clear the academic course form.
  function resetCourseForm() {
    setCourseForm({ ...initialCourseData });
    setEditingId(null);
    setMessage("");
    setError("");
  }

  // Add or update an academic course.
  async function handleCourseSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !courseForm.name.trim() ||
      !courseForm.code.trim() ||
      !courseForm.course_type ||
      !courseForm.department ||
      !courseForm.duration
    ) {
      setError("Please fill in all required course fields.");
      return;
    }

    const duration = Number(courseForm.duration);

    if (!Number.isInteger(duration) || duration < 1) {
      setError("Duration must be a whole number of at least 1 year.");
      return;
    }

    const payload = {
      name: courseForm.name.trim(),
      code: courseForm.code.trim(),
      level: Number(courseForm.course_type),
      department: Number(courseForm.department),
      duration,
      description: courseForm.description.trim(),
    };

    setSavingCourse(true);

    try {
      if (editingId !== null) {
        await api.patch(`courses/${editingId}/`, payload);
        setMessage("Academic course updated successfully.");
      } else {
        await api.post("courses/", payload);
        setMessage("Academic course added successfully.");
      }

      setCourseForm({ ...initialCourseData });
      setEditingId(null);

      await loadCoursesPage();
    } catch (err) {
      console.error("Failed to save academic course:", err);
      setError(getErrorMessage(err));
    } finally {
      setSavingCourse(false);
    }
  }

  // Load a selected course into the form for editing.
  function handleEdit(course) {
    setEditingId(course.id);

    setCourseForm({
      course_type: String(course.level ?? ""),
      name: course.name || "",
      code: course.code || "",
      department: String(course.department ?? ""),
      duration: String(course.duration ?? ""),
      description: course.description || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete an academic course.
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this academic course?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      await api.delete(`courses/${id}/`);

      if (editingId === id) {
        setCourseForm({ ...initialCourseData });
        setEditingId(null);
      }

      setMessage("Academic course deleted successfully.");
      await loadCoursesPage();
    } catch (err) {
      console.error("Failed to delete academic course:", err);
      setError(getErrorMessage(err));
    }
  }

  if (loading) {
    return (
      <div className="admin-courses-page">
        <p>Loading course information...</p>
      </div>
    );
  }

  return (
    <div className="admin-courses-page">
      <div className="admin-courses-header">
        <h1>Manage Courses</h1>
        <p>
          Manage the public Courses Page content and academic courses
          separately.
        </p>
      </div>

      {message && (
        <div className="settings-success-message" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="settings-error-message" role="alert">
          {error}
        </div>
      )}

      {/* WEBSITE COURSE PAGE CONTENT */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2>Course Page Content</h2>
          <p>
            Update the text displayed on the public Courses Page.
          </p>
        </div>

        <form onSubmit={handlePageSubmit}>
          <div className="settings-form-grid">
            <div className="settings-field">
              <label htmlFor="hero_label">Hero Label</label>
              <input
                id="hero_label"
                type="text"
                name="hero_label"
                value={pageData.hero_label}
                onChange={handlePageChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="hero_title">Hero Title</label>
              <input
                id="hero_title"
                type="text"
                name="hero_title"
                value={pageData.hero_title}
                onChange={handlePageChange}
              />
            </div>

            <div className="settings-field full-width">
              <label htmlFor="hero_description">
                Hero Description
              </label>
              <textarea
                id="hero_description"
                name="hero_description"
                value={pageData.hero_description}
                onChange={handlePageChange}
                rows={4}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="intro_label">Introduction Label</label>
              <input
                id="intro_label"
                type="text"
                name="intro_label"
                value={pageData.intro_label}
                onChange={handlePageChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="intro_title">Introduction Title</label>
              <input
                id="intro_title"
                type="text"
                name="intro_title"
                value={pageData.intro_title}
                onChange={handlePageChange}
              />
            </div>

            <div className="settings-field full-width">
              <label htmlFor="intro_description">
                Introduction Description
              </label>
              <textarea
                id="intro_description"
                name="intro_description"
                value={pageData.intro_description}
                onChange={handlePageChange}
                rows={4}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="cta_title">CTA Title</label>
              <input
                id="cta_title"
                type="text"
                name="cta_title"
                value={pageData.cta_title}
                onChange={handlePageChange}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="cta_button_text">
                CTA Button Text
              </label>
              <input
                id="cta_button_text"
                type="text"
                name="cta_button_text"
                value={pageData.cta_button_text}
                onChange={handlePageChange}
              />
            </div>

            <div className="settings-field full-width">
              <label htmlFor="cta_description">
                CTA Description
              </label>
              <textarea
                id="cta_description"
                name="cta_description"
                value={pageData.cta_description}
                onChange={handlePageChange}
                rows={3}
              />
            </div>

            <div className="settings-field full-width">
              <label htmlFor="cta_button_link">
                CTA Button Link
              </label>
              <input
                id="cta_button_link"
                type="text"
                name="cta_button_link"
                value={pageData.cta_button_link}
                onChange={handlePageChange}
                placeholder="/contact"
              />
            </div>
          </div>

          <div className="settings-form-actions">
            <button
              type="submit"
              className="settings-save-btn"
              disabled={savingPage}
            >
              {savingPage ? "Saving..." : "Save Page Content"}
            </button>
          </div>
        </form>
      </section>

      {/* ACADEMIC COURSE CREATE / EDIT */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2>
            {editingId !== null
              ? "Edit Academic Course"
              : "Add Academic Course"}
          </h2>
          <p>
            Add or update courses using the academic Course model.
          </p>
        </div>

        <form onSubmit={handleCourseSubmit}>
          <div className="settings-form-grid">
            <div className="settings-field">
              <label htmlFor="course_type">Course Type *</label>
              <select
                id="course_type"
                name="course_type"
                value={courseForm.course_type}
                onChange={handleCourseChange}
                required
              >
                <option value="">Select course type</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="course_name">Course Name *</label>
              <input
                id="course_name"
                type="text"
                name="name"
                value={courseForm.name}
                onChange={handleCourseChange}
                placeholder="e.g. BSc Computer Science"
                required
              />
            </div>

            <div className="settings-field">
              <label htmlFor="course_code">Course Code *</label>
              <input
                id="course_code"
                type="text"
                name="code"
                value={courseForm.code}
                onChange={handleCourseChange}
                placeholder="e.g. BSCCS"
                required
              />
            </div>

            <div className="settings-field">
              <label htmlFor="course_department">Department *</label>
              <select
                id="course_department"
                name="department"
                value={courseForm.department}
                onChange={handleCourseChange}
                required
              >
                <option value="">Select department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="course_duration">
                Duration (Years) *
              </label>
              <input
                id="course_duration"
                type="number"
                name="duration"
                value={courseForm.duration}
                onChange={handleCourseChange}
                min="1"
                step="1"
                placeholder="e.g. 3"
                required
              />
            </div>

            <div className="settings-field full-width">
              <label htmlFor="course_description">
                Description
              </label>
              <textarea
                id="course_description"
                name="description"
                value={courseForm.description}
                onChange={handleCourseChange}
                rows={4}
                placeholder="Enter course description"
              />
            </div>
          </div>

          <div className="settings-form-actions">
            <button
              type="submit"
              className="settings-save-btn"
              disabled={savingCourse}
            >
              {savingCourse
                ? "Saving..."
                : editingId !== null
                  ? "Update Course"
                  : "Add Course"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="settings-cancel-btn"
                onClick={resetCourseForm}
                disabled={savingCourse}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ACADEMIC COURSE LIST */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2>Academic Courses</h2>
          <p>
            {courses.length} course{courses.length === 1 ? "" : "s"} found
          </p>
        </div>

        {courses.length === 0 ? (
          <p>No academic courses found. Add your first course above.</p>
        ) : (
          <div className="admin-courses-list">
            {courses.map((course) => (
              <article
                className="admin-course-card"
                key={course.id}
              >
                <div className="admin-course-card-content">
                  <h3>{course.name}</h3>

                  <p>
                    <strong>Code:</strong> {course.code}
                  </p>

                  <p>
                    <strong>Course Type:</strong>{" "}
                    {course.level_name ||
                      levels.find(
                        (level) => level.id === course.level
                      )?.name ||
                      "—"}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {course.department_name ||
                      departments.find(
                        (department) =>
                          department.id === course.department
                      )?.name ||
                      "—"}
                  </p>

                  <p>
                    <strong>Duration:</strong> {course.duration} year
                    {Number(course.duration) === 1 ? "" : "s"}
                  </p>

                  {course.description && (
                    <p>
                      <strong>Description:</strong>{" "}
                      {course.description}
                    </p>
                  )}
                </div>

                <div className="admin-course-actions">
                  <button
                    type="button"
                    className="settings-edit-btn"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="settings-delete-btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
