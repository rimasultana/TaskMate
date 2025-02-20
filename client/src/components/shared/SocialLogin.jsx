import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxios from "@/hooks/useAxios";

const SocialLogin = () => {
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
      <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </>
  );
};

export default SocialLogin;
