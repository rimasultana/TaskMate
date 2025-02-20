/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useAuth from "@/hooks/useAuth";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { theme } = useAuth();
  const isDark = theme === "dark";

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
      disabled: isEditing,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task._id, { title, description });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white/80 border-gray-200"
        } backdrop-blur-sm p-4 rounded-xl shadow-lg border transition-colors duration-200`}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            className={`w-full p-2 rounded-lg border ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white/50 border-gray-200 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className={`w-full p-2 rounded-lg border ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white/50 border-gray-200 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${
        isDark
          ? "bg-gray-800/80 border-gray-700 hover:bg-gray-800"
          : "bg-white/80 border-gray-200 hover:bg-white"
      } backdrop-blur-sm p-4 rounded-xl shadow-lg border cursor-move transition-all duration-200 group`}
    >
      <div className="relative">
        <div>
          <h3
            className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-2 leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center space-x-2 mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <p
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              isDark
                ? "text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
                : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              isDark
                ? "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
