// import { Link } from "react-router-dom";

// import "./Home.css";


// function Home() {

//     /*
//     ============================================================
//     HOME PAGE DATA
//     ============================================================

//     இப்போதைக்கு sample data.

//     அடுத்த step-ல் இந்த data-வை Django API-லிருந்து
//     fetch செய்து dynamic ஆக்கலாம்.

//     ============================================================
//     */


//     const statistics = [
//         {
//             id: 1,
//             icon: "🎓",
//             value: "5000+",
//             label: "Total Students",
//         },
//         {
//             id: 2,
//             icon: "👨‍🏫",
//             value: "250+",
//             label: "Faculty Members",
//         },
//         {
//             id: 3,
//             icon: "📚",
//             value: "30+",
//             label: "Courses",
//         },
//         {
//             id: 4,
//             icon: "🏢",
//             value: "15+",
//             label: "Departments",
//         },
//     ];


//     const courses = [
//         {
//             id: 1,
//             type: "Undergraduate",
//             name: "B.Sc Computer Science",
//             duration: "3 Years",
//             image: null,
//         },
//         {
//             id: 2,
//             type: "Undergraduate",
//             name: "B.Com",
//             duration: "3 Years",
//             image: null,
//         },
//         {
//             id: 3,
//             type: "Postgraduate",
//             name: "M.Sc Computer Science",
//             duration: "2 Years",
//             image: null,
//         },
//     ];


//     const offers = [
//         {
//             id: 1,
//             icon: "🎓",
//             title: "Merit Scholarship",
//             description:
//                 "Scholarships available for academically excellent students.",
//         },
//         {
//             id: 2,
//             icon: "💰",
//             title: "Admission Offer",
//             description:
//                 "Special admission benefits for eligible students.",
//         },
//         {
//             id: 3,
//             icon: "🏆",
//             title: "Achievement Award",
//             description:
//                 "Recognition and awards for student achievements.",
//         },
//     ];


//     const departments = [
//         {
//             id: 1,
//             icon: "💻",
//             name: "Computer Science",
//             description: "Technology & Computing",
//         },
//         {
//             id: 2,
//             icon: "💼",
//             name: "Commerce",
//             description: "Business & Finance",
//         },
//         {
//             id: 3,
//             icon: "🔬",
//             name: "Science",
//             description: "Science & Research",
//         },
//         {
//             id: 4,
//             icon: "📖",
//             name: "Arts",
//             description: "Humanities & Arts",
//         },
//     ];


//     const whyChooseUs = [
//         {
//             id: 1,
//             icon: "👨‍🏫",
//             title: "Experienced Faculty",
//             description:
//                 "Learn from experienced and dedicated faculty members.",
//         },
//         {
//             id: 2,
//             icon: "💻",
//             title: "Modern Learning",
//             description:
//                 "Modern classrooms, laboratories and technology.",
//         },
//         {
//             id: 3,
//             icon: "💼",
//             title: "Career Support",
//             description:
//                 "Placement and career guidance opportunities.",
//         },
//         {
//             id: 4,
//             icon: "🏆",
//             title: "Student Development",
//             description:
//                 "Academic, technical and professional development.",
//         },
//     ];


//     const facilities = [
//         {
//             id: 1,
//             title: "Library",
//             image: null,
//         },
//         {
//             id: 2,
//             title: "Computer Labs",
//             image: null,
//         },
//         {
//             id: 3,
//             title: "Modern Campus",
//             image: null,
//         },
//         {
//             id: 4,
//             title: "Sports Facilities",
//             image: null,
//         },
//     ];


//     const events = [
//         {
//             id: 1,
//             date: "25 September 2026",
//             title: "College Cultural Fest",
//             description:
//                 "Annual cultural celebration for students.",
//             image: null,
//         },
//         {
//             id: 2,
//             date: "05 October 2026",
//             title: "Technical Symposium",
//             description:
//                 "Technical events and competitions.",
//             image: null,
//         },
//         {
//             id: 3,
//             date: "15 October 2026",
//             title: "Sports Meet",
//             description:
//                 "Annual college sports event.",
//             image: null,
//         },
//     ];


