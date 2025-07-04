import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/ui/custom/Header";
import { Toaster } from "./components/ui/sonner";
import Signin from "./components/ui/custom/Signin";
import Signup from "./components/ui/custom/Signup";
import ViewTrip from "./view-trip/[tripId]/index";
import Footer from "./components/ui/custom/Footer";
import MyTrips from "./my-trips";
import ProfileInfo from "./components/ui/custom/ProfileInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/view-trip/myTrips",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
    <Footer />
    {/* <ProfileInfo /> */}
  </StrictMode>
);
