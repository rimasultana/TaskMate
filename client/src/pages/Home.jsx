import useAuth from "@/hooks/useAuth";
import TaskBoard from "../components/TaskBoard/TaskBoard";
import { Navigate } from "react-router";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-[#ff9ff3]/50 border-t-[#ff9ff3] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-white via-[#ff9ff3] to-white bg-clip-text text-transparent">
            TaskFlow
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Manage your tasks efficiently with our beautiful and intuitive drag-and-drop interface
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-24 left-1/4 w-64 h-64 bg-[#ff9ff3]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-24 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      
      <div className="relative">
        <TaskBoard />
      </div>
    </div>
  );
};

export default Home;
