import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminApplications.css";

function AdminApplications() {

    // =========================================================
    // STATE
    // =========================================================

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [statusChanges, setStatusChanges] = useState({});

    const [updatingId, setUpdatingId] = useState(null);


    // =========================================================
    // LOAD APPLICATIONS
    // =========================================================

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");
            setSuccessMessage("");

            const response = await api.get(
                "admin/course-applications/"
            );

            setApplications(
                response.data
            );

        } catch (err) {

            console.error(
                "Failed to load applications:",
                err
            );

            setError(
                err.response?.data?.detail ||
                "Failed to load applications."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadApplications();

    }, []);


    // =========================================================
    // DATE FORMAT
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };


    // =========================================================
    // STATUS CHANGE
    // =========================================================

    const handleStatusChange = (
        applicationId,
        newStatus
    ) => {

        setStatusChanges((previous) => ({
            ...previous,
            [applicationId]: newStatus,
        }));

        setSuccessMessage("");
        setError("");

    };


    // =========================================================
    // UPDATE STATUS
    // =========================================================

    const handleStatusUpdate = async (
        applicationId,
        currentStatus
    ) => {

        const newStatus =
            statusChanges[applicationId] ??
            currentStatus;


        // -----------------------------------------------------
        // NO CHANGE
        // -----------------------------------------------------

        if (newStatus === currentStatus) {

            setSuccessMessage(
                "No status changes to update."
            );

            return;
        }


        try {

            setUpdatingId(applicationId);

            setError("");
            setSuccessMessage("");


            // -------------------------------------------------
            // PATCH API
            // -------------------------------------------------

            const response = await api.patch(
                `admin/course-applications/${applicationId}/status/`,
                {
                    status: newStatus,
                }
            );


            const updatedStatus =
                response.data?.status ||
                newStatus;


            // -------------------------------------------------
            // UPDATE UI
            // -------------------------------------------------

            setApplications((previous) =>
                previous.map(
                    (application) =>
                        application.id ===
                        applicationId
                            ? {
                                ...application,
                                status: updatedStatus,
                            }
                            : application
                )
            );


            // -------------------------------------------------
            // REMOVE TEMP STATUS
            // -------------------------------------------------

            setStatusChanges((previous) => {

                const updated = {
                    ...previous,
                };

                delete updated[applicationId];

                return updated;

            });


            setSuccessMessage(
                "Application status updated successfully."
            );


        } catch (err) {

            console.error(
                "Failed to update application status:",
                err
            );


            const apiError =
                err.response?.data?.status;


            if (Array.isArray(apiError)) {

                setError(
                    apiError[0]
                );

            } else if (
                typeof apiError === "string"
            ) {

                setError(
                    apiError
                );

            } else {

                setError(
                    err.response?.data?.detail ||
                    "Failed to update application status."
                );

            }

        } finally {

            setUpdatingId(null);

        }

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="admin-page">

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Course Applications
                        </h1>

                        <p>
                            View and manage applications
                            submitted by prospective students.
                        </p>

                    </div>

                </div>


                <div className="admin-settings-card">

                    <div className="applications-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading applications...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="admin-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Course Applications
                    </h1>

                    <p>
                        View and manage applications
                        submitted by prospective students.
                    </p>

                </div>


                <button
                    type="button"
                    className="applications-refresh-button"
                    onClick={loadApplications}
                    disabled={loading}
                >
                    Refresh
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="applications-message applications-error">

                    <span className="message-icon">
                        !
                    </span>

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {successMessage && (

                <div className="applications-message applications-success">

                    <span className="message-icon">
                        ✓
                    </span>

                    <span>
                        {successMessage}
                    </span>

                </div>

            )}


            {/* =================================================
                APPLICATION CARD
            ================================================= */}

            <div className="admin-settings-card">


                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <div className="settings-card-header">

                    <div>

                        <h2>
                            Applications
                        </h2>

                        <p>
                            Manage submitted course applications
                        </p>

                    </div>


                    <div className="applications-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            {applications.length}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {applications.length === 0 ? (

                    <div className="applications-empty">

                        <div className="empty-icon">
                            📄
                        </div>

                        <h3>
                            No applications found
                        </h3>

                        <p>
                            There are currently no course
                            applications submitted.
                        </p>

                    </div>

                ) : (


                    /* =================================================
                       TABLE
                    ================================================= */

                    <div className="settings-menu-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Applicant
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Address
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Submitted
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {applications.map(
                                    (application, index) => {

                                        const selectedStatus =
                                            statusChanges[
                                                application.id
                                            ] ??
                                            application.status;


                                        const hasChanges =
                                            selectedStatus !==
                                            application.status;


                                        return (

                                            <tr
                                                key={
                                                    application.id
                                                }
                                            >


                                                {/* =================
                                                    NUMBER
                                                ================= */}

                                                <td>

                                                    <span className="application-number">

                                                        {index + 1}

                                                    </span>

                                                </td>


                                                {/* =================
                                                    APPLICANT
                                                ================= */}

                                                <td>

                                                    <div className="applicant-info">

                                                        <strong>

                                                            {
                                                                application.applicant_name
                                                            }

                                                        </strong>

                                                    </div>

                                                </td>


                                                {/* =================
                                                    EMAIL
                                                ================= */}

                                                <td>

                                                    <span className="application-email">

                                                        {
                                                            application.email
                                                        }

                                                    </span>

                                                </td>


                                                {/* =================
                                                    COURSE
                                                ================= */}

                                                <td>

                                                    <span className="application-course">

                                                        {
                                                            application.course_name ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>


                                                {/* =================
                                                    ADDRESS
                                                ================= */}

                                                <td>

                                                    <span className="application-address">

                                                        {
                                                            application.address ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>


                                                {/* =================
                                                    STATUS
                                                ================= */}

                                                <td>

                                                    <div className="application-status-control">


                                                        <select
                                                            value={
                                                                selectedStatus
                                                            }
                                                            onChange={(event) =>
                                                                handleStatusChange(
                                                                    application.id,
                                                                    event.target.value
                                                                )
                                                            }
                                                            disabled={
                                                                updatingId ===
                                                                application.id
                                                            }
                                                            className={
                                                                `status-select ${
                                                                    selectedStatus
                                                                        ?.toLowerCase()
                                                                }`
                                                            }
                                                        >

                                                            <option value="Pending">
                                                                Pending
                                                            </option>

                                                            <option value="Contacted">
                                                                Contacted
                                                            </option>

                                                            <option value="Rejected">
                                                                Rejected
                                                            </option>

                                                        </select>


                                                        <button
                                                            type="button"
                                                            className="status-update-button"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    application.id,
                                                                    application.status
                                                                )
                                                            }
                                                            disabled={
                                                                updatingId ===
                                                                    application.id ||
                                                                !hasChanges
                                                            }
                                                        >

                                                            {updatingId ===
                                                            application.id
                                                                ? "Updating..."
                                                                : "Update"}

                                                        </button>

                                                    </div>

                                                </td>


                                                {/* =================
                                                    SUBMITTED
                                                ================= */}

                                                <td>

                                                    <span className="application-date">

                                                        {
                                                            formatDate(
                                                                application.created_at
                                                            )
                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}

export default AdminApplications;