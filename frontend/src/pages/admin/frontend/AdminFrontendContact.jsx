import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendContact.css";

function AdminFrontendContact() {

    const [page, setPage] = useState({
        hero_label: "",
        hero_title: "",
        hero_description: "",
        section_label: "",
        section_title: "",
        section_description: "",
        address: "",
        phone: "",
        email: "",
        form_title: "",
    });

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                pageResponse,
                messagesResponse
            ] = await Promise.all([

                api.get(
                    "public/contact/"
                ),

                api.get(
                    "admin/contact/messages/"
                )

            ]);

            setPage(
                pageResponse.data
            );

            setMessages(
                messagesResponse.data
            );

        } catch (error) {

            console.error(
                "Failed to load contact data:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {

        setPage({
            ...page,
            [e.target.name]: e.target.value
        });

    };

    const savePage = async () => {

        try {

            await api.patch(
                "admin/contact/page/",
                page
            );

            alert(
                "Contact page updated successfully."
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                JSON.stringify(
                    error.response?.data ||
                    "Failed to update contact page."
                )
            );

        }
    };

    const markAsRead = async (id) => {

        try {

            await api.patch(
                `admin/contact/messages/${id}/`,
                {
                    is_read: true
                }
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to update message."
            );

        }
    };

    const deleteMessage = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `admin/contact/messages/${id}/`
            );

            alert(
                "Message deleted successfully."
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete message."
            );

        }
    };

    if (loading) {

        return (
            <div className="admin-frontend-loading">
                Loading Contact...
            </div>
        );

    }

    return (

        <div className="admin-frontend-page">

            <h2>
                Contact
            </h2>


            {/* CONTACT PAGE */}

            <div className="admin-frontend-card">

                <h3>
                    Contact Page Content
                </h3>

                <div className="admin-form-grid">

                    <div>

                        <label>
                            Hero Label
                        </label>

                        <input
                            name="hero_label"
                            value={
                                page.hero_label || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Hero Title
                        </label>

                        <input
                            name="hero_title"
                            value={
                                page.hero_title || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div className="admin-form-full">

                        <label>
                            Hero Description
                        </label>

                        <textarea
                            name="hero_description"
                            value={
                                page.hero_description || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Section Label
                        </label>

                        <input
                            name="section_label"
                            value={
                                page.section_label || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Section Title
                        </label>

                        <input
                            name="section_title"
                            value={
                                page.section_title || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div className="admin-form-full">

                        <label>
                            Section Description
                        </label>

                        <textarea
                            name="section_description"
                            value={
                                page.section_description || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div className="admin-form-full">

                        <label>
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={
                                page.address || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Phone
                        </label>

                        <input
                            name="phone"
                            value={
                                page.phone || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Email
                        </label>

                        <input
                            name="email"
                            value={
                                page.email || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Form Title
                        </label>

                        <input
                            name="form_title"
                            value={
                                page.form_title || ""
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                </div>

                <button
                    onClick={savePage}
                    className="admin-primary-btn"
                >
                    Save Contact Page
                </button>

            </div>


            {/* MESSAGES */}

            <div className="admin-frontend-card">

                <h3>
                    Contact Messages
                </h3>

                {messages.length === 0 ? (

                    <p>
                        No messages found.
                    </p>

                ) : (

                    <div className="admin-contact-messages">

                        {messages.map((message) => (

                            <div
                                key={message.id}
                                className={
                                    `admin-contact-message ${
                                        message.is_read
                                            ? "read"
                                            : "unread"
                                    }`
                                }
                            >

                                <div>

                                    <strong>
                                        {message.name}
                                    </strong>

                                    <p>
                                        Email:{" "}
                                        {message.email}
                                    </p>

                                    <p>
                                        Phone:{" "}
                                        {message.phone || "-"}
                                    </p>

                                    <p>
                                        {message.message}
                                    </p>

                                    <small>
                                        {message.created_at}
                                    </small>

                                </div>

                                <div>

                                    {!message.is_read && (

                                        <button
                                            onClick={() =>
                                                markAsRead(
                                                    message.id
                                                )
                                            }
                                            className="admin-edit-btn"
                                        >
                                            Mark Read
                                        </button>

                                    )}

                                    <button
                                        onClick={() =>
                                            deleteMessage(
                                                message.id
                                            )
                                        }
                                        className="admin-delete-btn"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default AdminFrontendContact;