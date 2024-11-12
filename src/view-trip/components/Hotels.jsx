import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      if (!trip?.tripData?.hotels) return;

      const promises = trip.tripData.hotels.map(async (hotel) => {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=qyD8R8gMJgaGtCcEsIYSvZKHzL6ZhW4AvJ2-5HEEzsg&query=${hotel.hotelName}&orientation=landscape`
        );
        const photo = response.data.results[0];
        return { hotelName: hotel.hotelName, imageURL: photo.urls.regular };
      });
      const results = await Promise.all(promises);
      const images = results.reduce((acc, curr) => {
        acc[curr.hotelName] = curr.imageURL;
        return acc;
      }, {});
      setHotelImages(images);
    };
    fetchImages();
  }, [trip?.tripData?.hotels]);

  return (
    <div>
      <h2 className="font-bold text-lg lg:text-xl my-4">
        Hotel Recommendations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all cursor-pointer"
          >
            <Link
              to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel?.hotelAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-black">
                <img
                  src={hotelImages[hotel.hotelName]}
                  className="rounded-xl h-[160px]"
                />
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-medium">📍 {hotel.hotelName}</h2>
                  <h2 className="text-xs text-gray-500">
                    {hotel.hotelAddress}
                  </h2>
                  <h2 className="text-sm">💸 {hotel.price}</h2>
                  <h2 className="text-sm">⭐ {hotel.rating}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
