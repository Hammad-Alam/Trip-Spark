import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid xl:grid-cols-2 gap-5">
              {item.schedule.map((place, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-[#e74c3c]">
                    {place.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