//     const notices = [
//         {
//             id: 1,
//             date: "20 Sep 2026",
//             title:
//                 "Admission application deadline announced.",
//         },
//         {
//             id: 2,
//             date: "18 Sep 2026",
//             title:
//                 "Semester examination timetable released.",
//         },
//         {
//             id: 3,
//             date: "15 Sep 2026",
//             title:
//                 "New academic year orientation program announced.",
//         },
//     ];


//     const gallery = [
//         {
//             id: 1,
//             image: null,
//         },
//         {
//             id: 2,
//             image: null,
//         },
//         {
//             id: 3,
//             image: null,
//         },
//         {
//             id: 4,
//             image: null,
//         },
//         {
//             id: 5,
//             image: null,
//         },
//         {
//             id: 6,
//             image: null,
//         },
//     ];


//     const testimonials = [
//         {
//             id: 1,
//             message:
//                 "The college provided me with excellent academic and career opportunities.",
//             student: "Student Name",
//             course: "M.Sc Computer Science",
//         },
//         {
//             id: 2,
//             message:
//                 "The faculty members are supportive and the campus provides a great learning environment.",
//             student: "Student Name",
//             course: "B.Sc Computer Science",
//         },
//     ];


//     return (

//         <div className="public-home">


//             {/* ====================================================
//                 HERO
//             ==================================================== */}

//             <section className="hero-section">

//                 <div className="container hero-content">

//                     <div className="hero-text">

//                         <span className="hero-small-title">
//                             Welcome to EduManage College
//                         </span>

//                         <h1>
//                             Build Your Future
//                             <br />
//                             With Quality Education
//                         </h1>

//                         <p>
//                             Discover knowledge, develop your skills,
//                             and build a successful career with us.
//                         </p>


//                         <div className="hero-buttons">

//                             <Link
//                                 to="/admissions"
//                                 className="primary-btn"
//                             >
//                                 Apply Now
//                             </Link>

//                             <Link
//                                 to="/courses"
//                                 className="secondary-btn"
//                             >
//                                 Explore Courses
//                             </Link>

//                         </div>

//                     </div>


//                     <div className="hero-image">

//                         <div className="image-placeholder">
//                             College Banner Image
//                         </div>

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 STATISTICS
//             ==================================================== */}

//             <section className="statistics-section">

//                 <div className="container statistics-grid">

//                     {statistics.map((stat) => (

//                         <div
//                             className="stat-card"
//                             key={stat.id}
//                         >

//                             <span className="stat-icon">
//                                 {stat.icon}
//                             </span>

//                             <h2>
//                                 {stat.value}
//                             </h2>

//                             <p>
//                                 {stat.label}
//                             </p>

//                         </div>

//                     ))}

//                 </div>

//             </section>


//             {/* ====================================================
//                 ABOUT
//             ==================================================== */}

//             <section className="about-section">

//                 <div className="container two-column">

//                     <div className="about-image">

//                         <div className="image-placeholder">
//                             College Image
//                         </div>

//                     </div>


//                     <div className="about-content">

//                         <span className="section-label">
//                             About Our College
//                         </span>

//                         <h2>
//                             Education That Creates
//                             Opportunities
//                         </h2>

//                         <p>
//                             EduManage College provides quality education
//                             with modern learning facilities and experienced
//                             faculty members.
//                         </p>

//                         <p>
//                             Our goal is to help students develop academic
//                             knowledge, technical skills and professional
//                             confidence.
//                         </p>


//                         <Link
//                             to="/about"
//                             className="primary-btn"
//                         >
//                             Read More
//                         </Link>

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 COURSES
//             ==================================================== */}

//             <section className="courses-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Academic Programs
//                         </span>

//                         <h2>
//                             Our Popular Courses
//                         </h2>

//                         <p>
//                             Explore our undergraduate and postgraduate
//                             programs.
//                         </p>

//                     </div>


//                     <div className="course-grid">

//                         {courses.map((course) => (

//                             <div
//                                 className="course-card"
//                                 key={course.id}
//                             >

//                                 <div className="course-image">

//                                     {course.image ? (

//                                         <img
//                                             src={course.image}
//                                             alt={course.name}
//                                         />

//                                     ) : (

//                                         <span>
//                                             Course Image
//                                         </span>

