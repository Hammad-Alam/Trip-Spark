// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../button";
import { toast } from "sonner";

function Signin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Reload the page

    // Check if all fields are filled
    if (!credentials.email || !credentials.password) {
      toast("Please fill in all fields.", "danger");
      return;
    }

    // Proceed to API Call
    try {
      const response = await fetch(
        "https://trip-spark-backend.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        window.location.replace("/");
        // window.location.reload();
        localStorage.setItem("email", JSON.stringify(credentials.email));
        toast("Logged in Successfully!");
        // navigate("/");
      } else {
        toast("Please enter correct credentials.");
      }
    } catch (error) {
      console.log(error);
      toast("An error occurred. Please try again!");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center mx-4 my-28 lg:my-36">
      <div
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto px-8 py-4 bg-white rounded-lg shadow-md"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <h2 className="text-lg font-bold text-center mb-4">
          Sign in to TripSpark
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="mx-auto justify-center items-center text-center">
            <Button
              className="mt-4 hover:border-none"
              onClick={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              Sign In
            </Button>
          </div>
          <p className="mt-2 text-sm text-center">
            Don't have an account?
            <a href="/signup">
              <span className="text-[#e74c3c] font-bold">Sign Up</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
