import { useEffect, useState } from "react";
import api from "../../../api/axios";

import "./AdminFrontendPlacements.css";


function AdminFrontendPlacements() {

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
    // PLACEMENT FEATURES
    // ============================================================

    const [features, setFeatures] = useState([]);


    // ============================================================
    // LOADING
    // ============================================================

    const [loading, setLoading] = useState(true);

    const [savingPage, setSavingPage] = useState(false);

    const [savingFeature, setSavingFeature] = useState(false);


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
    // FEATURE FORM
    // ============================================================

    const [featureForm, setFeatureForm] = useState({
        title: "",
        description: "",
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

            setMessage("");

            setError("");


            const [
                pageResponse,
                featureResponse,
            ] = await Promise.all([

                api.get("public/placements/"),

                api.get("admin/placements/features/"),

            ]);


            // ====================================================
            // PAGE
            // ====================================================

            if (pageResponse.data?.page) {

                setPage(pageResponse.data.page);

            } else {

                setPage(pageResponse.data);

            }


            // ====================================================
            // FEATURES
            // ====================================================

            if (Array.isArray(featureResponse.data)) {

                setFeatures(featureResponse.data);

            } else if (
                Array.isArray(featureResponse.data?.features)
            ) {

                setFeatures(
                    featureResponse.data.features
                );

            } else if (
                Array.isArray(featureResponse.data?.results)
            ) {

                setFeatures(
                    featureResponse.data.results
                );

            } else {

                setFeatures([]);

            }

        } catch (err) {

            console.error(
                "Failed to load placements:",
                err
            );


            setError(
                err.response?.data?.detail ||
                "Failed to load placements."
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // PAGE CHANGE
    // ============================================================

    const handlePageChange = (e) => {

        const {
            name,
            value,
        } = e.target;


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
                "admin/placements/page/",
                page
            );


            setPage(response.data);


            setMessage(
                "Placements page updated successfully."
            );

        } catch (err) {

            console.error(
                "Failed to update placements page:",
                err
            );


            setError(
                err.response?.data?.detail ||
                "Failed to update placements page."
            );

        } finally {

            setSavingPage(false);

        }

    };


    // ============================================================
    // FEATURE FORM CHANGE
    // ============================================================

    const handleFeatureChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;


        setFeatureForm((previous) => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };


    // ============================================================
    // RESET FEATURE FORM
    // ============================================================

    const resetFeatureForm = () => {

        setFeatureForm({

            title: "",

            description: "",

            order: 0,

            is_active: true,

        });


        setEditingId(null);

    };


    // ============================================================
    // EDIT FEATURE
    // ============================================================

    const handleEditFeature = (feature) => {

        setEditingId(feature.id);


        setFeatureForm({

            title: feature.title || "",

            description:
                feature.description || "",

            order:
                feature.order ?? 0,

            is_active:
                feature.is_active ?? true,

        });


        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };


    // ============================================================
    // SAVE FEATURE
    // ============================================================

    const handleSaveFeature = async (e) => {

        e.preventDefault();


        try {

            setSavingFeature(true);

            setMessage("");

            setError("");


            const data = {

                title: featureForm.title,

                description:
                    featureForm.description,

                order:
                    Number(featureForm.order),

                is_active:
                    featureForm.is_active,

            };


            let response;


            // ====================================================
            // UPDATE
            // ====================================================

            if (editingId) {

                response = await api.patch(

                    `admin/placements/features/${editingId}/`,

                    data

                );


                setFeatures((previous) =>

                    previous.map((feature) =>

                        feature.id === editingId

                            ? response.data

                            : feature

                    )

                );


                setMessage(
                    "Placement feature updated successfully."
                );

            }


            // ====================================================
            // CREATE
            // ====================================================

            else {

                response = await api.post(

                    "admin/placements/features/",

                    data

                );


                setFeatures((previous) => [

                    ...previous,

                    response.data,

                ]);


                setMessage(
                    "Placement feature created successfully."
                );

            }


            resetFeatureForm();

        } catch (err) {

            console.error(
                "Failed to save placement feature:",
                err
            );


            setError(
                err.response?.data?.detail ||
                "Failed to save placement feature."
            );

        } finally {

            setSavingFeature(false);

        }

    };


    // ============================================================
    // DELETE FEATURE
    // ============================================================

    const handleDeleteFeature = async (id) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this placement feature?"

        );


        if (!confirmed) {

            return;

        }


        try {

            setMessage("");

            setError("");


            await api.delete(

                `admin/placements/features/${id}/`

            );


            setFeatures((previous) =>

                previous.filter(
                    (feature) => feature.id !== id
                )

            );


            if (editingId === id) {

                resetFeatureForm();

            }


            setMessage(
                "Placement feature deleted successfully."
            );

        } catch (err) {

            console.error(
                "Failed to delete placement feature:",
                err
            );


            setError(
                err.response?.data?.detail ||
                "Failed to delete placement feature."
            );

        }

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="admin-frontend-placements">

                <div className="admin-settings-card">

                    <div className="frontend-data-loading">

                        Loading placements...

                    </div>

                </div>

            </div>

        );

    }


    // ============================================================
    // UI
    // ============================================================

    return (

        <div className="admin-frontend-placements">


            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="admin-frontend-section-header">

                <div>

                    <h2>
                        Placements
                    </h2>

                    <p>
                        Manage the public placements page and
                        placement information.
                    </p>

                </div>

            </div>


            {/* ====================================================
                SUCCESS MESSAGE
            ==================================================== */}

            {message && (

                <div className="frontend-data-success">

                    {message}

                </div>

            )}


            {/* ====================================================
                ERROR MESSAGE
            ==================================================== */}

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
                            Placements Page Content
                        </h3>

                        <p>
                            Manage the content displayed on the
                            public placements page.
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
                            placeholder="Placements"
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
                            placeholder="Career & Placements"
                        />

                    </div>


                    {/* HERO DESCRIPTION */}

                    <div className="frontend-data-form-group">

                        <label>
                            Hero Description
                        </label>

                        <textarea
                            name="hero_description"
                            value={
                                page.hero_description || ""
                            }
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
                            value={
                                page.section_label || ""
                            }
                            onChange={handlePageChange}
                            placeholder="Career Opportunities"
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
                            value={
                                page.section_title || ""
                            }
                            onChange={handlePageChange}
                            placeholder="Build Your Career With Us"
                        />

                    </div>


                    {/* SECTION DESCRIPTION */}

                    <div className="frontend-data-form-group">

                        <label>
                            Section Description
                        </label>

                        <textarea
                            name="section_description"
                            value={
                                page.section_description || ""
                            }
                            onChange={handlePageChange}
                            rows="4"
                            placeholder="Enter section description"
                        />

                    </div>


                    {/* SAVE */}

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
                FEATURE FORM
            ==================================================== */}

            <div className="admin-settings-card">


                <div className="admin-settings-card-header">

                    <div>

                        <h3>

                            {editingId
                                ? "Edit Placement Feature"
                                : "Add Placement Feature"
                            }

                        </h3>


                        <p>
                            Add information about placement
                            opportunities and support.
                        </p>

                    </div>

                </div>


                <form
                    className="frontend-data-form"
                    onSubmit={handleSaveFeature}
                >


                    {/* TITLE */}

                    <div className="frontend-data-form-group">

                        <label>
                            Feature Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={featureForm.title}
                            onChange={handleFeatureChange}
                            placeholder="Enter feature title"
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
                            value={
                                featureForm.description
                            }
                            onChange={handleFeatureChange}
                            rows="5"
                            placeholder="Enter feature description"
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
                            value={featureForm.order}
                            onChange={handleFeatureChange}
                            min="0"
                        />

                    </div>


                    {/* ACTIVE */}

                    <div className="frontend-data-checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={
                                    featureForm.is_active
                                }
                                onChange={handleFeatureChange}
                            />

                            <span>
                                Active
                            </span>

                        </label>

                    </div>


                    {/* ACTIONS */}

                    <div className="frontend-data-form-actions">


                        <button
                            type="submit"
                            className="admin-primary-button"
                            disabled={savingFeature}
                        >

                            {savingFeature

                                ? "Saving..."

                                : editingId

                                    ? "Update Feature"

                                    : "Add Feature"

                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={resetFeatureForm}
                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* ====================================================
                FEATURE LIST
            ==================================================== */}

            <div className="admin-settings-card">


                <div className="admin-settings-card-header">

                    <div>

                        <h3>
                            Placement Features
                        </h3>

                        <p>
                            Manage existing placement features.
                        </p>

                    </div>

                </div>


                {features.length === 0 ? (

                    <div className="frontend-data-empty">

                        No placement features available.

                    </div>

                ) : (

                    <div className="frontend-data-list">


                        {features.map((feature) => (

                            <div
                                key={feature.id}
                                className="frontend-data-list-item"
                            >


                                <div className="frontend-data-list-content">


                                    <div className="frontend-data-list-title">

                                        {feature.title}

                                    </div>


                                    {feature.description && (

                                        <div className="frontend-data-list-description">

                                            {
                                                feature.description
                                            }

                                        </div>

                                    )}


                                    <div className="frontend-data-list-meta">

                                        <span>
                                            Order:{" "}
                                            {feature.order ?? 0}
                                        </span>


                                        <span>

                                            {feature.is_active

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
                                            handleEditFeature(
                                                feature
                                            )
                                        }
                                    >

                                        Edit

                                    </button>


                                    <button
                                        type="button"
                                        className="admin-danger-button"
                                        onClick={() =>
                                            handleDeleteFeature(
                                                feature.id
                                            )
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


export default AdminFrontendPlacements;