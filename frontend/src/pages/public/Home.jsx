
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Home.css";

// Convert backend image paths into complete URLs.
const getImageUrl = (image) => {
    if (!image || typeof image !== "string") {
        return "";
    }

    const trimmedImage = image.trim();

    if (!trimmedImage) {
        return "";
    }

    // Absolute URLs and local preview URLs.
    if (
        /^(https?:\/\/|blob:|data:)/i.test(trimmedImage)
    ) {
        return trimmedImage;
    }

    const baseURL = api.defaults.baseURL || "";
    const origin = baseURL
        .replace(/\/api\/?$/, "")
        .replace(/\/+$/, "");

    return `${origin}/${trimmedImage.replace(/^\/+/, "")}`;
};

// Reusable image component with fallback placeholder.
function SafeImage({
    src,
    alt,
    className = "",
    placeholder = "Image unavailable",
}) {
    const [imageFailed, setImageFailed] = useState(!src);

    useEffect(() => {
        setImageFailed(!src);
    }, [src]);

    return (
        <div className={`safe-image-wrapper ${className}`}>
            {src && !imageFailed && (
                <img
                    src={src}
                    alt={alt}
                    className="safe-image"
                    onError={() => setImageFailed(true)}
                />
            )}

            {imageFailed && (
                <div
                    className="safe-image-placeholder"
                    role="img"
                    aria-label={placeholder}
                >
                    <span className="safe-image-icon" aria-hidden="true">
                        ▧
                    </span>

                    <span className="safe-image-placeholder-text">
                        {placeholder}
                    </span>
                </div>
            )}
        </div>
    );
}

