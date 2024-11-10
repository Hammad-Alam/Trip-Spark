import image1 from "../../assets/airplane.jpg";
import { Link } from "react-router-dom";

/**
 * Hotels component displays hotel recommendations based on trip data.
 *
 * @param {object} trip - Trip data containing hotel information.
 * @returns {JSX.Element} Hotel recommendations grid.
 */
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl my-4">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
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
                <img src={image1} className="rounded-xl" />
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
