import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendDepartments.css";

function AdminFrontendDepartments() {
    const [page, setPage] = useState({
        hero_label: "",
        hero_title: "",
        hero_description: "",

        section_label: "",
        section_title: "",
        section_description: "",

        cta_title: "",
        cta_description: "",
        cta_button_text: "",
        cta_button_link: "",
    });

    const [departments, setDepartments] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [departmentForm, setDepartmentForm] = useState({
        name: "",
        icon: "",
        description: "",
        order: 0,
        is_active: true,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ============================================================
    // LOAD DATA
    // ============================================================

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "public/departments/"
            );

            setPage(response.data.page || {});
            setDepartments(
                response.data.departments || []
            );

        } catch (err) {
            console.error(err);

            setError(
                "Failed to load departments data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // ============================================================
    // PAGE FORM
    // ============================================================

    const handlePageChange = (e) => {
        const { name, value } = e.target;

        setPage((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const savePage = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");
            setError("");

            await api.patch(
                "admin/departments/page/",
                page
            );

            setMessage(
                "Departments page updated successfully."
            );

        } catch (err) {
            console.error(err);

            setError(
                "Failed to update departments page."
            );
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // DEPARTMENT FORM
    // ============================================================

    const handleDepartmentChange = (e) => {
        const { name, value, type, checked } = e.target;

        setDepartmentForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const resetDepartmentForm = () => {
        setEditingId(null);

        setDepartmentForm({
            name: "",
            icon: "",
            description: "",
            order: 0,
            is_active: true,
        });
    };

    // ============================================================
    // ADD / UPDATE DEPARTMENT
    // ============================================================

    const saveDepartment = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");
            setError("");

            if (editingId) {

                await api.patch(
                    `admin/departments/${editingId}/`,
                    departmentForm
                );

                setMessage(
                    "Department updated successfully."
                );

            } else {

                await api.post(
                    "admin/departments/",
                    departmentForm
                );

                setMessage(
                    "Department added successfully."
                );
            }

            resetDepartmentForm();

            await loadData();

        } catch (err) {
            console.error(err);

            setError(
                "Failed to save department."
            );
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // EDIT
    // ============================================================

    const editDepartment = (department) => {
        setEditingId(department.id);

        setDepartmentForm({
            name: department.name || "",
            icon: department.icon || "",
            description:
                department.description || "",
            order: department.order || 0,
            is_active:
                department.is_active ?? true,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ============================================================
    // DELETE
    // ============================================================

    const deleteDepartment = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setSaving(true);
            setMessage("");
            setError("");

            await api.delete(
                `admin/departments/${id}/`
            );

            setMessage(
                "Department deleted successfully."
            );

            await loadData();

        } catch (err) {

            console.error(err);

            setError(
                "Failed to delete department."
            );

        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="admin-departments">

                <div className="admin-departments-header">
                    <h2>Departments</h2>
                    <p>
                        Loading departments...
                    </p>
                </div>

            </div>
        );
    }

    // ============================================================
    // UI
    // ============================================================

    return (
        <div className="admin-departments">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="admin-departments-header">

                <div>
                    <h2>
                        Departments
                    </h2>

                    <p>
                        Manage your public departments
                        page content.
                    </p>
                </div>

            </div>


            {/* ==================================================
                MESSAGE
            ================================================== */}

            {message && (
                <div className="admin-success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="admin-error-message">
                    {error}
                </div>
            )}


            {/* ==================================================
                PAGE CONTENT
            ================================================== */}

            <form
                className="admin-departments-card"
                onSubmit={savePage}
            >

                <div className="admin-section-title">
                    <h3>
                        Hero Section
                    </h3>
                </div>


                <div className="admin-form-grid">

                    <div className="admin-form-group">

                        <label>
                            Hero Label
                        </label>

                        <input
                            type="text"
                            name="hero_label"
                            value={
                                page.hero_label || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Hero Title
                        </label>

                        <input
                            type="text"
                            name="hero_title"
                            value={
                                page.hero_title || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                </div>


                <div className="admin-form-group">

                    <label>
                        Hero Description
                    </label>

                    <textarea
                        name="hero_description"
                        value={
                            page.hero_description || ""
                        }
                        onChange={
                            handlePageChange
                        }
                        rows="4"
                    />

                </div>


                <div className="admin-section-title">
                    <h3>
                        Departments Section
                    </h3>
                </div>


                <div className="admin-form-grid">

                    <div className="admin-form-group">

                        <label>
                            Section Label
                        </label>

                        <input
                            type="text"
                            name="section_label"
                            value={
                                page.section_label || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Section Title
                        </label>

                        <input
                            type="text"
                            name="section_title"
                            value={
                                page.section_title || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                </div>


                <div className="admin-form-group">

                    <label>
                        Section Description
                    </label>

                    <textarea
                        name="section_description"
                        value={
                            page.section_description || ""
                        }
                        onChange={
                            handlePageChange
                        }
                        rows="4"
                    />

                </div>


                <div className="admin-section-title">
                    <h3>
                        Call To Action
                    </h3>
                </div>


                <div className="admin-form-group">

                    <label>
                        CTA Title
                    </label>

                    <input
                        type="text"
                        name="cta_title"
                        value={
                            page.cta_title || ""
                        }
                        onChange={
                            handlePageChange
                        }
                    />

                </div>


                <div className="admin-form-group">

                    <label>
                        CTA Description
                    </label>

                    <textarea
                        name="cta_description"
                        value={
                            page.cta_description || ""
                        }
                        onChange={
                            handlePageChange
                        }
                        rows="4"
                    />

                </div>


                <div className="admin-form-grid">

                    <div className="admin-form-group">

                        <label>
                            Button Text
                        </label>

                        <input
                            type="text"
                            name="cta_button_text"
                            value={
                                page.cta_button_text || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Button Link
                        </label>

                        <input
                            type="text"
                            name="cta_button_link"
                            value={
                                page.cta_button_link || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                </div>


                <div className="admin-form-actions">

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save Page Content"}
                    </button>

                </div>

            </form>


            {/* ==================================================
                DEPARTMENT MANAGEMENT
            ================================================== */}

            <div className="admin-departments-card">

                <div className="admin-section-title">

                    <div>
                        <h3>
                            Manage Departments
                        </h3>

                        <p>
                            Add, edit and remove
                            departments.
                        </p>
                    </div>

                </div>


                {/* DEPARTMENT FORM */}

                <form
                    onSubmit={saveDepartment}
                    className="department-management-form"
                >

                    <div className="admin-form-grid">

                        <div className="admin-form-group">

                            <label>
                                Department Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    departmentForm.name
                                }
                                onChange={
                                    handleDepartmentChange
                                }
                                required
                            />

                        </div>


                        <div className="admin-form-group">

                            <label>
                                Icon
                            </label>

                            <input
                                type="text"
                                name="icon"
                                value={
                                    departmentForm.icon
                                }
                                onChange={
                                    handleDepartmentChange
                                }
                                placeholder="💻"
                            />

                        </div>

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                departmentForm.description
                            }
                            onChange={
                                handleDepartmentChange
                            }
                            rows="4"
                        />

                    </div>


                    <div className="admin-form-grid">

                        <div className="admin-form-group">

                            <label>
                                Display Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={
                                    departmentForm.order
                                }
                                onChange={
                                    handleDepartmentChange
                                }
                                min="0"
                            />

                        </div>


                        <div className="admin-form-checkbox">

                            <label>

                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={
                                        departmentForm.is_active
                                    }
                                    onChange={
                                        handleDepartmentChange
                                    }
                                />

                                Active

                            </label>

                        </div>

                    </div>


                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Department"
                                    : "Add Department"}
                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={
                                    resetDepartmentForm
                                }
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>


                {/* DEPARTMENT LIST */}

                <div className="department-admin-list">

                    {departments.length === 0 ? (

                        <p>
                            No departments found.
                        </p>

                    ) : (

                        departments.map(
                            (department) => (

                                <div
                                    className="department-admin-item"
                                    key={department.id}
                                >

                                    <div className="department-admin-icon">

                                        {department.icon}

                                    </div>


                                    <div className="department-admin-info">

                                        <h4>
                                            {department.name}
                                        </h4>

                                        <p>
                                            {
                                                department.description
                                            }
                                        </p>

                                        <small>

                                            Order:{" "}
                                            {department.order}

                                            {" • "}

                                            {
                                                department.is_active
                                                    ? "Active"
                                                    : "Inactive"
                                            }

                                        </small>

                                    </div>


                                    <div className="department-admin-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                editDepartment(
                                                    department
                                                )
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() =>
                                                deleteDepartment(
                                                    department.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            </div>

        </div>
    );
}

export default AdminFrontendDepartments;