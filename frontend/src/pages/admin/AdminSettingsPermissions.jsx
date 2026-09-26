import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminSettingsPermissions() {
    const [roles, setRoles] = useState([]);
    const [menus, setMenus] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("");

    const [menuVisible, setMenuVisible] = useState(false);

    const [permissions, setPermissions] = useState({
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =========================================================
    // LOAD ROLES
    // =========================================================

    useEffect(() => {
        loadRoles();
        loadMenus();
    }, []);

    const loadRoles = async () => {
        try {
            const response = await api.get("admin/roles/");

            console.log("Roles:", response.data);

            setRoles(response.data.results || response.data || []);
        } catch (error) {
            console.error("Failed to load roles:", error);
            setError("Failed to load roles.");
        }
    };

    // =========================================================
    // LOAD SIDEBAR MENUS
    // =========================================================

    const loadMenus = async () => {
        try {
            const response = await api.get("admin/sidebar-menus/");

            console.log("Sidebar Menus:", response.data);

            setMenus(response.data.results || response.data || []);
        } catch (error) {
            console.error("Failed to load menus:", error);
            setError("Failed to load sidebar menus.");
        }
    };

    // =========================================================
    // ROLE CHANGE
    // =========================================================

    const handleRoleChange = (e) => {
        const roleId = e.target.value;

        setSelectedRole(roleId);
        setSelectedMenu("");

        setMenuVisible(false);

        setPermissions({
            can_view: false,
            can_create: false,
            can_edit: false,
            can_delete: false,
        });

        setMessage("");
        setError("");
    };

    // =========================================================
    // MENU CHANGE
    // =========================================================

    const handleMenuChange = async (e) => {
        const menuId = e.target.value;

        setSelectedMenu(menuId);

        setMenuVisible(false);

        setPermissions({
            can_view: false,
            can_create: false,
            can_edit: false,
            can_delete: false,
        });

        setMessage("");
        setError("");

        if (!selectedRole || !menuId) {
            return;
        }

        await loadMenuPermission(selectedRole, menuId);
    };

    // =========================================================
    // LOAD PERMISSION FOR ROLE + MENU
    // =========================================================

    const loadMenuPermission = async (roleId, menuId) => {
        try {
            setLoading(true);

            // -------------------------------------------------
            // LOAD ROLE PERMISSIONS
            // -------------------------------------------------

            const permissionResponse = await api.get(
                `admin/permissions/?role_id=${roleId}`
            );

            console.log(
                "Role Permissions:",
                permissionResponse.data
            );

            const permissionList =
                permissionResponse.data.permissions ||
                permissionResponse.data.results ||
                permissionResponse.data ||
                [];

            // -------------------------------------------------
            // FIND SELECTED MENU
            // -------------------------------------------------

            const selectedMenuObject = menus.find(
                (menu) => String(menu.id) === String(menuId)
            );

            if (!selectedMenuObject) {
                return;
            }

            // -------------------------------------------------
            // FIND PERMISSION CODE
            // -------------------------------------------------

            const permissionCode = selectedMenuObject.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .replace(/-/g, "");

            console.log(
                "Permission Code:",
                permissionCode
            );

            // -------------------------------------------------
            // FIND PERMISSION
            // -------------------------------------------------

            const permission =
                permissionList.find(
                    (item) =>
                        item.code === permissionCode
                ) ||
                permissionList.find(
                    (item) =>
                        item.permission_code === permissionCode
                ) ||
                permissionList.find(
                    (item) =>
                        item.permission_name
                            ?.toLowerCase()
                            .replace(/\s+/g, "")
                            .replace(/-/g, "") ===
                        permissionCode
                );

            if (permission) {
                setPermissions({
                    can_view: Boolean(
                        permission.can_view
                    ),
                    can_create: Boolean(
                        permission.can_create
                    ),
                    can_edit: Boolean(
                        permission.can_edit
                    ),
                    can_delete: Boolean(
                        permission.can_delete
                    ),
                });
            }

            // -------------------------------------------------
            // LOAD ROLE MENU
            // -------------------------------------------------

            const menuResponse = await api.get(
                `admin/role-menus/?role_id=${roleId}`
            );

            console.log(
                "Role Menus:",
                menuResponse.data
            );

            const menuList =
                menuResponse.data.menus ||
                menuResponse.data.results ||
                menuResponse.data ||
                [];

            const roleMenu = menuList.find(
                (item) =>
                    String(item.menu_id ?? item.id) ===
                    String(menuId)
            );

            if (roleMenu) {
                setMenuVisible(
                    Boolean(
                        roleMenu.is_visible
                    )
                );
            } else {
                setMenuVisible(false);
            }
        } catch (error) {
            console.error(
                "Failed to load permission:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Failed to load permission."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // PERMISSION CHECKBOX
    // =========================================================

    const handlePermissionChange = (field) => {
        setPermissions((previous) => ({
            ...previous,
            [field]: !previous[field],
        }));
    };

    // =========================================================
    // SAVE
    // =========================================================

    const handleSave = async () => {
        if (!selectedRole) {
            setError("Please select a role.");
            return;
        }

        if (!selectedMenu) {
            setError("Please select a sidebar menu.");
            return;
        }

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const selectedMenuObject = menus.find(
                (menu) =>
                    String(menu.id) ===
                    String(selectedMenu)
            );

            if (!selectedMenuObject) {
                setError("Selected menu not found.");
                return;
            }

            // =================================================
            // PERMISSION CODE
            // =================================================

            const permissionCode =
                selectedMenuObject.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .replace(/-/g, "");

            // =================================================
            // FIND PERMISSION ID
            // =================================================

            const permissionResponse = await api.get(
                `admin/permissions/?role_id=${selectedRole}`
            );

            const permissionList =
                permissionResponse.data.permissions ||
                permissionResponse.data.results ||
                permissionResponse.data ||
                [];

            const permission =
                permissionList.find(
                    (item) =>
                        item.code === permissionCode
                ) ||
                permissionList.find(
                    (item) =>
                        item.permission_code ===
                        permissionCode
                );

            if (!permission) {
                setError(
                    `Permission "${permissionCode}" not found.`
                );
                return;
            }

            // =================================================
            // SAVE ROLE PERMISSION
            // =================================================

            await api.put("admin/permissions/", {
                role_id: Number(selectedRole),

                permissions: [
                    {
                        permission_id:
                            permission.id ??
                            permission.permission_id,

                        can_view:
                            permissions.can_view,

                        can_create:
                            permissions.can_create,

                        can_edit:
                            permissions.can_edit,

                        can_delete:
                            permissions.can_delete,
                    },
                ],
            });

            // =================================================
            // SAVE ROLE MENU
            // =================================================

            await api.put("admin/role-menus/", {
                role_id: Number(selectedRole),

                menus: [
                    {
                        menu_id: Number(selectedMenu),

                        is_visible:
                            menuVisible,
                    },
                ],
            });

            setMessage(
                "Permission and sidebar access saved successfully."
            );

            console.log(
                "Permission saved successfully"
            );
        } catch (error) {
            console.error(
                "Save permission error:",
                error
            );

            console.error(
                "Server response:",
                error.response?.data
            );

            setError(
                error.response?.data?.detail ||
                "Failed to save permission."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="permissions-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="permissions-header">

                <div>
                    <h3>Role Permissions</h3>

                    <p>
                        Control sidebar visibility and
                        functions for each role.
                    </p>
                </div>

            </div>

            {/* =================================================
                ROLE
            ================================================= */}

            <div className="permission-form">

                <div className="permission-field">

                    <label>
                        Select Role
                    </label>

                    <select
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value="">
                            -- Select Role --
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

                {/* =================================================
                    MENU
                ================================================= */}

                <div className="permission-field">

                    <label>
                        Select Sidebar / Module
                    </label>

                    <select
                        value={selectedMenu}
                        onChange={handleMenuChange}
                        disabled={!selectedRole}
                    >
                        <option value="">
                            -- Select Sidebar Menu --
                        </option>

                        {menus
                            .filter(
                                (menu) =>
                                    menu.is_active !== false
                            )
                            .map((menu) => (
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

            {/* =================================================
                PERMISSION AREA
            ================================================= */}

            {selectedRole && selectedMenu && (

                <div className="permission-card">

                    <div className="permission-card-header">

                        <div>

                            <h3>
                                {
                                    menus.find(
                                        (menu) =>
                                            String(
                                                menu.id
                                            ) ===
                                            String(
                                                selectedMenu
                                            )
                                    )?.name
                                }
                            </h3>

                            <p>
                                Configure access for
                                this sidebar module.
                            </p>

                        </div>

                    </div>

                    {/* =================================================
                        SIDEBAR VISIBILITY
                    ================================================= */}

                    <div className="permission-section">

                        <h4>
                            Sidebar Access
                        </h4>

                        <label className="permission-checkbox">

                            <input
                                type="checkbox"
                                checked={menuVisible}
                                onChange={(e) =>
                                    setMenuVisible(
                                        e.target.checked
                                    )
                                }
                            />

                            <span>
                                Show in Sidebar
                            </span>

                        </label>

                    </div>

                    {/* =================================================
                        FUNCTIONS
                    ================================================= */}

                    <div className="permission-section">

                        <h4>
                            Functions
                        </h4>

                        <div className="permission-grid">

                            <label className="permission-checkbox">

                                <input
                                    type="checkbox"
                                    checked={
                                        permissions.can_view
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

                            <label className="permission-checkbox">

                                <input
                                    type="checkbox"
                                    checked={
                                        permissions.can_create
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

                            <label className="permission-checkbox">

                                <input
                                    type="checkbox"
                                    checked={
                                        permissions.can_edit
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

                            <label className="permission-checkbox">

                                <input
                                    type="checkbox"
                                    checked={
                                        permissions.can_delete
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

                    </div>

                    {/* =================================================
                        SAVE
                    ================================================= */}

                    <div className="permission-actions">

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={
                                saving || loading
                            }
                            className="save-permission-btn"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Permissions"}
                        </button>

                    </div>

                </div>
            )}

            {/* =================================================
                MESSAGE
            ================================================= */}

            {message && (
                <div className="permission-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="permission-error">
                    {error}
                </div>
            )}

        </div>
    );
}

export default AdminSettingsPermissions;