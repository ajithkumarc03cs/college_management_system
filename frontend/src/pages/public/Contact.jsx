import { useEffect, useState } from "react";

import api from "../../api/axios";
import "./Contact.css";


function Contact() {

    const [page, setPage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");


    useEffect(() => {

        const loadContact = async () => {

            try {

                setLoading(true);

                const response = await api.get(
                    "public/contact/"
                );

                setPage(response.data);

            } catch (err) {

                console.error(
                    "Failed to load contact:",
                    err
                );

                setError(
                    "Unable to load contact information."
                );

            } finally {

                setLoading(false);

            }

        };


        loadContact();

    }, []);


    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSubmitting(true);
            setSuccess("");
            setError("");

            const response = await api.post(
                "public/contact/",
                formData
            );

            setSuccess(
                response.data.message ||
                "Thank you. Your message has been submitted."
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });

        } catch (err) {

            console.error(
                "Failed to submit contact message:",
                err
            );

            setError(
                "Unable to submit your message. Please try again."
            );

        } finally {

            setSubmitting(false);

        }

    };


    if (loading) {

        return (
            <div className="public-contact">

                <div className="container">

                    <p>
                        Loading contact information...
                    </p>

                </div>

            </div>
        );

    }


    if (error && !page) {

        return (
            <div className="public-contact">

                <div className="container">

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    if (!page) {
        return null;
    }


    return (

        <div className="public-contact">


            <section className="contact-page-hero">

                <div className="container">

                    <span className="section-label">
                        {page.hero_label}
                    </span>

                    <h1>
                        {page.hero_title}
                    </h1>

                    <p>
                        {page.hero_description}
                    </p>

                </div>

            </section>


            <section className="contact-main-section">

                <div className="container contact-page-grid">


                    <div className="contact-details">

                        <span className="section-label">
                            {page.section_label}
                        </span>

                        <h2>
                            {page.section_title}
                        </h2>

                        <p>
                            {page.section_description}
                        </p>


                        <div className="contact-detail-item">

                            <span>
                                📍
                            </span>

                            <div>

                                <h3>
                                    Address
                                </h3>

                                <p>
                                    {page.address}
                                </p>

                            </div>

                        </div>


                        <div className="contact-detail-item">

                            <span>
                                📞
                            </span>

                            <div>

                                <h3>
                                    Phone
                                </h3>

                                <p>
                                    {page.phone}
                                </p>

                            </div>

                        </div>


                        <div className="contact-detail-item">

                            <span>
                                ✉️
                            </span>

                            <div>

                                <h3>
                                    Email
                                </h3>

                                <p>
                                    {page.email}
                                </p>

                            </div>

                        </div>

                    </div>


                    <form
                        className="public-contact-form"
                        onSubmit={handleSubmit}
                    >

                        <h2>
                            {page.form_title}
                        </h2>


                        <div className="contact-form-group">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />

                        </div>


                        <div className="contact-form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                            />

                        </div>


                        <div className="contact-form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your Phone"
                            />

                        </div>


                        <div className="contact-form-group">

                            <label>
                                Message
                            </label>

                            <textarea
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                            />

                        </div>


                        {success && (
                            <p>
                                {success}
                            </p>
                        )}


                        {error && (
                            <p>
                                {error}
                            </p>
                        )}


                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Sending..."
                                : "Send Message"
                            }
                        </button>

                    </form>

                </div>

            </section>


        </div>

    );

}


export default Contact;