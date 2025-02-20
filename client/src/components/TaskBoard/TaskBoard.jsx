import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const { user } = useAuth();
  const axios = useAxios();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    try {
      const { data } = await axios.get(`/tasks/${user?.uid}`);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(tasks.find((task) => task._id === active.id));
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overTask = tasks.find((task) => task._id === over.id);

    if (!activeTask || !overTask) return;

    if (activeTask._id !== overTask._id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);

      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);

      // Update order in database
      try {
        const updatedTasks = newTasks.map((task, index) => ({
          _id: task._id,
          order: index,
          category: task.category,
        }));
        await axios.patch("/tasks/batch-update", updatedTasks);
      } catch (error) {
        console.error("Error updating task order:", error);
      }
    }
    setActiveTask(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overTask = tasks.find((task) => task._id === over.id);

    if (!activeTask || !overTask) return;

    if (activeTask.category !== overTask.category) {
      const updatedTasks = tasks.map((task) => {
        if (task._id === activeTask._id) {
          return { ...task, category: overTask.category };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        userId: user.uid,
        category: "To-Do",
        order: tasks.length,
      };
      const { data } = await axios.post("/tasks", newTask);
      setTasks([...tasks, { ...newTask, _id: data.insertedId }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      await axios.patch(`/tasks/${taskId}`, updates);
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, ...updates } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <TaskColumn
              key={category}
              category={category}
              tasks={tasks.filter((task) => task.category === category)}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskBoard;
