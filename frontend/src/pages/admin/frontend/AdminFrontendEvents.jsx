import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendEvents.css";

function AdminFrontendEvents() {

    const [page, setPage] = useState({
        hero_label: "",
        hero_title: "",
        hero_description: "",
        section_label: "",
        section_title: "",
    });

    const [events, setEvents] = useState([]);

    const [eventForm, setEventForm] = useState({
        date: "",
        title: "",
        description: "",
        order: 0,
        is_active: true,
    });

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "public/events/"
            );

            setPage(response.data.page);
            setEvents(response.data.events || []);

        } catch (error) {

            console.error(
                "Failed to load events:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handlePageChange = (e) => {

        setPage({
            ...page,
            [e.target.name]: e.target.value
        });

    };

    const savePage = async () => {

        try {

            await api.patch(
                "admin/events/page/",
                page
            );

            alert("Events page updated successfully.");

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to update events page."
            );

        }
    };

    const handleEventChange = (e) => {

        const { name, value, type, checked } = e.target;

        setEventForm({
            ...eventForm,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });

    };

    const resetEventForm = () => {

        setEventForm({
            date: "",
            title: "",
            description: "",
            order: 0,
            is_active: true,
        });

        setEditingId(null);

    };

    const saveEvent = async () => {

        try {

            if (!eventForm.date || !eventForm.title) {

                alert(
                    "Date and title are required."
                );

                return;
            }

            if (editingId) {

                await api.patch(
                    `admin/events/${editingId}/`,
                    eventForm
                );

                alert(
                    "Event updated successfully."
                );

            } else {

                await api.post(
                    "admin/events/",
                    eventForm
                );

                alert(
                    "Event created successfully."
                );

            }

            resetEventForm();

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                JSON.stringify(
                    error.response?.data ||
                    "Failed to save event."
                )
            );

        }
    };

    const editEvent = (event) => {

        setEditingId(event.id);

        setEventForm({
            date: event.date || "",
            title: event.title || "",
            description: event.description || "",
            order: event.order || 0,
            is_active: event.is_active,
        });

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    };

    const deleteEvent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `admin/events/${id}/`
            );

            alert(
                "Event deleted successfully."
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete event."
            );

        }
    };

    if (loading) {

        return (
            <div className="admin-frontend-loading">
                Loading Events...
            </div>
        );

    }

    return (

        <div className="admin-frontend-page">

            <h2>
                Events
            </h2>

            {/* PAGE SETTINGS */}

            <div className="admin-frontend-card">

                <h3>
                    Events Page Content
                </h3>

                <div className="admin-form-grid">

                    <div>
                        <label>
                            Hero Label
                        </label>

                        <input
                            name="hero_label"
                            value={page.hero_label || ""}
                            onChange={handlePageChange}
                        />
                    </div>

                    <div>
                        <label>
                            Hero Title
                        </label>

                        <input
                            name="hero_title"
                            value={page.hero_title || ""}
                            onChange={handlePageChange}
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
                            onChange={handlePageChange}
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
                            onChange={handlePageChange}
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
                            onChange={handlePageChange}
                        />
                    </div>

                </div>

                <button
                    onClick={savePage}
                    className="admin-primary-btn"
                >
                    Save Page
                </button>

            </div>


            {/* EVENT LIST */}

            <div className="admin-frontend-card">

                <h3>
                    Events List
                </h3>

                {events.length === 0 ? (

                    <p>
                        No events found.
                    </p>

                ) : (

                    <div className="admin-event-list">

                        {events.map((event) => (

                            <div
                                key={event.id}
                                className="admin-event-item"
                            >

                                <div>

                                    <strong>
                                        {event.title}
                                    </strong>

                                    <p>
                                        {event.date}
                                    </p>

                                    <p>
                                        {event.description}
                                    </p>

                                    <small>
                                        Order: {event.order}
                                    </small>

                                    <br />

                                    <small>
                                        Status:{" "}
                                        {event.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </small>

                                </div>

                                <div>

                                    <button
                                        onClick={() =>
                                            editEvent(event)
                                        }
                                        className="admin-edit-btn"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteEvent(event.id)
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


            {/* ADD / EDIT EVENT */}

            <div className="admin-frontend-card">

                <h3>
                    {editingId
                        ? "Edit Event"
                        : "Add Event"}
                </h3>

                <div className="admin-form-grid">

                    <div>

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={eventForm.date}
                            onChange={handleEventChange}
                        />

                    </div>

                    <div>

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={eventForm.title}
                            onChange={handleEventChange}
                        />

                    </div>

                    <div className="admin-form-full">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                eventForm.description
                            }
                            onChange={handleEventChange}
                        />

                    </div>

                    <div>

                        <label>
                            Order
                        </label>

                        <input
                            type="number"
                            name="order"
                            value={eventForm.order}
                            onChange={handleEventChange}
                        />

                    </div>

                    <div>

                        <label>
                            Active
                        </label>

                        <input
                            type="checkbox"
                            name="is_active"
                            checked={
                                eventForm.is_active
                            }
                            onChange={handleEventChange}
                        />

                    </div>

                </div>

                <button
                    onClick={saveEvent}
                    className="admin-primary-btn"
                >
                    {editingId
                        ? "Update Event"
                        : "Add Event"}
                </button>

                {editingId && (

                    <button
                        onClick={resetEventForm}
                        className="admin-secondary-btn"
                    >
                        Cancel
                    </button>

                )}

            </div>

        </div>

    );

}

export default AdminFrontendEvents;