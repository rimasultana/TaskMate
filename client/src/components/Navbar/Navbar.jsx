import { Link } from "react-router";
import DarkModeToggle from "react-dark-mode-toggle";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser, theme, toggleTheme } = useAuth();
  const isDark = theme === "dark";

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.03)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-white via-[#ff9ff3] to-white bg-clip-text text-transparent">
                TaskMate
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <DarkModeToggle
              onChange={toggleTheme}
              checked={isDark}
              size={50}
              className="mr-2"
            />

            {user ? (
              <div className="flex items-center space-x-6">
                <div className="text-gray-300 hidden md:block hover:text-[#ff9ff3] transition-colors duration-300">
                  {user.displayName}
                </div>
                <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]"></div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm bg-[rgba(255,255,255,0.05)] text-gray-300 border border-[rgba(255,255,255,0.1)] hover:border-[#ff9ff3] hover:text-[#ff9ff3] transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm bg-[rgba(255,255,255,0.05)] text-gray-300 border border-[rgba(255,255,255,0.1)] hover:border-[#ff9ff3] hover:text-[#ff9ff3] transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 hidden md:block rounded-xl text-sm bg-[rgba(255,159,243,0.1)] text-[#ff9ff3] border border-[#ff9ff3] hover:bg-[rgba(255,159,243,0.2)] transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
