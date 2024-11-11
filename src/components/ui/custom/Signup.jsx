import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../button";
import { toast } from "sonner";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.cnfpassword
    ) {
      toast("Please fill in all fields.", "danger");
      return;
    }

    // Check password length and pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(credentials.password)) {
      toast(
        "Password should be at least 8 characters, contain uppercase, lowercase letters, and numbers.",
        "danger"
      );
      return;
    }

    // Check email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credentials.email)) {
      toast("Please enter valid email format.", "danger");
      return;
    }

    // Check password match
    if (credentials.password !== credentials.cnfpassword) {
      toast("Password do not match.", "danger");
      return;
    }

    // Proceed with API call
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        toast("Sign up successfully!", "success");
        navigate("/signin"); // Redirect to signin page
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center mx-4 my-8 lg:my-16">
      <div
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto px-8 py-4 bg-white rounded-lg shadow-md"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <h2 className="text-lg font-bold text-center mb-4">
          Create your Account
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="cnfpassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="cnfpassword"
            name="cnfpassword"
            value={credentials.cnfpassword}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mx-auto justify-center items-center text-center">
          <Button className="mt-4 hover:border-none" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
        <p className="mt-2 text-sm text-center">
          Already have an account?
          <a href="/signin">
            <span className="text-[#e74c3c] font-bold">Sign In</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
