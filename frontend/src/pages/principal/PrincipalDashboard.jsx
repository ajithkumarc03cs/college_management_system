// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import api from "../../api/axios";

// import PrincipalSidebar from "./PrincipalSidebar";


// function PrincipalDashboard() {

//     const [dashboard, setDashboard] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD DASHBOARD
//     // ========================================================

//     useEffect(() => {

//         loadDashboard();

//     }, []);


//     const loadDashboard = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "principal/dashboard/"
//             );


//             console.log(
//                 "Principal Dashboard:",
//                 response.data
//             );


//             setDashboard(
//                 response.data
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Dashboard Error:",
//                 error.response?.data || error
//             );


//             setDashboard(null);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load principal dashboard."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const handleRefresh = () => {

//         loadDashboard();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <PrincipalSidebar />


//                 <main>

//                     <h1>
//                         Principal Dashboard
//                     </h1>


//                     <p>
//                         Loading dashboard...
//                     </p>

//                 </main>

//             </div>

//         );

//     }


//     // ========================================================
//     // ERROR
//     // ========================================================

//     if (error) {

//         return (

//             <div>

//                 <PrincipalSidebar />


//                 <main>

//                     <h1>
//                         Principal Dashboard
//                     </h1>


//                     <p
//                         style={{
//                             color: "red"
//                         }}
//                     >
//                         {error}
//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             handleRefresh
//                         }
//                     >
//                         Retry
//                     </button>

//                 </main>

//             </div>

//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             {/* =================================================
//                 PRINCIPAL SIDEBAR
//             ================================================= */}

//             <PrincipalSidebar />


//             {/* =================================================
//                 MAIN CONTENT
//             ================================================= */}

//             <main>

//                 {/* =================================================
//                     TITLE
//                 ================================================= */}

//                 <h1>
//                     Principal Dashboard
//                 </h1>


//                 {/* =================================================
//                     MESSAGE
//                 ================================================= */}

//                 {dashboard?.message && (

//                     <p>
//                         {
//                             dashboard.message
//                         }
//                     </p>

//                 )}


//                 {/* =================================================
//                     REFRESH
//                 ================================================= */}

//                 <button
//                     type="button"
//                     onClick={
//                         handleRefresh
//                     }
//                 >
//                     Refresh
//                 </button>


//                 <br />
//                 <br />


//                 {/* =================================================
//                     USER SUMMARY
//                 ================================================= */}

//                 <h2>
//                     Users
//                 </h2>


//                 <table
//                     border="1"
//                     cellPadding="10"
//                     cellSpacing="0"
//                 >

//                     <thead>

//                         <tr>

//                             <th>
//                                 Type
//                             </th>

//                             <th>
//                                 Count
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {/* STUDENTS */}

//                         <tr>

//                             <td>
//                                 Students
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/students">

//                                         {
//                                             dashboard?.users?.students ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/students">

//                                     View Students

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* STAFF */}

//                         <tr>

//                             <td>
//                                 Staff
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/staff">

//                                         {
//                                             dashboard?.users?.staff ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/staff">

//                                     View Staff

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* HOD */}

//                         <tr>

//                             <td>
//                                 HOD
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/hod">

//                                         {
//                                             dashboard?.users?.hod ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/hod">

//                                     View HOD

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* PRINCIPALS */}

//                         <tr>

//                             <td>
//                                 Principals
//                             </td>


//                             <td>

//                                 <strong>

//                                     {
//                                         dashboard?.users?.principals ??
//                                         0
//                                     }

//                                 </strong>

//                             </td>


//                             <td>
//                                 Current Principal
//                             </td>

//                         </tr>

//                     </tbody>

//                 </table>


//                 <br />


//                 {/* =================================================
//                     ACADEMICS SUMMARY
//                 ================================================= */}

//                 <h2>
//                     Academics
//                 </h2>


//                 <table
//                     border="1"
//                     cellPadding="10"
//                     cellSpacing="0"
//                 >

//                     <thead>

//                         <tr>

//                             <th>
//                                 Type
//                             </th>

//                             <th>
//                                 Count
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {/* COURSES */}

//                         <tr>

//                             <td>
//                                 Courses
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/courses">

//                                         {
//                                             dashboard?.academics?.courses ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/courses">

//                                     View Courses

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* DEPARTMENTS */}

//                         <tr>

//                             <td>
//                                 Departments
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/departments">

//                                         {
//                                             dashboard?.academics?.departments ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/departments">

//                                     View Departments

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* SUBJECTS */}

//                         <tr>

//                             <td>
//                                 Subjects
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/subjects">

//                                         {
//                                             dashboard?.academics?.subjects ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/subjects">

//                                     View Subjects

//                                 </Link>

//                             </td>

//                         </tr>

//                     </tbody>

//                 </table>


//                 <br />


//                 {/* =================================================
//                     ACTIVITIES SUMMARY
//                 ================================================= */}

//                 <h2>
//                     Activities
//                 </h2>


//                 <table
//                     border="1"
//                     cellPadding="10"
//                     cellSpacing="0"
//                 >

//                     <thead>

//                         <tr>

