/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

const TaskColumn = ({ category, tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { setNodeRef } = useDroppable({
    id: category,
  });

  const taskIds = tasks.map((task) => task._id);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{category}</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      {showAddForm && (
        <AddTaskForm
          onSubmit={(taskData) => {
            onAddTask(taskData);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
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
  );
};

export default TaskColumn;
