
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminCourseLevels.css";

export default function AdminCourseLevels() {
  const [levels, setLevels] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadLevels = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("course-levels/");
      const data = response.data;
      setLevels(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError("Course Levels load panna mudiyala.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLevels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Course Level name enter pannunga.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId !== null) {
        await api.patch(`course-levels/${editingId}/`, {
          name: trimmedName,
        });
        setSuccess("Course Level updated successfully!");
      } else {
        await api.post("course-levels/", {
          name: trimmedName,
        });
        setSuccess("Course Level added successfully!");
      }

      setName("");
      setEditingId(null);
      await loadLevels();
    } catch (err) {
      const data = err.response?.data;
      setError(
        typeof data === "string"
          ? data
          : data
            ? JSON.stringify(data)
            : "Operation failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (level) => {
    setName(level.name);
    setEditingId(level.id);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setName("");
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (level) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${level.name}"?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await api.delete(`course-levels/${level.id}/`);
      setSuccess("Course Level deleted successfully!");

      if (editingId === level.id) {
        handleCancel();
      }

      await loadLevels();
    } catch (err) {
      const data = err.response?.data;
      setError(
        typeof data === "string"
          ? data
          : data
            ? JSON.stringify(data)
            : "Delete failed. This level may be used by existing courses."
      );
    }
  };

  return (
    <div className="course-levels-page">
      <div className="course-levels-header">
        <div>
          <h2>Course Levels</h2>
          <p>Manage undergraduate and postgraduate levels.</p>
        </div>

        <div className="course-levels-count">
          Total Levels: {levels.length}
        </div>
      </div>

      {error && (
        <div className="course-levels-message error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="course-levels-message success-message">
          {success}
        </div>
      )}

      <div className="course-levels-card">
        <h3>{editingId !== null ? "Edit Course Level" : "Add Course Level"}</h3>

        <form onSubmit={handleSubmit} className="course-levels-form">
          <div className="course-levels-input-group">
            <label htmlFor="levelName">Level Name</label>
            <input
              id="levelName"
              type="text"
              placeholder="Enter UG or PG"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="course-levels-form-actions">
            <button
              type="submit"
              className="level-save-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Update Level"
                  : "Add Level"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="level-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="course-levels-card">
        <h3>All Course Levels</h3>

        {loading ? (
          <p className="course-levels-empty">Loading course levels...</p>
        ) : levels.length === 0 ? (
          <p className="course-levels-empty">
            No course levels found. Add your first level above.
          </p>
        ) : (
          <div className="course-levels-table-wrapper">
            <table className="course-levels-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Level Name</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {levels.map((level, index) => (
                  <tr key={level.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="level-name-badge">
                        {level.name}
                      </span>
                    </td>
                    <td>
                      <div className="level-action-buttons">
                        <button
                          type="button"
                          className="level-edit-btn"
                          onClick={() => handleEdit(level)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="level-delete-btn"
                          onClick={() => handleDelete(level)}
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
    </div>
  );
}