//                                     )}

//                                 </div>


//                                 <div className="course-content">

//                                     <span>
//                                         {course.type}
//                                     </span>

//                                     <h3>
//                                         {course.name}
//                                     </h3>

//                                     <p>
//                                         Duration: {course.duration}
//                                     </p>

//                                     <Link to="/courses">
//                                         View Course →
//                                     </Link>

//                                 </div>

//                             </div>

//                         ))}

//                     </div>


//                     <div className="section-button">

//                         <Link
//                             to="/courses"
//                             className="primary-btn"
//                         >
//                             View All Courses
//                         </Link>

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 ADMISSIONS
//             ==================================================== */}

//             <section className="admission-section">

//                 <div className="container admission-content">

//                     <div>

//                         <span className="section-label">
//                             Admissions Open
//                         </span>

//                         <h2>
//                             Start Your College Journey Today
//                         </h2>

//                         <p>
//                             Applications are now open for the
//                             upcoming academic year.
//                         </p>

//                     </div>


//                     <Link
//                         to="/admissions"
//                         className="primary-btn"
//                     >
//                         Apply Now
//                     </Link>

//                 </div>

//             </section>


//             {/* ====================================================
//                 OFFERS
//             ==================================================== */}

//             <section className="offers-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Scholarships & Offers
//                         </span>

//                         <h2>
//                             Special Opportunities
//                         </h2>

//                     </div>


//                     <div className="offer-grid">

//                         {offers.map((offer) => (

//                             <div
//                                 className="offer-card"
//                                 key={offer.id}
//                             >

//                                 <span className="offer-icon">
//                                     {offer.icon}
//                                 </span>

//                                 <h3>
//                                     {offer.title}
//                                 </h3>

//                                 <p>
//                                     {offer.description}
//                                 </p>

//                                 <Link to="/admissions">
//                                     Learn More →
//                                 </Link>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 DEPARTMENTS
//             ==================================================== */}

//             <section className="departments-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Academics
//                         </span>

//                         <h2>
//                             Our Departments
//                         </h2>

//                     </div>


//                     <div className="department-grid">

//                         {departments.map((department) => (

//                             <div
//                                 className="department-card"
//                                 key={department.id}
//                             >

//                                 <span>
//                                     {department.icon}
//                                 </span>

//                                 <h3>
//                                     {department.name}
//                                 </h3>

//                                 <p>
//                                     {department.description}
//                                 </p>

//                             </div>

//                         ))}

//                     </div>


//                     <div className="section-button">

//                         <Link
//                             to="/departments"
//                             className="primary-btn"
//                         >
//                             View Departments
//                         </Link>

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 WHY CHOOSE US
//             ==================================================== */}

//             <section className="why-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Why EduManage
//                         </span>

//                         <h2>
//                             Why Choose Our College?
//                         </h2>

//                     </div>


//                     <div className="why-grid">

//                         {whyChooseUs.map((item) => (

//                             <div
//                                 className="why-card"
//                                 key={item.id}
//                             >

//                                 <span>
//                                     {item.icon}
//                                 </span>

//                                 <h3>
//                                     {item.title}
//                                 </h3>

//                                 <p>
//                                     {item.description}
//                                 </p>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 FACILITIES
//             ==================================================== */}

//             <section className="facilities-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Campus
//                         </span>

//                         <h2>
//                             Our Facilities
//                         </h2>

//                     </div>


//                     <div className="facility-grid">

//                         {facilities.map((facility) => (

//                             <div
//                                 className="facility-card"
//                                 key={facility.id}
//                             >

//                                 <div className="image-placeholder">

//                                     {facility.image
//                                         ? (
//                                             <img
//                                                 src={facility.image}
//                                                 alt={facility.title}
//                                             />
//                                         )
//                                         : (
//                                             facility.title
//                                         )
//                                     }

//                                 </div>

//                                 <h3>
//                                     {facility.title}
//                                 </h3>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 EVENTS
//             ==================================================== */}

//             <section className="events-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Campus Life
//                         </span>

//                         <h2>
//                             Upcoming Events
//                         </h2>

//                     </div>


//                     <div className="event-grid">

//                         {events.map((event) => (

