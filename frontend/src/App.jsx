import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import AdminHome from "./pages/admin/AdminHome";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminFrontendAbout from "./pages/admin/frontend/AdminFrontendAbout";
import AdminFrontendData from "./pages/admin/AdminFrontendData";
import CourseApplication from "./pages/public/CourseApplication";
import AdminApplications from "./pages/admin/AdminApplications";
// ============================================================
// PUBLIC WEBSITE
// ============================================================

import PublicLayout from "./pages/public/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import Departments from "./pages/public/Departments";

import Admissions from "./pages/public/Admissions";
import Gallery from "./pages/public/Gallery";
import Events from "./pages/public/Events";
import Notices from "./pages/public/Notices";
import Placements from "./pages/public/Placements";
import Contact from "./pages/public/Contact";

// ============================================================
// STUDENT
// ============================================================

import StudentDashboard from "./pages/StudentDashboard";
import StudentExams from "./pages/StudentExams";
import StudentAssignments from "./pages/StudentAssignments";
import StudentAssignmentSubmit from "./pages/StudentAssignmentSubmit";
import StudentSubmissions from "./pages/StudentSubmissions";
import StudentReExams from "./pages/StudentReExams";
import StudentAttendance from "./pages/StudentAttendance";


// ============================================================
// STAFF
// ============================================================

import StaffDashboard from "./pages/StaffDashboard";
import StaffStudents from "./pages/StaffStudents";
import StaffExams from "./pages/StaffExams";
import StaffExamParticipation from "./pages/StaffExamParticipation";
import StaffReExams from "./pages/StaffReExams";
import StaffAttendance from "./pages/StaffAttendance";
import StaffAttendanceHistory from "./pages/StaffAttendanceHistory";
import StaffAssignments from "./pages/StaffAssignments";
import StaffAssignmentSubmissions from "./pages/StaffAssignmentSubmissions";


// ============================================================
// ADMIN
// ============================================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";

import AdminStudents from "./pages/AdminStudents";
import AdminStudentCreate from "./pages/AdminStudentCreate";
import AdminStudentEdit from "./pages/AdminStudentEdit";

import AdminStaff from "./pages/AdminStaff";
import AdminStaffCreate from "./pages/AdminStaffCreate";
import AdminStaffEdit from "./pages/AdminStaffEdit";

import AdminCourseCreate from "./pages/AdminCourseCreate";
import AdminCourseEdit from "./pages/admin/AdminCourseEdit";

import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminDepartmentCreate from "./pages/admin/AdminDepartmentCreate";
import AdminDepartmentEdit from "./pages/admin/AdminDepartmentEdit";

import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminSubjectCreate from "./pages/admin/AdminSubjectCreate";
import AdminSubjectEdit from "./pages/admin/AdminSubjectEdit";

import AdminHOD from "./pages/admin/AdminHOD";
import AdminPrincipal from "./pages/admin/AdminPrincipal";
import AdminExams from "./pages/admin/AdminExams";

import AdminRoles from "./pages/admin/AdminRoles";
import AdminSettings from "./pages/admin/AdminSettings";


// ============================================================
// HOD
// ============================================================

import HODDashboard from "./pages/hod/HODDashboard";
import HODStudents from "./pages/hod/HODStudents";
import HODStaff from "./pages/hod/HODStaff";
import HODSubjects from "./pages/hod/HODSubjects";
import HODStaffSubjectAssign from "./pages/hod/HODStaffSubjectAssign";
import HODExams from "./pages/hod/HODExams";
import HODAssignments from "./pages/hod/HODAssignments";
import HODAttendance from "./pages/hod/HODAttendance";
import HODReExams from "./pages/hod/HODReExams";


// ============================================================
// PRINCIPAL
// ============================================================

import PrincipalDashboard from "./pages/principal/PrincipalDashboard";
import PrincipalStudents from "./pages/principal/PrincipalStudents";
import PrincipalStaff from "./pages/principal/PrincipalStaff";
import PrincipalHOD from "./pages/principal/PrincipalHOD";
import PrincipalCourses from "./pages/principal/PrincipalCourses";
import PrincipalDepartments from "./pages/principal/PrincipalDepartments";
import PrincipalSubjects from "./pages/principal/PrincipalSubjects";
import PrincipalExams from "./pages/principal/PrincipalExams";
import PrincipalAssignments from "./pages/principal/PrincipalAssignments";
import PrincipalAttendance from "./pages/principal/PrincipalAttendance";


// ============================================================
// COMMON LOGIN / ADMIN / STUDENT LAYOUT
// ============================================================

