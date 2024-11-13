import { useState, useEffect } from "react";
import Logo from "../../../assets/logo.PNG";
import { Button } from "../button";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setIsAuthenticated(!!token);
      setUser({ token, email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
  };

  return (
    <div className="px-2 shadow-sm flex justify-between items-center lg:px-5">
      <a href="/">
        <img src={Logo} alt="Company Logo" className="w-48 h-24 md:pr-0" />
      </a>
      <div className="flex flex-nowrap gap-1 md:gap-4 justify-end md:flex-wrap">
        {!isAuthenticated ? (
          <a href="/signin">
            <Button className="hover:border-none">Sign In</Button>
          </a>
        ) : (
          <>
            <a href="/view-trip/myTrips">
              <Button className="hover:border-none">My Trips</Button>
            </a>
            <a href="/">
              <Button onClick={handleLogout} className="hover:border-none">
                Logout
              </Button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
