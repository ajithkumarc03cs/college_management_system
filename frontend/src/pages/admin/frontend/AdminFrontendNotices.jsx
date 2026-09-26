import { useEffect, useState } from "react";
import api from "../../../api/axios";

import "./AdminFrontendNotices.css";


function AdminFrontendNotices() {

    // ============================================================
    // PAGE DATA
    // ============================================================

    const [page, setPage] = useState({
        hero_label: "",
        hero_title: "",
        hero_description: "",
        section_label: "",
        section_title: "",
        section_description: "",
    });


    // ============================================================
    // NOTICES
    // ============================================================

    const [notices, setNotices] = useState([]);


    // ============================================================
    // LOADING
    // ============================================================

    const [loading, setLoading] = useState(true);

    const [savingPage, setSavingPage] = useState(false);

    const [savingNotice, setSavingNotice] = useState(false);


    // ============================================================
    // MESSAGE
    // ============================================================

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // ============================================================
    // EDITING
    // ============================================================

    const [editingId, setEditingId] = useState(null);


    // ============================================================
    // NOTICE FORM
    // ============================================================

    const [noticeForm, setNoticeForm] = useState({
        title: "",
        description: "",
        date: "",
        order: 0,
        is_active: true,
    });


    // ============================================================
    // LOAD DATA
    // ============================================================

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            setLoading(true);

            setError("");

            const [pageResponse, noticesResponse] = await Promise.all([
                api.get("public/notices/"),
                api.get("admin/notices/"),
            ]);


            // ----------------------------------------------------
            // PAGE
            // ----------------------------------------------------

            if (pageResponse.data?.page) {

                setPage(pageResponse.data.page);

            } else {

                setPage(pageResponse.data);

            }


            // ----------------------------------------------------
            // NOTICES
            // ----------------------------------------------------

            if (Array.isArray(noticesResponse.data)) {

                setNotices(noticesResponse.data);

            } else if (Array.isArray(noticesResponse.data?.notices)) {

                setNotices(noticesResponse.data.notices);

            } else if (Array.isArray(noticesResponse.data?.results)) {

                setNotices(noticesResponse.data.results);

            } else {

                setNotices([]);

            }

        } catch (err) {

            console.error("Failed to load notices:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to load notices."
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // PAGE INPUT CHANGE
    // ============================================================

    const handlePageChange = (e) => {

        const { name, value } = e.target;

        setPage((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // ============================================================
    // SAVE PAGE
    // ============================================================

    const handleSavePage = async (e) => {

        e.preventDefault();

        try {

            setSavingPage(true);

            setMessage("");

            setError("");


            const response = await api.patch(
                "admin/notices/page/",
                page
            );


            setPage(response.data);

            setMessage("Notices page updated successfully.");

        } catch (err) {

            console.error("Failed to update notices page:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to update notices page."
            );

        } finally {

            setSavingPage(false);

        }

    };


    // ============================================================
    // NOTICE INPUT CHANGE
    // ============================================================

    const handleNoticeChange = (e) => {

        const { name, value, type, checked } = e.target;

        setNoticeForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

    };


    // ============================================================
    // RESET NOTICE FORM
    // ============================================================

    const resetNoticeForm = () => {

        setNoticeForm({
            title: "",
            description: "",
            date: "",
            order: 0,
            is_active: true,
        });

        setEditingId(null);

    };


    // ============================================================
    // EDIT NOTICE
    // ============================================================

    const handleEditNotice = (notice) => {

        setEditingId(notice.id);

        setNoticeForm({
            title: notice.title || "",
            description: notice.description || "",
            date: notice.date || "",
            order: notice.order ?? 0,
            is_active: notice.is_active ?? true,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // ============================================================
    // SAVE NOTICE
    // ============================================================

    const handleSaveNotice = async (e) => {

        e.preventDefault();

        try {

            setSavingNotice(true);

            setMessage("");

            setError("");


            const data = {
                title: noticeForm.title,
                description: noticeForm.description,
                date: noticeForm.date,
                order: Number(noticeForm.order),
                is_active: noticeForm.is_active,
            };


            let response;


            // ----------------------------------------------------
            // UPDATE
            // ----------------------------------------------------

            if (editingId) {

                response = await api.patch(
                    `admin/notices/${editingId}/`,
                    data
                );


                setNotices((previous) =>
                    previous.map((notice) =>
                        notice.id === editingId
                            ? response.data
                            : notice
                    )
                );


                setMessage("Notice updated successfully.");

            }


            // ----------------------------------------------------
            // CREATE
            // ----------------------------------------------------

            else {

                response = await api.post(
                    "admin/notices/",
                    data
                );


                setNotices((previous) => [
                    ...previous,
                    response.data,
                ]);


                setMessage("Notice created successfully.");

            }


            resetNoticeForm();

        } catch (err) {

            console.error("Failed to save notice:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to save notice."
            );

        } finally {

            setSavingNotice(false);

        }

    };


    // ============================================================
    // DELETE NOTICE
    // ============================================================

    const handleDeleteNotice = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this notice?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setMessage("");

            setError("");


            await api.delete(
                `admin/notices/${id}/`
            );


            setNotices((previous) =>
                previous.filter(
                    (notice) => notice.id !== id
                )
            );


            if (editingId === id) {
                resetNoticeForm();
            }


            setMessage("Notice deleted successfully.");

        } catch (err) {

            console.error("Failed to delete notice:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete notice."
            );

        }

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (
            <div className="admin-frontend-notices">

                <div className="admin-settings-card">

                    <div className="frontend-data-loading">

                        Loading notices...

                    </div>

                </div>

            </div>
        );

    }


    // ============================================================
    // UI
    // ============================================================

    return (

        <div className="admin-frontend-notices">


            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="admin-frontend-section-header">

                <div>

                    <h2>
                        Notices
                    </h2>

                    <p>
                        Manage the public notices page and notices.
                    </p>

                </div>

            </div>


            {/* ====================================================
                MESSAGE
            ==================================================== */}

            {message && (

                <div className="frontend-data-success">

                    {message}

                </div>

            )}


            {error && (

                <div className="frontend-data-error">

                    {error}

                </div>

            )}


            {/* ====================================================
                PAGE CONTENT
            ==================================================== */}

            <div className="admin-settings-card">

                <div className="admin-settings-card-header">

                    <div>

                        <h3>
                            Notices Page Content
                        </h3>

                        <p>
                            Manage the text displayed on the public
                            notices page.
                        </p>

                    </div>

                </div>


                <form
                    className="frontend-data-form"
                    onSubmit={handleSavePage}
                >


                    {/* HERO LABEL */}

                    <div className="frontend-data-form-group">

                        <label>
                            Hero Label
                        </label>

                        <input
                            type="text"
                            name="hero_label"
                            value={page.hero_label || ""}
                            onChange={handlePageChange}
                            placeholder="Notices"
                        />

                    </div>


                    {/* HERO TITLE */}

                    <div className="frontend-data-form-group">

                        <label>
                            Hero Title
                        </label>

                        <input
                            type="text"
                            name="hero_title"
                            value={page.hero_title || ""}
                            onChange={handlePageChange}
                            placeholder="Latest Notices"
                        />

                    </div>


                    {/* HERO DESCRIPTION */}

                    <div className="frontend-data-form-group">

                        <label>
                            Hero Description
                        </label>

                        <textarea
                            name="hero_description"
                            value={page.hero_description || ""}
                            onChange={handlePageChange}
                            rows="4"
                            placeholder="Enter hero description"
                        />

                    </div>


                    {/* SECTION LABEL */}

                    <div className="frontend-data-form-group">

                        <label>
                            Section Label
                        </label>

                        <input
                            type="text"
                            name="section_label"
                            value={page.section_label || ""}
                            onChange={handlePageChange}
                            placeholder="Updates"
                        />

                    </div>


                    {/* SECTION TITLE */}

                    <div className="frontend-data-form-group">

                        <label>
                            Section Title
                        </label>

                        <input
                            type="text"
                            name="section_title"
                            value={page.section_title || ""}
                            onChange={handlePageChange}
                            placeholder="Latest College Notices"
                        />

                    </div>


                    {/* SECTION DESCRIPTION */}

                    <div className="frontend-data-form-group">

                        <label>
                            Section Description
                        </label>

                        <textarea
                            name="section_description"
                            value={page.section_description || ""}
                            onChange={handlePageChange}
                            rows="4"
                            placeholder="Enter section description"
                        />

                    </div>


                    {/* SAVE BUTTON */}

                    <div className="frontend-data-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-button"
                            disabled={savingPage}
                        >

                            {savingPage
                                ? "Saving..."
                                : "Save Page Content"
                            }

                        </button>

                    </div>

                </form>

            </div>


            {/* ====================================================
                NOTICE FORM
            ==================================================== */}

            <div className="admin-settings-card">

                <div className="admin-settings-card-header">

                    <div>

                        <h3>
                            {editingId
                                ? "Edit Notice"
                                : "Add Notice"
                            }
                        </h3>

                        <p>
                            Create and manage public website notices.
                        </p>

                    </div>

                </div>


                <form
                    className="frontend-data-form"
                    onSubmit={handleSaveNotice}
                >


                    {/* TITLE */}

                    <div className="frontend-data-form-group">

                        <label>
                            Notice Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={noticeForm.title}
                            onChange={handleNoticeChange}
                            placeholder="Enter notice title"
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="frontend-data-form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={noticeForm.description}
                            onChange={handleNoticeChange}
                            rows="5"
                            placeholder="Enter notice description"
                        />

                    </div>


                    {/* DATE */}

                    <div className="frontend-data-form-group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={noticeForm.date}
                            onChange={handleNoticeChange}
                            required
                        />

                    </div>


                    {/* ORDER */}

                    <div className="frontend-data-form-group">

                        <label>
                            Display Order
                        </label>

                        <input
                            type="number"
                            name="order"
                            value={noticeForm.order}
                            onChange={handleNoticeChange}
                            min="0"
                        />

                    </div>


                    {/* ACTIVE */}

                    <div className="frontend-data-checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={noticeForm.is_active}
                                onChange={handleNoticeChange}
                            />

                            <span>
                                Active
                            </span>

                        </label>

                    </div>


                    {/* BUTTONS */}

                    <div className="frontend-data-form-actions">


                        <button
                            type="submit"
                            className="admin-primary-button"
                            disabled={savingNotice}
                        >

                            {savingNotice
                                ? "Saving..."
                                : editingId
                                    ? "Update Notice"
                                    : "Add Notice"
                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={resetNoticeForm}
                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* ====================================================
                NOTICE LIST
            ==================================================== */}

            <div className="admin-settings-card">

                <div className="admin-settings-card-header">

                    <div>

                        <h3>
                            All Notices
                        </h3>

                        <p>
                            Manage existing notices.
                        </p>

                    </div>

                </div>


                {notices.length === 0 ? (

                    <div className="frontend-data-empty">

                        No notices available.

                    </div>

                ) : (

                    <div className="frontend-data-list">


                        {notices.map((notice) => (

                            <div
                                key={notice.id}
                                className="frontend-data-list-item"
                            >


                                <div className="frontend-data-list-content">


                                    <div className="frontend-data-list-title">

                                        {notice.title}

                                    </div>


                                    {notice.description && (

                                        <div className="frontend-data-list-description">

                                            {notice.description}

                                        </div>

                                    )}


                                    <div className="frontend-data-list-meta">

                                        <span>
                                            Date: {notice.date || "-"}
                                        </span>

                                        <span>
                                            Order: {notice.order ?? 0}
                                        </span>

                                        <span>
                                            {notice.is_active
                                                ? "Active"
                                                : "Inactive"
                                            }
                                        </span>

                                    </div>

                                </div>


                                <div className="frontend-data-list-actions">


                                    <button
                                        type="button"
                                        className="admin-secondary-button"
                                        onClick={() =>
                                            handleEditNotice(notice)
                                        }
                                    >

                                        Edit

                                    </button>


                                    <button
                                        type="button"
                                        className="admin-danger-button"
                                        onClick={() =>
                                            handleDeleteNotice(notice.id)
                                        }
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


export default AdminFrontendNotices;