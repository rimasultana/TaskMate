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
import toast from "react-hot-toast";

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
      toast.error("Failed to load tasks");
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(tasks.find((task) => task._id === active.id));
  };

  const handleDragOver = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overContainer = over.data?.current?.sortable?.containerId || over.id;

    if (categories.includes(overContainer) && activeTask.category !== overContainer) {
      try {
        await axios.patch(`/tasks/${activeTask._id}`, {
          category: overContainer,
        });

        setTasks((prev) =>
          prev.map((task) =>
            task._id === activeTask._id
              ? { ...task, category: overContainer }
              : task
          )
        );
        toast(`Task moved to ${overContainer}`, {
          icon: "🔄",
        });
      } catch (error) {
        console.error("Error updating task category:", error);
        toast.error("Failed to move task");
      }
      return;
    }

    const overTask = tasks.find((task) => task._id === over.id);
    if (!activeTask || !overTask || activeTask.category === overTask.category) return;

    try {
      await axios.patch(`/tasks/${activeTask._id}`, {
        category: overTask.category,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === activeTask._id
            ? { ...task, category: overTask.category }
            : task
        )
      );
      toast(`Task moved to ${overTask.category}`, {
        icon: "🔄",
      });
    } catch (error) {
      console.error("Error updating task category:", error);
      toast.error("Failed to move task");
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTask = tasks.find((task) => task._id === active.id);
    const overTask = tasks.find((task) => task._id === over.id);

    if (!activeTask || !overTask) {
      setActiveTask(null);
      return;
    }

    const oldIndex = tasks.findIndex((task) => task._id === active.id);
    const newIndex = tasks.findIndex((task) => task._id === over.id);

    if (oldIndex !== newIndex) {
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);

      try {
        const updatedTasks = newTasks.map((task, index) => ({
          _id: task._id,
          order: index,
          category: task.category,
        }));
        await axios.patch("/tasks/batch-update", updatedTasks);
      } catch (error) {
        console.error("Error updating task order:", error);
        toast.error("Failed to reorder tasks");
      }
    }

    setActiveTask(null);
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
      toast("New task added to To-Do", {
        icon: "✅",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const updateTask = async (taskId, updates) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) return;

    try {
      await axios.patch(`/tasks/${taskId}`, updates);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, ...updates } : task
        )
      );
      toast(`Task updated in ${taskToUpdate.category}`, {
        icon: "📝",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    const taskToDelete = tasks.find((task) => task._id === taskId);
    if (!taskToDelete) return;

    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast(`Task deleted from ${taskToDelete.category}`, {
        icon: "🗑️",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
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