//                             <div
//                                 className="event-card"
//                                 key={event.id}
//                             >

//                                 <div className="event-image">

//                                     {event.image
//                                         ? (
//                                             <img
//                                                 src={event.image}
//                                                 alt={event.title}
//                                             />
//                                         )
//                                         : (
//                                             "Event Image"
//                                         )
//                                     }

//                                 </div>


//                                 <div className="event-content">

//                                     <span>
//                                         {event.date}
//                                     </span>

//                                     <h3>
//                                         {event.title}
//                                     </h3>

//                                     <p>
//                                         {event.description}
//                                     </p>

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 NEWS / NOTICES
//             ==================================================== */}

//             <section className="news-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Updates
//                         </span>

//                         <h2>
//                             Latest News & Notices
//                         </h2>

//                     </div>


//                     <div className="news-list">

//                         {notices.map((notice) => (

//                             <div
//                                 className="news-item"
//                                 key={notice.id}
//                             >

//                                 <span>
//                                     {notice.date}
//                                 </span>

//                                 <h3>
//                                     {notice.title}
//                                 </h3>

//                                 <Link to="/notices">
//                                     Read More →
//                                 </Link>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 PLACEMENTS
//             ==================================================== */}

//             <section className="placement-section">

//                 <div className="container placement-content">

//                     <div>

//                         <span className="section-label">
//                             Career & Placement
//                         </span>

//                         <h2>
//                             Build Your Career With Us
//                         </h2>

//                         <p>
//                             Connect with companies and explore
//                             career opportunities through our
//                             placement program.
//                         </p>

//                     </div>


//                     <Link
//                         to="/placements"
//                         className="primary-btn"
//                     >
//                         Explore Placements
//                     </Link>

//                 </div>

//             </section>


//             {/* ====================================================
//                 GALLERY
//             ==================================================== */}

//             <section className="gallery-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Campus Life
//                         </span>

//                         <h2>
//                             College Gallery
//                         </h2>

//                     </div>


//                     <div className="gallery-grid">

//                         {gallery.map((item) => (

//                             <div
//                                 className="gallery-image"
//                                 key={item.id}
//                             >

//                                 {item.image
//                                     ? (
//                                         <img
//                                             src={item.image}
//                                             alt="College Gallery"
//                                         />
//                                     )
//                                     : (
//                                         "Gallery Image"
//                                     )
//                                 }

//                             </div>

//                         ))}

//                     </div>


//                     <div className="section-button">

//                         <Link
//                             to="/gallery"
//                             className="primary-btn"
//                         >
//                             View Gallery
//                         </Link>

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 TESTIMONIALS
//             ==================================================== */}

//             <section className="testimonial-section">

//                 <div className="container">

//                     <div className="section-heading">

//                         <span className="section-label">
//                             Student Experiences
//                         </span>

//                         <h2>
//                             What Our Students Say
//                         </h2>

//                     </div>


//                     <div className="testimonial-grid">

//                         {testimonials.map((item) => (

//                             <div
//                                 className="testimonial-card"
//                                 key={item.id}
//                             >

//                                 <p>
//                                     "{item.message}"
//                                 </p>

//                                 <h3>
//                                     {item.student}
//                                 </h3>

//                                 <span>
//                                     {item.course}
//                                 </span>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             </section>


//             {/* ====================================================
//                 CONTACT
//             ==================================================== */}

//             <section className="contact-section">

//                 <div className="container contact-grid">

//                     <div>

//                         <span className="section-label">
//                             Contact Us
//                         </span>

//                         <h2>
//                             Get In Touch With Us
//                         </h2>

//                         <p>
//                             Have questions about admissions,
//                             courses or our college?
//                         </p>


//                         <div className="contact-info">

//                             <p>
//                                 📍 Madurai, Tamil Nadu
//                             </p>

//                             <p>
//                                 📞 +91 XXXXX XXXXX
//                             </p>

//                             <p>
//                                 ✉ college@example.com
//                             </p>

//                         </div>

//                     </div>


//                     <form className="contact-form">

//                         <input
//                             type="text"
//                             placeholder="Your Name"
//                         />

//                         <input
//                             type="email"
//                             placeholder="Your Email"
//                         />

