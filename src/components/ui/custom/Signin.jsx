import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../button";

function Signin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Reload the page

    // Check if all fields are filled
    if (!credentials.email || !credentials.password) {
      //   props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Proceed to API Call
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        // props.handleAlert("Logged in Successfully!", "success");
        navigate("/");
      } else {
        // props.handleAlert("Please enter correct credentials.", "danger");
      }
    } catch (error) {
      console.log(error);
      //   props.handleAlert("An error occurred. Please try again!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center my-32 lg:my-44">
      <div
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>
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
            value={credentials.password}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <Button>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
