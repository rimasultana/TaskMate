/* eslint-disable react/prop-types */
import { useState } from "react";

const AddTaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          maxLength={50}
          className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 placeholder-gray-500 focus:border-[#ff9ff3] focus:outline-none focus:ring-1 focus:ring-[#ff9ff3] transition-colors"
          required
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          maxLength={200}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 placeholder-gray-500 focus:border-[#ff9ff3] focus:outline-none focus:ring-1 focus:ring-[#ff9ff3] transition-colors resize-none"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-gray-300 border border-[rgba(255,255,255,0.1)] hover:border-[#ff9ff3] transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-[#ff9ff3] to-purple-500 hover:from-[#ff9ff3] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-[#ff9ff3] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