//                         <input
//                             type="text"
//                             placeholder="Phone"
//                         />

//                         <textarea
//                             rows="5"
//                             placeholder="Your Message"
//                         />

//                         <button
//                             type="submit"
//                             className="primary-btn"
//                         >
//                             Send Message
//                         </button>

//                     </form>

//                 </div>

//             </section>


//         </div>

//     );

// }


// export default Home;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";

import "./Home.css";


function Home() {

    // ============================================================
    // HOME DATA
    // ============================================================

    const [home, setHome] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ============================================================
    // FETCH HOME DATA
    // ============================================================

    const fetchHome = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get("public/home/");

            setHome(response.data);

        } catch (error) {

            console.error(
                "Failed to load home page:",
                error
            );

            setError(
                "Failed to load home page."
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // LOAD DATA
    // ============================================================

    useEffect(() => {

        fetchHome();

    }, []);


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (
            <div className="public-home-loading">

                <h2>
                    Loading...
                </h2>

            </div>
        );

    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error || !home) {

        return (
            <div className="public-home-error">

                <h2>
                    {error || "Home page data not available."}
                </h2>

                <button
                    type="button"
                    className="primary-btn"
                    onClick={fetchHome}
                >
                    Try Again
                </button>

            </div>
        );

    }


    // ============================================================
    // DATA
    // ============================================================

    const statistics =
        home.statistics || [];

    const courses =
        home.courses || [];

    const offers =
        home.offers || [];

    const departments =
        home.departments || [];

    const whyChooseUs =
        home.why_choose_us || [];

    const facilities =
        home.facilities || [];

    const events =
        home.events || [];

    const notices =
        home.notices || [];

    const gallery =
        home.gallery || [];

    const testimonials =
        home.testimonials || [];


    return (

        <div className="public-home">


            {/* ====================================================
                HERO
            ==================================================== */}

            <section className="hero-section">

                <div className="container hero-content">

                    <div className="hero-text">

                        <span className="hero-small-title">
                            {home.hero_small_title}
                        </span>

                        <h1>
                            {home.hero_title}
                        </h1>

                        <p>
                            {home.hero_description}
                        </p>


                        <div className="hero-buttons">

                            <Link
                                to={home.hero_button_1_link || "/admissions"}
                                className="primary-btn"
                            >
                                {home.hero_button_1_text || "Apply Now"}
                            </Link>


                            <Link
                                to={home.hero_button_2_link || "/courses"}
                                className="secondary-btn"
                            >
                                {home.hero_button_2_text || "Explore Courses"}
                            </Link>

                        </div>

                    </div>


                    {/* <div className="hero-image">

                        {home.hero_image ? (

                            <img
                                src={home.hero_image}
                                alt="College"
                            />

                        ) : (

                            <div className="image-placeholder">
                                College Banner Image
                            </div>

                        )}

                    </div> */}
                    <div className="hero-image">
                        {home.hero_image ? (
                            <img
                                src={home.hero_image}
                                alt="College Campus"
                                className="college-hero-image"
                            />
                        ) : (
                            <div className="image-placeholder">
                                College Banner Image
                            </div>
                        )}
                    </div>
                </div>

            </section>


            {/* ====================================================
                STATISTICS
            ==================================================== */}

            <section className="statistics-section">

                <div className="container statistics-grid">

                    {statistics.map((stat) => (

                        <div
                            className="stat-card"
                            key={stat.id}
                        >

                            <span className="stat-icon">
                                {stat.icon}
                            </span>

                            <h2>
                                {stat.value}
                            </h2>

                            <p>
                                {stat.label}
                            </p>

                        </div>

                    ))}

                </div>

            </section>


            {/* ====================================================
                ABOUT
            ==================================================== */}

            <section className="about-section">

                <div className="container two-column">
{/* 
                    <div className="about-image">

                        {home.about_image ? (

                            <img
                                src={home.about_image}
                                alt="About College"
                            />

                        ) : (

                            <div className="image-placeholder">
                                College Image
                            </div>

                        )}

                    </div> */}
                    <div className="about-image">
                        {home.about_image ? (
                            <img
                                src={home.about_image}
                                alt="College Campus"
                                className="college-about-image"
                            />
                        ) : (
                            <div className="image-placeholder">
                                College Image
                            </div>
                        )}
                    </div>

                    <div className="about-content">

                        <span className="section-label">
                            {home.about_label}
                        </span>

                        <h2>
                            {home.about_title}
                        </h2>

                        <p>
                            {home.about_description_1}
                        </p>

                        <p>
                            {home.about_description_2}
                        </p>


                        <Link
                            to="/about"
                            className="primary-btn"
                        >
                            Read More
                        </Link>

                    </div>

                </div>

            </section>


            {/* ====================================================
                COURSES
            ==================================================== */}

            <section className="courses-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.courses_label}
                        </span>

                        <h2>
                            {home.courses_title}
                        </h2>

                        <p>
                            {home.courses_description}
                        </p>

                    </div>


                    <div className="course-grid">

                        {courses.map((course) => (

                            <div
                                className="course-card"
                                key={course.id}
                            >

                                <div className="course-image">

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


                                <div className="course-content">

                                    <span>
                                        {course.course_type === "UG"
                                            ? "Undergraduate"
                                            : course.course_type === "PG"
                                                ? "Postgraduate"
                                                : course.course_type
                                        }
                                    </span>

                                    <h3>
                                        {course.name}
                                    </h3>

                                    <p>
                                        Duration: {course.duration}
                                    </p>

                                    <Link to="/courses">
                                        View Course →
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="section-button">

                        <Link
                            to="/courses"
                            className="primary-btn"
                        >
                            View All Courses
                        </Link>

                    </div>

                </div>

            </section>


            {/* ====================================================
                ADMISSIONS
            ==================================================== */}

            <section className="admission-section">

                <div className="container admission-content">

                    <div>

                        <span className="section-label">
                            {home.admission_label}
                        </span>

                        <h2>
                            {home.admission_title}
                        </h2>

                        <p>
                            {home.admission_description}
                        </p>

                    </div>


                    <Link
                        to={home.admission_button_link || "/admissions"}
                        className="primary-btn"
                    >
                        {home.admission_button_text || "Apply Now"}
                    </Link>

                </div>

            </section>


            {/* ====================================================
                OFFERS
            ==================================================== */}

            <section className="offers-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.offers_label}
                        </span>

                        <h2>
                            {home.offers_title}
                        </h2>

                    </div>


                    <div className="offer-grid">

                        {offers.map((offer) => (

                            <div
                                className="offer-card"
                                key={offer.id}
                            >

                                <span className="offer-icon">
                                    {offer.icon}
                                </span>

                                <h3>
                                    {offer.title}
                                </h3>

                                <p>
                                    {offer.description}
                                </p>

                                <Link to="/admissions">
                                    Learn More →
                                </Link>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ====================================================
                DEPARTMENTS
            ==================================================== */}

            <section className="departments-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.departments_label}
                        </span>

                        <h2>
                            {home.departments_title}
                        </h2>

                    </div>


                    <div className="department-grid">

                        {departments.map((department) => (

                            <div
                                className="department-card"
                                key={department.id}
                            >

                                <span>
                                    {department.icon}
                                </span>

                                <h3>
                                    {department.name}
                                </h3>

                                <p>
                                    {department.description}
                                </p>

                            </div>

                        ))}

                    </div>


                    <div className="section-button">

                        <Link
                            to="/departments"
                            className="primary-btn"
                        >
                            View Departments
                        </Link>

                    </div>

                </div>

            </section>


            {/* ====================================================
                WHY CHOOSE US
            ==================================================== */}

            <section className="why-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.why_label}
                        </span>

                        <h2>
                            {home.why_title}
                        </h2>

                    </div>


                    <div className="why-grid">

                        {whyChooseUs.map((item) => (

                            <div
                                className="why-card"
                                key={item.id}
                            >

                                <span>
                                    {item.icon}
                                </span>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ====================================================
                FACILITIES
            ==================================================== */}

            <section className="facilities-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.facilities_label}
                        </span>

                        <h2>
                            {home.facilities_title}
                        </h2>

                    </div>


                    <div className="facility-grid">

                        {facilities.map((facility) => (

                            <div
                                className="facility-card"
                                key={facility.id}
                            >

                                <div className="image-placeholder">

                                    {facility.image ? (

                                        <img
                                            src={facility.image}
                                            alt={facility.title}
                                        />

                                    ) : (

                                        facility.title

                                    )}

                                </div>

                                <h3>
                                    {facility.title}
                                </h3>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ====================================================
                EVENTS
            ==================================================== */}

            <section className="events-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.events_label}
                        </span>

                        <h2>
                            {home.events_title}
                        </h2>

                    </div>


                    <div className="event-grid">

                        {events.map((event) => (

                            <div
                                className="event-card"
                                key={event.id}
                            >

                                <div className="event-image">

                                    {event.image ? (

                                        <img
                                            src={event.image}
                                            alt={event.title}
                                        />

                                    ) : (

                                        "Event Image"

                                    )}

                                </div>


                                <div className="event-content">

                                    <span>
                                        {event.date}
                                    </span>

                                    <h3>
                                        {event.title}
                                    </h3>

                                    <p>
                                        {event.description}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ====================================================
                NOTICES
            ==================================================== */}

            <section className="news-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.notices_label}
                        </span>

                        <h2>
                            {home.notices_title}
                        </h2>

                    </div>


                    <div className="news-list">

                        {notices.map((notice) => (

                            <div
                                className="news-item"
                                key={notice.id}
                            >

                                <span>
                                    {notice.date}
                                </span>

                                <h3>
                                    {notice.title}
                                </h3>

                                <Link to="/notices">
                                    Read More →
                                </Link>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ====================================================
                PLACEMENTS
            ==================================================== */}

            <section className="placement-section">

                <div className="container placement-content">

                    <div>

                        <span className="section-label">
                            {home.placement_label}
                        </span>

                        <h2>
                            {home.placement_title}
                        </h2>

                        <p>
                            {home.placement_description}
                        </p>

                    </div>


                    <Link
                        to={
                            home.placement_button_link ||
                            "/placements"
                        }
                        className="primary-btn"
                    >
                        {
                            home.placement_button_text ||
                            "Explore Placements"
                        }
                    </Link>

                </div>

            </section>


            {/* ====================================================
                GALLERY
            ==================================================== */}

            <section className="gallery-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.gallery_label}
                        </span>

                        <h2>
                            {home.gallery_title}
                        </h2>

                    </div>


                    <div className="gallery-grid">

                        {gallery.map((item) => (

                            <div
                                className="gallery-image"
                                key={item.id}
                            >

                                {item.image ? (

                                    <img
                                        src={item.image}
                                        alt="College Gallery"
                                    />

                                ) : (

                                    "Gallery Image"

                                )}

                            </div>

                        ))}

                    </div>


                    <div className="section-button">

                        <Link
                            to="/gallery"
                            className="primary-btn"
                        >
                            View Gallery
                        </Link>

                    </div>

                </div>

            </section>


            {/* ====================================================
                TESTIMONIALS
            ==================================================== */}

            <section className="testimonial-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {home.testimonial_label}
                        </span>

                        <h2>
                            {home.testimonial_title}
                        </h2>

                    </div>


                    <div className="testimonial-grid">

                        {testimonials.map((item) => (

                            <div
                                className="testimonial-card"
                                key={item.id}
                            >

                                <p>
                                    "{item.message}"
                                </p>

                                <h3>
                                    {item.student}
                                </h3>

                                <span>
                                    {item.course}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ====================================================
                CONTACT
            ==================================================== */}

            <section className="contact-section">

                <div className="container contact-grid">

                    <div>

                        <span className="section-label">
                            {home.contact_label}
                        </span>

                        <h2>
                            {home.contact_title}
                        </h2>

                        <p>
                            {home.contact_description}
                        </p>


                        <div className="contact-info">

                            <p>
                                📍 {home.contact_address}
                            </p>

                            <p>
                                📞 {home.contact_phone}
                            </p>

                            <p>
                                ✉ {home.contact_email}
                            </p>

                        </div>

                    </div>


                    <form
                        className="contact-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Your Name"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                        />

                        <textarea
                            rows="5"
                            placeholder="Your Message"
                        />

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            Send Message
                        </button>

                    </form>

                </div>

            </section>


        </div>

    );

}


export default Home;