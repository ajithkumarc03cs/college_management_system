import { useEffect, useState } from "react";

import api from "../../../api/axios";
import "./AdminFrontendAdmissions.css";


function AdminFrontendAdmissions() {

    // =========================================================
    // PAGE DATA
    // =========================================================

    const [page, setPage] = useState(null);

    const [steps, setSteps] = useState([]);

    const [documents, setDocuments] = useState([]);


    // =========================================================
    // LOADING / MESSAGE
    // =========================================================

    const [loading, setLoading] = useState(true);

    const [savingPage, setSavingPage] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =========================================================
    // STEP FORM
    // =========================================================

    const [stepForm, setStepForm] = useState({
        number: "",
        title: "",
        description: "",
        order: 0,
        is_active: true,
    });

    const [editingStepId, setEditingStepId] = useState(null);


    // =========================================================
    // DOCUMENT FORM
    // =========================================================

    const [documentForm, setDocumentForm] = useState({
        name: "",
        order: 0,
        is_active: true,
    });

    const [editingDocumentId, setEditingDocumentId] = useState(null);


    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {

        loadAdmissions();

    }, []);


    const loadAdmissions = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "public/admissions/"
            );

            setPage(response.data.page);

            setSteps(
                response.data.steps || []
            );

            setDocuments(
                response.data.documents || []
            );

        } catch (err) {

            console.error(
                "Failed to load admissions:",
                err
            );

            setError(
                "Unable to load admissions data."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // PAGE FIELD CHANGE
    // =========================================================

    const handlePageChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setPage((current) => ({
            ...current,
            [name]: value,
        }));

    };


    // =========================================================
    // SAVE PAGE
    // =========================================================

    const savePage = async (event) => {

        event.preventDefault();

        try {

            setSavingPage(true);

            setError("");
            setSuccess("");

            const response = await api.patch(
                "admin/admissions/page/",
                page
            );

            setPage(response.data);

            setSuccess(
                "Admissions page updated successfully."
            );

        } catch (err) {

            console.error(
                "Failed to update admissions page:",
                err
            );

            setError(
                "Unable to update admissions page."
            );

        } finally {

            setSavingPage(false);

        }

    };


    // =========================================================
    // STEP FORM CHANGE
    // =========================================================

    const handleStepChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setStepForm((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };


    // =========================================================
    // RESET STEP FORM
    // =========================================================

    const resetStepForm = () => {

        setStepForm({
            number: "",
            title: "",
            description: "",
            order: 0,
            is_active: true,
        });

        setEditingStepId(null);

    };


    // =========================================================
    // ADD / UPDATE STEP
    // =========================================================

    const saveStep = async (event) => {

        event.preventDefault();

        try {

            setError("");
            setSuccess("");

            let response;


            if (editingStepId) {

                response = await api.patch(
                    `admin/admissions/steps/${editingStepId}/`,
                    stepForm
                );

            } else {

                response = await api.post(
                    "admin/admissions/steps/",
                    stepForm
                );

            }


            if (editingStepId) {

                setSteps((current) =>
                    current.map((step) =>
                        step.id === editingStepId
                            ? response.data
                            : step
                    )
                );

                setSuccess(
                    "Admission step updated successfully."
                );

            } else {

                setSteps((current) => [
                    ...current,
                    response.data,
                ]);

                setSuccess(
                    "Admission step added successfully."
                );

            }


            resetStepForm();

        } catch (err) {

            console.error(
                "Failed to save admission step:",
                err
            );

            setError(
                "Unable to save admission step."
            );

        }

    };


    // =========================================================
    // EDIT STEP
    // =========================================================

    const editStep = (step) => {

        setEditingStepId(step.id);

        setStepForm({
            number: step.number || "",
            title: step.title || "",
            description: step.description || "",
            order: step.order || 0,
            is_active: step.is_active,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // =========================================================
    // DELETE STEP
    // =========================================================

    const deleteStep = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this admission step?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await api.delete(
                `admin/admissions/steps/${id}/`
            );

            setSteps((current) =>
                current.filter(
                    (step) => step.id !== id
                )
            );

            setSuccess(
                "Admission step deleted successfully."
            );

        } catch (err) {

            console.error(
                "Failed to delete admission step:",
                err
            );

            setError(
                "Unable to delete admission step."
            );

        }

    };


    // =========================================================
    // DOCUMENT FORM CHANGE
    // =========================================================

    const handleDocumentChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setDocumentForm((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };


    // =========================================================
    // RESET DOCUMENT FORM
    // =========================================================

    const resetDocumentForm = () => {

        setDocumentForm({
            name: "",
            order: 0,
            is_active: true,
        });

        setEditingDocumentId(null);

    };


    // =========================================================
    // ADD / UPDATE DOCUMENT
    // =========================================================

    const saveDocument = async (event) => {

        event.preventDefault();

        try {

            setError("");
            setSuccess("");

            let response;


            if (editingDocumentId) {

                response = await api.patch(
                    `admin/admissions/documents/${editingDocumentId}/`,
                    documentForm
                );

            } else {

                response = await api.post(
                    "admin/admissions/documents/",
                    documentForm
                );

            }


            if (editingDocumentId) {

                setDocuments((current) =>
                    current.map((document) =>
                        document.id === editingDocumentId
                            ? response.data
                            : document
                    )
                );

                setSuccess(
                    "Document updated successfully."
                );

            } else {

                setDocuments((current) => [
                    ...current,
                    response.data,
                ]);

                setSuccess(
                    "Document added successfully."
                );

            }


            resetDocumentForm();

        } catch (err) {

            console.error(
                "Failed to save document:",
                err
            );

            setError(
                "Unable to save document."
            );

        }

    };


    // =========================================================
    // EDIT DOCUMENT
    // =========================================================

    const editDocument = (document) => {

        setEditingDocumentId(document.id);

        setDocumentForm({
            name: document.name || "",
            order: document.order || 0,
            is_active: document.is_active,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // =========================================================
    // DELETE DOCUMENT
    // =========================================================

    const deleteDocument = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await api.delete(
                `admin/admissions/documents/${id}/`
            );

            setDocuments((current) =>
                current.filter(
                    (document) =>
                        document.id !== id
                )
            );

            setSuccess(
                "Document deleted successfully."
            );

        } catch (err) {

            console.error(
                "Failed to delete document:",
                err
            );

            setError(
                "Unable to delete document."
            );

        }

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="admin-frontend-page">

                <h2>
                    Admissions
                </h2>

                <p>
                    Loading admissions data...
                </p>

            </div>
        );

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="admin-frontend-page">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="admin-frontend-header">

                <div>

                    <h2>
                        Admissions
                    </h2>

                    <p>
                        Manage admissions page content,
                        process steps and required documents.
                    </p>

                </div>

            </div>


            {/* =====================================================
                MESSAGES
            ===================================================== */}

            {error && (

                <div className="admin-message error">

                    {error}

                </div>

            )}


            {success && (

                <div className="admin-message success">

                    {success}

                </div>

            )}


            {/* =====================================================
                PAGE CONTENT
            ===================================================== */}

            {page && (

                <form
                    className="admin-frontend-card"
                    onSubmit={savePage}
                >

                    <div className="admin-card-header">

                        <h3>
                            Page Content
                        </h3>

                        <p>
                            Manage hero, requirements
                            and CTA content.
                        </p>

                    </div>


                    {/* HERO */}

                    <div className="admin-section">

                        <h4>
                            Hero Section
                        </h4>


                        <div className="admin-form-grid">

                            <div className="admin-form-group">

                                <label>
                                    Hero Label
                                </label>

                                <input
                                    type="text"
                                    name="hero_label"
                                    value={page.hero_label || ""}
                                    onChange={handlePageChange}
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Hero Title
                                </label>

                                <input
                                    type="text"
                                    name="hero_title"
                                    value={page.hero_title || ""}
                                    onChange={handlePageChange}
                                />

                            </div>

                        </div>


                        <div className="admin-form-group">

                            <label>
                                Hero Description
                            </label>

                            <textarea
                                name="hero_description"
                                rows="4"
                                value={
                                    page.hero_description || ""
                                }
                                onChange={handlePageChange}
                            />

                        </div>

                    </div>


                    {/* PROCESS */}

                    <div className="admin-section">

                        <h4>
                            Admission Process Section
                        </h4>


                        <div className="admin-form-grid">

                            <div className="admin-form-group">

                                <label>
                                    Process Label
                                </label>

                                <input
                                    type="text"
                                    name="process_label"
                                    value={
                                        page.process_label || ""
                                    }
                                    onChange={handlePageChange}
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Process Title
                                </label>

                                <input
                                    type="text"
                                    name="process_title"
                                    value={
                                        page.process_title || ""
                                    }
                                    onChange={handlePageChange}
                                />

                            </div>

                        </div>

                    </div>


                    {/* REQUIREMENTS */}

                    <div className="admin-section">

                        <h4>
                            Requirements Section
                        </h4>


                        <div className="admin-form-grid">

                            <div className="admin-form-group">

                                <label>
                                    Requirements Label
                                </label>

                                <input
                                    type="text"
                                    name="requirements_label"
                                    value={
                                        page.requirements_label || ""
                                    }
                                    onChange={handlePageChange}
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Requirements Title
                                </label>

                                <input
                                    type="text"
                                    name="requirements_title"
                                    value={
                                        page.requirements_title || ""
                                    }
                                    onChange={handlePageChange}
                                />

                            </div>

                        </div>


                        <div className="admin-form-group">

                            <label>
                                Requirements Description
                            </label>

                            <textarea
                                name="requirements_description"
                                rows="4"
                                value={
                                    page.requirements_description || ""
                                }
                                onChange={handlePageChange}
                            />

                        </div>

                    </div>


                    {/* CTA */}

                    <div className="admin-section">

                        <h4>
                            CTA Section
                        </h4>


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
                                onChange={handlePageChange}
                            />

                        </div>


                        <div className="admin-form-group">

                            <label>
                                CTA Description
                            </label>

                            <textarea
                                name="cta_description"
                                rows="3"
                                value={
                                    page.cta_description || ""
                                }
                                onChange={handlePageChange}
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
                                    onChange={handlePageChange}
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
                                    onChange={handlePageChange}
                                />

                            </div>

                        </div>

                    </div>


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

                </form>

            )}


            {/* =====================================================
                ADMISSION STEPS
            ===================================================== */}

            <div className="admin-frontend-card">

                <div className="admin-card-header">

                    <h3>
                        Admission Process Steps
                    </h3>

                    <p>
                        Add, edit and remove admission process steps.
                    </p>

                </div>


                <form
                    onSubmit={saveStep}
                    className="admin-section"
                >

                    <h4>
                        {editingStepId
                            ? "Edit Step"
                            : "Add New Step"
                        }
                    </h4>


                    <div className="admin-form-grid">

                        <div className="admin-form-group">

                            <label>
                                Number
                            </label>

                            <input
                                type="text"
                                name="number"
                                value={stepForm.number}
                                onChange={handleStepChange}
                                placeholder="01"
                                required
                            />

                        </div>


                        <div className="admin-form-group">

                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={stepForm.title}
                                onChange={handleStepChange}
                                placeholder="Choose Your Course"
                                required
                            />

                        </div>

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="3"
                            value={stepForm.description}
                            onChange={handleStepChange}
                            placeholder="Step description"
                        />

                    </div>


                    <div className="admin-form-grid">

                        <div className="admin-form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={stepForm.order}
                                onChange={handleStepChange}
                            />

                        </div>


                        <div className="admin-form-checkbox">

                            <label>

                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={stepForm.is_active}
                                    onChange={handleStepChange}
                                />

                                Active

                            </label>

                        </div>

                    </div>


                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-button"
                        >
                            {editingStepId
                                ? "Update Step"
                                : "Add Step"
                            }
                        </button>


                        {editingStepId && (

                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={resetStepForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>


                {/* STEP LIST */}

                <div className="admin-list">

                    {steps.length === 0 ? (

                        <p>
                            No admission steps available.
                        </p>

                    ) : (

                        steps.map((step) => (

                            <div
                                className="admin-list-item"
                                key={step.id}
                            >

                                <div>

                                    <strong>
                                        {step.number} - {step.title}
                                    </strong>

                                    <p>
                                        {step.description}
                                    </p>

                                    <small>
                                        Order: {step.order} |
                                        {" "}
                                        {step.is_active
                                            ? "Active"
                                            : "Inactive"
                                        }
                                    </small>

                                </div>


                                <div className="admin-list-actions">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            editStep(step)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteStep(step.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>


            {/* =====================================================
                DOCUMENTS
            ===================================================== */}

            <div className="admin-frontend-card">

                <div className="admin-card-header">

                    <h3>
                        Required Documents
                    </h3>

                    <p>
                        Manage documents required for admission.
                    </p>

                </div>


                <form
                    onSubmit={saveDocument}
                    className="admin-section"
                >

                    <h4>
                        {editingDocumentId
                            ? "Edit Document"
                            : "Add New Document"
                        }
                    </h4>


                    <div className="admin-form-grid">

                        <div className="admin-form-group">

                            <label>
                                Document Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={documentForm.name}
                                onChange={handleDocumentChange}
                                placeholder="Academic certificates"
                                required
                            />

                        </div>


                        <div className="admin-form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={documentForm.order}
                                onChange={handleDocumentChange}
                            />

                        </div>

                    </div>


                    <div className="admin-form-checkbox">

                        <label>

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={
                                    documentForm.is_active
                                }
                                onChange={
                                    handleDocumentChange
                                }
                            />

                            Active

                        </label>

                    </div>


                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-button"
                        >
                            {editingDocumentId
                                ? "Update Document"
                                : "Add Document"
                            }
                        </button>


                        {editingDocumentId && (

                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={resetDocumentForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>


                {/* DOCUMENT LIST */}

                <div className="admin-list">

                    {documents.length === 0 ? (

                        <p>
                            No documents available.
                        </p>

                    ) : (

                        documents.map((document) => (

                            <div
                                className="admin-list-item"
                                key={document.id}
                            >

                                <div>

                                    <strong>
                                        {document.name}
                                    </strong>

                                    <small>
                                        Order: {document.order} |
                                        {" "}
                                        {document.is_active
                                            ? "Active"
                                            : "Inactive"
                                        }
                                    </small>

                                </div>


                                <div className="admin-list-actions">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            editDocument(document)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteDocument(
                                                document.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>


        </div>

    );

}


export default AdminFrontendAdmissions;