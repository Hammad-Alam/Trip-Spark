import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const location = trip?.userSelection?.location;
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=qyD8R8gMJgaGtCcEsIYSvZKHzL6ZhW4AvJ2-5HEEzsg&query=${location} cityscape&orientation=landscape`
      );

      // Select a random image from the results
      const randomIndex = Math.floor(
        Math.random() * response.data.results.length
      );
      const photo = response.data.results[randomIndex];
      setImageURL(photo.urls.regular);
    };
    fetchImage();
  }, [trip?.userSelection?.location]);
  return (
    <div className="hover:scale-105 transition-all cursor-pointer">
      <Link to={`/view-trip/${trip?.id}`}>
        <img src={imageURL} className="object-cover rounded-xl h-[200px]" />
        <div className="flex flex-col gap-2">
          <h2 className="mt-2 font-medium text-black">
            📍 {trip?.userSelection?.location}
          </h2>
          <h2 className="text-xs text-gray-500">{`${trip?.userSelection?.days} Days trip with ${trip?.userSelection?.budget} Budget`}</h2>
        </div>
      </Link>
    </div>
  );
}

export default UserTripCardItem;
