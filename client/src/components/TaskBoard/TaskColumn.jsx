/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import useAuth from "@/hooks/useAuth";

const TaskColumn = ({
  category,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { theme } = useAuth();
  const isDark = theme === "dark";

  const { setNodeRef } = useDroppable({
    id: category,
  });

  const taskIds = tasks.map((task) => task._id);

  const getBgColor = () => {
    const colors = {
      "To-Do": {
        light: "from-blue-500/10 to-blue-600/10",
        dark: "from-blue-900/20 to-blue-800/20",
      },
      "In Progress": {
        light: "from-amber-500/10 to-amber-600/10",
        dark: "from-amber-900/20 to-amber-800/20",
      },
      Done: {
        light: "from-emerald-500/10 to-emerald-600/10",
        dark: "from-emerald-900/20 to-emerald-800/20",
      },
    };
    return (
      colors[category]?.[isDark ? "dark" : "light"] ||
      "from-slate-500/10 to-slate-600/10"
    );
  };

  const getHeaderColor = () => {
    const colors = {
      "To-Do": {
        light: "bg-blue-500",
        dark: "bg-blue-600",
      },
      "In Progress": {
        light: "bg-amber-500",
        dark: "bg-amber-600",
      },
      Done: {
        light: "bg-emerald-500",
        dark: "bg-emerald-600",
      },
    };
    return colors[category]?.[isDark ? "dark" : "light"] || "bg-slate-600";
  };

  return (
    <div
      className={`rounded-xl backdrop-blur-sm bg-gradient-to-b ${getBgColor()} shadow-xl border border-white/5`}
    >
      <div
        className={`${getHeaderColor()} rounded-t-xl p-4 flex justify-between items-center`}
      >
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <span>{category}</span>
          <span className="bg-white/20 text-white text-sm px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors flex items-center space-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      <div className={`p-4 ${isDark ? "bg-gray-900/30" : "bg-white/5"}`}>
        {showAddForm && (
          <div className="mb-4">
            <AddTaskForm
              onSubmit={(taskData) => {
                onAddTask(taskData);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
