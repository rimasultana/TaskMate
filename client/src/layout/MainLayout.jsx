import { Outlet } from "react-router";
import Navbar from "@/components/Navbar/Navbar";
import useAuth from "@/hooks/useAuth";

const MainLayout = () => {
  const { theme } = useAuth();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,159,243,0.05)] to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,159,243,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Animated blobs with pink theme */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-[#ff9ff3]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#ff9ff3]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative">
        <Navbar />
        <div className="backdrop-blur-lg bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.1)] shadow-2xl min-h-screen mx-4 md:mx-8 mt-16 transition-colors duration-300">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Bottom gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MainLayout;