function Home() {
    const [home, setHome] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHome = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("public/home/");
            setHome(response.data);
        } catch (err) {
            console.error("Failed to load home page:", err);
            setError("Failed to load home page.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHome();
    }, []);

    if (loading) {
        return (
            <div className="public-home-loading">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !home) {
        return (
            <div className="public-home-error">
                <h2>{error || "Home page data not available."}</h2>

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

    const statistics = home.statistics || [];
    const courses = home.courses || [];
    const offers = home.offers || [];
    const departments = home.departments || [];
    const whyChooseUs = home.why_choose_us || [];
    const facilities = home.facilities || [];
    const events = home.events || [];
    const notices = home.notices || [];
    const gallery = home.gallery || [];
    const testimonials = home.testimonials || [];

    return (
        <div className="public-home">
            {/* HERO */}
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text">
                        <span className="hero-small-title">
                            {home.hero_small_title}
                        </span>

                        <h1>{home.hero_title}</h1>

                        <p>{home.hero_description}</p>

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

                    <div className="hero-image">
                        <SafeImage
                            src={getImageUrl(home.hero_image)}
                            alt="College Campus"
                            placeholder="College Banner"
                        />
                    </div>
                </div>
            </section>

            {/* STATISTICS */}
            <section className="statistics-section">
                <div className="container statistics-grid">
                    {statistics.map((stat) => (
                        <div className="stat-card" key={stat.id}>
                            <span className="stat-icon">{stat.icon}</span>
                            <h2>{stat.value}</h2>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ABOUT */}
            <section className="about-section">
                <div className="container two-column">
                    <div className="about-image">
                        <SafeImage
                            src={getImageUrl(home.about_image)}
                            alt="About our college"
                            placeholder="About Our College"
                        />
                    </div>

                    <div className="about-content">
                        <span className="section-label">
                            {home.about_label}
                        </span>

                        <h2>{home.about_title}</h2>
                        <p>{home.about_description_1}</p>
                        <p>{home.about_description_2}</p>

                        <Link to="/about" className="primary-btn">
                            Read More
                        </Link>
                    </div>
                </div>
            </section>

            {/* COURSES */}
            <section className="courses-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.courses_label}
                        </span>

                        <h2>{home.courses_title}</h2>
                        <p>{home.courses_description}</p>
                    </div>

                    <div className="course-grid">
                        {courses.map((course) => (
                            <div className="course-card" key={course.id}>
                                <div className="course-image">
                                    <SafeImage
                                        src={getImageUrl(course.image)}
                                        alt={course.name}
                                        placeholder="Course Image"
                                    />
                                </div>

                                <div className="course-content">
                                    <span>
                                        {course.course_type === "UG"
                                            ? "Undergraduate"
                                            : course.course_type === "PG"
                                              ? "Postgraduate"
                                              : course.course_type}
                                    </span>

                                    <h3>{course.name}</h3>
                                    <p>Duration: {course.duration}</p>

                                    <Link to="/courses">
                                        View Course →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-button">
                        <Link to="/courses" className="primary-btn">
                            View All Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* ADMISSIONS */}
            <section className="admission-section">
                <div className="container admission-content">
                    <div>
                        <span className="section-label">
                            {home.admission_label}
                        </span>

                        <h2>{home.admission_title}</h2>
                        <p>{home.admission_description}</p>
                    </div>

                    <Link
                        to={home.admission_button_link || "/admissions"}
                        className="primary-btn"
                    >
                        {home.admission_button_text || "Apply Now"}
                    </Link>
                </div>
            </section>

            {/* OFFERS */}
            <section className="offers-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.offers_label}
                        </span>

                        <h2>{home.offers_title}</h2>
                    </div>

                    <div className="offer-grid">
                        {offers.map((offer) => (
                            <div className="offer-card" key={offer.id}>
                                <span className="offer-icon">
                                    {offer.icon}
                                </span>

                                <h3>{offer.title}</h3>
                                <p>{offer.description}</p>

                                <Link to="/admissions">
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEPARTMENTS */}
            <section className="departments-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.departments_label}
                        </span>

                        <h2>{home.departments_title}</h2>
                    </div>

                    <div className="department-grid">
                        {departments.map((department) => (
                            <div
                                className="department-card"
                                key={department.id}
                            >
                                <span>{department.icon}</span>
                                <h3>{department.name}</h3>
                                <p>{department.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="section-button">
                        <Link to="/departments" className="primary-btn">
                            View Departments
                        </Link>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.why_label}
                        </span>

                        <h2>{home.why_title}</h2>
                    </div>

                    <div className="why-grid">
                        {whyChooseUs.map((item) => (
                            <div className="why-card" key={item.id}>
                                <span>{item.icon}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FACILITIES */}
            <section className="facilities-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.facilities_label}
                        </span>

                        <h2>{home.facilities_title}</h2>
                    </div>

                    <div className="facility-grid">
                        {facilities.map((facility) => (
                            <div className="facility-card" key={facility.id}>
                                <div className="facility-image">
                                    <SafeImage
                                        src={getImageUrl(facility.image)}
                                        alt={facility.title}
                                        placeholder={
                                            facility.title || "Facility Image"
                                        }
                                    />
                                </div>

                                <h3>{facility.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EVENTS */}
            <section className="events-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.events_label}
                        </span>

                        <h2>{home.events_title}</h2>
                    </div>

                    <div className="event-grid">
                        {events.map((event) => (
                            <div className="event-card" key={event.id}>
                                <div className="event-image">
                                    <SafeImage
                                        src={getImageUrl(event.image)}
                                        alt={event.title}
                                        placeholder="Event Image"
                                    />
                                </div>

                                <div className="event-content">
                                    <span>{event.date}</span>
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWS / NOTICES */}
            <section className="news-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.notices_label}
                        </span>

                        <h2>{home.notices_title}</h2>
                    </div>

                    <div className="news-list">
                        {notices.map((notice) => (
                            <div className="news-item" key={notice.id}>
                                <span>{notice.date}</span>
                                <h3>{notice.title}</h3>

                                <Link to="/notices">
                                    Read More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PLACEMENTS */}
            <section className="placement-section">
                <div className="container placement-content">
                    <div>
                        <span className="section-label">
                            {home.placement_label}
                        </span>

                        <h2>{home.placement_title}</h2>
                        <p>{home.placement_description}</p>
                    </div>

                    <Link
                        to={home.placement_button_link || "/placements"}
                        className="primary-btn"
                    >
                        {home.placement_button_text || "Explore Placements"}
                    </Link>
                </div>
            </section>

            {/* GALLERY */}
            <section className="gallery-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.gallery_label}
                        </span>

                        <h2>{home.gallery_title}</h2>
                    </div>

                    <div className="gallery-grid">
                        {gallery.map((item) => (
                            <div className="gallery-image" key={item.id}>
                                <SafeImage
                                    src={getImageUrl(item.image)}
                                    alt="College Gallery"
                                    placeholder="Gallery Image"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="section-button">
                        <Link to="/gallery" className="primary-btn">
                            View Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonial-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">
                            {home.testimonial_label}
                        </span>

                        <h2>{home.testimonial_title}</h2>
                    </div>

                    <div className="testimonial-grid">
                        {testimonials.map((item) => (
                            <div
                                className="testimonial-card"
                                key={item.id}
                            >
                                <p>"{item.message}"</p>
                                <h3>{item.student}</h3>
                                <span>{item.course}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="contact-section">
                <div className="container contact-grid">
                    <div>
                        <span className="section-label">
                            {home.contact_label}
                        </span>

                        <h2>{home.contact_title}</h2>
                        <p>{home.contact_description}</p>

                        <div className="contact-info">
                            <p>📍 {home.contact_address}</p>
                            <p>📞 {home.contact_phone}</p>
                            <p>✉ {home.contact_email}</p>
                        </div>
                    </div>

                    <form
                        className="contact-form"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Your Name"
                            aria-label="Your Name"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            aria-label="Your Email"
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            aria-label="Phone"
                        />

                        <textarea
                            rows="5"
                            placeholder="Your Message"
                            aria-label="Your Message"
                        />

                        <button type="submit" className="primary-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Home;
