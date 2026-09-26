import { NavLink } from "react-router-dom";

function Sidebar({ role }) {

    // ========================================================
    // SIDEBAR MENUS
    // ========================================================

    const menus = {

        // ====================================================
        // ADMIN
        // ====================================================

        Admin: [
            ["Dashboard", "/admin/dashboard", "▦"],
            ["Users", "/admin/users", "👥"],
            ["Students", "/admin/students", "🎓"],
            ["Staff", "/admin/staff", "👨‍🏫"],
            ["HOD", "/admin/hod", "👔"],
            ["Principal", "/admin/principal", "🏫"],
            ["Courses", "/admin/courses", "📚"],
            ["Departments", "/admin/departments", "🏢"],
            ["Subjects", "/admin/subjects", "📖"],
            ["Exams", "/admin/exams", "📝"],
            ["Roles", "/admin/roles", "🔐"],
            ["Settings", "/admin/settings", "⚙"],
        ],


        // ====================================================
        // PRINCIPAL
        // ====================================================

        Principal: [
            ["Dashboard", "/principal/dashboard", "▦"],
            ["Students", "/principal/students", "🎓"],
            ["Staff", "/principal/staff", "👨‍🏫"],
            ["HOD", "/principal/hod", "👔"],
            ["Courses", "/principal/courses", "📚"],
            ["Departments", "/principal/departments", "🏢"],
            ["Subjects", "/principal/subjects", "📖"],
            ["Exams", "/principal/exams", "📝"],
            ["Assignments", "/principal/assignments", "📂"],
            ["Attendance", "/principal/attendance", "✓"],
        ],


        // ====================================================
        // HOD
        // ====================================================

        HOD: [
            ["Dashboard", "/hod/dashboard", "▦"],
            ["Students", "/hod/students", "🎓"],
            ["Staff", "/hod/staff", "👨‍🏫"],
            ["Subjects", "/hod/subjects", "📖"],
            ["Staff Assignments", "/hod/staff/assignments", "🔗"],
            ["Exams", "/hod/exams", "📝"],
            ["Assignments", "/hod/assignments", "📂"],
            ["Attendance", "/hod/attendance", "✓"],
            ["Re-Exams", "/hod/reexams", "🔄"],
        ],


        // ====================================================
        // STAFF
        // ====================================================

        Staff: [
            ["Dashboard", "/staff/dashboard", "▦"],
            ["Students", "/staff/students", "🎓"],
            ["Exams", "/staff/exams", "📝"],
            ["Exam Participation", "/staff/exam-participation", "✓"],
            ["Attendance", "/staff/attendance", "📅"],
            ["Attendance History", "/staff/attendance/history", "📊"],
            ["Assignments", "/staff/assignments", "📂"],
            ["Submissions", "/staff/assignment-submissions", "📥"],
            ["Re-Exams", "/staff/reexams", "🔄"],
        ],


        // ====================================================
        // STUDENT
        // ====================================================

        Student: [
            ["Dashboard", "/dashboard", "▦"],
            ["Exams", "/student/exams", "📝"],
            ["Re-Exams", "/student/reexams", "🔄"],
            ["Attendance", "/student/attendance", "📅"],
            ["Assignments", "/student/assignments", "📂"],
            ["Submissions", "/student/submissions", "📥"],
        ],
    };


    // ========================================================
    // CURRENT ROLE MENUS
    // ========================================================

    const currentMenus =
        menus[role] || menus.Student;


    // ========================================================
    // LOGOUT
    // ========================================================

    const handleLogout = () => {

        localStorage.clear();

        window.location.href = "/";
    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <aside className="sidebar">

            {/* ==================================================
                LOGO
            ================================================== */}

            <div className="sidebar-logo">

                <div className="logo-icon">
                    🎓
                </div>

                <div>

                    <h2>
                        EduManage
                    </h2>

                    <span>
                        College Portal
                    </span>

                </div>

            </div>


            {/* ==================================================
                ROLE
            ================================================== */}

            <div className="sidebar-role">
                {role || "User"}
            </div>


            {/* ==================================================
                MENU
            ================================================== */}

            <nav className="sidebar-menu">

                {currentMenus.map(
                    ([title, path, icon]) => (

                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <span className="menu-icon">
                                {icon}
                            </span>

                            <span>
                                {title}
                            </span>

                        </NavLink>

                    )
                )}

            </nav>


            {/* ==================================================
                LOGOUT
            ================================================== */}

            <div className="sidebar-bottom">

                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <span>
                        ↪
                    </span>

                    Logout

                </button>

            </div>

        </aside>

    );
}

export default Sidebar;