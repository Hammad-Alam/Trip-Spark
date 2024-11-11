import image1 from "../../assets/airplane.jpg";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all h-[190px]">
        <img
          src={image1}
          alt=""
          className="w-[130px] h-[130px] rounded-xl hover:shadow-md cursor-pointer"
        />
        <div className="flex justify-between">
          <div className="text-sm">
            <h2 className="font-bold text-lg text-black">{place.placeName}</h2>
            <p className="text-sm text-gray-500">{place.placeDetails}</p>
            <div>
              <h2 className="mt-1 text-black">🕐 {place.timeTravel}</h2>
              <h2 className="text-black my-1">🎫 {place.ticketPricing}</h2>
            </div>
          </div>
          <div className="self-start">
            <Button size="sm">
              <FaMapLocationDot />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
