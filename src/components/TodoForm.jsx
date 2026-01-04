import React, { useState } from "react";
import "./TodoForm.css";
import toast, { Toaster } from "react-hot-toast";

export default function TodoForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setBackendError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBackendError("");

    try {
      await onCreate(form); // call parent create handler
      toast.success("Todo created!");

      // reset form
      setForm({
        title: "",
        description: "",
        status: "TODO",
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create todo";

      setBackendError(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormIncomplete = !form.title || !form.description;

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="POSTPONED">POSTPONED</option>
          <option value="CANCELED">CANCELED</option>
        </select>

        <button type="submit" disabled={loading || isFormIncomplete}>
          {loading ? <span className="spinner" /> : "Add"}
        </button>
      </form>

      {backendError && <div className="backend-error">{backendError}</div>}

      <Toaster position="top-right" />
    </>
  );
}
