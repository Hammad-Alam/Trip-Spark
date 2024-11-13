import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        toast("No trip found.");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast("Error fetching trip data.");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />
    </div>
  );
}

export default ViewTrip;
