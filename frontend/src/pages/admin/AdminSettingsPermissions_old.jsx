import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminSettingsPermissions() {

    const [roles, setRoles] = useState([]);
    const [menus, setMenus] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("");

    const [permission, setPermission] = useState({
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
    });

    const [loadingRoles, setLoadingRoles] = useState(false);
    const [loadingMenus, setLoadingMenus] = useState(false);
    const [loadingPermission, setLoadingPermission] = useState(false);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ============================================================
    // LOAD ROLES
    // ============================================================

    const loadRoles = async () => {

        try {

            setLoadingRoles(true);
            setError("");

            const response = await api.get("/admin/roles/");

            setRoles(response.data);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to load roles."
            );

        } finally {

            setLoadingRoles(false);

        }
    };


    // ============================================================
    // LOAD SIDEBAR MENUS
    // ============================================================

    const loadMenus = async () => {

        try {

            setLoadingMenus(true);

            const response = await api.get(
                "/admin/sidebar-menus/"
            );

            setMenus(
                response.data.filter(
                    (menu) => menu.is_active
                )
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to load sidebar menus."
            );

        } finally {

            setLoadingMenus(false);

        }
    };


    // ============================================================
    // INITIAL LOAD
    // ============================================================

    useEffect(() => {

        loadRoles();
        loadMenus();

    }, []);


    // ============================================================
    // LOAD PERMISSION
    // ============================================================

    const loadPermission = async (
        roleId,
        menu
    ) => {

        if (!roleId || !menu) {

            setPermission({
                can_view: false,
                can_create: false,
                can_edit: false,
                can_delete: false,
            });

            return;
        }


        try {

            setLoadingPermission(true);

            setError("");
            setMessage("");


            /*
             * Permission API currently works using
             * permission_id / permission code.
             *
             * So we find the matching permission
             * using the menu path/name.
             */


            const response = await api.get(
                `/admin/permissions/?role_id=${roleId}`
            );


            const permissionList =
                response.data.permissions || [];


            const matchedPermission =
                permissionList.find(
                    (item) =>
                        item.permission_code ===
                        menu.path.replace(
                            /^\/(admin|staff|hod|principal|student)\//,
                            ""
                        ).split("/")[0]
                );


            if (matchedPermission) {

                setPermission({
                    can_view:
                        matchedPermission.can_view,

                    can_create:
                        matchedPermission.can_create,

                    can_edit:
                        matchedPermission.can_edit,

                    can_delete:
                        matchedPermission.can_delete,
                });

            } else {

                setPermission({
                    can_view: false,
                    can_create: false,
                    can_edit: false,
                    can_delete: false,
                });

            }

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to load permission."
            );

        } finally {

            setLoadingPermission(false);

        }
    };


    // ============================================================
    // MENU CHANGE
    // ============================================================

    useEffect(() => {

        if (selectedRole && selectedMenu) {

            const menu = menus.find(
                (item) =>
                    String(item.id) ===
                    String(selectedMenu)
            );

            loadPermission(
                selectedRole,
                menu
            );
        }

    }, [
        selectedRole,
        selectedMenu
    ]);


    // ============================================================
    // CHECKBOX CHANGE
    // ============================================================

    const handlePermissionChange = (field) => {

        setPermission((current) => ({
            ...current,
            [field]: !current[field],
        }));

    };


    // ============================================================
    // SAVE
    // ============================================================

    const handleSave = async () => {

        if (!selectedRole) {

            setError("Please select a role.");

            return;
        }


        if (!selectedMenu) {

            setError("Please select a sidebar menu.");

            return;
        }


        const menu = menus.find(
            (item) =>
                String(item.id) ===
                String(selectedMenu)
        );


        if (!menu) {

            setError("Selected menu not found.");

            return;
        }


        try {

            setSaving(true);

            setError("");
            setMessage("");


            const response =
                await api.get(
                    `/admin/permissions/?role_id=${selectedRole}`
                );


            const permissionList =
                response.data.permissions || [];


            /*
             * Match menu with permission.
             */

            const matchedPermission =
                permissionList.find(
                    (item) =>
                        item.permission_name
                            ?.toLowerCase()
                        === menu.name.toLowerCase()
                );


            if (!matchedPermission) {

                setError(
                    `No permission is configured for "${menu.name}".`
                );

                return;
            }


            const payload = {

                role_id:
                    Number(selectedRole),

                permissions: [

                    {

                        permission_id:
                            matchedPermission.permission_id,

                        can_view:
                            permission.can_view,

                        can_create:
                            permission.can_create,

                        can_edit:
                            permission.can_edit,

                        can_delete:
                            permission.can_delete,

                    }

                ]

            };


            await api.put(
                "/admin/permissions/",
                payload
            );


            setMessage(
                `${menu.name} permissions updated successfully.`
            );


        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to save permissions."
            );

        } finally {

            setSaving(false);

        }

    };


    return (

        <div className="settings-permissions">


            {/* ==================================================
                ROLE
            ================================================== */}

            <div className="permission-selector-grid">


                <div className="permission-selector">

                    <label>
                        Select Role
                    </label>

                    <select
                        value={selectedRole}
                        onChange={(e) => {

                            setSelectedRole(
                                e.target.value
                            );

                            setSelectedMenu("");
                        }}
                    >

                        <option value="">
                            Select Role
                        </option>

                        {roles.map((role) => (

                            <option
                                key={role.id}
                                value={role.id}
                            >
                                {role.name}
                            </option>

                        ))}

                    </select>

                </div>


                {/* ==================================================
                    SIDEBAR MENU
                ================================================== */}

                <div className="permission-selector">

                    <label>
                        Select Sidebar
                    </label>

                    <select
                        value={selectedMenu}
                        onChange={(e) =>
                            setSelectedMenu(
                                e.target.value
                            )
                        }
                        disabled={!selectedRole}
                    >

                        <option value="">
                            Select Sidebar Menu
                        </option>

                        {menus.map((menu) => (

                            <option
                                key={menu.id}
                                value={menu.id}
                            >
                                {menu.name}
                            </option>

                        ))}

                    </select>

                </div>

            </div>


            {/* ==================================================
                MESSAGE
            ================================================== */}

            {message && (

                <div className="settings-success">
                    {message}
                </div>

            )}


            {error && (

                <div className="settings-error">
                    {error}
                </div>

            )}


            {/* ==================================================
                PERMISSION FUNCTIONS
            ================================================== */}

            {selectedRole && selectedMenu && (

                <div className="permission-functions-card">

                    <div className="permission-functions-header">

                        <div>

                            <h3>
                                Functions
                            </h3>

                            <p>
                                Select the actions allowed for
                                this sidebar menu.
                            </p>

                        </div>

                    </div>


                    {loadingPermission ? (

                        <div className="permission-loading-box">
                            Loading permissions...
                        </div>

                    ) : (

                        <div className="permission-functions">

                            {/* VIEW */}

                            <label className="permission-function">

                                <input
                                    type="checkbox"
                                    checked={
                                        permission.can_view
                                    }
                                    onChange={() =>
                                        handlePermissionChange(
                                            "can_view"
                                        )
                                    }
                                />

                                <span>
                                    View
                                </span>

                            </label>


                            {/* CREATE */}

                            <label className="permission-function">

                                <input
                                    type="checkbox"
                                    checked={
                                        permission.can_create
                                    }
                                    onChange={() =>
                                        handlePermissionChange(
                                            "can_create"
                                        )
                                    }
                                />

                                <span>
                                    Create
                                </span>

                            </label>


                            {/* EDIT */}

                            <label className="permission-function">

                                <input
                                    type="checkbox"
                                    checked={
                                        permission.can_edit
                                    }
                                    onChange={() =>
                                        handlePermissionChange(
                                            "can_edit"
                                        )
                                    }
                                />

                                <span>
                                    Edit
                                </span>

                            </label>


                            {/* DELETE */}

                            <label className="permission-function">

                                <input
                                    type="checkbox"
                                    checked={
                                        permission.can_delete
                                    }
                                    onChange={() =>
                                        handlePermissionChange(
                                            "can_delete"
                                        )
                                    }
                                />

                                <span>
                                    Delete
                                </span>

                            </label>

                        </div>

                    )}


                    {/* ==================================================
                        SAVE
                    ================================================== */}

                    <div className="permission-save-area">

                        <button
                            type="button"
                            className="permissions-save-btn"
                            onClick={handleSave}
                            disabled={
                                saving ||
                                loadingPermission
                            }
                        >

                            {saving
                                ? "Saving..."
                                : "Save Permissions"
                            }

                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default AdminSettingsPermissions;