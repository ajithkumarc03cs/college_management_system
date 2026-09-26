import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminRoles() {
    const [roles, setRoles] = useState([]);

    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =========================================================
    // LOAD ROLES
    // =========================================================

    const loadRoles = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "admin/roles/?page_size=100"
            );

            setRoles(
                response.data.results ||
                response.data ||
                []
            );

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Unable to load roles."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRoles();
    }, []);

    // =========================================================
    // RESET FORM
    // =========================================================

    const resetForm = () => {
        setName("");
        setEditingId(null);
        setError("");
    };

    // =========================================================
    // ADD / UPDATE
    // =========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const roleName = name.trim();

        if (!roleName) {
            setError("Role name is required.");
            return;
        }

        try {
            setSaving(true);

            // =================================================
            // UPDATE
            // =================================================

            if (editingId) {
                await api.patch(
                    `admin/roles/${editingId}/`,
                    {
                        name: roleName,
                    }
                );

                setSuccess(
                    "Role updated successfully."
                );
            }

            // =================================================
            // CREATE
            // =================================================

            else {
                await api.post(
                    "admin/roles/",
                    {
                        name: roleName,
                    }
                );

                setSuccess(
                    "Role created successfully."
                );
            }

            resetForm();

            await loadRoles();

        } catch (err) {
            console.error(err);

            const apiError =
                err.response?.data;

            setError(
                apiError?.name?.[0] ||
                apiError?.detail ||
                "Unable to save role."
            );

        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (role) => {
        setEditingId(role.id);

        setName(role.name);

        setError("");
        setSuccess("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (role) => {
        const userCount =
            role.user_count ?? 0;

        if (userCount > 0) {
            setError(
                `Cannot delete "${role.name}". ` +
                `${userCount} user(s) are assigned to this role.`
            );

            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${role.name}" role?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(
                `admin/roles/${role.id}/`
            );

            setSuccess(
                "Role deleted successfully."
            );

            if (editingId === role.id) {
                resetForm();
            }

            await loadRoles();

        } catch (err) {
            console.error(err);

            const apiError =
                err.response?.data;

            setError(
                apiError?.detail ||
                "Unable to delete role."
            );
        }
    };

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="admin-roles-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="roles-header">

                <div className="roles-header-content">

                    <h1>
                        Roles
                    </h1>

                    <p>
                        Manage system roles in the college.
                    </p>

                </div>

            </div>


            {/* =================================================
                ALERTS
            ================================================= */}

            {error && (
                <div className="roles-alert roles-alert-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="roles-alert roles-alert-success">
                    {success}
                </div>
            )}


            {/* =================================================
                CREATE / EDIT ROLE
            ================================================= */}

            <section className="roles-create-card">

                <div className="roles-card-header">

                    <div>

                        <h2 className="roles-card-title">
                            {editingId
                                ? "Edit Role"
                                : "Add Role"}
                        </h2>

                        <p className="roles-card-description">
                            {editingId
                                ? "Update the selected role."
                                : "Create a new system role."}
                        </p>

                    </div>

                </div>


                <form
                    className="roles-form"
                    onSubmit={handleSubmit}
                >

                    <div className="roles-form-group">

                        <label htmlFor="role-name">
                            Role Name
                        </label>

                        <input
                            id="role-name"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter role name"
                            maxLength={100}
                        />

                    </div>


                    <div className="roles-form-actions">

                        <button
                            type="submit"
                            className="roles-submit-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Role"
                                    : "Add Role"}
                        </button>


                        {editingId && (
                            <button
                                type="button"
                                className="roles-cancel-btn"
                                onClick={resetForm}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </section>


            {/* =================================================
                ROLE LIST
            ================================================= */}

            <section className="roles-list-section">

                <div className="roles-list-header">

                    <div>

                        <h2>
                            Available Roles
                        </h2>

                        <p>
                            Manage all roles created in
                            the system.
                        </p>

                    </div>

                </div>


                <div className="roles-table-card">

                    {loading ? (

                        <div className="roles-loading">
                            Loading roles...
                        </div>

                    ) : roles.length === 0 ? (

                        <div className="roles-empty">
                            No roles found.
                        </div>

                    ) : (

                        <div className="roles-table-wrapper">

                            <table className="roles-table">

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Role Name
                                        </th>

                                        <th>
                                            Users
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {roles.map((role) => (

                                        <tr key={role.id}>

                                            <td className="roles-id">
                                                {role.id}
                                            </td>


                                            <td>

                                                <span className="roles-name">
                                                    {role.name}
                                                </span>

                                            </td>


                                            <td>

                                                <span className="roles-user-count">
                                                    {role.user_count ?? 0}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="roles-actions">

                                                    <button
                                                        type="button"
                                                        className="roles-edit-btn"
                                                        onClick={() =>
                                                            handleEdit(role)
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="roles-delete-btn"
                                                        onClick={() =>
                                                            handleDelete(role)
                                                        }
                                                        disabled={
                                                            (role.user_count ?? 0) > 0
                                                        }
                                                        title={
                                                            (role.user_count ?? 0) > 0
                                                                ? "Role is assigned to users"
                                                                : "Delete role"
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </section>

        </div>
    );
}

export default AdminRoles;