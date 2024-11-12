import { useState, useEffect } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

function PlaceCardItem({ place }) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=qyD8R8gMJgaGtCcEsIYSvZKHzL6ZhW4AvJ2-5HEEzsg&query=${place.placeName}&orientation=landscape`
      );
      const photo = response.data.results[0];
      setImageURL(photo.urls.regular);
    };
    fetchImage();
  }, [place.placeName]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="
          border rounded-xl p-3 mt-2 flex flex-col 
          md:flex-row gap-5 hover:scale-105 transition-all 
          md:h-[200px]
        "
      >
        <img
          src={imageURL}
          alt=""
          className="
            w-full md:w-[130px] lg:w-[150px] xl:w-[170px] 
            h-[130px] md:h-[130px] lg:h-[150px] xl:h-[170px] 
            rounded-xl hover:shadow-md cursor-pointer
          "
        />
        <div className="flex justify-between flex-grow">
          <div className="text-sm">
            <h2 className="font-bold text-lg md:text-xl lg:text-xl text-black">
              📍 {place.placeName}
            </h2>
            <p className="text-sm md:text-md text-gray-500">
              {place.placeDetails}
            </p>
            <div>
              <h2 className="mt-1 text-black">🕐 {place.timeTravel}</h2>
              <h2 className="text-black my-1">🎫 {place.ticketPricing}</h2>
            </div>
          </div>
          <div className="self-start">
            <Button className="hover:border-none">
              <FaMapLocationDot />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
