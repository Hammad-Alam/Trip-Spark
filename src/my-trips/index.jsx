import { useNavigate } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserTripCardItem from "./UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (!email) {
      navigate("/");
      return;
    }

    const fetchUserTrips = async () => {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", email)
      );
      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);
    };

    fetchUserTrips();
  }, [navigate]);

  return (
    <div
      className="p-10 md:px-20 lg:px-44 xl:px-56"
      style={{ minHeight: "545px" }}
    >
      <h2 className="font-bold text-xl lg:text-2xl xl:text-3xl my-4">
        My Trips
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {userTrips.map((trip) => (
          <UserTripCardItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
