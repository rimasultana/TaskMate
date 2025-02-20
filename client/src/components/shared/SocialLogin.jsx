/* eslint-disable react/prop-types */
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = ({ text }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const axios = useAxios();
  const handleGoogleLogin = () => {
    googleLogin()
      .then((users) => {
        const user = users.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        axios.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("User created successfully.");
            navigate("/");
          } else {
            toast.success("Login successful!");
            navigate("/");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed");
      });
  };
  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="mt-6 w-full py-3 px-4 rounded-xl text-gray-300 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[#ff9ff3] hover:text-[#ff9ff3] focus:outline-none focus:ring-2 focus:ring-[#ff9ff3] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <FaGoogle className="w-5 h-5" />
        <span>Sign {text} with Google</span>
      </button>
    </>
  );
};

export default SocialLogin;
