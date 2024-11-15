import { Button } from "../button";
import { useState, useEffect } from "react";

const ProfileInfo = ({ handleLogout }) => {
  const [user, setUser] = useState({});
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        setUser(data);
        setFirstLetter(data.name.charAt(0));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg py-4 px-0 w-52 md:w-60">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-24 bg-[#e74c3c] mx-auto justify-center items-center text-center">
          <Button className="w-10 h-10 rounded-[50%] hover:border-none my-7 text-center py-2 lg:text-lg md:text-md sm:text-sm">
            {firstLetter}
          </Button>
        </div>
        <div className="flex flex-col gap-2 w-[90%]">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 text-center">
            {user.name}
          </h2>
          <p className="text-gray-600 text-sm text-center">{user.email}</p>
          <div className="flex flex-col items-start text-sm">
            <a
              href="/create-trip"
              className="text-black hover:bg-[#e74c3c] hover:rounded-md p-2 hover:text-white w-full my-1"
            >
              Create Trip
            </a>
            <a
              href="/view-trip/myTrips"
              className="text-black hover:bg-[#e74c3c] hover:rounded-md p-2 hover:text-white w-full my-1"
            >
              My Trips
            </a>
            <button
              onClick={handleLogout}
              className="text-black hover:bg-[#e74c3c] hover:rounded-md p-2 hover:text-white hover:border-none w-full my-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
