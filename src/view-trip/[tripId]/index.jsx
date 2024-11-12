import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  const pdfRef = useRef();

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

  const downloadPDF = async () => {
    const pdfElement = pdfRef.current;
    const width = pdfElement.offsetWidth;
    const height = pdfElement.offsetHeight;

    const canvas = await html2canvas(pdfElement, {
      scale: 2,
      useCORS: true,
      height,
      width,
      scrolling: true,
    });

    const pdf = new jsPDF("l", "mm", [297, 210]);
    const imgProps = pdf.getImageProperties(canvas.toDataURL());
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(canvas.toDataURL(), "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`trip-itinerary-${tripId}.pdf`);
  };
  return (
    <>
      <div className="p-10 md:px-20 lg:px-44 xl:px-56" ref={pdfRef}>
        {/* Information Section */}
        <InfoSection trip={trip} />

        {/* Recommended Hotels */}
        <Hotels trip={trip} />

        {/* Daily Plan */}
        <PlacesToVisit trip={trip} />
      </div>

      <div className="mx-auto justify-center items-center text-center mt-4 mb-10">
        <Button onClick={downloadPDF} className="hover:border-none">
          Download Itinerary
        </Button>
      </div>
    </>
  );
}

export default ViewTrip;