import Layout from "./components/layout/Layout";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ==================================================
                    LOGIN
                ================================================== */}

                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/admin/home"
                    element={<AdminHome />}
                />


                {/* ==================================================
                    PUBLIC WEBSITE
                ================================================== */}


                {/* HOME */}

                <Route
                    path="/home"
                    element={
                        <PublicLayout>
                            <Home />
                        </PublicLayout>
                    }
                />


                {/* ABOUT */}

                <Route
                    path="/about"
                    element={
                        <PublicLayout>
                            <About />
                        </PublicLayout>
                    }
                />


                {/* COURSES */}

                <Route
                    path="/courses"
                    element={
                        <PublicLayout>
                            <Courses />
                        </PublicLayout>
                    }
                />


                {/* ==================================================
                    STUDENT
                ================================================== */}


                {/* STUDENT DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={
                        <Layout role="Student">
                            <StudentDashboard />
                        </Layout>
                    }
                />


                {/* STUDENT EXAMS */}

                <Route
                    path="/student/exams"
                    element={
                        <Layout role="Student">
                            <StudentExams />
                        </Layout>
                    }
                />


                {/* STUDENT RE-EXAMS */}

                <Route
                    path="/student/reexams"
                    element={
                        <Layout role="Student">
                            <StudentReExams />
                        </Layout>
                    }
                />


                {/* STUDENT ATTENDANCE */}

                <Route
                    path="/student/attendance"
                    element={
                        <Layout role="Student">
                            <StudentAttendance />
                        </Layout>
                    }
                />


                {/* STUDENT ASSIGNMENTS */}

                <Route
                    path="/student/assignments"
                    element={
                        <Layout role="Student">
                            <StudentAssignments />
                        </Layout>
                    }
                />


                {/* STUDENT ASSIGNMENT SUBMIT */}

                <Route
                    path="/student/assignments/submit"
                    element={
                        <Layout role="Student">
                            <StudentAssignmentSubmit />
                        </Layout>
                    }
                />


                {/* STUDENT SUBMISSIONS */}

                <Route
                    path="/student/submissions"
                    element={
                        <Layout role="Student">
                            <StudentSubmissions />
                        </Layout>
                    }
                />


                {/* ==================================================
                    STAFF
                ================================================== */}


                {/* STAFF DASHBOARD */}

                <Route
                    path="/staff/dashboard"
                    element={
                        <Layout role="Staff">
                            <StaffDashboard />
                        </Layout>
                    }
                />


                {/* STAFF STUDENTS */}

                <Route
                    path="/staff/students"
                    element={
                        <Layout role="Staff">
                            <StaffStudents />
                        </Layout>
                    }
                />


                {/* STAFF EXAMS */}

                <Route
                    path="/staff/exams"
                    element={
                        <Layout role="Staff">
                            <StaffExams />
                        </Layout>
                    }
                />


                {/* STAFF EXAM PARTICIPATION */}

                <Route
                    path="/staff/exam-participation"
                    element={
                        <Layout role="Staff">
                            <StaffExamParticipation />
                        </Layout>
                    }
                />


                {/* STAFF RE-EXAMS */}

                <Route
                    path="/staff/reexams"
                    element={
                        <Layout role="Staff">
                            <StaffReExams />
                        </Layout>
                    }
                />


                {/* STAFF ATTENDANCE */}

                <Route
                    path="/staff/attendance"
                    element={
                        <Layout role="Staff">
                            <StaffAttendance />
                        </Layout>
                    }
                />


                {/* STAFF ATTENDANCE HISTORY */}

                <Route
                    path="/staff/attendance/history"
                    element={
                        <Layout role="Staff">
                            <StaffAttendanceHistory />
                        </Layout>
                    }
                />


                {/* STAFF ASSIGNMENTS */}

                <Route
                    path="/staff/assignments"
                    element={
                        <Layout role="Staff">
                            <StaffAssignments />
                        </Layout>
                    }
                />


                {/* STAFF ASSIGNMENT SUBMISSIONS */}

                <Route
                    path="/staff/assignment-submissions"
                    element={
                        <Layout role="Staff">
                            <StaffAssignmentSubmissions />
                        </Layout>
                    }
                />


                {/* ==================================================
                    ADMIN
                ================================================== */}


                {/* ADMIN DASHBOARD */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <Layout role="Admin">
                            <AdminDashboard />
                        </Layout>
                    }
                />


                {/* ADMIN USERS */}

                <Route
                    path="/admin/users"
                    element={
                        <Layout role="Admin">
                            <AdminUsers />
                        </Layout>
                    }
                />


                {/* ADMIN STUDENTS */}

                <Route
                    path="/admin/students"
                    element={
                        <Layout role="Admin">
                            <AdminStudents />
                        </Layout>
                    }
                />


                {/* ADMIN STUDENT CREATE */}

                <Route
                    path="/admin/students/create"
                    element={
                        <Layout role="Admin">
                            <AdminStudentCreate />
                        </Layout>
                    }
                />


                {/* ADMIN STUDENT EDIT */}

                <Route
                    path="/admin/students/:id/edit"
                    element={
                        <Layout role="Admin">
                            <AdminStudentEdit />
                        </Layout>
                    }
                />


                {/* ADMIN STAFF */}

                <Route
                    path="/admin/staff"
                    element={
                        <Layout role="Admin">
                            <AdminStaff />
                        </Layout>
                    }
                />


                {/* ADMIN STAFF CREATE */}

                <Route
                    path="/admin/staff/create"
                    element={
                        <Layout role="Admin">
                            <AdminStaffCreate />
                        </Layout>
                    }
                />


                {/* ADMIN STAFF EDIT */}

                <Route
                    path="/admin/staff/:id/edit"
                    element={
                        <Layout role="Admin">
                            <AdminStaffEdit />
                        </Layout>
                    }
                />


                {/* ADMIN COURSES */}

                <Route
                    path="/admin/courses"
                    element={
                        <Layout role="Admin">
                            <AdminCourses />
                        </Layout>
                    }
                />


                {/* ADMIN COURSE CREATE */}

                <Route
                    path="/admin/courses/create"
                    element={
                        <Layout role="Admin">
                            <AdminCourseCreate />
                        </Layout>
                    }
                />


                {/* ADMIN COURSE EDIT */}

                <Route
                    path="/admin/courses/:id/edit"
                    element={
                        <Layout role="Admin">
                            <AdminCourseEdit />
                        </Layout>
                    }
                />


                {/* ADMIN DEPARTMENTS */}

                <Route
                    path="/admin/departments"
                    element={
                        <Layout role="Admin">
                            <AdminDepartments />
                        </Layout>
                    }
                />


                {/* ADMIN DEPARTMENT CREATE */}

                <Route
                    path="/admin/departments/create"
                    element={
                        <Layout role="Admin">
                            <AdminDepartmentCreate />
                        </Layout>
                    }
                />


                {/* ADMIN DEPARTMENT EDIT */}

                <Route
                    path="/admin/departments/:id/edit"
                    element={
                        <Layout role="Admin">
                            <AdminDepartmentEdit />
                        </Layout>
                    }
                />


                {/* ADMIN SUBJECTS */}

                <Route
                    path="/admin/subjects"
                    element={
                        <Layout role="Admin">
                            <AdminSubjects />
                        </Layout>
                    }
                />


                {/* ADMIN SUBJECT CREATE */}

                <Route
                    path="/admin/subjects/create"
                    element={
                        <Layout role="Admin">
                            <AdminSubjectCreate />
                        </Layout>
                    }
                />


                {/* ADMIN SUBJECT EDIT */}

                <Route
                    path="/admin/subjects/:id/edit"
                    element={
                        <Layout role="Admin">
                            <AdminSubjectEdit />
                        </Layout>
                    }
                />


                {/* ADMIN HOD */}

                <Route
                    path="/admin/hod"
                    element={
                        <Layout role="Admin">
                            <AdminHOD />
                        </Layout>
                    }
                />


                {/* ADMIN PRINCIPAL */}

                <Route
                    path="/admin/principal"
                    element={
                        <Layout role="Admin">
                            <AdminPrincipal />
                        </Layout>
                    }
                />


                {/* ADMIN EXAMS */}

                <Route
                    path="/admin/exams"
                    element={
                        <Layout role="Admin">
                            <AdminExams />
                        </Layout>
                    }
                />


                {/* ADMIN ROLES */}

                <Route
                    path="/admin/roles"
                    element={
                        <Layout role="Admin">
                            <AdminRoles />
                        </Layout>
                    }
                />


                {/* ADMIN SETTINGS */}

                <Route
                    path="/admin/settings"
                    element={
                        <Layout role="Admin">
                            <AdminSettings />
                        </Layout>
                    }
                />
                <Route
                    path="/admin/frontend-data/*"
                    element={
                        <Layout role="Admin">
                            <AdminFrontendData />
                        </Layout>
                    }
                />

                {/* ==================================================
                    HOD
                ================================================== */}


                {/* HOD DASHBOARD */}

                <Route
                    path="/hod/dashboard"
                    element={
                        <Layout role="HOD">
                            <HODDashboard />
                        </Layout>
                    }
                />


                {/* HOD STUDENTS */}

                <Route
                    path="/hod/students"
                    element={
                        <Layout role="HOD">
                            <HODStudents />
                        </Layout>
                    }
                />


                {/* HOD STAFF */}

                <Route
                    path="/hod/staff"
                    element={
                        <Layout role="HOD">
                            <HODStaff />
                        </Layout>
                    }
                />


                {/* HOD SUBJECTS */}

                <Route
                    path="/hod/subjects"
                    element={
                        <Layout role="HOD">
                            <HODSubjects />
                        </Layout>
                    }
                />


                {/* HOD STAFF SUBJECT ASSIGNMENT */}

                <Route
                    path="/hod/staff/assignments"
                    element={
                        <Layout role="HOD">
                            <HODStaffSubjectAssign />
                        </Layout>
                    }
                />


                {/* HOD EXAMS */}

                <Route
                    path="/hod/exams"
                    element={
                        <Layout role="HOD">
                            <HODExams />
                        </Layout>
                    }
                />


                {/* HOD ASSIGNMENTS */}

                <Route
                    path="/hod/assignments"
                    element={
                        <Layout role="HOD">
                            <HODAssignments />
                        </Layout>
                    }
                />


                {/* HOD ATTENDANCE */}

                <Route
                    path="/hod/attendance"
                    element={
                        <Layout role="HOD">
                            <HODAttendance />
                        </Layout>
                    }
                />


                {/* HOD RE-EXAMS */}

                <Route
                    path="/hod/reexams"
                    element={
                        <Layout role="HOD">
                            <HODReExams />
                        </Layout>
                    }
                />


                {/* ==================================================
                    PRINCIPAL
                ================================================== */}


                {/* PRINCIPAL DASHBOARD */}

                <Route
                    path="/principal/dashboard"
                    element={
                        <Layout role="Principal">
                            <PrincipalDashboard />
                        </Layout>
                    }
                />


                {/* PRINCIPAL STUDENTS */}

                <Route
                    path="/principal/students"
                    element={
                        <Layout role="Principal">
                            <PrincipalStudents />
                        </Layout>
                    }
                />


                {/* PRINCIPAL STAFF */}

                <Route
                    path="/principal/staff"
                    element={
                        <Layout role="Principal">
                            <PrincipalStaff />
                        </Layout>
                    }
                />


                {/* PRINCIPAL HOD */}

                <Route
                    path="/principal/hod"
                    element={
                        <Layout role="Principal">
                            <PrincipalHOD />
                        </Layout>
                    }
                />


                {/* PRINCIPAL COURSES */}

                <Route
                    path="/principal/courses"
                    element={
                        <Layout role="Principal">
                            <PrincipalCourses />
                        </Layout>
                    }
                />


                {/* PRINCIPAL DEPARTMENTS */}

                <Route
                    path="/principal/departments"
                    element={
                        <Layout role="Principal">
                            <PrincipalDepartments />
                        </Layout>
                    }
                />


                {/* PRINCIPAL SUBJECTS */}

                <Route
                    path="/principal/subjects"
                    element={
                        <Layout role="Principal">
                            <PrincipalSubjects />
                        </Layout>
                    }
                />


                {/* PRINCIPAL EXAMS */}

                <Route
                    path="/principal/exams"
                    element={
                        <Layout role="Principal">
                            <PrincipalExams />
                        </Layout>
                    }
                />


                {/* PRINCIPAL ASSIGNMENTS */}

                <Route
                    path="/principal/assignments"
                    element={
                        <Layout role="Principal">
                            <PrincipalAssignments />
                        </Layout>
                    }
                />


                {/* PRINCIPAL ATTENDANCE */}

                <Route
                    path="/principal/attendance"
                    element={
                        <Layout role="Principal">
                            <PrincipalAttendance />
                        </Layout>
                    }
                />
           
                <Route
                    path="/departments"
                    element={
                        <PublicLayout>
                            <Departments />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/admissions"
                    element={
                        <PublicLayout>
                            <Admissions />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/gallery"
                    element={
                        <PublicLayout>
                            <Gallery />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/events"
                    element={
                        <PublicLayout>
                            <Events />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/notices"
                    element={
                        <PublicLayout>
                            <Notices />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/placements"
                    element={
                        <PublicLayout>
                            <Placements />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <PublicLayout>
                            <Contact />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/course-application/:id"
                    element={
                        <PublicLayout>
                            <CourseApplication />
                        </PublicLayout>
                    }
                />    
                <Route
                    path="/admin/course-applications"
                    element={
                        <Layout role="Admin">
                            <AdminApplications />
                        </Layout>
                    }
                />       
            </Routes>

        </BrowserRouter>

    );

}


export default App;