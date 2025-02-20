/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
      disabled: isEditing
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
        className="bg-white p-4 rounded-md shadow"
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
      className="bg-white p-4 rounded-md shadow cursor-move relative group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          )}
          <p className="text-gray-400 text-xs mt-2">
            {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          type="button"
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="text-gray-600 hover:text-blue-500 z-10"
        >
          Edit
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="text-gray-600 hover:text-red-500 z-10"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
