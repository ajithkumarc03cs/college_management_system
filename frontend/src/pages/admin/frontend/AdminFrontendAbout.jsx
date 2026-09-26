import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendAbout.css";

function AdminFrontendAbout() {
    // =========================================================
    // STATE
    // =========================================================

    const [page, setPage] = useState(null);
    const [values, setValues] = useState([]);
    const [facilities, setFacilities] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editingValueId, setEditingValueId] = useState(null);
    const [editingFacilityId, setEditingFacilityId] = useState(null);

    // =========================================================
    // PAGE FORM
    // =========================================================

    const [pageForm, setPageForm] = useState({
        hero_label: "",
        hero_title: "",
        hero_description: "",

        intro_label: "",
        intro_title: "",
        intro_description_1: "",
        intro_description_2: "",
        intro_description_3: "",
        intro_image: null,

        direction_label: "",
        direction_title: "",

        vision_title: "",
        vision_description: "",

        mission_title: "",
        mission_description: "",

        values_label: "",
        values_title: "",

        facilities_label: "",
        facilities_title: "",

        cta_label: "",
        cta_title: "",
        cta_description: "",
        cta_button_1_text: "",
        cta_button_1_link: "",
        cta_button_2_text: "",
        cta_button_2_link: "",
    });

    // =========================================================
    // VALUE FORM
    // =========================================================

    const [valueForm, setValueForm] = useState({
        icon: "🎓",
        title: "",
        description: "",
        order: 1,
        is_active: true,
    });

    // =========================================================
    // FACILITY FORM
    // =========================================================

    const [facilityForm, setFacilityForm] = useState({
        title: "",
        description: "",
        image: null,
        order: 1,
        is_active: true,
    });

    // =========================================================
    // LOAD DATA
    // =========================================================

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [
                pageResponse,
                valuesResponse,
                facilitiesResponse,
            ] = await Promise.all([
                api.get("admin/about/"),
                api.get("admin/about/values/"),
                api.get("admin/about/facilities/"),
            ]);

            const pageData = pageResponse.data;

            setPage(pageData);
            setValues(valuesResponse.data);
            setFacilities(facilitiesResponse.data);

            setPageForm({
                hero_label: pageData.hero_label || "",
                hero_title: pageData.hero_title || "",
                hero_description:
                    pageData.hero_description || "",

                intro_label: pageData.intro_label || "",
                intro_title: pageData.intro_title || "",
                intro_description_1:
                    pageData.intro_description_1 || "",
                intro_description_2:
                    pageData.intro_description_2 || "",
                intro_description_3:
                    pageData.intro_description_3 || "",
                intro_image: null,

                direction_label:
                    pageData.direction_label || "",
                direction_title:
                    pageData.direction_title || "",

                vision_title:
                    pageData.vision_title || "",
                vision_description:
                    pageData.vision_description || "",

                mission_title:
                    pageData.mission_title || "",
                mission_description:
                    pageData.mission_description || "",

                values_label:
                    pageData.values_label || "",
                values_title:
                    pageData.values_title || "",

                facilities_label:
                    pageData.facilities_label || "",
                facilities_title:
                    pageData.facilities_title || "",

                cta_label:
                    pageData.cta_label || "",
                cta_title:
                    pageData.cta_title || "",
                cta_description:
                    pageData.cta_description || "",
                cta_button_1_text:
                    pageData.cta_button_1_text || "",
                cta_button_1_link:
                    pageData.cta_button_1_link || "",
                cta_button_2_text:
                    pageData.cta_button_2_text || "",
                cta_button_2_link:
                    pageData.cta_button_2_link || "",
            });
        } catch (err) {
            console.error(
                "Failed to load About data:",
                err
            );

            setError(
                err.response?.data?.detail ||
                "Failed to load About data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // =========================================================
    // PAGE FORM CHANGE
    // =========================================================

    const handlePageChange = (e) => {
        const {
            name,
            value,
            type,
            files,
        } = e.target;

        if (type === "file") {
            setPageForm((prev) => ({
                ...prev,
                [name]: files[0] || null,
            }));
        } else {
            setPageForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // =========================================================
    // SAVE PAGE
    // =========================================================

    const savePage = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            Object.entries(pageForm).forEach(
                ([key, value]) => {
                    if (value !== null && value !== "") {
                        formData.append(key, value);
                    }
                }
            );

            const response = await api.patch(
                "admin/about/",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            setPage(response.data);

            setSuccess(
                "About page updated successfully."
            );
        } catch (err) {
            console.error(
                "Failed to update About page:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update About page."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // VALUE FORM CHANGE
    // =========================================================

    const handleValueChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setValueForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    // =========================================================
    // RESET VALUE
    // =========================================================

    const resetValueForm = () => {
        setValueForm({
            icon: "🎓",
            title: "",
            description: "",
            order: values.length + 1,
            is_active: true,
        });

        setEditingValueId(null);
    };

    // =========================================================
    // SAVE VALUE
    // =========================================================

    const saveValue = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingValueId) {
                await api.patch(
                    `admin/about/values/${editingValueId}/`,
                    valueForm
                );

                setSuccess(
                    "Value updated successfully."
                );
            } else {
                await api.post(
                    "admin/about/values/",
                    valueForm
                );

                setSuccess(
                    "Value added successfully."
                );
            }

            resetValueForm();

            const response = await api.get(
                "admin/about/values/"
            );

            setValues(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Failed to save value."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // EDIT VALUE
    // =========================================================

    const editValue = (value) => {
        setEditingValueId(value.id);

        setValueForm({
            icon: value.icon || "🎓",
            title: value.title || "",
            description:
                value.description || "",
            order: value.order || 1,
            is_active: value.is_active,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================================
    // DELETE VALUE
    // =========================================================

    const deleteValue = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this value?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(
                `admin/about/values/${id}/`
            );

            setValues((prev) =>
                prev.filter(
                    (item) => item.id !== id
                )
            );

            setSuccess(
                "Value deleted successfully."
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete value."
            );
        }
    };

    // =========================================================
    // FACILITY FORM CHANGE
    // =========================================================

    const handleFacilityChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
            files,
        } = e.target;

        if (type === "checkbox") {
            setFacilityForm((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (type === "file") {
            setFacilityForm((prev) => ({
                ...prev,
                [name]: files[0] || null,
            }));
        } else {
            setFacilityForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // =========================================================
    // RESET FACILITY
    // =========================================================

    const resetFacilityForm = () => {
        setFacilityForm({
            title: "",
            description: "",
            image: null,
            order: facilities.length + 1,
            is_active: true,
        });

        setEditingFacilityId(null);
    };

    // =========================================================
    // SAVE FACILITY
    // =========================================================

    const saveFacility = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append(
                "title",
                facilityForm.title
            );

            formData.append(
                "description",
                facilityForm.description
            );

            formData.append(
                "order",
                facilityForm.order
            );

            formData.append(
                "is_active",
                facilityForm.is_active
            );

            if (facilityForm.image) {
                formData.append(
                    "image",
                    facilityForm.image
                );
            }

            if (editingFacilityId) {
                await api.patch(
                    `admin/about/facilities/${editingFacilityId}/`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

                setSuccess(
                    "Facility updated successfully."
                );
            } else {
                await api.post(
                    "admin/about/facilities/",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

                setSuccess(
                    "Facility added successfully."
                );
            }

            resetFacilityForm();

            const response = await api.get(
                "admin/about/facilities/"
            );

            setFacilities(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Failed to save facility."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // EDIT FACILITY
    // =========================================================

    const editFacility = (facility) => {
        setEditingFacilityId(facility.id);

        setFacilityForm({
            title: facility.title || "",
            description:
                facility.description || "",
            image: null,
            order: facility.order || 1,
            is_active: facility.is_active,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================================
    // DELETE FACILITY
    // =========================================================

    const deleteFacility = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this facility?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(
                `admin/about/facilities/${id}/`
            );

            setFacilities((prev) =>
                prev.filter(
                    (item) => item.id !== id
                )
            );

            setSuccess(
                "Facility deleted successfully."
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete facility."
            );
        }
    };

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="admin-about-page">
                <div className="admin-about-loading">
                    Loading About page...
                </div>
            </div>
        );
    }

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="admin-about-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="admin-about-header">

                <div>
                    <h1>
                        About Page Management
                    </h1>

                    <p>
                        Manage the public About page
                        content.
                    </p>
                </div>

            </div>


            {/* =================================================
                ALERTS
            ================================================= */}

            {error && (
                <div className="admin-about-alert error">
                    {typeof error === "string"
                        ? error
                        : JSON.stringify(error)}
                </div>
            )}

            {success && (
                <div className="admin-about-alert success">
                    {success}
                </div>
            )}


            {/* =================================================
                PAGE CONTENT
            ================================================= */}

            <section className="admin-about-section">

                <div className="admin-about-section-header">

                    <div>
                        <h2>
                            About Page Content
                        </h2>

                        <p>
                            Manage hero, introduction,
                            vision, mission and CTA.
                        </p>
                    </div>

                </div>


                <form onSubmit={savePage}>

                    {/* HERO */}

                    <div className="admin-about-subsection">

                        <h3>
                            Hero Section
                        </h3>

                        <div className="admin-about-form-grid">

                            <div className="form-group">
                                <label>
                                    Hero Label
                                </label>

                                <input
                                    type="text"
                                    name="hero_label"
                                    value={
                                        pageForm.hero_label
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Hero Title
                                </label>

                                <input
                                    type="text"
                                    name="hero_title"
                                    value={
                                        pageForm.hero_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group full">
                                <label>
                                    Hero Description
                                </label>

                                <textarea
                                    name="hero_description"
                                    value={
                                        pageForm.hero_description
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="4"
                                />
                            </div>

                        </div>

                    </div>


                    {/* INTRO */}

                    <div className="admin-about-subsection">

                        <h3>
                            About Introduction
                        </h3>

                        <div className="admin-about-form-grid">

                            <div className="form-group">
                                <label>
                                    Intro Label
                                </label>

                                <input
                                    type="text"
                                    name="intro_label"
                                    value={
                                        pageForm.intro_label
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Intro Title
                                </label>

                                <input
                                    type="text"
                                    name="intro_title"
                                    value={
                                        pageForm.intro_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group full">
                                <label>
                                    Description 1
                                </label>

                                <textarea
                                    name="intro_description_1"
                                    value={
                                        pageForm.intro_description_1
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="4"
                                />
                            </div>


                            <div className="form-group full">
                                <label>
                                    Description 2
                                </label>

                                <textarea
                                    name="intro_description_2"
                                    value={
                                        pageForm.intro_description_2
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="4"
                                />
                            </div>


                            <div className="form-group full">
                                <label>
                                    Description 3
                                </label>

                                <textarea
                                    name="intro_description_3"
                                    value={
                                        pageForm.intro_description_3
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="4"
                                />
                            </div>


                            <div className="form-group full">
                                <label>
                                    Intro Image
                                </label>

                                <input
                                    type="file"
                                    name="intro_image"
                                    accept="image/*"
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>

                        </div>

                    </div>


                    {/* VISION / MISSION */}

                    <div className="admin-about-subsection">

                        <h3>
                            Vision & Mission
                        </h3>

                        <div className="admin-about-form-grid">

                            <div className="form-group">
                                <label>
                                    Section Label
                                </label>

                                <input
                                    type="text"
                                    name="direction_label"
                                    value={
                                        pageForm.direction_label
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Section Title
                                </label>

                                <input
                                    type="text"
                                    name="direction_title"
                                    value={
                                        pageForm.direction_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Vision Title
                                </label>

                                <input
                                    type="text"
                                    name="vision_title"
                                    value={
                                        pageForm.vision_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Mission Title
                                </label>

                                <input
                                    type="text"
                                    name="mission_title"
                                    value={
                                        pageForm.mission_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Vision Description
                                </label>

                                <textarea
                                    name="vision_description"
                                    value={
                                        pageForm.vision_description
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="5"
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Mission Description
                                </label>

                                <textarea
                                    name="mission_description"
                                    value={
                                        pageForm.mission_description
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="5"
                                />
                            </div>

                        </div>

                    </div>


                    {/* VALUES SECTION CONTENT */}

                    <div className="admin-about-subsection">

                        <h3>
                            Values Section Content
                        </h3>

                        <div className="admin-about-form-grid">

                            <div className="form-group">
                                <label>
                                    Values Label
                                </label>

                                <input
                                    type="text"
                                    name="values_label"
                                    value={
                                        pageForm.values_label
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Values Title
                                </label>

                                <input
                                    type="text"
                                    name="values_title"
                                    value={
                                        pageForm.values_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>

                        </div>

                    </div>


                    {/* FACILITIES SECTION CONTENT */}

                    <div className="admin-about-subsection">

                        <h3>
                            Facilities Section Content
                        </h3>

                        <div className="admin-about-form-grid">

                            <div className="form-group">
                                <label>
                                    Facilities Label
                                </label>

                                <input
                                    type="text"
                                    name="facilities_label"
                                    value={
                                        pageForm.facilities_label
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Facilities Title
                                </label>

                                <input
                                    type="text"
                                    name="facilities_title"
                                    value={
                                        pageForm.facilities_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>

                        </div>

                    </div>


                    {/* CTA */}

                    <div className="admin-about-subsection">

                        <h3>
                            CTA Section
                        </h3>

                        <div className="admin-about-form-grid">

                            <div className="form-group">
                                <label>
                                    CTA Label
                                </label>

                                <input
                                    type="text"
                                    name="cta_label"
                                    value={
                                        pageForm.cta_label
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    CTA Title
                                </label>

                                <input
                                    type="text"
                                    name="cta_title"
                                    value={
                                        pageForm.cta_title
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group full">
                                <label>
                                    CTA Description
                                </label>

                                <textarea
                                    name="cta_description"
                                    value={
                                        pageForm.cta_description
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                    rows="4"
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Button 1 Text
                                </label>

                                <input
                                    type="text"
                                    name="cta_button_1_text"
                                    value={
                                        pageForm.cta_button_1_text
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Button 1 Link
                                </label>

                                <input
                                    type="text"
                                    name="cta_button_1_link"
                                    value={
                                        pageForm.cta_button_1_link
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Button 2 Text
                                </label>

                                <input
                                    type="text"
                                    name="cta_button_2_text"
                                    value={
                                        pageForm.cta_button_2_text
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Button 2 Link
                                </label>

                                <input
                                    type="text"
                                    name="cta_button_2_link"
                                    value={
                                        pageForm.cta_button_2_link
                                    }
                                    onChange={
                                        handlePageChange
                                    }
                                />
                            </div>

                        </div>

                    </div>


                    <div className="admin-about-actions">

                        <button
                            type="submit"
                            className="admin-about-primary-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save About Page"}
                        </button>

                    </div>

                </form>

            </section>


            {/* =================================================
                VALUES
            ================================================= */}

            <section className="admin-about-section">

                <div className="admin-about-section-header">

                    <div>
                        <h2>
                            Core Values
                        </h2>

                        <p>
                            Add and manage your college
                            core values.
                        </p>
                    </div>

                </div>


                <form onSubmit={saveValue}>

                    <div className="admin-about-form-grid">

                        <div className="form-group">
                            <label>
                                Icon
                            </label>

                            <input
                                type="text"
                                name="icon"
                                value={
                                    valueForm.icon
                                }
                                onChange={
                                    handleValueChange
                                }
                                placeholder="🎓"
                            />
                        </div>


                        <div className="form-group">
                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={
                                    valueForm.title
                                }
                                onChange={
                                    handleValueChange
                                }
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                min="0"
                                value={
                                    valueForm.order
                                }
                                onChange={
                                    handleValueChange
                                }
                            />
                        </div>


                        <div className="form-checkbox">

                            <input
                                type="checkbox"
                                id="about-value-active"
                                name="is_active"
                                checked={
                                    valueForm.is_active
                                }
                                onChange={
                                    handleValueChange
                                }
                            />

                            <label htmlFor="about-value-active">
                                Active
                            </label>

                        </div>


                        <div className="form-group full">
                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    valueForm.description
                                }
                                onChange={
                                    handleValueChange
                                }
                                rows="4"
                            />
                        </div>

                    </div>


                    <div className="admin-about-actions">

                        <button
                            type="submit"
                            className="admin-about-primary-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingValueId
                                    ? "Update Value"
                                    : "Add Value"}
                        </button>


                        {editingValueId && (
                            <button
                                type="button"
                                className="admin-about-secondary-btn"
                                onClick={
                                    resetValueForm
                                }
                            >
                                Cancel Edit
                            </button>
                        )}

                    </div>

                </form>


                {/* VALUE LIST */}

                <div className="admin-about-list">

                    {values
                        .slice()
                        .sort(
                            (a, b) =>
                                a.order - b.order
                        )
                        .map((value) => (

                            <div
                                className="admin-about-list-item"
                                key={value.id}
                            >

                                <div className="about-list-icon">
                                    {value.icon}
                                </div>

                                <div className="about-list-content">

                                    <strong>
                                        {value.title}
                                    </strong>

                                    <p>
                                        {value.description}
                                    </p>

                                    <span
                                        className={
                                            value.is_active
                                                ? "about-status active"
                                                : "about-status inactive"
                                        }
                                    >
                                        {value.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>

                                </div>

                                <div className="about-list-actions">

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() =>
                                            editValue(
                                                value
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteValue(
                                                value.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                </div>

            </section>


            {/* =================================================
                FACILITIES
            ================================================= */}

            <section className="admin-about-section">

                <div className="admin-about-section-header">

                    <div>
                        <h2>
                            Facilities
                        </h2>

                        <p>
                            Manage campus facilities.
                        </p>
                    </div>

                </div>


                <form onSubmit={saveFacility}>

                    <div className="admin-about-form-grid">

                        <div className="form-group">
                            <label>
                                Facility Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={
                                    facilityForm.title
                                }
                                onChange={
                                    handleFacilityChange
                                }
                                placeholder="Library"
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                min="0"
                                value={
                                    facilityForm.order
                                }
                                onChange={
                                    handleFacilityChange
                                }
                            />
                        </div>


                        <div className="form-group full">
                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    facilityForm.description
                                }
                                onChange={
                                    handleFacilityChange
                                }
                                rows="4"
                            />
                        </div>


                        <div className="form-group">
                            <label>
                                Facility Image
                            </label>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={
                                    handleFacilityChange
                                }
                            />
                        </div>


                        <div className="form-checkbox">

                            <input
                                type="checkbox"
                                id="about-facility-active"
                                name="is_active"
                                checked={
                                    facilityForm.is_active
                                }
                                onChange={
                                    handleFacilityChange
                                }
                            />

                            <label htmlFor="about-facility-active">
                                Active
                            </label>

                        </div>

                    </div>


                    <div className="admin-about-actions">

                        <button
                            type="submit"
                            className="admin-about-primary-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingFacilityId
                                    ? "Update Facility"
                                    : "Add Facility"}
                        </button>


                        {editingFacilityId && (
                            <button
                                type="button"
                                className="admin-about-secondary-btn"
                                onClick={
                                    resetFacilityForm
                                }
                            >
                                Cancel Edit
                            </button>
                        )}

                    </div>

                </form>


                {/* FACILITY LIST */}

                <div className="admin-about-facility-grid">

                    {facilities
                        .slice()
                        .sort(
                            (a, b) =>
                                a.order - b.order
                        )
                        .map((facility) => (

                            <div
                                className="admin-about-facility-card"
                                key={facility.id}
                            >

                                <div className="facility-preview">

                                    {facility.image ? (

                                        <img
                                            src={
                                                facility.image
                                            }
                                            alt={
                                                facility.title
                                            }
                                        />

                                    ) : (

                                        <span>
                                            No Image
                                        </span>

                                    )}

                                </div>


                                <div className="facility-preview-content">

                                    <h3>
                                        {facility.title}
                                    </h3>

                                    <p>
                                        {facility.description}
                                    </p>

                                    <span
                                        className={
                                            facility.is_active
                                                ? "about-status active"
                                                : "about-status inactive"
                                        }
                                    >
                                        {facility.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>

                                </div>


                                <div className="about-list-actions">

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() =>
                                            editFacility(
                                                facility
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteFacility(
                                                facility.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                </div>

            </section>

        </div>
    );
}

export default AdminFrontendAbout;