//                             <th>
//                                 Type
//                             </th>

//                             <th>
//                                 Count
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {/* EXAMS */}

//                         <tr>

//                             <td>
//                                 Exams
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/exams">

//                                         {
//                                             dashboard?.activities?.exams ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/exams">

//                                     View Exams

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* ASSIGNMENTS */}

//                         <tr>

//                             <td>
//                                 Assignments
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/assignments">

//                                         {
//                                             dashboard?.activities?.assignments ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/assignments">

//                                     View Assignments

//                                 </Link>

//                             </td>

//                         </tr>


//                         {/* ATTENDANCE */}

//                         <tr>

//                             <td>
//                                 Attendance Records
//                             </td>


//                             <td>

//                                 <strong>

//                                     <Link to="/principal/attendance">

//                                         {
//                                             dashboard?.activities?.attendance_records ??
//                                             0
//                                         }

//                                     </Link>

//                                 </strong>

//                             </td>


//                             <td>

//                                 <Link to="/principal/attendance">

//                                     View Attendance

//                                 </Link>

//                             </td>

//                         </tr>

//                     </tbody>

//                 </table>


//                 <br />


//                 {/* =================================================
//                     OVERALL SUMMARY
//                 ================================================= */}

//                 <h2>
//                     Overall Summary
//                 </h2>


//                 <p>

//                     Total Students:{" "}

//                     <Link to="/principal/students">

//                         {
//                             dashboard?.users?.students ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total Staff:{" "}

//                     <Link to="/principal/staff">

//                         {
//                             dashboard?.users?.staff ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total HOD:{" "}

//                     <Link to="/principal/hod">

//                         {
//                             dashboard?.users?.hod ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total Courses:{" "}

//                     <Link to="/principal/courses">

//                         {
//                             dashboard?.academics?.courses ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total Departments:{" "}

//                     <Link to="/principal/departments">

//                         {
//                             dashboard?.academics?.departments ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total Subjects:{" "}

//                     <Link to="/principal/subjects">

//                         {
//                             dashboard?.academics?.subjects ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total Exams:{" "}

//                     <Link to="/principal/exams">

//                         {
//                             dashboard?.activities?.exams ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Total Assignments:{" "}

//                     <Link to="/principal/assignments">

//                         {
//                             dashboard?.activities?.assignments ??
//                             0
//                         }

//                     </Link>

//                 </p>


//                 <p>

//                     Attendance Records:{" "}

//                     <Link to="/principal/attendance">

//                         {
//                             dashboard?.activities?.attendance_records ??
//                             0
//                         }

//                     </Link>

//                 </p>

//             </main>

//         </div>

//     );

// }


// export default PrincipalDashboard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";

function PrincipalDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ========================================================
    // LOAD DASHBOARD
    // ========================================================

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/dashboard/"
            );

            console.log(
                "Principal Dashboard:",
                response.data
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(
                "Principal Dashboard Error:",
                error.response?.data || error
            );

            setDashboard(null);

            setError(
                error.response?.data?.detail ||
                "Unable to load principal dashboard."
            );

        } finally {

            setLoading(false);

        }
    };

    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {
        loadDashboard();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (
            <div className="principal-page principal-dashboard-page">

                <div className="principal-state-card">

                    <div className="principal-loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Principal Dashboard
                    </h2>

                    <p>
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }

    // ========================================================
    // ERROR
    // ========================================================

    if (error) {

        return (
            <div className="principal-page principal-dashboard-page">

                <div className="principal-page-header">

                    <div>
                        <h1 className="principal-page-title">
                            Principal Dashboard
                        </h1>

                        <p className="principal-page-subtitle">
                            College overview and academic summary
                        </p>
                    </div>

                </div>

                <div className="principal-alert principal-alert-error">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        className="principal-btn principal-btn-danger"
                        onClick={handleRefresh}
                    >
                        Retry
                    </button>

                </div>

            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-dashboard-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="principal-page-header">

                <div>

                    <h1 className="principal-page-title">
                        Principal Dashboard
                    </h1>

                    <p className="principal-page-subtitle">
                        College overview and academic summary
                    </p>

                </div>

                <button
                    type="button"
                    className="principal-btn principal-btn-primary"
                    onClick={handleRefresh}
                >
                    ↻ Refresh
                </button>

            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            {dashboard?.message && (
                <div className="principal-dashboard-message">
                    {dashboard.message}
                </div>
            )}

            {/* =================================================
                USER SUMMARY
            ================================================= */}

            <section className="principal-section">

                <div className="principal-section-header">

                    <div>
                        <h2 className="principal-section-title">
                            Users
                        </h2>

                        <p className="principal-section-subtitle">
                            Overview of college users
                        </p>
                    </div>

                </div>

                <div className="principal-dashboard-grid">

                    {/* STUDENTS */}

                    <Link
                        to="/principal/students"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            🎓
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Students
                            </span>

                            <strong>
                                {dashboard?.users?.students ?? 0}
                            </strong>

                            <small>
                                View Students →
                            </small>

                        </div>

                    </Link>

                    {/* STAFF */}

                    <Link
                        to="/principal/staff"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            👨‍🏫
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Staff
                            </span>

                            <strong>
                                {dashboard?.users?.staff ?? 0}
                            </strong>

                            <small>
                                View Staff →
                            </small>

                        </div>

                    </Link>

                    {/* HOD */}

                    <Link
                        to="/principal/hod"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            👔
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                HOD
                            </span>

                            <strong>
                                {dashboard?.users?.hod ?? 0}
                            </strong>

                            <small>
                                View HOD →
                            </small>

                        </div>

                    </Link>

                    {/* PRINCIPALS */}

                    <div className="principal-summary-card">

                        <div className="principal-summary-icon">
                            🏫
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Principals
                            </span>

                            <strong>
                                {dashboard?.users?.principals ?? 0}
                            </strong>

                            <small>
                                Current Principal
                            </small>

                        </div>

                    </div>

                </div>

            </section>

            {/* =================================================
                ACADEMICS
            ================================================= */}

            <section className="principal-section">

                <div className="principal-section-header">

                    <div>
                        <h2 className="principal-section-title">
                            Academics
                        </h2>

                        <p className="principal-section-subtitle">
                            Academic structure overview
                        </p>
                    </div>

                </div>

                <div className="principal-dashboard-grid">

                    <Link
                        to="/principal/courses"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            📚
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Courses
                            </span>

                            <strong>
                                {dashboard?.academics?.courses ?? 0}
                            </strong>

                            <small>
                                View Courses →
                            </small>

                        </div>

                    </Link>

                    <Link
                        to="/principal/departments"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            🏢
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Departments
                            </span>

                            <strong>
                                {dashboard?.academics?.departments ?? 0}
                            </strong>

                            <small>
                                View Departments →
                            </small>

                        </div>

                    </Link>

                    <Link
                        to="/principal/subjects"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            📖
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Subjects
                            </span>

                            <strong>
                                {dashboard?.academics?.subjects ?? 0}
                            </strong>

                            <small>
                                View Subjects →
                            </small>

                        </div>

                    </Link>

                </div>

            </section>

            {/* =================================================
                ACTIVITIES
            ================================================= */}

            <section className="principal-section">

                <div className="principal-section-header">

                    <div>
                        <h2 className="principal-section-title">
                            Activities
                        </h2>

                        <p className="principal-section-subtitle">
                            Exams, assignments and attendance overview
                        </p>
                    </div>

                </div>

                <div className="principal-dashboard-grid">

                    <Link
                        to="/principal/exams"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            📝
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Exams
                            </span>

                            <strong>
                                {dashboard?.activities?.exams ?? 0}
                            </strong>

                            <small>
                                View Exams →
                            </small>

                        </div>

                    </Link>

                    <Link
                        to="/principal/assignments"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            📂
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Assignments
                            </span>

                            <strong>
                                {dashboard?.activities?.assignments ?? 0}
                            </strong>

                            <small>
                                View Assignments →
                            </small>

                        </div>

                    </Link>

                    <Link
                        to="/principal/attendance"
                        className="principal-summary-card"
                    >

                        <div className="principal-summary-icon">
                            📅
                        </div>

                        <div className="principal-summary-content">

                            <span>
                                Attendance Records
                            </span>

                            <strong>
                                {dashboard?.activities?.attendance_records ?? 0}
                            </strong>

                            <small>
                                View Attendance →
                            </small>

                        </div>

                    </Link>

                </div>

            </section>

            {/* =================================================
                OVERALL SUMMARY
            ================================================= */}

            <section className="principal-section principal-overall-section">

                <div className="principal-section-header">

                    <div>
                        <h2 className="principal-section-title">
                            Overall Summary
                        </h2>

                        <p className="principal-section-subtitle">
                            Quick access to all major areas
                        </p>
                    </div>

                </div>

                <div className="principal-overall-grid">

                    <Link
                        to="/principal/students"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Students
                        </span>
                        <strong>
                            {dashboard?.users?.students ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/staff"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Staff
                        </span>
                        <strong>
                            {dashboard?.users?.staff ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/hod"
                        className="principal-overall-item"
                    >
                        <span>
                            Total HOD
                        </span>
                        <strong>
                            {dashboard?.users?.hod ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/courses"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Courses
                        </span>
                        <strong>
                            {dashboard?.academics?.courses ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/departments"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Departments
                        </span>
                        <strong>
                            {dashboard?.academics?.departments ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/subjects"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Subjects
                        </span>
                        <strong>
                            {dashboard?.academics?.subjects ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/exams"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Exams
                        </span>
                        <strong>
                            {dashboard?.activities?.exams ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/assignments"
                        className="principal-overall-item"
                    >
                        <span>
                            Total Assignments
                        </span>
                        <strong>
                            {dashboard?.activities?.assignments ?? 0}
                        </strong>
                    </Link>

                    <Link
                        to="/principal/attendance"
                        className="principal-overall-item"
                    >
                        <span>
                            Attendance Records
                        </span>
                        <strong>
                            {dashboard?.activities?.attendance_records ?? 0}
                        </strong>
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default PrincipalDashboard;