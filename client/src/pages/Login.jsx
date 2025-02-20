import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "@/components/shared/SocialLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(() => {
        toast.success("Login successful!", {
          style: {
            background: "rgba(255, 255, 255, 0.05)",
            color: "#ff9ff3",
            border: "1px solid rgba(255, 159, 243, 0.2)",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message, {
          style: {
            background: "rgba(255, 255, 255, 0.05)",
            color: "#ff9ff3",
            border: "1px solid rgba(255, 159, 243, 0.2)",
          },
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-lg rounded-2xl border border-[rgba(255,255,255,0.1)] p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-white via-[#ff9ff3] to-white bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 focus:border-[#ff9ff3] focus:outline-none focus:ring-1 focus:ring-[#ff9ff3] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 focus:border-[#ff9ff3] focus:outline-none focus:ring-1 focus:ring-[#ff9ff3] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-[#ff9ff3] to-purple-500 hover:from-[#ff9ff3] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-[#ff9ff3] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[rgba(255,255,255,0.03)] text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <SocialLogin text="in" />
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don&#39;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#ff9ff3] hover:text-[#ff9ff3]/80 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
