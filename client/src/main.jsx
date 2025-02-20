import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import { RouterProvider } from "react-router";
import router from "./routers/router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster 
      position="top-right"
      toastOptions={{
        success: {
          duration: 2000,
        },
        error: {
          duration: 2000,
        },
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
    <RouterProvider router={router} />
  </AuthProvider>
);
