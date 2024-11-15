import { useState, useEffect } from "react";
import Logo from "../../../assets/logo.PNG";
import { Button } from "../button";
import ProfileInfo from "./ProfileInfo";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  // Fetch user info from localStorage on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = JSON.parse(localStorage.getItem("email")) || "";

    if (token && email) {
      setIsAuthenticated(true);
      const firstLetter = email.charAt(0).toUpperCase(); // Extract the first letter
      setUser({ name: firstLetter, email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.replace("/");
    setIsAuthenticated(false);
  };

  return (
    <div className="relative px-2 shadow-sm flex justify-between items-center lg:px-5">
      <a href="/">
        <img src={Logo} alt="Company Logo" className="w-48 h-24 md:pr-0" />
      </a>
      <div className="flex flex-nowrap gap-1 md:gap-4 justify-end md:flex-wrap">
        {!isAuthenticated ? (
          // Sign In Button
          <a href="/signin">
            <Button className="hover:border-none">Sign In</Button>
          </a>
        ) : (
          // User Profile Button
          <div className="relative">
            <Button
              className="w-10 h-10 rounded-[50%] hover:border-none text-center py-2 lg:text-lg md:text-md sm:text-sm"
              onClick={toggleBox}
            >
              {user.name}
            </Button>
            {isOpen && (
              <div className="absolute top-full right-0 z-50">
                <ProfileInfo handleLogout={handleLogout} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
