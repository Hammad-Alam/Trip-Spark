import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

function InfoSection({ trip }) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const location = trip?.userSelection?.location;
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=qyD8R8gMJgaGtCcEsIYSvZKHzL6ZhW4AvJ2-5HEEzsg&query=${location}&orientation=landscape`
      );
      const photo = response.data.results[0];
      setImageURL(photo.urls.regular);
    };
    fetchImage();
  }, [location]);

  return (
    <div>
      <img
        src={imageURL}
        alt=""
        className="md:h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-sm md:text-xl lg:text-2xl my-2 md:my-0">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            <h2 className="bg-gray-700 hover:bg-transparent hover:border-2 hover:border-gray-700 hover:text-black transition duration-300 ease-in-out text-white w-fit font-medium px-3 py-1 rounded-full text-xs md:text-md">
              📆 {trip.userSelection?.days} Day
            </h2>
            <h2 className="bg-gray-700 hover:bg-transparent hover:border-2 hover:border-gray-700 hover:text-black transition duration-300 ease-in-out text-white w-fit font-medium px-3 py-1 rounded-full text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="bg-gray-700 hover:bg-transparent hover:border-2 hover:border-gray-700 hover:text-black transition duration-300 ease-in-out text-white w-fit font-medium px-3 py-1 rounded-full text-xs md:text-md">
              🥂 No of Traveler: {trip.userSelection?.travelType}
            </h2>
          </div>
        </div>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${trip?.userSelection?.location}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="hover:border-none mb-32 md:mb-0">
            <IoIosSend />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InfoSection;
