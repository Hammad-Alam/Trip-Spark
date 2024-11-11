import { useState, useEffect } from "react";
import Logo from "../../../assets/logo.PNG";
import { Button } from "../button";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src={Logo} alt="Company Logo" className="w-32 h-14" />
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <a href="/signin">
            <Button className="hover:border-none">Sign In</Button>
          </a>
        ) : (
          <a href="/">
            <Button onClick={handleLogout} className="hover:border-none">
              Logout
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default Header;
